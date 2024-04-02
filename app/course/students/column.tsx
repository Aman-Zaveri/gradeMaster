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
import AddAssignmentToStudentDialog from "@/components/dialog/AddAssignmentToStudentDialog";
import Link from "next/link";
import AddProjectToStudentDialog from "@/components/dialog/AddProjectToStudentDialog";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Student = {
  id: string;
  name: string;
  grade: number;
  status: "Passing" | "Failing";
};

export const columns: ColumnDef<Student>[] = [
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
    header: "Student ID",
  },
  {
    accessorKey: "grade",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Grade
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const grade = parseFloat(row.getValue("grade"));
      return <div className="text-center font-medium">{grade}%</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const status: any = row.getValue("status");
      return (
        <div className="text-center font-medium">
          {status === "Passing" ? (
            <div className="text-emerald-400 bg-emerald-50 py-2 rounded border border-emerald-400">
              Passing
            </div>
          ) : (
            <div className="text-red-400 bg-red-50 py-2 rounded border border-red-400">
              Failing
            </div>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const student = row.original;

      enum Dialogs {
        EditStudent = "edit-student",
        AddAssignment = "add-assignment",
        AddProject = "add-project",
        DeleteStudent = "delete-student",
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
                <Link href={`/student/${student.id}`}>
                  <DropdownMenuItem>View student</DropdownMenuItem>
                </Link>
                <DialogTrigger
                  asChild
                  onClick={() => {
                    setDialog(Dialogs.EditStudent);
                  }}
                >
                  <DropdownMenuItem>Edit Student</DropdownMenuItem>
                </DialogTrigger>
                <AlertDialogTrigger
                  asChild
                  onClick={() => {
                    setDialog(Dialogs.DeleteStudent);
                  }}
                >
                  <DropdownMenuItem>Delete Student</DropdownMenuItem>
                </AlertDialogTrigger>
                <DropdownMenuSeparator />
                <DialogTrigger
                  asChild
                  onClick={() => {
                    setDialog(Dialogs.AddAssignment);
                  }}
                >
                  <DropdownMenuItem>Add Assignment</DropdownMenuItem>
                </DialogTrigger>
                <DialogTrigger
                  asChild
                  onClick={() => {
                    setDialog(Dialogs.AddProject);
                  }}
                >
                  <DropdownMenuItem>Add Project</DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            {dialog === Dialogs.EditStudent && (
              <EditStudentDialog student={student} />
            )}
            {dialog === Dialogs.DeleteStudent && (
              <DeleteStudentDialog studentId={student.id} />
            )}
            {dialog === Dialogs.AddAssignment && (
              <AddAssignmentToStudentDialog student_id={student.id} />
            )}
            {dialog === Dialogs.AddProject && (
              <AddProjectToStudentDialog student_id={student.id} />
            )}
          </AlertDialog>
        </Dialog>
      );
    },
  },
];
