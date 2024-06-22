"use client";

import React, { FC, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
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
type Props = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  onClose: () => void;
};

const OTP: FC<Props> = ({ isOpen, onClose, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const path = usePathname();

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

  function onSubmit(data: z.infer<typeof OTPSchema>) {
    try {
      setLoading(true);
      // await axios.post(`/api/products/edit-product/${initialData._id}`, data);
      // const res = await axios.post(`/api/products/create-product`, data);
      // console.log("product", res);
      console.log("success activate", data);
      toast.success("User Created Successfully");
      setOpen(false);
      // router.refresh();
      if (path.includes("managers")) {
        router.push(`/dashboard/managers`);
      } else if (path.includes("universities")) {
        router.push(`/dashboard/universities`);
      }
      // console.log("Error");
    } catch (error: any) {
      console.log("Error");
    } finally {
      setLoading(false);
    }
  }

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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default OTP;
