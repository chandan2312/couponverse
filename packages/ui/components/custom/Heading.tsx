import React from "react";

const Heading = ({ tag, text }) => {
  if (tag === "h1") {
    return (
      <h1 className="w-full font-semibold mb-2 py-1 text-3xl text-primary/80 px-2">
        <span className=" bg-primary/3 py-2 border-primary/80">{text}</span>
      </h1>
    );
  } else if (tag === "h2") {
    return (
      <h2 className="w-full font-semibold mb-2 py-1 text-2xl text-primary/80 px-2">
        <span className=" bg-primary/3 py-2 border-primary/80">{text}</span>
      </h2>
    );
  } else if (tag === "h3") {
    return (
      <h3 className="w-full font-semibold mb-2 py-1 text-xl text-primary/80 px-2">
        <span className=" bg-primary/3 py-2 border-primary/80">{text}</span>
      </h3>
    );
  } else if (tag === "h4") {
    return (
      <h4 className="w-full font-semibold mb-2 py-1 text-lg text-primary/80 px-2">
        <span className=" bg-primary/3 py-2 border-primary/80">{text}</span>
      </h4>
    );
  }
};

export default Heading;
