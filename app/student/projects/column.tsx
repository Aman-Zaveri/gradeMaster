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
import DeleteProjectDialog from "@/components/dialog/DeleteProjectDialog";
import EditProjectDialog from "@/components/dialog/EditProjectDialog";
import StudentEditProjectDialog from "@/components/dialog/StudentEditProjectDialog";
import StudentDeleteProjectDialog from "@/components/dialog/StudentDeleteProjectDialog";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Project = {
  id: string;
  name: string;
  start: string;
  due: string;
  grade: number | null;
};

export const columns: ColumnDef<Project>[] = [
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
    header: "Project ID",
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
    accessorKey: "grade",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Grade
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const project = row.original;

      enum Dialogs {
        EditProject = "edit-project",
        DeleteProject = "delete-project",
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
                    setDialog(Dialogs.EditProject);
                  }}
                >
                  <DropdownMenuItem>Edit Project</DropdownMenuItem>
                </DialogTrigger>
                <AlertDialogTrigger
                  asChild
                  onClick={() => {
                    setDialog(Dialogs.DeleteProject);
                  }}
                >
                  <DropdownMenuItem>Delete Project</DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            {dialog === Dialogs.EditProject && (
              <StudentEditProjectDialog project={project} studentId={""}/>
            )}
            {dialog === Dialogs.DeleteProject && (
              <StudentDeleteProjectDialog projectId={project.id} studentId={""}/>
            )}
          </AlertDialog>
        </Dialog>
      );
    },
  },
];
