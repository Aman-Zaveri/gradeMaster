import CourseTitle from "@/components/CourseTitle";
import Sidebar from "@/components/Sidebar";
import AddStudentDialog from "@/components/dialog/AddStudentDialog";
import { User } from "lucide-react";
import { Student, columns } from "../students/column";
import { DataTable } from "../students/data-table";
import StudentDataTable from "@/components/StudentDataTable";
import AddAssignmentDialog from "@/components/dialog/AddAssignmentDialog";
import AssignmentDataTable from "@/components/AssignmentDataTable";
import AddProjectDialog from "@/components/dialog/AddProjectDialog";
import ProjectDataTable from "@/components/ProjectDataTable";

interface IParams {
  courseId: string;
}

export default async function CourseID({ params }: { params: IParams }) {

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="p-8 flex flex-col gap-7 w-full">
        <CourseTitle courseId={params.courseId} />
        <div className="flex flex-col gap-3">
          <div className="w-full flex justify-between items-center">
            <div className="flex gap-2">
              <User />
              <div className="text-lg font-bold">Student List</div>
            </div>
            <AddStudentDialog id={params.courseId} />
          </div>
          <div className="border"></div>
          <StudentDataTable courseId={params.courseId} />
        </div>
        <div className="flex flex-col gap-3">
          <div className="w-full flex justify-between items-center">
            <div className="flex gap-2">
              <User />
              <div className="text-lg font-bold">Assignment List</div>
            </div>
            <AddAssignmentDialog id={params.courseId} />
          </div>
          <div className="border"></div>
          <AssignmentDataTable courseId={params.courseId} />
        </div>
        <div className="flex flex-col gap-3">
          <div className="w-full flex justify-between items-center">
            <div className="flex gap-2">
              <User />
              <div className="text-lg font-bold">Project List</div>
            </div>
            <AddProjectDialog id={params.courseId} />
          </div>
          <div className="border"></div>
          <ProjectDataTable courseId={params.courseId} />
        </div>
      </div>
    </div>
  );
}
