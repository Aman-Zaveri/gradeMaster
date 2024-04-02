import React from "react";
import { Project, columns } from "@/app/course/projects/column";
import { DataTable } from "@/app/course/projects/data-table";

interface ProjectDataTableProps {
  courseId: string;
}

export default async function ProjectDataTable({
  courseId,
}: ProjectDataTableProps) {
  return <DataTable columns={columns} courseId={courseId} />;
}
