"use client";

import React, { useEffect, useState } from "react";
import httpClient from "@/app/httpClient";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "./ui/use-toast";
import { Teacher } from "@/app/types";

interface UserAvatarProps {
  name: string;
  email: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name, email }) => {
  const [userName, setUserName] = useState<string>(name);
  const [userEmail, setUserEmail] = useState<string>(email);
  const { toast } = useToast();
  const router = useRouter();

  const updateUserInfo = async () => {
    try {
      const resp = await httpClient.put(`//${process.env.NEXT_PUBLIC_BACKEND_URL}/update`, {
        name: userName,
        email: userEmail,
      });
      console.log(resp.data);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error changing user information",
        description: error.response.data["error"],
      });
    }
  };

  const logoutUser = async () => {
    try {
      const resp = await httpClient.post(`//${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`);
      console.log(resp.data);
      router.push("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error logging out",
        description: error.response.data["error"],
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full">
          <div className="flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors border shadow-sm p-3 rounded-lg">
            <Avatar className="bg-primary grid place-items-center">
              <span className="font-medium text-white text-center">
                {name?.charAt(0).toUpperCase()}
              </span>
            </Avatar>
            <div className="lg:flex flex-col hidden">
              <h1 className="text-start font-bold text-sm">{name}</h1>
              <span className="text-sm text-gray-500">{email}</span>
            </div>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue={userName}
              className="col-span-3"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              defaultValue={userEmail}
              className="col-span-3"
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" variant="destructive" onClick={logoutUser}>
              Log out
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" onClick={updateUserInfo}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserAvatar;
