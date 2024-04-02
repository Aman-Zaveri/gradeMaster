import React, { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";

import { Calendar, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import EditCourseDialog from "./dialog/EditCourseDialog";

interface CourseCardProps {
    course: {
        id: string;
        name: string;
        code: string;
        location: string;
        start: string;
        end: string;
        days: string;
    };
}

const CourseCard: React.FC<CourseCardProps> = ({course}) => {

  return (
    <div className="w-full">
      <Card key={course.id}>
        <CardHeader>
          <CardTitle className="text-lg">{course.name}</CardTitle>
          <CardDescription>Course Code: {course.code}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <MapPin size={20} />
            <span className="text-sm">{course.location}</span>
          </div>
          <div className="flex gap-2 items-center">
            <Clock size={20} />
            <span className="text-sm">
              {course.start} - {course.end}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <Calendar size={20} />
            <span className="text-sm">{course.days}</span>
          </div>
        </CardContent>
        <CardFooter className="flex gap-3">
          <EditCourseDialog course={course}/>
          <Link href={`/course/${course.id}`}>
            <Button>View Class</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default CourseCard;
