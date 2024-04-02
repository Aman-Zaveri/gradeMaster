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

interface EditAssignmentDialogProps {
  assignment: {
    id: string;
    name: string;
    start: string;
    due: string;
    weight: string;
  };
}

const EditAssignmentDialog: React.FC<EditAssignmentDialogProps> = ({
  assignment,
}) => {
  const [assignmentName, setAssignmentName] = useState(assignment.name);
  const [assignmentStart, setAssignmentStart] = useState(assignment.start);
  const [assignmentDue, setAssignmentDue] = useState(assignment.due);
  const [assignmentWeight, setAssignmentWeight] = useState(assignment.weight);
  const { toast } = useToast();

  async function updateAssignment() {
    try {
      const resp = await httpClient.put(
        `//${process.env.NEXT_PUBLIC_BACKEND_URL}/assignments/${assignment.id}`,
        {
          name: assignmentName,
          start: assignmentStart,
          due: assignmentDue,
          weight: assignmentWeight,
        }
      );
      console.log(resp.data);
    } catch (error: any) {
      console.log(error.response);
      if (error.response?.status) {
        toast({
          variant: "destructive",
          title: "Error updating assignment information",
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
        <DialogDescription>Edit the assignment information</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Assignment Name
          </Label>
          <Input
            id="name"
            defaultValue={assignment.name}
            className="col-span-3"
            onChange={(e) => setAssignmentName(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="start" className="text-right">
            Start Date
          </Label>
          <Input
            id="start"
            defaultValue={assignment.start}
            className="col-span-3"
            onChange={(e) => setAssignmentStart(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="due" className="text-right">
            Due Date
          </Label>
          <Input
            id="due"
            defaultValue={assignment.due}
            className="col-span-3"
            onChange={(e) => setAssignmentDue(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="weight" className="text-right">
            Weight
          </Label>
          <Input
            id="weight"
            defaultValue={assignment.weight}
            className="col-span-3"
            onChange={(e) => setAssignmentWeight(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter className="flex justify-between">
        <DialogClose asChild>
          <Button type="submit" onClick={() => updateAssignment()}>
            Update Changes
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default EditAssignmentDialog;
