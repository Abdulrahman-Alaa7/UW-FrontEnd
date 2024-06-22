"use client";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import {
  RadioGroup,
  RadioGroupItem,
} from "../../../../components/ui/radio-group";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

import OTP from "../../OTP";
import { toast } from "sonner";

type Props = {
  initialData?: any | null;
};

const AddNewManager: React.FC<Props> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const removeUndefinedKeys = (obj: any) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v !== undefined)
    );
  };

  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? initialData
    : {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        gernder: "",
      };

  const profileSchema = z.object({
    first_name: z
      .string()
      .min(3, { message: "First Name must be at least 3 characters" }),
    last_name: z
      .string()
      .min(3, { message: "Last Name must be at least 3 characters" }),
    email: z
      .string()
      .min(1, {
        message: `Email is required`,
      })
      .email({
        message: `Not valid email`,
      }),
    password: initialData
      ? z.string().optional()
      : z
          .string()
          .min(7, {
            message: "Password must be at least 7 characters",
          })
          .max(35, {
            message: "The password must not exceed 35 characters",
          }),
    gender: z.enum(["male", "female", "org"], {
      required_error: "You need to select a gender.",
    }),
    role: z
      .enum([
        "manager",
        "university",
        "faculty",
        "department",
        "professor",
        "student",
        "user",
      ])
      .optional(),
    status: z.enum(["active", "hold"]).default("active"),
  });

  type AddNewUserValues = z.infer<typeof profileSchema>;

  const form = useForm<AddNewUserValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  const onSubmit = async (data: AddNewUserValues) => {
    try {
      const cleanedData = removeUndefinedKeys(data);
      setLoading(true);
      if (initialData) {
        // await axios.post(`/api/products/edit-product/${initialData._id}`, data);
        await console.log("success Updated", cleanedData);
        toast.success("User Updated Successfully");
      } else {
        // const res = await axios.post(`/api/products/create-product`, data);
        // console.log("product", res);
        setOpen(true);
        await console.log("success added", cleanedData);
      }
      // router.refresh();
      // router.push(`/dashboard/menu`);
      // console.log("Error");
    } catch (error: any) {
      console.log("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <OTP isOpen={open} onClose={() => setOpen(false)} setOpen={setOpen} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Abdulrahman"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Alaa" {...field} />
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
                      type="email"
                      disabled={loading}
                      placeholder="abdulrahmanalaa@uw.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className={`${initialData && "!hidden"}`}>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={loading}
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Card className="mt-3 lg:mt-0">
              <CardContent>
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Select a gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="male" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Male
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="female" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Female
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="org" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Org
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className={`${!initialData && "!hidden"}`}>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="university">University</SelectItem>
                      <SelectItem value="faculty">Faculty</SelectItem>
                      <SelectItem value="department">Department</SelectItem>
                      <SelectItem value="professor">Professor</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className={`${!initialData && "!hidden"}`}>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active" className="text-green-600">
                        Active
                      </SelectItem>
                      <SelectItem value="hold" className={`text-[crimson]`}>
                        Hold
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <br />
          </div>
          <Button
            disabled={loading}
            className="mx-auto w-[250px] flex justify-center items-center"
            type="submit"
          >
            {action}
          </Button>
          <FormDescription
            className={`mx-auto w-[95%] flex justify-center items-center !mt-3 ${
              initialData && "!hidden"
            }`}
          >
            We will send to your email OTP to activate your account.
          </FormDescription>
        </form>
      </Form>
    </>
  );
};

export default AddNewManager;
