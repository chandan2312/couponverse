import { redirect } from "next/navigation";
import React from "react";

const page = ({ params }: { params: any }) => {
  const slug = params.slug;

  redirect(`/coupons/${slug}`);
  return <div>page</div>;
};

export default page;
