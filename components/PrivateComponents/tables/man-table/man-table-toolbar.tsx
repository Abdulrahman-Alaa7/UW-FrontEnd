"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { ManTableViewOptions } from "./man-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  dashboard?: boolean;
  searchKey?: any;
}

export function ManTableToolbar<TData>({
  table,
  dashboard,
  searchKey,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex flex-1 items-center space-x-2 transition-all">
        <Input
          type="text"
          placeholder={`Search ${searchKey}...`}
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="w-full md:max-w-sm"
        />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="fadeIn transition-all h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <ManTableViewOptions table={table} />
    </div>
  );
}
