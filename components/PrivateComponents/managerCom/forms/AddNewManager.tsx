"use client";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../../../graphql/actions/register.action";
import MainLoading from "../../../../components/ui/main-loading";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type Props = {
  initialData?: any | null;
};

const AddNewManager: React.FC<Props> = ({ initialData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const locale = useLocale();
  const [registerUserMutation, { loading }] = useMutation(REGISTER_USER);
  const [activationToken, setactivationToken] = useState("");
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? initialData
    : {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        gernder: "",
        role: `${
          path == `/${locale}/dashboard/managers/new`
            ? `Manager`
            : path == `/${locale}/dashboard/universities/new`
            ? `University`
            : `User`
        }`,
      };

  const profileSchema = z.object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters" })
      .max(50, {
        message: "Name must not be longer than 50 characters.",
      }),
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
          .min(8, {
            message: "Password must be at least 8 characters",
          })
          .max(35, {
            message: "The password must not exceed 35 characters",
          }),
    gender: z.enum(["male", "female", "org"], {
      required_error: "You need to select a gender.",
    }),
    role: z
      .enum([
        "Manager",
        "University",
        "Faculty",
        "Department",
        "Professor",
        "Student",
        "User",
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
      if (initialData) {
        // await axios.post(`/api/products/edit-product/${initialData._id}`, data);
        await console.log("success Updated", data);
        toast.success("User Updated Successfully");
      } else {
        const response = await registerUserMutation({
          variables: data,
        });
        localStorage.setItem(
          "activation_token",
          response.data.register.activation_token
        );
        toast.success("Please check your email to activate your account!");
        setOpen(true);

        form.reset(defaultValues);
      }
    } catch (error: any) {
      toast.error(error.message);
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Name" {...field} />
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
                      placeholder="email@uw.com"
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
                    <div className="relative">
                      <Input
                        type={!showPassword ? "password" : "text"}
                        disabled={loading}
                        placeholder="password"
                        {...field}
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
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="University">University</SelectItem>
                      <SelectItem value="Faculty">Faculty</SelectItem>
                      <SelectItem value="Department">Department</SelectItem>
                      <SelectItem value="Professor">Professor</SelectItem>
                      <SelectItem value="Student">Student</SelectItem>
                      <SelectItem value="User">User</SelectItem>
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
            {loading ? <MainLoading /> : `${action}`}
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
