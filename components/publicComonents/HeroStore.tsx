import React from "react";
import Image from "next/image";
import Sale1 from "../../public/assets/Sale1.png";
import Sale2 from "../../public/assets/Sale2.png";
import EcommerceCampaign from "../../public/assets/Ecommerce campaign-cuate.png";
import { useTranslations } from "next-intl";

type Props = {};

const HeroStore = (props: Props) => {
  const t = useTranslations("HeroStore");

  return (
    <div
      className={`relative flex justify-center items-center flex-col  p-2 bg-[#f5f5ff] dark:bg-background pb-10 `}
    >
      <h2
        className={`1200px:text-[70px] 1100px:text-[60px]  1000px:text-[50px] 800px:text-[45px] 600px:text-[40px] text-[35px] font-bold pt-10 pb-6 gradient-text tracking-tight text-center `}
      >
        {t("h2")}
      </h2>
      <p
        className={`w-[90%] 800px:w-[80%] 1300px:w-[60%] font-[400] mx-auto  pb-12 text-[#666] leading-loose text-[18px] text-center dark:text-[#939db6]`}
      >
        {t("p")}
      </p>
      <div className={`flex flex-wrap justify-center items-center gap-4`}>
        <div
          className={`bg-white dark:bg-gradient-to-r from-slate-900 to-gray-900 border border-[#9e9e9e29] p-8 w-full 900px:w-[400px] h-[350px] rounded-3xl`}
        >
          <div className="flex justify-center items-center mt-4">
            <Image src={Sale1} alt="Sale1" className={`w-[250px] h-[250px]`} />
          </div>
        </div>
        <div
          className={`bg-white dark:bg-gradient-to-r from-slate-900 to-gray-900 border border-[#9e9e9e29] p-8 w-full 900px:w-[400px] h-[350px] rounded-3xl`}
        >
          <div className="flex justify-center items-center mt-4">
            <Image src={Sale2} alt="Sale2" className={`w-[250px] h-[250px]`} />
          </div>
        </div>
        <div
          className={`bg-white dark:bg-gradient-to-r from-slate-900 to-gray-900 border border-[#9e9e9e29] p-8 w-full 900px:w-[400px] h-[350px] rounded-3xl`}
        >
          <div className="flex justify-center items-center mt-4">
            <Image
              src={EcommerceCampaign}
              alt="EcommerceCampaign"
              className={`w-[250px] h-[250px]`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroStore;
