"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { registerSchema } from "../../constants/schema";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Input } from "../ui/input";
import { register } from "../../actions/auth2";
import { useDispatch, useSelector } from "react-redux";
import {
  setSessionUser,
  setSessionMethod,
  setRegisterPopup,
  setUser,
} from "../../store/slices/user.slice";
import { setPopup } from "../../store/slices/form.slice";
import { signOut } from "@repo/auth-config/client";

import CircularLoader from "../other/CircularLoader";
import { defaultAvatars } from "../../constants";
import Popup from "./Popup";
import Image from "next/image";
import axios from "axios";
import { useCookies } from "next-client-cookies";

import { AlertDialogCancel } from "../ui/alert-dialog";
import { QueryClient, useMutation } from "@tanstack/react-query";

const RegisterForm = () => {
  const cookies = useCookies();
  const dispatch = useDispatch();
  const popupState = useSelector((state: any) => state.form.popup);
  const sessionUser = useSelector((state: any) => state.user.sessionUser);
  const sessionMethod = useSelector((state: any) => state.user.sessionMethod);
  const queryClient = new QueryClient();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      // remove any black space, symbols from the username
      username: sessionUser?.name
        ?.replace(/[^a-zA-Z0-9_ ]/g, "")
        ?.replace(/ /g, "_")
        ?.toLowerCase()
        .slice(0, 20),
      email: sessionUser?.email,
      firstname: sessionUser?.name.slice(0, sessionUser?.name.indexOf(" ")),
      lastname: sessionUser?.name.slice(sessionUser?.name.indexOf(" ") + 1),
      // avatar: sessionUser?.avatar,
      gender: "M",
      country: "IN",
      role: "USER",
      isEmailVerified: sessionMethod ? sessionMethod !== "EMAIL" : false,
      loginMethod: sessionMethod,
    },
  });

  console.log("img", form.watch("avatar"));

  const mutation = useMutation({
    mutationFn: (values: any) => {
      return axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/user/post`, {
        user: values,
      });
    },
    onSuccess: async (res) => {
      dispatch(setUser(res.data));
      dispatch(setRegisterPopup(false));
      dispatch(setSessionUser(null));
      cookies.set("accessToken", res.data.accessToken);
      queryClient.invalidateQueries({ queryKey: ["tokenQuery"] });
    },
    onError: (error) => {
      console.log("axios- post error", error.message);
      //TODO: show toast
      dispatch(setSessionUser(null));
      dispatch(setRegisterPopup(false));
      cookies.remove("accessToken");
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    console.log("onsubmit");
    console.log("back url", process.env.NEXT_PUBLIC_BACK_URL);
    mutation.mutate(values);
  }

  return (
    <>
      <Form {...form}>
        <form className="bg-card/70" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-3 items-center">
            <figure>
              <Image
                src={`https://cdn.kuponly.ru${form.watch("avatar") || "/avatars/avatar_1_m.jpg"}`}
                width={80}
                height={80}
                className="rounded-full selected avatar"
                alt="avatar"
              />
            </figure>

            <div className="cursor-pointer">
              <Popup
                defaultOpen={false}
                trigger={
                  <Button variant={"accent"} className="px-4 min-w-30">
                    Select
                  </Button>
                }
                header={
                  <h2 className="font-semibold text-lg">
                    Choose Your Best Avatar
                  </h2>
                }
              >
                <div className="w-full grid grid-cols-4">
                  {defaultAvatars.map((avatar: string, index: number) => (
                    <AlertDialogCancel
                      key={index}
                      onClick={() => {
                        form.setValue("avatar", avatar);
                      }}
                      className="w-auto h-auto "
                    >
                      <Image
                        src={`https://cdn.kuponly.ru${avatar}`}
                        width={120}
                        height={120}
                        alt="avatar"
                        className="   rounded-full"
                      />
                    </AlertDialogCancel>
                  ))}
                </div>
              </Popup>
            </div>
          </div>

          {/*//TODO: Show image select alert */}

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="text-muted-foreground border-muted-foreground"
                    readOnly
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* //------------------- First & last name ------------------- */}

          <div className="flex md:justify-between gap-2 max-md:flex-col">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* //------------------- Gender & Age ------------------- */}

          <div className="flex justify-between gap-2 ">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full bg-muted/20">
                        <SelectValue placeholder="Male" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M">Male</SelectItem>
                        <SelectItem value="F">Female</SelectItem>
                        <SelectItem value="O">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Age (years)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter your age"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* //------------------- Country ------------------- */}

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Your Country</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-full bg-muted/20">
                      <SelectValue placeholder="country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="RU">Russia</SelectItem>
                      <SelectItem value="IN">India</SelectItem>
                      <SelectItem value="JP">Japan</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* //------------------- Submit ------------------- */}

          <div className="w-full flex  gap-4 items-center space-y-4 justify-between">
            <Button
              // disabled={!form.formState.isValid || form.formState.isSubmitting}
              variant="accent"
              type="submit"
              className="mt-4 w-full "
            >
              {form.formState.isSubmitting ? <CircularLoader /> : "Register"}
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                console.log("clearing session");
                signOut();
                dispatch(setSessionUser(null));
                dispatch(setSessionMethod(null));
                dispatch(setPopup(false));
                dispatch(setRegisterPopup(false));

                console.log("clearing done");
              }}
              variant="accent2"
              type="submit"
              className="mt-4 w-1/6"
            >
              Clear
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
