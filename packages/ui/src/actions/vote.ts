"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

export async function voteOffer(
    offerId: string,
    voteType: "up" | "down",
    sessionId: string
) {
    try {
        // Check if user has already voted
        const existingVote = await prisma.vote.findUnique({
            where: {
                offerId_sessionId: {
                    offerId,
                    sessionId,
                },
            },
        });

        if (existingVote) {
            // Update existing vote
            if (existingVote.voteType === voteType) {
                // Same vote - remove it (toggle off)
                await prisma.vote.delete({
                    where: { id: existingVote.id },
                });
            } else {
                // Different vote - update it
                await prisma.vote.update({
                    where: { id: existingVote.id },
                    data: { voteType },
                });
            }
        } else {
            // Create new vote
            await prisma.vote.create({
                data: {
                    offerId,
                    sessionId,
                    voteType,
                },
            });
        }

        // Recalculate aggregated counts for display
        const allVotes = await prisma.vote.findMany({
            where: { offerId },
        });

        const upvotes = allVotes.filter((v) => v.voteType === "up").length;
        const downvotes = allVotes.filter((v) => v.voteType === "down").length;

        await prisma.offer.update({
            where: { id: offerId },
            data: { upvotes, downvotes },
        });

        // Revalidate pages
        revalidatePath("/");
        revalidatePath("/store/[slug]", "page");
        revalidatePath("/category/[slug]", "page");
        revalidatePath("/offer/[id]", "page");

        return { success: true, upvotes, downvotes };
    } catch (error) {
        console.error("Failed to vote:", error);
        return { success: false, error: "Failed to vote" };
    }
}
