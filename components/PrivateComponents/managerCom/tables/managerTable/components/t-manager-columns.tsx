"use client";
import { useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../../../../ui/checkbox";
import { TableManager } from "../data/schemaTableManager";
import { DataTableColumnHeader } from "./t-manager-column-header";
import { DataTableRowActions } from "./t-manager-row-actions";
import truncateText from "../../../../../../app/utils/truncateText";
import { formatDistance } from "date-fns";
import { Badge } from "../../../../../../components/ui/badge";

export const tManagerColumns: ColumnDef<TableManager>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("email")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      return (
        <div className={`flex space-x-2`}>
          <span className={`max-w-[500px] truncate font-medium`}>
            <Badge>{row.getValue("role")}</Badge>
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium capitalize">
            {row.getValue("gender")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">
        <Badge
          className={`text-white capitalize ${
            row.getValue("status") == "hold" ? "bg-[crimson]" : "bg-green-500"
          }`}
        >
          {row.getValue("status")}
        </Badge>
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CreatedAt" />
    ),
    cell: ({ row }) => {
      const resultTime = formatDistance(
        new Date(row.getValue("createdAt")),
        new Date(),
        {
          addSuffix: true,
        }
      );
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {resultTime}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
