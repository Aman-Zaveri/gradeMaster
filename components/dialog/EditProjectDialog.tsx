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

interface EditProjectDialogProps {
  project: {
    id: string;
    name: string;
    start: string;
    due: string;
    weight: string;
  };
}

const EditProjectDialog: React.FC<EditProjectDialogProps> = ({
  project,
}) => {
  const [projectName, setProjectName] = useState(project.name);
  const [projectStart, setProjectStart] = useState(project.start);
  const [projectDue, setProjectDue] = useState(project.due);
  const [projectWeight, setProjectWeight] = useState(project.weight);
  const { toast } = useToast();

  async function updateProject() {
    try {
      const resp = await httpClient.put(
        `//${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${project.id}`,
        {
          name: projectName,
          start: projectStart,
          due: projectDue,
        }
      );
      console.log(resp.data);
    } catch (error: any) {
      console.log(error.response);
      if (error.response?.status) {
        toast({
          variant: "destructive",
          title: "Error updating project information",
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
        <DialogDescription>Edit the project information</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Project Name
          </Label>
          <Input
            id="name"
            defaultValue={project.name}
            className="col-span-3"
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="start" className="text-right">
            Start Date
          </Label>
          <Input
            id="start"
            defaultValue={project.start}
            className="col-span-3"
            onChange={(e) => setProjectStart(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="due" className="text-right">
            Due Date
          </Label>
          <Input
            id="due"
            defaultValue={project.due}
            className="col-span-3"
            onChange={(e) => setProjectDue(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="weight" className="text-right">
            Weight Date
          </Label>
          <Input
            id="weight"
            defaultValue={project.weight}
            className="col-span-3"
            onChange={(e) => setProjectWeight(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter className="flex justify-between">
        <DialogClose asChild>
          <Button type="submit" onClick={() => updateProject()}>
            Update Changes
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default EditProjectDialog;
