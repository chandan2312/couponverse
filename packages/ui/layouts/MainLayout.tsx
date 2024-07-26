import React from "react";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import NextTopLoader from "nextjs-toploader";
import localFont from "next/font/local";
import StoreWrapper from "../lib/wrapper/StoreWrapper";
import QueryWrapper from "../lib/wrapper/QueryWrapper";
import { CookiesProvider } from "next-client-cookies/server";
import { SessionProvider } from "@repo/auth-config/client";

const font = localFont({
  src: [
    {
      path: "../fonts/kanit-regular.ttf",
      weight: "300",
      style: "normal",
    },

    {
      path: "../fonts/kanit-light.ttf",
      weight: "300",
      style: "normal",
    },
  ],
  display: "swap",
});

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <CookiesProvider>
        <QueryWrapper>
          <StoreWrapper>
            <NextTopLoader
              color="#e4285b"
              initialPosition={0.8}
              crawlSpeed={200}
              height={4}
              crawl={true}
              showSpinner={true}
              easing="ease"
              speed={600}
              shadow="0 0 10px #cb1e4a,0 0 5px #ad2d55"
              template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
              zIndex={1600}
              showAtBottom={false}
            />
            <Navbar />
            <main
              className={`${font} bg-muted/10 mx-auto py-6 px-auto  min-h-[80vh]`}
            >
              {children}
            </main>
            <Footer />
          </StoreWrapper>
        </QueryWrapper>
      </CookiesProvider>
    </SessionProvider>
  );
};

export default MainLayout;
