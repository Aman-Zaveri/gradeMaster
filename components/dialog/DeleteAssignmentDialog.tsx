import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import httpClient from "@/app/httpClient";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";

interface DeleteAssignmentProps {
  assignmentId: string;
}

const DeleteAssignmentDialog: React.FC<DeleteAssignmentProps> = ({
  assignmentId,
}) => {
  const { toast } = useToast();

  const deleteStudent = async () => {
    try {
      const resp = await httpClient.delete(
        `//${process.env.NEXT_PUBLIC_BACKEND_URL}/assignments/${assignmentId}`
      );
    } catch (error: any) {
      console.log(error.response);
      if (error.response?.status) {
        toast({
          variant: "destructive",
          title: "Error deleting assignment",
          description: error.response.data["error"],
        });
      }
    }
    return;
  };

  return (
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want to delete this assignment?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            student and remove their data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteStudent();
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
  );
};

export default DeleteAssignmentDialog;
