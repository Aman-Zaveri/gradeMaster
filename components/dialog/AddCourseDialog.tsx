import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
import httpClient from "@/app/httpClient";

function AddCourseDialog() {
  const [courseName, setCourseName] = useState<string>("");
  const [courseCode, setCourseCode] = useState<string>("");
  const [courseLocation, setCourseLocation] = useState<string>("");
  const [courseStart, setCourseStart] = useState<string>("");
  const [courseEnd, setCourseEnd] = useState<string>("");
  const [courseDays, setCourseDays] = useState<string>("");
  
  const addCourse = async () => {
    try {
      const response = await httpClient.post(
        `//${process.env.NEXT_PUBLIC_BACKEND_URL}/courses`,
        {
          name: courseName,
          code: courseCode,
          location: courseLocation,
          start: courseStart,
          end: courseEnd,
          days: courseDays,
        }
      );
      console.log(response.data);
    } catch (error: any) {
      console.log("Not authenticated");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="absolute bottom-0 right-0 m-7 rounded-full"
            size="icon"
          >
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Course</DialogTitle>
            <DialogDescription>
              Input valid information to add a new course
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Course Name
              </Label>
              <Input
                id="name"
                placeholder="Introduction to Calculus"
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
                placeholder="MATH-116"
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
                placeholder="Math Building Room 101"
                className="col-span-3"
                onChange={(e) => setCourseLocation(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start_time" className="text-right">
                Start Time
              </Label>
              <Input
                id="start_time"
                placeholder="10:30 am"
                className="col-span-3"
                onChange={(e) => setCourseStart(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end_time" className="text-right">
                End Time
              </Label>
              <Input
                id="end_time"
                placeholder="11:20 am"
                className="col-span-3"
                onChange={(e) => setCourseEnd(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="days" className="text-right">
                Course Days
              </Label>
              <Input
                id="days"
                placeholder="Monday, Wednesday, Friday"
                className="col-span-3"
                onChange={(e) => setCourseDays(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={addCourse}>
                Add Class
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddCourseDialog;
