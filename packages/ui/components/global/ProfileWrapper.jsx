"use client";

import { useDispatch } from "react-redux";
import StoreWrapper from "../../lib/StoreWrapper";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { setUser } from "../../store/slices/user.slice";
import { decodeAccessToken, checkAlreadyRegistered } from "../../actions/auth2";
import Login from "./Login";
import { Status } from "../../types";

//JSX imports
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import RegisterForm from "../form/RegisterForm";

export default function ProfileWrapper({ lang }) {
  return (
    <StoreWrapper>
      <Profile lang={lang} />
    </StoreWrapper>
  );
}

export function Profile({ lang }) {
  const dispatch = useDispatch();
  const [currUser, setCurrUser] = useState(null);
  const [registerPopup, setRegisterPopup] = useState(false);
  const { data, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const res = await decodeAccessToken();
      const user = res?.data;
      if (user) {
        setCurrUser(user);
        dispatch(setUser(user));
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (data?.user) {
        const isRegistered = await checkAlreadyRegistered(data?.user?.email);
        if (isRegistered.registered === false) {
          setRegisterPopup(true);
        }
        if (isRegistered.registered === true) {
          setRegisterPopup(false);
          setCurrUser(isRegistered.data);
          dispatch(setUser(isRegistered.data));
        }
      }
    };
    fetchData();
  }, [data]);

  function handleRegisterPopup(bool) {
    setRegisterPopup(bool);
  }

  // if (status === "loading") return <CircularLoader size={36} color="grey" />;
  if (status === "loading") return <span>.....</span>;
  if (!data && status !== "loading") return <Login lang={lang || "en"} />;
  if (status === "authenticated" && data) {
    //TODO:add logic
  }

  return <></>;
}
