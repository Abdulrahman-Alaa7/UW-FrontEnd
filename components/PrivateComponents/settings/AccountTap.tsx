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
import { Label } from "../../ui/label";
import { Separator } from "../../ui/separator";

type Props = {};

const AccountTap = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const accountSchema = z.object({
    email: z
      .string()
      .min(1, {
        message: "Email is required",
      })
      .email({
        message: "Not valid email",
      }),
  });
  type accountValue = z.infer<typeof accountSchema>;

  // This can come from your database or API.
  const defaultValues: Partial<accountValue> = {
    email: user?.email,
  };

  const form = useForm<accountValue>({
    resolver: zodResolver(accountSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<accountValue> = async (data) => {};

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
            <Separator />
            <div className="flex flex-col gap-3">
              <CardTitle className="flex justify-center items-center mb-3">
                Update your password
              </CardTitle>
              <div className="flex flex-col gap-2">
                <Label htmlFor="current">Current password</Label>
                <Input
                  id="current"
                  type="password"
                  placeholder="Current password"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" placeholder="New password" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="confrim">Confirm New password</Label>
                <Input
                  id="confrim"
                  type="password"
                  placeholder="Confirm New Password"
                />
              </div>
            </div>
            <Button
              type="submit"
              className={`flex justify-center items-center mx-auto`}
            >
              Update Password
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AccountTap;
