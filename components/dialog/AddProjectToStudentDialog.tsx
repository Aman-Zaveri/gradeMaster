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

interface AddProjectToStudentProps {
  student_id: string;
}

const AddProjectToStudentDialog: React.FC<AddProjectToStudentProps> = ({
  student_id,
}) => {
  const [projectGrade, setProjectGrade] = useState("");
  const [projectId, setProjectId] = useState("");
  const { toast } = useToast();

  async function addProject() {
    try {
      const resp = await httpClient.post(
        `//${process.env.NEXT_PUBLIC_BACKEND_URL}/students/projects`,
        {
          project_id: projectId,
          student_id: student_id,
          grade: projectGrade,
        }
      );
      console.log(resp.data);
    } catch (error: any) {
      console.log(error.response);
      if (error.response?.status) {
        toast({
          variant: "destructive",
          title: "Error adding an project",
          description: error.response.data["error"],
        });
      }
    }
    return;
  }

  return (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Project To Student</DialogTitle>
            <DialogDescription>
              Input valid information to add an project to a student
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="project_id" className="text-right">
                Project ID
              </Label>
              <Input
                id="project_id"
                placeholder="85"
                className="col-span-3"
                onChange={(e) => setProjectId(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="grade" className="text-right">
                Project Grade
              </Label>
              <Input
                id="grade"
                placeholder="John Doe"
                className="col-span-3"
                onChange={(e) => setProjectGrade(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={addProject}>
                Add Project
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
  );
};

export default AddProjectToStudentDialog;
