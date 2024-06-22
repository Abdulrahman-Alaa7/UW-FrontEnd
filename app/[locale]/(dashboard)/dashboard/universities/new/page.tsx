import React from "react";
import Heading from "../../../../../utils/Heading";
import BreadCrumb from "../../../../../../components/BreadCrumb";
import { HeadPage } from "../../../../../../components/HeadPage";
import { Separator } from "../../../../../../components/ui/separator";
import { ScrollArea } from "../../../../../../components/ui/scroll-area";
import AddNewManager from "../../../../../../components/PrivateComponents/managerCom/forms/AddNewManager";

type Props = {};

const breadcrumbItems = [
  { title: "University Area", link: "/dashboard/universities" },
  { title: "Add New University", link: `/dashboard/universities/new` },
];
const Page = (props: Props) => {
  return (
    <>
      <Heading
        title="Add New University"
        description="Platform to help students."
        keywords="ELearning, LMS and more."
      />
      <ScrollArea className="h-full fadeRight">
        <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
          <BreadCrumb items={breadcrumbItems} />
          <div className="flex items-start justify-between">
            <HeadPage
              title={`Add New University`}
              description="Add new University from here."
            />
          </div>
          <Separator />
          <AddNewManager />
        </div>
      </ScrollArea>
    </>
  );
};

export default Page;
