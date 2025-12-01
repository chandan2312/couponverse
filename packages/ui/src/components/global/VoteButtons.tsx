"use client";

import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown, AlertTriangle } from "lucide-react";
import { voteOffer } from "../../actions/vote";
import { generateSessionId } from "../../utils/ranking";

interface VoteButtonsProps {
    offerId: string;
    initialUpvotes: number;
    lang: "en" | "ru";
}

const VOTE_COOLDOWN_MS = 3000; // 3 seconds cooldown between votes
const RATE_LIMIT_WINDOW = 30000; // 30 seconds
const MAX_VOTES_IN_WINDOW = 5; // Max 5 votes in 30 seconds
const BAN_DURATION = 3600000; // 1 hour ban

export function VoteButtons({ offerId, initialUpvotes, lang }: VoteButtonsProps) {
    const [upvotes, setUpvotes] = useState(initialUpvotes);
    const [userVote, setUserVote] = useState<"up" | "down" | null>(null);
    const [isVoting, setIsVoting] = useState(false);
    const [cooldownRemaining, setCooldownRemaining] = useState(0);
    const [isBanned, setIsBanned] = useState(false);
    const [banTimeRemaining, setBanTimeRemaining] = useState(0);

    // Load user's previous vote and check ban status
    useEffect(() => {
        const sessionId = generateSessionId();
        const voteKey = `vote_${offerId}_${sessionId}`;
        const savedVote = localStorage.getItem(voteKey);
        if (savedVote === "up" || savedVote === "down") {
            setUserVote(savedVote);
        }

        // Check if user is banned
        const banKey = `vote_ban_${sessionId}`;
        const banUntil = localStorage.getItem(banKey);
        if (banUntil) {
            const banTime = parseInt(banUntil);
            const timeRemaining = banTime - Date.now();
            if (timeRemaining > 0) {
                setIsBanned(true);
                setBanTimeRemaining(timeRemaining);
            } else {
                // Ban expired, clean up
                localStorage.removeItem(banKey);
            }
        }

        // Check if user is on cooldown
        const lastVoteKey = `last_vote_time_${sessionId}`;
        const lastVoteTime = localStorage.getItem(lastVoteKey);
        if (lastVoteTime) {
            const timeSinceLastVote = Date.now() - parseInt(lastVoteTime);
            if (timeSinceLastVote < VOTE_COOLDOWN_MS) {
                const remaining = VOTE_COOLDOWN_MS - timeSinceLastVote;
                setCooldownRemaining(remaining);
            }
        }
    }, [offerId]);

    // Countdown timers
    useEffect(() => {
        if (cooldownRemaining > 0) {
            const timer = setTimeout(() => {
                setCooldownRemaining(Math.max(0, cooldownRemaining - 100));
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [cooldownRemaining]);

    useEffect(() => {
        if (banTimeRemaining > 0) {
            const timer = setTimeout(() => {
                const remaining = Math.max(0, banTimeRemaining - 1000);
                setBanTimeRemaining(remaining);
                if (remaining === 0) {
                    setIsBanned(false);
                }
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [banTimeRemaining]);

    const checkRateLimit = (): boolean => {
        const sessionId = generateSessionId();
        const historyKey = `vote_history_${sessionId}`;
        const historyJson = localStorage.getItem(historyKey);
        const history: number[] = historyJson ? JSON.parse(historyJson) : [];

        // Filter to only include votes in the last 30 seconds
        const now = Date.now();
        const recentVotes = history.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);

        // If already at limit, ban the user
        if (recentVotes.length >= MAX_VOTES_IN_WINDOW) {
            const banKey = `vote_ban_${sessionId}`;
            const banUntil = now + BAN_DURATION;
            localStorage.setItem(banKey, banUntil.toString());
            setIsBanned(true);
            setBanTimeRemaining(BAN_DURATION);

            // Clear vote history since they're now banned
            localStorage.removeItem(historyKey);

            return false; // Blocked
        }

        // Add current timestamp to history
        recentVotes.push(now);
        localStorage.setItem(historyKey, JSON.stringify(recentVotes));

        return true; // Allowed
    };

    const handleVote = async (type: "up" | "down") => {
        if (isVoting || cooldownRemaining > 0 || isBanned) return;

        // Check rate limit
        if (!checkRateLimit()) {
            return; // User is now banned
        }

        setIsVoting(true);
        const sessionId = generateSessionId();
        const voteKey = `vote_${offerId}_${sessionId}`;
        const lastVoteKey = `last_vote_time_${sessionId}`;

        try {
            // Optimistic update
            const previousVote = userVote;
            const newVote = userVote === type ? null : type;

            // Update UI immediately
            if (previousVote === "up" && newVote === null) {
                setUpvotes(upvotes - 1);
            } else if (previousVote === null && newVote === "up") {
                setUpvotes(upvotes + 1);
            } else if (previousVote === "down" && newVote === "up") {
                setUpvotes(upvotes + 1);
            } else if (previousVote === "up" && newVote === "down") {
                setUpvotes(upvotes - 1);
            }

            setUserVote(newVote);

            // Save to localStorage
            if (newVote) {
                localStorage.setItem(voteKey, newVote);
            } else {
                localStorage.removeItem(voteKey);
            }

            // Set cooldown
            localStorage.setItem(lastVoteKey, Date.now().toString());
            setCooldownRemaining(VOTE_COOLDOWN_MS);

            // Send to server
            const result = await voteOffer(offerId, type, sessionId);

            if (result.success && result.upvotes !== undefined) {
                // Update with server response
                setUpvotes(result.upvotes);
            }
        } catch (error) {
            console.error("Failed to vote:", error);
            // Revert on error
            setUserVote(userVote);
            setUpvotes(initialUpvotes);
        } finally {
            setIsVoting(false);
        }
    };

    const isDisabled = isVoting || cooldownRemaining > 0 || isBanned;
    const cooldownSeconds = Math.ceil(cooldownRemaining / 1000);
    const banMinutesRemaining = Math.ceil(banTimeRemaining / 60000);

    if (isBanned) {
        return (
            <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-md bg-red-50 dark:bg-red-900/20 px-3 py-2 text-xs font-medium text-red-700 dark:text-red-300">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>
                        {lang === "en"
                            ? `Too many votes. Wait ${banMinutesRemaining}m`
                            : `Слишком много голосов. Подождите ${banMinutesRemaining}м`
                        }
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => handleVote("up")}
                disabled={isDisabled}
                className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors ${userVote === "up"
                        ? "bg-primary/20 text-primary"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    } ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                title={
                    cooldownRemaining > 0
                        ? `${lang === "en" ? "Wait" : "Подождите"} ${cooldownSeconds}s`
                        : lang === "en"
                            ? "Upvote"
                            : "Проголосовать за"
                }
            >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{upvotes}</span>
            </button>
            <button
                onClick={() => handleVote("down")}
                disabled={isDisabled}
                className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors ${userVote === "down"
                        ? "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    } ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                title={
                    cooldownRemaining > 0
                        ? `${lang === "en" ? "Wait" : "Подождите"} ${cooldownSeconds}s`
                        : lang === "en"
                            ? "Downvote"
                            : "Проголосовать против"
                }
            >
                <ThumbsDown className="w-3.5 h-3.5" />
            </button>
            {cooldownRemaining > 0 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                    {cooldownSeconds}s
                </span>
            )}
        </div>
    );
}
