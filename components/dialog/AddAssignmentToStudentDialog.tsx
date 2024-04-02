"use client";

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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Plus } from "lucide-react";

import toast from "react-hot-toast";

import httpClient from "@/app/httpClient";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";

interface AddAssignmentToStudentProps {
  student_id: string;
}

const AddAssignmentToStudentDialog: React.FC<AddAssignmentToStudentProps> = ({
  student_id,
}) => {
  const [assignmentGrade, setAssignmentGrade] = useState("");
  const [assignmentId, setAssignmentId] = useState("");
  const { toast } = useToast();

  async function addassignment() {
    try {
      const resp = await httpClient.post(
        `//${process.env.NEXT_PUBLIC_BACKEND_URL}/students/assignments`,
        {
          assignment_id: assignmentId,
          student_id: student_id,
          grade: assignmentGrade,
        }
      );
      console.log(resp.data);
    } catch (error: any) {
      console.log(error.response);
      if (error.response?.status) {
        toast({
          variant: "destructive",
          title: "Error adding an assignment",
          description: error.response.data["error"],
        });
      }
    }
    return;
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add Assignment To Student</DialogTitle>
        <DialogDescription>
          Input valid information to add an assignment to a student
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="assignment_id" className="text-right">
            Assignment ID
          </Label>
          <Input
            id="assignment_id"
            placeholder="85"
            className="col-span-3"
            onChange={(e) => setAssignmentId(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="grade" className="text-right">
            Assignment Grade
          </Label>
          <Input
            id="grade"
            placeholder="John Doe"
            className="col-span-3"
            onChange={(e) => setAssignmentGrade(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="submit" onClick={addassignment}>
            Add Assignment
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default AddAssignmentToStudentDialog;
