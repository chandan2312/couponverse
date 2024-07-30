"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { Button } from "../ui/button";
import CommentEditor from "./CommentEditor";
import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setNestedComment } from "../../store/slices/comment.slice";
import { toast } from "sonner";

const ReplyPopup = ({
  children,
  comment,
  offerId,
}: {
  children: any;
  comment: any;
  offerId: string;
}) => {
  const lang = process.env.NEXT_PUBLIC_LG;
  const country = process.env.NEXT_PUBLIC_COUNTRYCODE;
  const [content, setContent] = useState("");
  const queryClient = new QueryClient();
  const dispatch = useDispatch();
  const currUser = useSelector((state: any) => state.user.user);

  const mutation = useMutation({
    mutationFn: () => {
      return axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/comment/post`, {
        content: content,
        type: "OFFER",
        offer: offerId,
        user: currUser.id, //TODO:
        lang: lang,
        parent: comment.id,
      });
    },
    onSuccess: async (res: any) => {
      console.log(res.data);
      queryClient.invalidateQueries({ queryKey: ["comments", offerId] });
      setContent("");
      dispatch(setNestedComment(res.data));
      toast.success("Comment Replied ");
    },
    onError: (error) => {
      console.log("axios- post comment error", error.message);
      //TODO: show toast
      // dispatch(setSessionUser(null));
      // dispatch(setRegisterPopup(false));
      // cookies.remove("accessToken");
    },
  });
  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left space-y-2">
          <h3 className="font-semibold text-lg">Replying to Comment</h3>
          <div className="w-full max-h-60 overflow-hidden bg-muted/15 p-2 border-l-2 border-l-muted/80">
            <div dangerouslySetInnerHTML={{ __html: comment?.content }}></div>
          </div>
          <p className="text-xs">
            by <span className="font-semibold">{comment?.user?.username}</span>
          </p>
        </DrawerHeader>

        <div className="p-2 py-4">
          <CommentEditor
            content={content}
            setContent={setContent}
            className="min-h-60 shadow-md rounded-b-md"
          />
        </div>
        <DrawerFooter>
          <Button
            disabled={mutation.isPending}
            onClick={() => mutation.mutate()}
            variant="accent"
          >
            Submit
          </Button>
          <DrawerClose>
            <Button variant="accent2">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ReplyPopup;
