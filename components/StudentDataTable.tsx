import React from "react";
import { Student, columns } from "@/app/course/students/column";
import { DataTable } from "@/app/course/students/data-table";
import httpClient from "@/app/httpClient";

interface StudentDataTableProps {
  courseId: string;
}

export default async function StudentDataTable({ courseId }: StudentDataTableProps) {
  return <DataTable columns={columns} courseId={courseId}/>;
}
