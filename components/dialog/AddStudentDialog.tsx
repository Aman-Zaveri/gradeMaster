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

interface AddStudentDialogProps {
  id: string;
}

const AddStudentDialog: React.FC<AddStudentDialogProps> = ({ id }) => {
  const [studentName, setStudentName] = useState("");
  const [studentGrade, setStudentGrade] = useState("");
  const { toast } = useToast();

  async function addStudent() {
    try {
      const respAddStudent = await httpClient.post(`//${process.env.NEXT_PUBLIC_BACKEND_URL}/students`, {
        name: studentName,
        grade: studentGrade,
        course_id: id,
      });
      console.log(respAddStudent.data);
    } catch (error: any) {
      console.log(error.response);
      if (error.response?.status) {
        toast({
          variant: "destructive",
          title: "Error adding a student",
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
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-200 rounded-full"
          >
            <Plus className="text-primary" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Student</DialogTitle>
            <DialogDescription>
              Input valid information to add a student
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Student Name
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                className="col-span-3"
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Grade" className="text-right">
                Grade
              </Label>
              <Input
                id="Grade"
                placeholder="85"
                className="col-span-3"
                onChange={(e) => setStudentGrade(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={addStudent}>
                Add Student
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddStudentDialog;
