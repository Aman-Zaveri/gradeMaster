"use client";

import React, { useEffect, useState } from "react";
import httpClient from "@/app/httpClient";
import { Course } from "@/app/types";

interface CourseTitleProps {
  courseId: string;
}

const CourseTitle: React.FC<CourseTitleProps> = ({ courseId }) => {
  const [course, setCourse] = useState<Course>();
  
    useEffect(() => {
      (async () => {
        try {
          const resp = await httpClient.get(
            `//${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/${courseId}`
          );
          setCourse(resp.data);
          console.log(resp.data);
        } catch (error: any) {
          console.log("Not authenticated");
        }
      })();
    }, []);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">{course?.name}</h1>
      <span className="text-gray-500">{course?.code}</span>
    </div>
  );
};

export default CourseTitle;
