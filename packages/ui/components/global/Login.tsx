"use client";

import { signIn } from "next-auth/react";
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

const Login = ({ lang }: { lang: string }) => {
  return (
    <>
      <Drawer>
        <DrawerTrigger className="text-center py-2">
          {words.Login[lang]}
        </DrawerTrigger>
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
