import React, { useState } from "react";
import httpClient from "@/app/httpClient";

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

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";

interface EditCourseDialogProps {
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

const EditCourseDialog: React.FC<EditCourseDialogProps> = ({ course }) => {
  const [courseName, setCourseName] = useState<string>(course.name);
  const [courseCode, setCourseCode] = useState<string>(course.code);
  const [courseLocation, setCourseLocation] = useState<string>(course.location);
  const [courseStart, setCourseStart] = useState<string>(course.start);
  const [courseEnd, setCourseEnd] = useState<string>(course.end);
  const [courseDays, setCourseDays] = useState<string>(course.days);

  const { toast } = useToast();

  async function deleteCourse(courseId: string) {
    try {
      const resp = await httpClient.delete(
        `//${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/${courseId}`
      );
    } catch (error: any) {
      console.log(error.response);
      if (error.response?.status) {
        toast({
          variant: "destructive",
          title: "Error deleting course",
          description: error.response.data["error"],
        });
      }
    }
    return;
  }

  async function updateCourse(courseId: string) {
    try {
      const resp = await httpClient.put(
        `//${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/${courseId}`,
        {
          name: courseName,
          code: courseCode,
          location: courseLocation,
          start: courseStart,
          end: courseEnd,
          days: courseDays,
        }
      );
      console.log(resp.data);
    } catch (error: any) {
      console.log(error.response);
      if (error.response?.status) {
        toast({
          variant: "destructive",
          title: "Error updating course",
          description: error.response.data["error"],
        });
      }
    }
    return;
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button type="submit" variant="secondary">
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>
              Edit the current course information
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Course Name
              </Label>
              <Input
                id="name"
                defaultValue={course.name}
                className="col-span-3"
                onChange={(e) => setCourseName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Course Code
              </Label>
              <Input
                id="username"
                defaultValue={course.code}
                className="col-span-3"
                onChange={(e) => setCourseCode(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                defaultValue={course.location}
                className="col-span-3"
                onChange={(e) => setCourseLocation(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start" className="text-right">
                Start Time
              </Label>
              <Input
                id="start"
                defaultValue={course.start}
                className="col-span-3"
                onChange={(e) => setCourseStart(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end" className="text-right">
                End Time
              </Label>
              <Input
                id="end"
                defaultValue={course.end}
                className="col-span-3"
                onChange={(e) => setCourseEnd(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="days" className="text-right">
                Class Days
              </Label>
              <Input
                id="days"
                defaultValue={course.days}
                className="col-span-3"
                onChange={(e) => setCourseDays(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            <DialogClose asChild>
              <Button
                type="submit"
                variant="destructive"
                onClick={() => deleteCourse(course.id)}
              >
                Delete
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" onClick={() => updateCourse(course.id)}>
                Update Changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditCourseDialog;
