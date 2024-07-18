"use client";

import React, { useState } from "react";
import { AlertModal } from "../.././../../../../components/ui/alert-model";
import { Button } from "../.././../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../.././../../../../components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "../../../../../../navigation";
import { useMutation } from "@apollo/client";
import { DELETE_USER_BY_ID } from "../../../../../../graphql/actions/mutaions/deleteUserById";
import { toast } from "sonner";
import { refetchAllUserData } from "../../../../../../hooks/refetchAllUsers";

interface DataTableRowActionsProps<TData> {
  row: any;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [deleteUserById, { loading }] = useMutation(DELETE_USER_BY_ID);

  const onConfirm = async () => {
    try {
      const userId: any = row.original.id;

      await deleteUserById({
        variables: {
          userId: userId,
        },
      });

      toast.success("User Deleted Successfully");
      setOpen(false);
      refetchAllUserData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/dashboard/all-users/${row.original?.id}`)
            }
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
