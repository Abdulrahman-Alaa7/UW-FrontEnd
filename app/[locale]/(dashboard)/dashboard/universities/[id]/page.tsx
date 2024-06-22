import React, { FC } from "react";
import Heading from "../../../../../utils/Heading";
import BreadCrumb from "../../../../../../components/BreadCrumb";
import { HeadPage } from "../../../../../../components/HeadPage";
import { Separator } from "../../../../../../components/ui/separator";
import { ScrollArea } from "../../../../../../components/ui/scroll-area";
import AddNewManager from "../../../../../../components/PrivateComponents/managerCom/forms/AddNewManager";

type Props = {};

const Page: FC<Props> = ({ params }: any) => {
  const id = params?.id;

  const breadcrumbItems = [
    { title: "Universities Area", link: "/dashboard/universities" },
    { title: "Update University", link: `/dashboard/universities/${id}` },
  ];

  const defaultValues = {
    id: 1,
    first_name: "Kayla",
    last_name: "Lopez",
    gender: "org",
    email: "kayla.lopez.1@slingacademy.com",
    role: "university",
    status: "active",
  };

  return (
    <>
      <Heading
        title="Update University"
        description="Platform to help students."
        keywords="ELearning, LMS and more."
      />
      <ScrollArea className="h-full fadeRight">
        <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
          <BreadCrumb items={breadcrumbItems} />
          <div className="flex items-start justify-between">
            <HeadPage
              title={`Update University`}
              description="Update University from here"
            />
          </div>
          <Separator />
          <AddNewManager initialData={defaultValues} />
        </div>
      </ScrollArea>
    </>
  );
};

export default Page;
