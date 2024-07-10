"use client";
import React, { FC, useState } from "react";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../../components/ui/drawer";
import { Button } from "../ui/button";
import { IoCloseOutline } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLocale } from "next-intl";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../graphql/actions/login.action";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import MainLoading from "../ui/main-loading";

type Props = {
  setActiveCom: (activeCom: string) => void;
};

const LoginContent: FC<Props> = ({ setActiveCom }) => {
  const t = useTranslations("Header");
  const tLogin = useTranslations("Login");
  const [Login, { loading }] = useMutation(LOGIN_USER);
  const [showPassword, setShowPassword] = useState(false);
  const lang = useLocale();

  const SignInSchema = z.object({
    email: z
      .string()
      .min(1, {
        message: `${
          lang === "en" ? "Email is required" : "البريد الالكتروني مطلوب"
        }`,
      })
      .email({
        message: `${
          lang === "en" ? "Not valid email" : "البريد الالكتروني غير صالح"
        }`,
      }),
    password: z
      .string()
      .min(7, {
        message: `${
          lang === "en"
            ? "Password must be at least 8 characters"
            : " يجب ان تكون كلمة المرور على الاقل 8 احرف"
        }`,
      })
      .max(35, {
        message: `${
          lang === "en"
            ? "The password must not exceed 35 letter"
            : "كلمة المرور يجب الا تتجاوز 35 حرف"
        }`,
      }),
  });

  type InSignIn = z.infer<typeof SignInSchema>;

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitted },
    reset,
  } = useForm<InSignIn>({
    mode: "onChange",
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit: SubmitHandler<InSignIn> = async (data) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };
    const response = await Login({
      variables: loginData,
    });

    if (response.data.Login.user) {
      toast.success("Login Successfully!");
      Cookies.set("access_token", response.data.Login.accessToken);
      Cookies.set("refresh_token", response.data.Login.refreshToken);
      reset();
      window.location.reload();
    } else {
      toast.error(response.data.Login.error.message);
    }
  };

  return (
    <DrawerContent className="">
      <DrawerHeader>
        <DrawerTitle
          className={`1200px:text-[70px] 1100px:text-[60px]  1000px:text-[50px] 800px:text-[45px] 600px:text-[40px] text-[35px] font-bold pt-6 pb-2 gradient-text  text-center tracking-tight`}
        >
          {t("SignIn")}
        </DrawerTitle>
        <DrawerDescription
          className={`w-[90%] 800px:w-[50%] font-[400] mx-auto  pb-3 text-[#666] leading-loose text-[18px] text-center dark:text-[#939db6]`}
        >
          {tLogin("p")}
        </DrawerDescription>
      </DrawerHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`relative ${
            errors.email ? "mb-10" : "mb-3"
          } !w-[350px] 800px:!w-[450px] mx-auto transition-all `}
        >
          <input
            type="email"
            className="peer m-0 block h-[60px] w-full rounded-lg border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-white dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
            id="floatingInput"
            placeholder="name@example.com"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span
              className={`absolute -bottom-7 px-2 text-[14px] text-red-600`}
            >
              {errors.email.message}
            </span>
          )}
          <label
            htmlFor="floatingInput"
            className={`pointer-events-none absolute top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-focus:text-[14px] peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary`}
          >
            {tLogin("emailInput")}
          </label>
        </div>

        <div
          className={`relative ${
            errors.password ? "mb-10" : "mb-3"
          }  !w-[350px] 800px:!w-[450px] mx-auto transition-all`}
        >
          <input
            type={!showPassword ? "password" : "text"}
            className={`peer m-0 block h-[60px] w-full rounded-lg border border-solid border-secondary-500 bg-transparent bg-clip-padding ${
              lang === "en" ? "pl-3 pr-12" : "pr-3 pl-12"
            } py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:shadow-twe-primary focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-white dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]`}
            id="floatingPassword"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span
              className={`absolute -bottom-7 px-2 text-[14px] text-red-600`}
            >
              {errors.password?.message}
            </span>
          )}
          <label
            htmlFor="floatingPassword"
            className={`pointer-events-none absolute  top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-focus:text-[14px] peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary`}
          >
            {tLogin("passwordInput")}
          </label>
          {!showPassword ? (
            <Button
              type="button"
              variant="ghost"
              className={`absolute bottom-2  ${
                lang === "en" ? "right-2" : "left-2"
              }  z-1  !p-1 rounded-full`}
              onClick={() => setShowPassword(true)}
            >
              <AiOutlineEyeInvisible
                size={25}
                className={`text-black dark:text-white `}
              />
            </Button>
          ) : (
            <Button
              type="button"
              variant="ghost"
              className={`absolute bottom-2 ${
                lang === "en" ? "right-2" : "left-2"
              }  z-1 !p-1 rounded-full`}
              onClick={() => setShowPassword(false)}
            >
              <AiOutlineEye
                size={25}
                className={` text-black dark:text-white `}
              />
            </Button>
          )}
        </div>
        <Button
          type="submit"
          className={`!w-[350px] 800px:!w-[450px] !rounded-full !z-10 mx-auto mb-3 !py-6 flex justify-center items-center mt-6`}
          disabled={loading}
        >
          {loading ? <MainLoading /> : `${t("SignIn")}`}
        </Button>
      </form>
      <DrawerFooter className="mb-3">
        <Button
          variant="outline"
          className="!w-[350px] 800px:!w-[450px]  !rounded-full !z-10 mx-auto !py-6"
          onClick={() => setActiveCom("ForgotPassword")}
        >
          {tLogin("forgotPassword")}
        </Button>
        <DrawerClose
          className={`absolute top-3 right-3 hover:bg-secondary rounded-full p-1`}
        >
          <IoCloseOutline size={30} />
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
};

export default LoginContent;
