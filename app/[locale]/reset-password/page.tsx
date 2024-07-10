import React from "react";
import Heading from "../../utils/Heading";
import HeaderPub from "../../../components/HeaderPub";
import Footer from "../../../components/Footer";
import ResetPassword from "../../../components/publicComonents/ResetPassword";

type Props = {};

const Page = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const activationToken = searchParams["verify"] ?? "";

  return (
    <div>
      <Heading
        title="Reset Password"
        description="Platform to help students."
        keywords="ELearning, LMS and more."
      />
      <HeaderPub />
      <ResetPassword activationToken={activationToken} />
      <Footer />
    </div>
  );
};

export default Page;
