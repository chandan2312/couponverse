import dynamic from "next/dynamic";
import React from "react";

const OtherPages = ({ params }: { params: any }) => {
  const slug = params.slug;

  const Component = dynamic(
    () => import(`../../../../../packages/ui/other-pages/${slug}`),
  );

  return (
    <div className="card-section ">
      <Component />
    </div>
  );
};

export default OtherPages;
