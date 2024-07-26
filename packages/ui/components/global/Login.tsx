"use client";

import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { words } from "../../constants/words";
import { Lang } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import {
  setSessionUser,
  setSessionMethod,
  setRegisterPopup,
  setUser,
} from "../../store/slices/user.slice";

import { signIn, useSession } from "@repo/auth-config/client";
import useFetchData from "../../lib/hooks/useQuery";
import { useEffect } from "react";
import { setPopup } from "../../store/slices/form.slice";

const Login = ({ children }: { children: any }) => {
  const country = process.env.NEXT_PUBLIC_COUNTRYCODE || "global";
  const lang: Lang = (process.env.NEXT_PUBLIC_LG as Lang) || "en";
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  if (session) {
    if (session?.user) {
      dispatch(setSessionUser(session.user));
      if (session.user.image && session.user.image.includes("google")) {
        dispatch(setSessionMethod("GOOGLE"));
      } else {
        dispatch(setSessionMethod("EMAIL"));
      }
    }
  }

  return (
    <>
      <Drawer>
        <DrawerTrigger className="text-center py-2">{children}</DrawerTrigger>
        <DrawerContent className="mx-auto max-w-5xl">
          <DrawerHeader>
            <DrawerTitle>{`${words.Login[lang]} ${words.or[lang]} ${words.Signup[lang]}`}</DrawerTitle>
          </DrawerHeader>

          <div className="flex items-center flex-col justify-center">
            <Button
              onClick={() => signIn("google")}
              className="bg-red-400 border-red-500 max-w-48 text-white hover:bg-red-400/80"
            >
              Login With Google
            </Button>
          </div>

          <DrawerFooter>
            <DrawerClose>
              <Button>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Login;
