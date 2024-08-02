"use client";

import { useQuery } from "@tanstack/react-query";
import { Lang } from "../../types";
import axios from "axios";
import React, { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import { flatComments } from "../../lib/utils";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";

const CommentSection = ({ offerId }: { offerId: any }) => {
  const [page, setPage] = useState(1);
  const [btnVisible, setBtnVisible] = useState(true);
  const [comments, setComments] = useState<any>([]);
  const lang = process.env.NEXT_PUBLIC_LG as Lang;
  const newParentComment = useSelector(
    (state: any) => state.comments.newParentComment,
  );
  const refresh = useSelector((state: any) => state.comments.refresh);

  const {
    data: currComments,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["comments", offerId, page],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/comment/getMany`,
        {
          params: {
            lang: lang,
            offer: offerId,
            onlyparents: "true",
            page: page,
            perpage: 10,
            orderby: "upvotes_desc",
          },
        },
      );

      return res.data;
    },
    //@ts-ignore
    keepPreviousData: true,
  });

  useEffect(() => {
    if (currComments) {
      setComments((prevComments: any) => {
        const mergedComments = [...prevComments, ...currComments].reduce(
          (acc, comment) => {
            if (!acc.some((c: any) => c.id === comment.id)) {
              acc.push(comment);
            }
            return acc;
          },
          [],
        );
        return mergedComments;
      });
    }

    if (currComments?.length < 10) {
      setBtnVisible(false);
    }
  }, [currComments, refresh]);

  return (
    <div className="p-3">
      <div>
        {newParentComment && (
          <CommentCard data={newParentComment} offerId={offerId} />
        )}
        {comments.map((comment: any) => {
          const childrens = flatComments(comment.children);
          return (
            <React.Fragment key={comment.id}>
              <CommentCard data={comment} offerId={offerId} />
              <div className="w-full">
                {childrens.map((child: any) => (
                  <CommentCard
                    key={child.id}
                    data={child}
                    isNested={true}
                    offerId={offerId}
                  />
                ))}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      <div className="w-full flex items-center justify-center">
        {btnVisible ?? (
          <Button
            onClick={() => {
              setPage((prevPage) => prevPage + 1);
              refetch();
            }}
            disabled={isFetching}
          >
            {isFetching ? "Loading..." : "Load More"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
