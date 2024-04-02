"use client";

import React, { useEffect, useState } from "react";
import httpClient from "@/app/httpClient";
import { Course } from "@/app/types";
import Image from "next/image";
import CourseCard from "@/components/CourseCard";
import AddCourseDialog from "./dialog/AddCourseDialog";

function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get(
          `//${process.env.NEXT_PUBLIC_BACKEND_URL}/courses`
        );
        setCourses([...courses, ...resp.data]);
        console.log(resp.data);
      } catch (error: any) {
        console.log("Not authenticated");
      }
    })();
  }, []);

  return (
    <div className="w-full p-3">
      {courses.length > 0 ? (
        <div className="w-full flex flex-wrap">
          {courses.map((course: Course) => (
            <div className="w-1/3 p-2" key={course.id}>
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      ) : (
        <div className="h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl font-bold">You have no courses!</h1>
            <span className="text-sm text-gray-500">
              To get started, add some courses by clicking the plus sign in the
              bottom right corner
            </span>
            <Image
              src="/emptyCourses.svg"
              alt="Empty Courses Image"
              width={300}
              height={300}
              className="mt-7"
            />
          </div>
        </div>
      )}
      <AddCourseDialog />
    </div>
  );
}

export default CourseList;
