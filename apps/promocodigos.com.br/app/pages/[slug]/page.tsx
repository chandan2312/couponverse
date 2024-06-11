import dynamic from "next/dynamic";
import React from "react";

const PagesPage = ({ params }: { params: any }) => {
  const slug = params.slug;

  const Component = dynamic(
    () => import(`../../../../../packages/ui/seoPages/${slug}`),
  );

  return (
    <div className="card-section ">
      <Component />
    </div>
  );
};

export default PagesPage;
