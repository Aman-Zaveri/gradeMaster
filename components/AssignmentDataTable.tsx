import React from "react";
import { Assignment, columns } from "@/app/course/assignments/column";
import httpClient from "@/app/httpClient";
import { DataTable } from "@/app/course/assignments/data-table";

interface AssignmentDataTableProps {
  courseId: string;
}

export default async function AssignmentDataTable({
  courseId,
}: AssignmentDataTableProps) {
  return <DataTable columns={columns} courseId={courseId} />;
}
