import React from "react";
import UserPage from "@repo/ui/pages/UserPage";

const UserPageApp = ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) => {
  const slug = params.slug;
  return (
    <div>
      <UserPage slug={slug} searchParams={searchParams} />
    </div>
  );
};

export default UserPageApp;
