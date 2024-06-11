"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Login from "./Login";

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
import CircularLoader from "../other/CircularLoader";
import axios from "axios";
import StoreWrapper from "../../lib/StoreWrapper";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/user.slice";

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
import { startTransition, useEffect, useState, useTransition } from "react";
import RegisterForm from "../form/RegisterForm";
import { checkAlreadyRegistered, decodeAccessToken } from "../../actions/auth";

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
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      if (data?.user) {
        const isRegistered = await checkAlreadyRegistered(data.user.email);
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
  }, [data, dispatch]);

  function handleRegisterPopup(bool) {
    setRegisterPopup(bool);
  }

  // if (status === "loading") return <CircularLoader size={36} color="grey" />;
  if (status === "loading") return <span>.....</span>;
  if (!data && status != "loading") return <Login lang={lang || "en"} />;
  if (status === "authenticated" && data) {
  }

  if (registerPopup === true) {
    const defaultUsername =
      data?.user?.name ||
      ""
        .toLowerCase()
        .replace(/\s/g, "_")
        .replace(/^[0-9]+/, "")
        .replace(/[^a-z0-9_]/g, "")
        .slice(0, 20)
        .trim();

    const defaultName =
      data?.user?.name ||
      ""
        .replace(/^[0-9]+/, "")
        .replace(/[^a-zA-Z0-9_ ]/g, "")
        .slice(0, 20)
        .trim();
    const fallbackAvatar =
      (data?.user?.name || "")
        ?.trim()
        ?.split(" ")
        ?.map((n) => n[0])
        ?.join("")
        ?.toUpperCase() ||
      `${data?.user?.trim()?.replace(" ", "")?.email[0]?.toUpperCase()}${data?.user
        ?.trim()
        ?.replace(" ", "")
        ?.email[1].toUpperCase()}`;

    return (
      <AlertDialog defaultOpen>
        <AlertDialogTrigger>
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={data.user.image || ""}
              alt={data.user.name + " photo"}
            />
            <AvatarFallback>{fallbackAvatar}</AvatarFallback>
          </Avatar>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-3 py-2">
              <div>
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={data?.user?.image || ""}
                    alt={data?.user?.name + " photo"}
                  />
                  <AvatarFallback>{fallbackAvatar}</AvatarFallback>
                </Avatar>
              </div>
              <h2 className="font-semibold text-lg">Create Profile</h2>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your profile only be create when you fill this form
            </AlertDialogDescription>
          </AlertDialogHeader>

          <RegisterForm
            handleRegisterPopup={handleRegisterPopup}
            user={data?.user}
            email={data?.user?.email || ""}
            defaultUsername={defaultUsername}
            defaultName={defaultName}
            logoutButton={
              <Button onClick={signOut} variant="danger">
                Logout{" "}
              </Button>
            }
          />
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  if (registerPopup === false && data?.user) {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={data.user.image}
                alt={`${currUser ? currUser.fullName : data?.user?.name}`}
              />
              <AvatarFallback>{}</AvatarFallback>
            </Avatar>
            {/* <Image src={data.user.image} height={} alt={data.user.name + " photo"} /> */}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>

            <DropdownMenuItem onClick={signOut}>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
      // <div>
      // 	<Image src={data.user.image} alt={data.user.name + " photo"} />
      // 	<button onClick={signOut}>sign out</button>
      // </div>
    );
  }
}
