"use client";
import { useMutation, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { cn } from "../../lib/utils";
import Login from "../global/Login";

const CouponVote = ({ coupon }: { coupon: any }) => {
  const queryClient = new QueryClient();
  const [upvotes, setUpvotes] = useState(coupon?.upvotesCount || 0);
  const [downvotes, setDownvotes] = useState(coupon?.downvotesCount || 0);
  const [hotness, setHotness] = useState(coupon?.hotness || 0);
  const [upvotesArr, setUpvotesArr] = useState(coupon?.upvotes || []);
  const [downvoteArr, setDownvotesArr] = useState(coupon?.downvotes || []);
  const currUser = useSelector((state: any) => state?.user?.user);

  const mutation = useMutation({
    mutationFn: async (voteData: {
      type: string;
      id: string;
      userId: string;
    }) => {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACK_URL}/coupon/updateVote?type=${voteData.type}&id=${voteData.id}&userId=${currUser.id}`,
      );
      return res.data;
    },
    onSuccess: (data: any) => {
      setUpvotes(data.upvotesCount);
      setDownvotes(data.downvotesCount);
      setHotness(data.hotness);
      setUpvotesArr(data?.upvotes || []);
      setDownvotesArr(data?.downvotes || []);
    },
    onError: (error: any, variables, context) => {
      console.error(error?.response?.status);
    },
  });

  const handleCouponVote = (vote: string) => {
    const userId = currUser?.id;
    if (!userId) return; // Do nothing if no user ID
    mutation.mutate({ type: vote, id: coupon.id, userId });
  };

  const renderVoteButton = (
    voteType: "up" | "down",
    count: number,
    icon: JSX.Element,
    voteArray: any[],
  ) => (
    <div
      onClick={currUser?.id ? () => handleCouponVote(voteType) : undefined}
      className={cn(
        "py-0.5 cursor-pointer text-xs shadow-md rounded-full border flex flex-col items-center",
        voteType === "up"
          ? "border-green/80 hover:bg-green-500/40 hover:text-white"
          : "border-green/50 hover:bg-red-500/40 hover:text-white",
        voteArray.some((vote: any) => vote.userId === currUser?.id) &&
          (voteType === "up"
            ? "bg-green-500/40 text-white"
            : "bg-red-500/40 text-white"),
      )}
    >
      {icon}
      {count && count}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {currUser?.id ? (
        renderVoteButton(
          "up",
          upvotes,
          <ArrowBigUp color="#23c963" />,
          upvotesArr,
        )
      ) : (
        <Login>
          {renderVoteButton(
            "up",
            upvotes,
            <ArrowBigUp color="#23c963" />,
            upvotesArr,
          )}
        </Login>
      )}
      <span className="block text-sm font-semibold ">{hotness && hotness}</span>
      {currUser?.id ? (
        renderVoteButton(
          "down",
          downvotes,
          <ArrowBigDown color="#d53d3d" />,
          downvoteArr,
        )
      ) : (
        <Login>
          {renderVoteButton(
            "down",
            downvotes,
            <ArrowBigDown color="#d53d3d" />,
            downvoteArr,
          )}
        </Login>
      )}
    </div>
  );
};

export default CouponVote;
