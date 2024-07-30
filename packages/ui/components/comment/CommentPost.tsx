"use client";

import React from "react";
import CommentEditor from "./CommentEditor";
import { Button } from "../ui/button";
import { useState } from "react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Lang } from "../../types";
import { set } from "react-hook-form";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import Login from "../global/Login";
import { setParentComment } from "../../store/slices/comment.slice";

const CommentPost = ({ offer }: { offer: any }) => {
  const lang = process.env.NEXT_PUBLIC_LG as Lang;
  const country = process.env.NEXT_PUBLIC_COUNTRYCODE as string;
  const [content, setContent] = useState("");
  const queryClient = new QueryClient();
  const dispatch = useDispatch();
  const currUser = useSelector((state: any) => state.user.user);

  const mutation = useMutation({
    mutationFn: () => {
      return axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/comment/post`, {
        content: content,
        type: "OFFER",
        offer: offer.id,
        user: currUser?.id, //TODO:
        lang: lang,
      });
    },
    onSuccess: async (res) => {
      console.log(res.data);
      queryClient.invalidateQueries({ queryKey: ["comments", offer.id] });
      setContent("");
      dispatch(setParentComment(res.data));
      toast.success("Comment posted successfully");
      //toast
    },
    onError: (error) => {
      console.log("axios- post comment error", error.message);
      //TODO: show toast
      // dispatch(setSessionUser(null));
      // dispatch(setRegisterPopup(false));
      // cookies.remove("accessToken");
    },
  });

  const handleSubmit = () => {
    mutation.mutate();
  };

  return (
    <div className="w-full add-comment p-4 flex flex-col gap-4 items-center">
      <CommentEditor
        content={content}
        setContent={setContent}
        className="min-h-20"
      />
      {currUser?.id ? (
        <Button
          variant="accent"
          disabled={mutation.isPending}
          onClick={() => handleSubmit()}
        >
          Comment
        </Button>
      ) : (
        <>
          <Login>
            <Button variant="accent" className="w-full ">
              Login to comment
            </Button>
          </Login>
        </>
      )}
    </div>
  );
};

export default CommentPost;
