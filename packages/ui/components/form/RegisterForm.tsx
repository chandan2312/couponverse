"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Input } from "../ui/input";
import { startTransition, useState } from "react";
import { register } from "../../actions/auth";
import { setUser } from "../../store/slices/user.slice";
import { useDispatch, useSelector } from "react-redux";
import CircularLoader from "../other/CircularLoader";
import { useRouter } from "next/navigation";

type Props = {
  handleRegisterPopup?: any;
  user?: any;
  defaultName?: string;
  defaultUsername?: string;
  logoutButton?: React.ReactNode;
};

const RegisterForm = ({
  handleRegisterPopup,
  user,
  defaultName,
  defaultUsername,
  logoutButton,
}: Props) => {
  const [userData, setUserData] = useState<any>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: defaultUsername,
      fullName: defaultName,
      email: user.email,
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    const data = {
      username: values.username,
      fullName: values.fullName,
      email: user.email,
      avatar: user.image,
      fallbackAvatar: user.fallbackAvatar,
      loginMethod: "GOOGLE",
      isEmailVerified: true,
    };

    const registerUser = async () => {
      const res = await register(data);
      if (res.status == 200) {
        setUserData(res.data);
        dispatch(setUser(res.data));
        handleRegisterPopup(false);
        //refresh page
        router.refresh();
      }
    };

    startTransition(() => {
      registerUser();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
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
        <div className="flex items-center justify-between">
          <Button
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            variant="outline"
            type="submit"
          >
            {form.formState.isSubmitting ? <CircularLoader /> : "Register"}
          </Button>
          {!form.formState.isSubmitting && logoutButton}
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
