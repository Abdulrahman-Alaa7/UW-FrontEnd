"use client";
import React, { FC, useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import useUser from "../../../hooks/useUser";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useMutation } from "@apollo/client";
import { UPDATE_PASSWORD } from "../../../graphql/actions/updatePassword";
import { toast } from "sonner";
import MainLoading from "@/components/ui/main-loading";

type Props = {};

const AccountTap = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { user, loading: userLoading } = useUser();
  const [updatePassword, { loading }] = useMutation(UPDATE_PASSWORD);

  const accountSchema = z
    .object({
      currentPassword: z
        .string()
        .min(8, {
          message: `Password must be at least 8 characters`,
        })
        .max(35, {
          message: `The password must not exceed 35 letter`,
        }),
      newPassword: z
        .string()
        .min(8, {
          message: `Password must be at least 8 characters`,
        })
        .max(35, {
          message: `The password must not exceed 35 letter`,
        }),
      confirmPassword: z.string(),
    })
    .refine(
      (values) => {
        return values.newPassword === values.confirmPassword;
      },
      {
        message: `Password must be match`,
        path: ["confirmPassword"],
      }
    );
  type accountValue = z.infer<typeof accountSchema>;

  // This can come from your database or API.
  const defaultValues: Partial<accountValue> = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const form = useForm<accountValue>({
    resolver: zodResolver(accountSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<accountValue> = async (data) => {
    try {
      const updatePasswordData = {
        currentPassword: data.currentPassword,
        newPassword: data.confirmPassword,
      };

      await updatePassword({
        variables: updatePasswordData,
      });
      form.reset(defaultValues);
      toast.success("Password updated successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Card className="fadeRight">
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Update your account settings.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <Label>Email</Label>
        <Input placeholder="abdulrahman@UW.com" readOnly value={user?.email} />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Separator />
            <div className="flex flex-col gap-3">
              <CardTitle className="flex justify-center items-center mb-3">
                Update your password
              </CardTitle>
              <div className="relative flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={!showPassword ? "password" : "text"}
                            placeholder="Current password"
                            {...field}
                            disabled={loading}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            className="absolute top-1/2 transform -translate-y-1/2 right-2 z-1 !p-1 rounded-full"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <AiOutlineEye
                                size={25}
                                className="text-black dark:text-white"
                              />
                            ) : (
                              <AiOutlineEyeInvisible
                                size={25}
                                className="text-black dark:text-white"
                              />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="relative flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={!showNewPassword ? "password" : "text"}
                            placeholder="New password"
                            disabled={loading}
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            className="absolute top-1/2 transform -translate-y-1/2 right-2 z-1 !p-1 rounded-full"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? (
                              <AiOutlineEye
                                size={25}
                                className="text-black dark:text-white"
                              />
                            ) : (
                              <AiOutlineEyeInvisible
                                size={25}
                                className="text-black dark:text-white"
                              />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="relative flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={!showConfirmPassword ? "password" : "text"}
                            placeholder="New password"
                            disabled={loading}
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            className="absolute top-1/2 transform -translate-y-1/2 right-2 z-1 !p-1 rounded-full"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <AiOutlineEye
                                size={25}
                                className="text-black dark:text-white"
                              />
                            ) : (
                              <AiOutlineEyeInvisible
                                size={25}
                                className="text-black dark:text-white"
                              />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button
              type="submit"
              className={`flex justify-center items-center mx-auto`}
              disabled={loading}
            >
              {loading ? <MainLoading /> : "Update Password"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AccountTap;
