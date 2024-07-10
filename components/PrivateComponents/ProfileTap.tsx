"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { date, z } from "zod";
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
import { Card, CardContent } from "../ui/card";
import { CalendarIcon, Plus, Trash } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format, toDate } from "date-fns";
import { Separator } from "../ui/separator";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import Avatar from "../../public/assets/avatar.png";
import Image from "next/image";
import { AlertModal } from "../ui/alert-model";
import useUser from "../../hooks/useUser";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ar from "react-phone-input-2/lang/ar.json";
import { useLocale } from "next-intl";
import { useMutation } from "@apollo/client";
import { UPDATE_PROFILE_USER } from "../../graphql/actions/updateProfileUser.action";
import { toast } from "sonner";
import MainLoading from "../ui/main-loading";
import { client } from "../../graphql/gql.setup";
import { GET_USER } from "../../graphql/actions/getUser.action";

export function ProfileTap() {
  const [loadingAlert, setLoadingAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const lang = useLocale();
  const { user, loading: LoadingUser } = useUser();
  const [updateProfile, { loading }] = useMutation(UPDATE_PROFILE_USER);
  const [imageEdit, setImageEdit] = useState<any>(null);

  const onConfirm = async () => {};

  let userPhone = user.phone_number;

  const profileFormSchema = z.object({
    name: z
      .string()
      .min(2, {
        message: "Name must be at least 2 characters.",
      })
      .max(50, {
        message: "Name must not be longer than 50 characters.",
      }),
    image: z.instanceof(File).optional(),
    bio: z
      .string()
      .max(160, {
        message: "Bio must not be longer than 160 characters.",
      })
      .optional(),
    dob: z.date().optional(),
    gender: z.enum(["male", "female", "org"]).optional(),
    phone_number: z
      .string()
      .max(40, {
        message: "phone_number must not be longer than 80 numbers.",
      })
      .optional(),
    address: z
      .string()
      .max(80, {
        message: "Address must not be longer than 80 characters.",
      })
      .optional(),
    // urls: z
    //   .array(
    //     z.object({
    //       url: z.string().url({ message: "Please enter a valid URL." }),
    //     })
    //   )
    //   .optional(),
  });

  type ProfileFormValues = z.infer<typeof profileFormSchema>;

  // This can come from your database or API.
  const defaultValues: Partial<ProfileFormValues> = {
    name: user?.name,
    gender: user?.gender,
    bio: user?.dob === null ? undefined : user?.bio,
    dob: user?.dob === null ? undefined : toDate(user?.dob),
    phone_number: userPhone?.toString(),
    address: user?.address === null ? undefined : user?.address,
    image: user?.image,
    // urls: [{ url: "" }],
  };
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  // const { fields, append, remove } = useFieldArray({
  //   name: "urls",
  //   control: form.control,
  // });

  function filterUndefinedValues(data: ProfileFormValues): ProfileFormValues {
    return Object.fromEntries(
      Object.entries(data).filter(
        ([key, value]) => value !== undefined && !Number.isNaN(value)
      )
    ) as ProfileFormValues;
  }

  const refetchData = async () => {
    await client.refetchQueries({
      include: [GET_USER],
    });
  };

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const ProfileData: any = {
        name: data?.name,
        bio: data?.bio,
        gender: data?.gender,
        phone_number: Number(data?.phone_number),
        dob: data?.dob,
        address: data?.address,
        image: data.image,
      };

      const newData = filterUndefinedValues(ProfileData);

      await updateProfile({
        variables: newData,
      });

      toast.success("User updated successfully");
      setImageEdit(null);
      refetchData();
    } catch (error: any) {
      console.error(error);

      toast.error(error.message);
    }
  };

  return (
    <Card className="fadeRight">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loadingAlert}
      />
      <CardContent className="space-y-2 py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="w-full flex justify-center items-center gap-2">
              <div className="relative">
                <Image
                  src={
                    imageEdit !== null
                      ? imageEdit
                      : user?.image
                      ? user.image
                      : Avatar
                  }
                  alt={user?.name}
                  className={`w-[120px] h-[120px] rounded-full cursor-pointer border-[3px] border-border ${
                    imageEdit !== null && "border-red-600 border-dashed"
                  }`}
                  width={120}
                  height={120}
                />
                <div className="flex justify-center items-center mt-2">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-center items-center mx-2">
                          {" "}
                          <FormLabel
                            htmlFor="image"
                            className="p-[10px] border border-border rounded-md cursor-pointer transition-all hover:bg-muted"
                          >
                            Edit image
                          </FormLabel>
                          <Input
                            id="image"
                            type="file"
                            accept="image/jpeg, image/jpg, image/png"
                            onChange={(e: any) => {
                              const file = e.target.files[0];
                              field.onChange(file);
                              const fileReader = new FileReader();
                              fileReader.onload = () => {
                                if (fileReader.readyState === 2) {
                                  const avatar = fileReader.result;
                                  setImageEdit(avatar);
                                }
                              };
                              fileReader.readAsDataURL(e.target.files[0]);
                            }}
                            className="hidden"
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-center items-center gap-2">
                    <Button
                      type="button"
                      className="flex justify-center items-center gap-2"
                      variant="outline"
                      size="sm"
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Abdulrahman" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name. It must be your real name.
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
                            format(field.value, "P")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50 " />
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
                        captionLayout="dropdown"
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
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Select your gender</FormLabel>
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
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="org" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          Org{" "}
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Phone Number</FormLabel>
                  <FormControl>
                    {lang === "en" ? (
                      <PhoneInput
                        placeholder="Phone number"
                        country={`eg`}
                        value={field.value}
                        onChange={field.onChange}
                        inputClass="!bg-background flex h-10 w-full !rounded-md !border !border-input !text-sm !ring-offset-background file:!border-0 file:!bg-transparent file:text-sm file:font-medium placeholder:!text-muted-foreground focus-visible:!outline-none focus-visible:!ring-2 focus-visible:!ring-ring focus-visible:!ring-offset-2 disabled:!cursor-not-allowed disabled:!opacity-50"
                        buttonClass="!bg-background hover:!bg-background focus:!bg-background !border !border-input"
                        dropdownClass="!bg-background hover:bg-blue-500"
                        searchClass="!bg-background"
                      />
                    ) : (
                      <PhoneInput
                        placeholder="Phone number"
                        country={`eg`}
                        localization={ar}
                        value={field.value}
                        onChange={field.onChange}
                        inputClass="!bg-background flex h-10 w-full !rounded-md !border !border-input !text-sm !ring-offset-background file:!border-0 file:!bg-transparent file:text-sm file:font-medium placeholder:!text-muted-foreground focus-visible:!outline-none focus-visible:!ring-2 focus-visible:!ring-ring focus-visible:!ring-offset-2 disabled:!cursor-not-allowed disabled:!opacity-50"
                        buttonClass="!bg-background hover:!bg-background focus:!bg-background !border !border-input"
                        dropdownClass="!bg-background hover:bg-blue-500"
                        searchClass="!bg-background"
                      />
                    )}
                  </FormControl>
                  <FormDescription>
                    This Phone number will be public to anyone
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Adderss</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Address" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your Address display address. It must be your real
                    address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              {/* {fields.map((field, index) => (
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`urls.${index}.url`}
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
              ))} */}
              {/* <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2 flex justify-center items-center gap-2"
                onClick={() => append({ url: "" })}
                disabled={fields.length >= 4}
              >
                <Plus size={20} />
                Add URL
              </Button> */}
            </div>
            <Button
              type="submit"
              className={`flex justify-center items-center mx-auto`}
              disabled={loading}
            >
              {loading ? <MainLoading /> : "Update Profile"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
