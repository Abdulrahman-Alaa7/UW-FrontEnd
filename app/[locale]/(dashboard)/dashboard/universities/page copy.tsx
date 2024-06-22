import React from "react";
import BreadCrumb from "../../../../../components/BreadCrumb";
import { Mancolumns } from "../../../../../components/PrivateComponents/tables/man-table/man-columns";
import { ManTable } from "../../../../../components/PrivateComponents/tables/man-table/man-table";
import { buttonVariants } from "../../../../../components/ui/button";
import Heading from "../../../../utils/Heading";
import { Separator } from "../../../../../components/ui/separator";
import { Employee } from "../../../../../constants/data";
import { cn } from "../../../../../lib/utils";
import { Plus } from "lucide-react";
import { Link } from "../../../../../navigation";
import { HeadPage } from "../../../../../components/HeadPage";
import { ScrollArea } from "../../../../../components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};
export default async function Page({ searchParams }: paramsProps) {
  const breadcrumbItems = [
    { title: "Universities", link: "/dashboard/universities" },
  ];

  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const country = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  const res = await fetch(
    `https://api.slingacademy.com/v1/sample-data/users?offset=${offset}&limit=${pageLimit}` +
      (country ? `&search=${country}` : "")
  );
  const employeeRes = await res.json();
  const totalUsers = employeeRes.total_users; //1000
  const pageCount = Math.ceil(totalUsers / pageLimit);
  const employee: Employee[] = employeeRes.users;
  return (
    <>
      <Heading
        title="Universities Area"
        description="Platform to help students."
        keywords="ELearning, LMS and more."
      />
      <ScrollArea className="h-full fadeRight">
        <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
          <BreadCrumb items={breadcrumbItems} />

          <div className="flex items-start justify-between">
            <HeadPage
              title={`Universities (${totalUsers})`}
              description="Manage Universities from here."
            />

            <Link
              href={"/dashboard/managers/new"}
              className={cn(buttonVariants({ variant: "default" }))}
            >
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Link>
          </div>
          <Separator />
        </div>

        <CardContent className="w-[390px] sm:w-[550px]  xl:w-full mx-auto">
          <ManTable
            searchKey="country"
            pageNo={page}
            columns={Mancolumns}
            totalUsers={totalUsers}
            data={employee}
            pageCount={pageCount}
          />
        </CardContent>
      </ScrollArea>
    </>
  );
}
