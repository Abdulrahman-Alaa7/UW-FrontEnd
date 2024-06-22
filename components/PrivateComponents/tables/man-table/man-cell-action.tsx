"use client";
import React, { useState } from "react";
import { AlertModal } from "../.././../../components/ui/alert-model";
import { Button } from "../.././../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../.././../../components/ui/dropdown-menu";
import { Employee } from "../../../../constants/data";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "../../../../navigation";
import { usePathname } from "next/navigation";

interface CellActionProps {
  data: Employee;
}

export const ManCellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const path = usePathname();

  const onConfirm = async () => {};

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

          {path.includes("managers") && (
            <DropdownMenuItem
              onClick={() => router.push(`/dashboard/managers/${data.id}`)}
            >
              <Edit className="mr-2 h-4 w-4" /> Update
            </DropdownMenuItem>
          )}
          {path.includes("universities") && (
            <DropdownMenuItem
              onClick={() => router.push(`/dashboard/universities/${data.id}`)}
            >
              <Edit className="mr-2 h-4 w-4" /> Update
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
