"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "../../lib/utils";
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
import { Textarea } from "../ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "../ui/card";
import { CalendarIcon, Plus, Trash } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { Separator } from "../ui/separator";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useSelector } from "react-redux";
import Avatar from "../../public/assets/avatar.png";
import Image from "next/image";
import { AlertModal } from "../ui/alert-model";

const profileFormSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "First Name must be at least 2 characters.",
    })
    .max(30, {
      message: "First Name must not be longer than 30 characters.",
    }),
  lastName: z
    .string()
    .min(2, {
      message: "Last Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Last Name must not be longer than 30 characters.",
    }),
  bio: z.string().max(160).optional(),
  dob: z.date().optional(),
  type: z.enum(["male", "female"]).optional(),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileTap() {
  const { user } = useSelector((state: any) => state.auth);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onConfirm = async () => {};

  // This can come from your database or API.
  const defaultValues: Partial<ProfileFormValues> = {
    firstName: user.name,
    lastName: user.name,
    urls: [{ value: "https://Abdulrahman-Alaa.com/" }],
  };
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
  }

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Card className="fadeRight">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <CardContent className="space-y-2 py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className={`w-full flex justify-center items-center gap-2`}>
              <div className={`relative`}>
                <Image
                  src={user?.avatar ? user.avatar.url : Avatar}
                  alt={user?.name}
                  className={`w-[120px] h-[120px] rounded-full cursor-pointer border-[3px] border-border`}
                  width={120}
                  height={120}
                />
                <div className="flex justify-center items-center mt-2">
                  <input
                    type="file"
                    name=""
                    id="avatar"
                    className={`hidden`}
                    onChange={imageHandler}
                    accept="image/png, image/jpg,image/jpeg,image/webp"
                  />
                  <div className={`flex justify-center items-center gap-2`}>
                    <label
                      htmlFor="avatar"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                    >
                      Edit Image
                    </label>
                    <Button
                      type="button"
                      className="flex justify-center items-center gap-2"
                      variant="outline"
                      size={`sm`}
                      onClick={() => setOpen(true)}
                    >
                      <Trash size={20} color="red" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <Separator />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Abdulrahman" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display first name. It must be your real
                    name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Alaa" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display last name. It must be your real
                    name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    You can <span>@mention</span> other users and organizations
                    to link to them.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        captionLayout="dropdown-buttons"
                        fromYear={1950}
                        toYear={new Date().getFullYear()}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Your date of birth is used to calculate your age.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Select your genre</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex  justify-start space-x-1"
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
                          Female{" "}
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              {fields.map((field, index) => (
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`urls.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        URLs
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Add your links (your website, blog, or social media
                        profiles).
                      </FormDescription>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input {...field} placeholder="Add your link.." />
                        </FormControl>
                        <Button
                          className="flex justify-center items-center gap-2"
                          onClick={() => {
                            remove(index);
                          }}
                          variant="ghost"
                        >
                          <Trash size={20} color="red" />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2 flex justify-center items-center gap-2"
                onClick={() => append({ value: "" })}
              >
                <Plus size={20} />
                Add URL
              </Button>
            </div>
            <Button
              type="submit"
              className={`flex justify-center items-center mx-auto`}
            >
              Update profile
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
