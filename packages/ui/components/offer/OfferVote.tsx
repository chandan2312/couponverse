"use client";
import { useMutation, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "../../lib/utils";
import IconButton from "../custom/IconButton";
import Login from "../global/Login";

const OfferVote = ({ offer }: { offer: any }) => {
  const queryClient = new QueryClient();
  const [upvotes, setUpvotes] = useState(offer.upvotes || 0);
  const [downvotes, setDownvotes] = useState(offer.downvotes || 0);
  const [hotness, setHotness] = useState(offer.hotness || 0);
  const [upvotesArr, setUpvotesArr] = useState(offer.upvotesArray || []);
  const [downvoteArr, setDownvotesArr] = useState(offer.downvotesArray || []);
  const currUser = useSelector((state: any) => state.user.user);

  const mutation = useMutation({
    mutationFn: async (voteData: {
      type: string;
      id: string;
      userId: string;
    }) => {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACK_URL}/offer/updateVote?type=${voteData.type}&id=${voteData.id}&userId=${currUser.id}`,
      );
      return res.data;
    },
    onSuccess: (data: any) => {
      setUpvotes(data.upvotes);
      setDownvotes(data.downvotes);
      setHotness(data.hotness);
      setUpvotesArr(data?.upvotesArr || []);
      setDownvotesArr(data?.downvotesArr || []);
    },
    onError: (error: any, variables, context) => {
      console.error(error?.response?.status);
    },
  });

  const handleVote = (vote: string) => {
    const userId = currUser?.id;
    if (!userId) return; // Do nothing if no user ID
    mutation.mutate({ type: vote, id: offer.id, userId });
  };

  const renderIconButton = (voteType: "up" | "down") => (
    <IconButton
      className={cn(
        "w-6 h-6 border-2",
        voteType === "up"
          ? "text-accent border-accent hover:text-accent-foreground hover:bg-accent active:text-accent-foreground active:bg-accent"
          : "text-accent2 border-accent2 hover:text-accent2-foreground hover:bg-accent2 active:text-accent2-foreground active:bg-accent2",
        voteType === "up"
          ? upvotesArr.some((upvote: any) => upvote.userId === currUser.id) &&
              "bg-green-500/40 text-white"
          : downvoteArr.some(
              (downvote: any) => downvote.userId === currUser?.id,
            ) && "bg-red-500/40 text-white",
      )}
      onClick={() => handleVote(voteType)}
      disabled={!currUser?.id} // Disable onClick when currUser.id is not present
    >
      {voteType === "up" ? <Plus size={16} /> : <Minus size={16} />}
    </IconButton>
  );

  return (
    <div className="flex items-center justify-between gap-2 rounded-2xl cursor-pointer font-semibold">
      {currUser?.id ? (
        renderIconButton("up")
      ) : (
        <Login>{renderIconButton("up")}</Login>
      )}
      <span className="block">{`${hotness || 0}°`}</span>
      {currUser?.id ? (
        renderIconButton("down")
      ) : (
        <Login>{renderIconButton("down")}</Login>
      )}
    </div>
  );
};

export default OfferVote;
