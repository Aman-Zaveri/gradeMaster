"use client";

import React, { useEffect, useState } from "react";
import Avatar from "./UserAvatar";
import httpClient from "@/app/httpClient";
import { useRouter } from "next/navigation";
import SidebarCourses from "./SidebarCourses";
import { Course } from "@/app/types";
import { LayoutDashboard } from "lucide-react";
import { Button } from "./ui/button";
import UserAvatar from "./UserAvatar";
import Link from "next/link";

function Sidebar() {
  const [user, setUser] = useState<any>({});
  const [courses, setCourses] = useState<Course[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get(
          `//${process.env.NEXT_PUBLIC_BACKEND_URL}/@me`
        );
        setUser(resp.data);
        const response = await httpClient.get(
          `//${process.env.NEXT_PUBLIC_BACKEND_URL}/courses`
        );
        setCourses([...courses, ...response.data]);
        console.log(response.data);
        console.log(resp.data);
      } catch (error: any) {
        console.log("Not authenticated");
        router.push("/");
      }
    })();
  }, []);

  return (
    <div className="lg:w-60 w-32 border-r h-screen">
      <div className="py-5 px-3 flex flex-col gap-3">
        <UserAvatar name={user?.name} email={user?.email} />
        <div className="border"></div>
        <div className="flex flex-col">
          <Button
            variant="ghost"
            className="flex gap-3 justify-center lg:justify-start py-6"
          >
            <Link href="/dashboard" className="flex gap-3 justify-center lg:justify-start py-6">
              <LayoutDashboard />
              <span className="hidden lg:flex">Dashboard</span>
            </Link>
          </Button>
        </div>
        <div className="border"></div>
        <SidebarCourses courses={courses} />
      </div>
    </div>
  );
}

export default Sidebar;
