"use client";

import React, { useEffect, useState } from "react";
import httpClient from "@/app/httpClient";
import { Student } from "@/app/types";

interface StudentTitleProps {
  studentId: string;
}

const StudentTitle: React.FC<StudentTitleProps> = ({ studentId }) => {
  const [student, setStudent] = useState<Student>();
  
    useEffect(() => {
      (async () => {
        try {
          const resp = await httpClient.get(
            `//${process.env.NEXT_PUBLIC_BACKEND_URL}/students/${studentId}`
          );
          setStudent(resp.data);
          console.log(resp.data);
        } catch (error: any) {
          console.log("Not authenticated");
        }
      })();
    }, []);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">{student?.name}</h1>
    </div>
  );
};

export default StudentTitle;
