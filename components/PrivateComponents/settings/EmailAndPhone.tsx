"use client";
import React, { FC, useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "../../ui/card";

type Props = {};

const EmailAndPhone = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const EmailAndPhoneSchema = z.object({
    email: z
      .string()
      .min(1, {
        message: "Email is required",
      })
      .email({
        message: "Not valid email",
      }),
  });
  type EmailAndPhone = z.infer<typeof EmailAndPhoneSchema>;

  // This can come from your database or API.
  const defaultValues: Partial<EmailAndPhone> = {
    email: user?.email,
  };

  const form = useForm<EmailAndPhone>({
    resolver: zodResolver(EmailAndPhoneSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<EmailAndPhone> = async (data) => {
    await console.log(data);
  };

  return (
    <Card className="fadeRight">
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Update your account settings.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="abdulrahman@UW.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className={`flex justify-center items-center mx-auto`}
            >
              Update Account
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EmailAndPhone;
