"use client";
import React, { FC } from "react";
import Heading from "../../../../../utils/Heading";
import BreadCrumb from "../../../../../../components/BreadCrumb";
import { HeadPage } from "../../../../../../components/HeadPage";
import { Separator } from "../../../../../../components/ui/separator";
import { ScrollArea } from "../../../../../../components/ui/scroll-area";
import AddNewManager from "../../../../../../components/PrivateComponents/managerCom/forms/AddNewManager";

type Props = {};

const Page: FC<Props> = ({ params }: any) => {
  const userId = params?.id;

  const breadcrumbItems = [
    { title: "All Users", link: "/dashboard/all-users" },
    { title: "Update User", link: `/dashboard/all-users/${userId}` },
  ];

  return (
    <>
      <Heading
        title="Update User"
        description="Platform to help students."
        keywords="ELearning, LMS and more."
      />
      <ScrollArea className="h-full fadeRight">
        <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
          <BreadCrumb items={breadcrumbItems} />
          <div className="flex items-start justify-between">
            <HeadPage
              title={`Update User`}
              description="Update Manager from here"
            />
          </div>
          <Separator />
          <AddNewManager userId={userId} />
        </div>
      </ScrollArea>
    </>
  );
};

export default Page;
