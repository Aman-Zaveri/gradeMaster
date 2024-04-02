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

interface AddProjectProps {
  id: string;
}

const AddProjectDialog: React.FC<AddProjectProps> = ({ id }) => {
  const [projectName, setProjectName] = useState("");
  const [projectStart, setProjectStart] = useState("");
  const [projectDue, setProjectDue] = useState("");
  const [projectWeight, setProjectWeight] = useState("");
  const { toast } = useToast();

  async function addproject() {
    try {
      const resp = await httpClient.post(`//${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`, {
        name: projectName,
        start: projectStart,
        due: projectDue,
        weight: projectWeight,
        course_id: id,
      });
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
            <DialogTitle>Add Project</DialogTitle>
            <DialogDescription>
              Input valid information to add an project
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Project Name
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
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
                placeholder="85"
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
                placeholder="85"
                className="col-span-3"
                onChange={(e) => setProjectDue(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="weight" className="text-right">
                Weight
              </Label>
              <Input
                id="weight"
                placeholder="85"
                className="col-span-3"
                onChange={(e) => setProjectWeight(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={addproject}>
                Add Project
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddProjectDialog;
