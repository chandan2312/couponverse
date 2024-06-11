"use client";

import { spawn } from "child_process";
import React from "react";
// import { RotatingLines } from "react-loader-spinner";

const CircularLoader = ({ size = 36, color = "grey" }) => {
  return (
    // <RotatingLines
    //   visible={true}
    //   height={size ? size : 36}
    //   width={size ? size : 36}
    //   color={color ? color : "grey"}
    //   strokeWidth="5"
    //   animationDuration="0.75"
    //   ariaLabel="rotating-lines-loading"
    //   wrapperStyle={{}}
    //   wrapperClass=""
    // />
    <span>loading</span>
  );
};

export default CircularLoader;
