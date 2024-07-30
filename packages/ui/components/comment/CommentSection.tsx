"use client";

import { useQuery } from "@tanstack/react-query";
import { Lang } from "../../types";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Heading from "../custom/Heading";
import CommentCard from "./CommentCard";
import { Separator } from "../ui/separator";
import { flatComments } from "../../lib/utils";
import { useSelector } from "react-redux";

const CommentSection = ({ offerId }: { offerId: any }) => {
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState<any>([]);
  const lang = process.env.NEXT_PUBLIC_LG as Lang;
  const country = process.env.NEXT_PUBLIC_COUNTRYCODE as string;
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL as string;
  const newParentComment = useSelector(
    (state: any) => state.comments.newParentComment,
  );

  const {
    data: currComments,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["comments", offerId],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/comment/getMany`,
        {
          params: {
            lang: lang,
            offerId: offerId,
            onlyparents: "true",
            page: page,
            perpage: 5,
            orderby: "upvotes_desc",
          },
        },
      );

      return res.data;
    },

    //  enabled: false,
  });

  useEffect(() => {
    if (currComments) {
      setComments([...comments, ...currComments]);
    }
  }, [isFetching]);

  return (
    <div className="p-3">
      {/* <Heading tag="h2" text="Comments" /> */}

      <div>
        {newParentComment ? (
          <>
            <CommentCard data={newParentComment} offerId={offerId} />
          </>
        ) : (
          <></>
        )}
        {comments.map((comment: any, index: number) => {
          const childrens = flatComments(comment.children);
          return (
            <>
              <CommentCard key={index} data={comment} offerId={offerId} />

              <div className="w-full ">
                {
                  childrens.map((child: any, index: number) => {
                    return (
                      <CommentCard
                        key={index}
                        data={child}
                        isNested={true}
                        offerId={offerId}
                      />
                    );
                  })
                  // <CommentCard key={index} data={comment.children} />
                }
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default CommentSection;
