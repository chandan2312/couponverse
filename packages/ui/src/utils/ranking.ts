import type { Offer, Vote } from "@prisma/client";

const FOURTEEN_DAYS_MS = 14 * 24 * 60 * 60 * 1000;

export type OfferWithVotes = Offer & { votes: Vote[] };

/**
 * Calculate Reddit-style "hot" score for an offer
 * Based on recent votes (last 14 days) and age
 */
export function calculateHotScore(offer: OfferWithVotes): number {
    const now = Date.now();
    const fourteenDaysAgo = now - FOURTEEN_DAYS_MS;

    // Count recent votes (last 14 days)
    const recentUpvotes = offer.votes.filter(
        (v) => v.voteType === "up" && new Date(v.createdAt).getTime() >= fourteenDaysAgo
    ).length;

    const recentDownvotes = offer.votes.filter(
        (v) => v.voteType === "down" && new Date(v.createdAt).getTime() >= fourteenDaysAgo
    ).length;

    const score = recentUpvotes - recentDownvotes;

    // Age penalty: older content gets lower scores
    const ageInHours = (now - new Date(offer.createdAt).getTime()) / (1000 * 60 * 60);

    // Hot score formula (similar to Reddit)
    // The +2 prevents division by very small numbers for very new posts
    // The 1.5 exponent controls how quickly scores decay with age
    const hotScore = score / Math.pow(ageInHours + 2, 1.5);

    return hotScore;
}

/**
 * Sort offers by hot score (descending)
 * Most "hot" (recently upvoted) offers appear first
 */
export function sortByHotScore(offers: OfferWithVotes[]): OfferWithVotes[] {
    return offers.sort((a, b) => {
        const scoreA = calculateHotScore(a);
        const scoreB = calculateHotScore(b);
        return scoreB - scoreA; // Descending order
    });
}

/**
 * Get all-time upvote count from Vote records
 */
export function getAllTimeUpvotes(offer: OfferWithVotes): number {
    return offer.votes.filter((v) => v.voteType === "up").length;
}

/**
 * Get all-time downvote count from Vote records
 * (Hidden from UI but useful for admin/analytics)
 */
export function getAllTimeDownvotes(offer: OfferWithVotes): number {
    return offer.votes.filter((v) => v.voteType === "down").length;
}

/**
 * Generate a simple session ID
 * In production, use a more robust method (fingerprinting, cookies, etc.)
 */
export function generateSessionId(): string {
    if (typeof window !== "undefined" && window.localStorage) {
        let sessionId = localStorage.getItem("coupon_session_id");
        if (!sessionId) {
            sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem("coupon_session_id", sessionId);
        }
        return sessionId;
    }
    // Fallback for server-side
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
