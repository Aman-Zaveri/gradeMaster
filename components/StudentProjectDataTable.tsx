import React from "react";
import { Project, columns } from "@/app/student/projects/column";
import httpClient from "@/app/httpClient";
import { DataTable } from "@/app/student/projects/data-table";

interface StudentProjectDataTableProps {
  studentId: string;
}

export default async function StudentProjectDataTable({
  studentId,
}: StudentProjectDataTableProps) {
  return <DataTable columns={columns} studentId={studentId} />;
}
