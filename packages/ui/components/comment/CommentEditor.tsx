"use client";
import React, { useState } from "react";
//@ts-ignore
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
//@ts-ignore
import { cn } from "../../lib/utils";

const CommentEditor = ({
  content,
  setContent,
  className,
}: {
  content: any;
  setContent: any;
  className?: string;
}) => {
  const [value, setValue] = useState("");
  const module = {
    toolbar: [
      [
        { header: [1, 2, 3, 4] },
        "bold",
        "italic",
        { list: "ordered" },
        { list: "bullet" },
        "link",
        "image",
        "clean",
      ],
    ],
  };

  return (
    <div className="w-full  flex-grow">
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        modules={module}
      />
      {/* <div className={cn("bg-muted/10", className)} />
      </ReactQuill> */}
    </div>
  );
};

export default CommentEditor;
