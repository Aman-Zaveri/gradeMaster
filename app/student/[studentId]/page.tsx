import CourseTitle from "@/components/CourseTitle";
import Sidebar from "@/components/Sidebar";
import AddStudentDialog from "@/components/dialog/AddStudentDialog";
import { User } from "lucide-react";
import StudentDataTable from "@/components/StudentDataTable";
import AddAssignmentDialog from "@/components/dialog/AddAssignmentDialog";
import AssignmentDataTable from "@/components/AssignmentDataTable";
import AddProjectDialog from "@/components/dialog/AddProjectDialog";
import ProjectDataTable from "@/components/ProjectDataTable";
import StudentTitle from "@/components/StudentTitle";
import StudentAssignmentDataTable from "@/components/StudentAssignmentDataTable";
import StudentProjectDataTable from "@/components/StudentProjectDataTable";

interface IParams {
  studentId: string;
}

export default async function StudentID({ params }: { params: IParams }) {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="p-8 flex flex-col gap-7 w-full">
        <div className="flex flex-col gap-3">
          <div className="w-full flex justify-between items-center">
            <div className="flex gap-2">
              <User />
              <div className="text-lg font-bold">Assignment List</div>
            </div>
          </div>
          <div className="border"></div>
          <StudentAssignmentDataTable studentId={params.studentId} />
        </div>
        <div className="flex flex-col gap-3">
          <div className="w-full flex justify-between items-center">
            <div className="flex gap-2">
              <User />
              <div className="text-lg font-bold">Project List</div>
            </div>
          </div>
          <div className="border"></div>
          <StudentProjectDataTable studentId={params.studentId} />
        </div>
      </div>
    </div>
  );
}
