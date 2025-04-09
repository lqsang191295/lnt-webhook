"use client";

import * as React from "react";
import dayjs from "dayjs";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  CirclePlus,
  Loader,
  LoaderIcon,
  MoreHorizontal,
  RefreshCw,
  StopCircleIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import { ToastError, ToastSuccess } from "@/lib/toast";
import { DialogAdd } from "./_components/dialog-add";
import { useAlertDialog } from "@/components/global-alert-dialog";
import { useDialogStore } from "@/store/dialog-store";
import {
  a_DeleteCronJob,
  a_GetDataCronJobs,
  a_StartCronJob,
  a_StopCronJob,
} from "./_actions";
import { TypeJob } from "./_types";
import { Badge } from "@/components/ui/badge";

export default function PageCronJobs() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState<TypeJob[]>([]);
  const [dataLoading, setDataLoading] = React.useState<boolean>(true);

  const openDialog = useDialogStore((state) => state.openDialog);
  const { showAlert } = useAlertDialog();

  const getColumns = (): ColumnDef<TypeJob>[] => {
    if (!data || !data.length) return [];

    const dataColumns: ColumnDef<TypeJob>[] = [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
    ];

    const dataKeys = Object.keys(data[0]);

    dataKeys.forEach((key: string) => {
      dataColumns.push({
        accessorKey: key,
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }>
              {key}
              <ArrowUpDown />
            </Button>
          );
        },
        cell: ({ row }) => {
          if (key === "status") {
            return (
              <Badge
                variant="outline"
                className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3">
                {row.original.status ? (
                  <>
                    <LoaderIcon className="text-green-500 dark:text-green-400" />
                    <span className="text-green-500">Running</span>
                  </>
                ) : (
                  <>
                    <StopCircleIcon className="text-red-500 dark:text-red-400" />
                    <span className="text-red-500">Stopped</span>
                  </>
                )}
              </Badge>
            );
          }

          if (key === "action_status") {
            return (
              <Badge
                variant="outline"
                className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3">
                {row.original.action_status === "success" ? (
                  <>
                    <span className="text-green-500">{row.getValue(key)}</span>
                  </>
                ) : (
                  <>
                    <span className="text-red-500">{row.getValue(key)}</span>
                  </>
                )}
              </Badge>
            );
          }

          if (key === "updated_at") {
            return (
              <div>
                {dayjs(row.getValue(key)).format("DD-MM-YYYY HH:mm:ss")}
              </div>
            );
          }

          return <div>{row.getValue(key)}</div>;
        },
      });
    });

    dataColumns.push({
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const data = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => openDialog("edit", data)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() =>
                  showAlert("Xác nhận", "Bạn có muốn xoá không?", () =>
                    handleDeleteCronJob(data)
                  )
                }>
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => actionCronJob("start", data)}>
                Start
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => actionCronJob("stop", data)}>
                Stop
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    });

    return dataColumns;
  };

  const table = useReactTable({
    data,
    columns: getColumns(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const getDataCronJobs = async () => {
    const result: TypeJob[] = await a_GetDataCronJobs();

    setData(result);
  };

  const actionCronJob = async (action: string, data: TypeJob) => {
    if (!data) {
      ToastError("Không có dữ liệu");

      return;
    }

    try {
      if (!action) {
        ToastError("Không có hành động");
        return;
      }

      switch (action) {
        case "start":
          await a_StartCronJob(data);
          break;
        case "stop":
          await a_StopCronJob(data);
          break;
      }

      ToastSuccess(`${action.toLowerCase()} thành công!`);

      getDataCronJobs();
    } catch (ex) {
      console.log("ex", ex);
      ToastError("Có lỗi xảy ra!");
    }
  };

  const handleDeleteCronJob = async (data: TypeJob) => {
    if (!data) return;

    try {
      const result = await a_DeleteCronJob(data);

      ToastSuccess(`${result.message}`);

      getDataCronJobs();
    } catch (ex) {
      console.log("ex ", ex);
    }
  };

  const reloadCronJob = async () => {
    getDataCronJobs();
  };

  useEffect(() => {
    setDataLoading(true);
    getDataCronJobs();
    setDataLoading(false);
  }, []);

  return (
    <div className="w-full p-4">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter name..."
          // value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          // onChange={(event) =>
          //   table.getColumn("name")?.setFilterValue(event.target.value)
          // }
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }>
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogAdd onRefresh={getDataCronJobs} />
        <Button
          variant="outline"
          className="ml-2 cursor-pointer"
          onClick={() => openDialog("add")}>
          <CirclePlus />
        </Button>
        <Button
          variant="outline"
          className="ml-2 cursor-pointer"
          onClick={reloadCronJob}>
          <RefreshCw />
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {!dataLoading && table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : dataLoading ? (
              <TableRow>
                <TableCell
                  colSpan={getColumns().length}
                  className="h-24 text-center">
                  <div className="flex p-4 w-full justify-center items-center gap-2">
                    <Loader className="animate-spin" />
                    <span>Loading data</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={getColumns().length}
                  className="h-24 text-center">
                  No data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
