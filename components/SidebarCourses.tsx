import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Course } from "@/app/types";
import Link from "next/link";

interface SidebarCoursesProps {
  courses: Course[];
}

const SidebarCourses: React.FC<SidebarCoursesProps> = ({ courses }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-2">
        {courses.map((course: Course) => (
          <Link href={`/course/${course.id}`} key={course.id}>
            <Button
              variant="ghost"
              className="flex flex-col items-start w-full py-8"
            >
              <h1 className="text-gray-700 hidden lg:flex">{course.name}</h1>
              <span className="text-sm text-gray-500">{course.code}</span>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SidebarCourses;
