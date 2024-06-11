"use server";

import React from "react";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <body className="bg-muted/20">
      <Navbar />
      <main className=" mx-auto px-auto  min-h-[80vh]">{children}</main>
      <Footer />
    </body>
  );
};

export default MainLayout;
