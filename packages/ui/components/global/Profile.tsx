"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  setRegisterPopup,
  setUser,
  setSessionUser,
} from "../../store/slices/user.slice";
import { useCookies } from "next-client-cookies";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Login from "./Login";
import RegisterForm from "../form/RegisterForm";
import Popup from "../form/Popup";
import { AlertDialogTitle } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
//@ts-ignore
import { signOut } from "@repo/auth-config/client";
import { Lang } from "../../types";
// @ts-ignore
import { words } from "../../constants/words";
import Link from "next/link";

const Profile = () => {
  const lang: Lang = process.env.NEXT_PUBLIC_LG as Lang;
  const country = process.env.NEXT_PUBLIC_COUNTRYCODE;
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL;
  const cookies = useCookies();
  const accessToken = cookies.get("accessToken") || null;
  const dispatch = useDispatch();
  const currUser = useSelector((state: any) => state.user.user);
  const sessionUser = useSelector((state: any) => state.user.sessionUser);
  const registerPopup = useSelector((state: any) => state.user.registerPopup);

  // Access Token Query
  const tokenQuery = useQuery({
    queryKey: ["tokenQuery"],
    queryFn: async () => {
      if (!accessToken) {
        dispatch(setUser(null));
        return null;
      }
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/user/decodeToken?token=${accessToken}`,
      );
      return res.data;
    },

    enabled: !!accessToken,
  });

  // Session User Query
  const sessionQuery = useQuery({
    queryKey: [`session_${sessionUser?.email || ""}`],
    queryFn: async () => {
      if (!sessionUser) {
        dispatch(setSessionUser(null));
        return null;
      }
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/user/get?email=${sessionUser?.email}`,
      );
      return res.data;
    },
    enabled: !!sessionUser,
  });

  //token useeffect
  useEffect(() => {
    if (tokenQuery.data) {
      dispatch(setUser(tokenQuery.data));
      cookies.set("accessToken", tokenQuery.data.accessToken);
      dispatch(setSessionUser(null));
    }
  }, [tokenQuery.data]);

  //session useeffect

  useEffect(() => {
    if (sessionQuery.data) {
      dispatch(setUser(sessionQuery.data));
      cookies.set("accessToken", sessionQuery.data.accessToken);

      dispatch(setSessionUser(null));
    }
  }, [sessionQuery.data]);

  if (tokenQuery.isFetching) return <span>Loading...</span>;

  if (!tokenQuery.data && !currUser && !sessionUser) {
    return (
      <Login>
        <span>{words.Login[lang]}</span>
      </Login>
    );
  }

  if (!currUser && sessionUser) {
    dispatch(setRegisterPopup(true));
    return (
      <Popup
        header={
          <AlertDialogTitle className="font-semibold text-lg">
            Create Profile
          </AlertDialogTitle>
        }
      >
        <RegisterForm />
      </Popup>
    );
  }

  if (currUser) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={`${cdnUrl}${currUser.avatar}`}
              alt={`${currUser.username}`}
            />
            {/* <AvatarFallback>{currUser.fallbackAvatr}</AvatarFallback> */}
            {/* ---- //TODO:Create fallback avatar text */}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={`/user/${currUser.username}`}>Profile</Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem> */}
          <DropdownMenuItem onClick={() => signOut()}>
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return <div>nothing</div>;
};

export default Profile;
