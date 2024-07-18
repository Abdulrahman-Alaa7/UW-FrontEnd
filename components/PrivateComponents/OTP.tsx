"use client";
import React, { FC, useState } from "react";
import { Button } from "../../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../components/ui/input-otp";
import { Modal } from "../ui/modal";
import { useRouter } from "../../navigation";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "@apollo/client";
import { ACTIVATE_USER } from "../../graphql/actions/activation.action";
import MainLoading from "../ui/main-loading";
import { refetchAllUserData } from "@/hooks/refetchAllUsers";

type Props = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  onClose: () => void;
};

const OTP: FC<Props> = ({ isOpen, onClose, setOpen }) => {
  const router = useRouter();
  const path = usePathname();
  const [ActivateUser, { loading }] = useMutation(ACTIVATE_USER);

  const OTPSchema = z.object({
    pin: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  });

  const form = useForm<z.infer<typeof OTPSchema>>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof OTPSchema>) => {
    try {
      const activationToken = localStorage.getItem("activation_token");

      const ActivationData = {
        activationToken,
        activationCode: data.pin,
      };

      await ActivateUser({
        variables: ActivationData,
      });

      setOpen(false);
      toast.success("Account activated successfully!");
      refetchAllUserData();
      form.reset();
      router.refresh();
      if (path.includes("managers")) {
        router.push(`/dashboard/managers`);
      } else if (path.includes("universities")) {
        router.push(`/dashboard/universities`);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="pt-6 space-x-2 flex items-center justify-center w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the one-time password sent to your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? <MainLoading /> : `Submit`}
            </Button>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default OTP;
