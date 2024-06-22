"use client";
import React from "react";
import Image from "next/image";
import LanguageHero from "../../public/assets/language-translator.png";
import Books from "../../public/assets/books.png";
import spaceBook from "../../public/assets/spaceBook.png";
import ChooseCollage from "../../public/assets/Choose-collage.png";
import GraduationComplete from "../../public/assets/graduation-complete.png";
import { useTranslations } from "next-intl";
import Login from "./Login";
import { useSelector } from "react-redux";

type Props = {};

const Hero = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const t = useTranslations("Header");
  const tHero = useTranslations("Hero");
  const tLogin = useTranslations("Login");

  return (
    <div
      className={`relative flex justify-center items-center flex-col py-20 p-2 dark:bg-background dark:border-b dark:border-b-[#9e9e9e29]`}
    >
      <Image
        src={LanguageHero}
        alt="language"
        className={`800px:w-[150px] 800px:h-[150px] w-[130px] h-[130px] absolute 800px:left-32 left-0 top-8`}
      />
      <Image
        src={Books}
        alt="Books"
        className={`800px:w-[150px] 800px:h-[150px] w-[130px] h-[130px] absolute left-65 top-8 600px:top-4`}
      />
      <Image
        src={GraduationComplete}
        alt="GraduationComplete"
        className={`800px:w-[150px] 800px:h-[150px] w-[130px] h-[130px] absolute 800px:right-32 right-0 top-8  rounded-3xl`}
      />
      <Image
        src={ChooseCollage}
        alt="ChooseCollage"
        className={`900px:w-[200px] 900px:h-[200px] 800px:w-[180px] 800px:h-[180px] w-[150px] h-[150px]  absolute 800px:left-2 1100px:left-20 1300px:left-2 1400px:left-32 1500px:left-44  800px:top-[250px] bottom-50 left-1  opacity-5  800px:opacity-100`}
      />
      <Image
        src={spaceBook}
        alt="spaceBook"
        className={`900px:w-[200px] 900px:h-[200px] 800px:w-[180px] 800px:h-[180px] w-[150px] h-[150px]  absolute 800px:right-2 1100px:right-20 1300px:right-2 1400px:right-32 1500px:right-44  800px:top-[250px] bottom-40 right-1  opacity-5  800px:opacity-100 `}
      />
      <h2
        className={`1200px:text-[70px] 1100px:text-[60px]  1000px:text-[50px] 800px:text-[45px] 600px:text-[40px] text-[35px] font-bold pt-20 pb-6 gradient-text  text-center tracking-tight `}
      >
        {tHero("h2")}
      </h2>
      <p
        className={`w-[90%] 800px:w-[50%] font-[400] mx-auto  pb-12 text-[#666] leading-loose text-[18px] text-center dark:text-[#939db6]`}
      >
        {tHero("p")}
      </p>
      {!user && (
        <Login
          component="Hero"
          btnSignIn={t("SignIn")}
          logP={tLogin("p")}
          emailIn={tLogin("emailInput")}
          passIn={tLogin("passwordInput")}
          herobtn={tHero("button")}
          forgotbtn={tLogin("forgotPassword")}
        />
      )}
    </div>
  );
};

export default Hero;
