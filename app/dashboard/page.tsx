import React from "react";
import Sidebar from "@/components/Sidebar";
import CourseList from "@/components/CourseList";

function Dashboard() {
  return (
    <div className="w-full h-full flex">
      <Sidebar />
      <CourseList />
    </div>
  );
}

export default Dashboard;
