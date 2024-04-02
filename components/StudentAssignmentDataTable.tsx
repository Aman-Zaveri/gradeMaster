import React from "react";
import { Assignment, columns } from "@/app/student/assignments/column";
import httpClient from "@/app/httpClient";
import { DataTable } from "@/app/student/assignments/data-table";

interface StudentAssignmentDataTableProps {
  studentId: string;
}

export default async function StudentAssignmentDataTable({
  studentId,
}: StudentAssignmentDataTableProps) {
  return <DataTable columns={columns} studentId={studentId} />;
}
