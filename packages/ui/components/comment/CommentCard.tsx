"use client";

import { use, useRef, useState } from "react";
import {
  ArrowBigDown,
  ArrowBigUp,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import { cn, timeAgo } from "../../lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Separator } from "../ui/separator";
import ReplyPopup from "./ReplyPopup";
import { useSelector } from "react-redux";
import Login from "../global/Login";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { set } from "react-hook-form";

const CommentCard = ({
  data,
  isNested = false,
  offerId,
}: {
  data: any;
  isNested?: boolean;
  offerId: string;
}) => {
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL as string;
  const commentRefs = useRef(new Map());
  const lang = process.env.NEXT_PUBLIC_LG;
  const country = process.env.NEXT_PUBLIC_COUNTRYCODE;
  const currUser = useSelector((state: any) => state.user.user);
  const [upvotesCount, setUpvotesCount] = useState(data._count.upvotedBy);
  const [downvotesCount, setDownvotesCount] = useState(data._count.downvotedBy);

  const scrollToComment = (id: string) => {
    const commentElement = commentRefs.current.get(id);
    if (commentElement) {
      commentElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const mutation = useMutation({
    mutationFn: (dt: any) => {
      return axios.put(
        `${process.env.NEXT_PUBLIC_BACK_URL}/comment/updateVote?id=${data.id}&userId=${currUser.id}&type=${dt.type}`,
      );
    },
    onSuccess: async (res: any) => {
      setUpvotesCount(res.data.upvotesCount);
      setDownvotesCount(res.data.downvotesCount);
      toast.success("Vote Updated ✅ ");
    },
    onError: (error) => {
      toast.error("Something went wrong ❌");
    },
  });

  const handleVote = async (commentId: string, type: string) => {
    mutation.mutate({ id: commentId, type });
  };

  return (
    <>
      <div
        ref={(el) => {
          if (el) commentRefs.current.set(data.id, el);
        }}
        id={`comment-${data.id}`}
        className={cn(
          "my-2",
          isNested &&
            "border-l-2 border-l-muted/40 pl-2 ml-5 bg-muted/15 py-1.5 rounded-lg ",
        )}
      >
        <div className={cn("w-full mb-2 flex items-center gap-2")}>
          <Link
            className="w-8 h-8 rounded-full border border-muted/50"
            href={`/user/${data?.user?.username}`}
          >
            <Image
              src={`${cdnUrl}${data?.user?.avatar}`}
              alt={data?.user?.username}
              width={30}
              height={30}
              className="rounded-full"
            />
          </Link>

          <div className="text-sm">
            <h3 className="">{data.user.username}</h3>
            <p className="text-xs">{`${data?.user?.firstname || ""} ${
              data?.user?.lastname || ""
            }`}</p>
          </div>

          {!isNested ? (
            <div className="flex-grow flex justify-end flex-end">
              <span className="text-xs text-end">
                {data.updatedAt
                  ? timeAgo(data.updatedAt)
                  : timeAgo(data.createdAt)}
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div id="comment-content" className="mb-1 ">
          {isNested ? (
            <p
              className="text-xs mb-2 overflow-hidden flex gap-1 items-center"
              onClick={() => scrollToComment(data.parent.id)}
            >
              <span>Replied to:</span>{" "}
              <span className="cursor-pointer bg-green-500/20 border rounded-full px-1.5 border-green-500/40 flex gap-1 items-center">
                {data?.parent?.user?.username}{" "}
                <ExternalLink size={12} color="#51e79c" />
              </span>
            </p>
          ) : (
            <></>
          )}

          <div
            className="max-md:text-sm"
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>
        </div>

        <div id="comment-actions" className="flex gap-2 text-xs md:text-[13px]">
          <span
            onClick={() => handleVote(data.id, "up")}
            className="flex gap-1 items-center cursor-pointer px-1 py-0.5  hover:bg-muted/40 active:bg-muted/40 hover:rounded-full  "
          >
            <ArrowBigUp color="#179866" size={18} />{" "}
            {upvotesCount ? upvotesCount : ""} Upvotes
          </span>
          <span
            onClick={() => handleVote(data.id, "down")}
            className="flex gap-1 items-center cursor-pointer px-1 py-0.5  hover:bg-muted/40 active:bg-muted/40 hover:rounded-full  "
          >
            <ArrowBigDown color="#dd2626" size={18} />{" "}
            {downvotesCount ? downvotesCount : ""} Downvotes
          </span>
          {currUser?.id ? (
            <ReplyPopup comment={data} offerId={offerId}>
              <span className="flex gap-1 items-center cursor-pointer px-1 py-0.5  hover:bg-muted/40 active:bg-muted/40 hover:rounded-full  ">
                <MessageSquare color="#3697cb" size={16} /> Reply
              </span>
            </ReplyPopup>
          ) : (
            <Login>
              <span className="flex gap-1 items-center cursor-pointer px-1 py-0.5  hover:bg-muted/40 active:bg-muted/40 hover:rounded-full  ">
                <MessageSquare color="#3697cb" size={16} /> Reply
              </span>
            </Login>
          )}
        </div>
      </div>

      {!isNested ? <Separator /> : <></>}
    </>
  );
};

export default CommentCard;
