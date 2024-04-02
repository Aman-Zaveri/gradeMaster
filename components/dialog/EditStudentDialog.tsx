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

interface EditStudentDialogProps {
  student: {
    id: string;
    name: string;
    grade: number;
  };
}

const EditStudentDialog: React.FC<EditStudentDialogProps> = ({ student }) => {
  const [studentName, setStudentName] = useState<string>(student.name);
  const [studentGrade, setStudentGrade] = useState<number>(student.grade);

  const { toast } = useToast();

  async function updateStudent() {
    try {
      const resp = await httpClient.put(
        `//${process.env.NEXT_PUBLIC_BACKEND_URL}/students/${student.id}`,
        {
          name: studentName,
          grade: studentGrade,
        }
      );
      console.log(resp.data);
    } catch (error: any) {
      console.log(error.response);
      if (error.response?.status) {
        toast({
          variant: "destructive",
          title: "Error updating student information",
          description: error.response.data["error"],
        });
      }
    }
    return;
  }
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogDescription>Edit the student information</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Student Name
          </Label>
          <Input
            id="name"
            defaultValue={student.name}
            className="col-span-3"
            onChange={(e) => setStudentName(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="grade" className="text-right">
            Course Code
          </Label>
          <Input
            id="grade"
            defaultValue={student.grade}
            className="col-span-3"
            onChange={(e) => setStudentGrade(Number(e.target.value))}
          />
        </div>
      </div>
      <DialogFooter className="flex justify-between">
        <DialogClose asChild>
          <Button type="submit" onClick={() => updateStudent()}>
            Update Changes
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default EditStudentDialog;
