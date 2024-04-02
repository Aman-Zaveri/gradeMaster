"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditStudentDialog from "@/components/dialog/EditStudentDialog";
import { Dialog } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";
import DeleteStudentDialog from "@/components/dialog/DeleteStudentDialog";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import DeleteAssignmentDialog from "@/components/dialog/DeleteAssignmentDialog";
import EditAssignmentDialog from "@/components/dialog/EditAssignmentDialog";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Assignment = {
  id: string;
  name: string;
  start: string;
  due: string;
  weight: string;
  high: number | "No Grades";
  low: number | "No Grades";
  average: number | "No Grades";
};

export const columns: ColumnDef<Assignment>[] = [
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
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Assignment ID",
  },
  {
    accessorKey: "start",
    header: "Start date",
  },
  {
    accessorKey: "due",
    header: "Due date",
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "highest",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Highest Grade
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const highest = parseFloat(row.getValue("highest"));
      return (
        <div className="text-center">
          {highest ? <div>{highest}%</div> : <div>No Grades</div>}
        </div>
      );
    },
  },
  {
    accessorKey: "lowest",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Lowest Grade
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const lowest = parseFloat(row.getValue("lowest"));
      return (
        <div className="text-center">
          {lowest ? <div>{lowest}%</div> : <div>No Grades</div>}
        </div>
      );
    },
  },
  {
    accessorKey: "average",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Average Grade
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const average = parseFloat(row.getValue("average"));
      return (
        <div className="text-center">
          {average ? <div>{average}%</div> : <div>No Grades</div>}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const assignment = row.original;

      enum Dialogs {
        EditAssignment = "edit-assignment",
        DeleteAssignment = "delete-assignment",
      }

      const [dialog, setDialog] = useState("");

      return (
        <Dialog>
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DialogTrigger
                  asChild
                  onClick={() => {
                    setDialog(Dialogs.EditAssignment);
                  }}
                >
                  <DropdownMenuItem>Edit Assignment</DropdownMenuItem>
                </DialogTrigger>
                <AlertDialogTrigger
                  asChild
                  onClick={() => {
                    setDialog(Dialogs.DeleteAssignment);
                  }}
                >
                  <DropdownMenuItem>Delete Assignment</DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            {dialog === Dialogs.EditAssignment && (
              <EditAssignmentDialog assignment={assignment} />
            )}
            {dialog === Dialogs.DeleteAssignment && (
              <DeleteAssignmentDialog assignmentId={assignment.id} />
            )}
          </AlertDialog>
        </Dialog>
      );
    },
  },
];
