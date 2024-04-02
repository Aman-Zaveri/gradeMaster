"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import httpClient from "@/app/httpClient";

function LoginForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [variant, setVariant] = useState<"LOGIN" | "REGISTER">("LOGIN");
  
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get(`//${process.env.NEXT_PUBLIC_BACKEND_URL}/@me`);
        router.push("/dashboard");
      } catch (error: any) {
        console.log("Not authenticated");
      }
    })();
  }, []);

  function toggleVariant() {
    setVariant(variant === "LOGIN" ? "REGISTER" : "LOGIN");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (variant === "REGISTER") {
      console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
      try {
        const resp = await httpClient.post(`//${process.env.NEXT_PUBLIC_BACKEND_URL}/register`, {
          name,
          email,
          password,
        });
        console.log(resp.data);
        router.push("/dashboard");
      } catch (error: any) {
        if (error.response?.status) {
          console.log(error.response.status);
          console.log(error.response.data);
          toast({
            variant: "destructive",
            title: "Error creating account",
            description: error.response.data['error'],
          });
        }
      }
    } else {
      try {
        const resp = await httpClient.post(`//${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
          email,
          password,
        });
        console.log(resp.data);
        router.push("/dashboard");
      } catch (error: any) {
        if (error.response?.status) {
          toast({
            variant: "destructive",
            title: "Error logging in",
            description: error.response.data['error'],
          });
        }
      }
    }

    setIsLoading(false);
    return;
  }

  return (
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white p-3 rounded-lg shadow">
        <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-start gap-2 pl-10 mt-4">
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
            {variant === "LOGIN" ? "Welcome Back!" : "Welcome to GradeMaster!"}
          </h2>
          <span className="text-center text-sm text-gray-500">
            {variant === "LOGIN"
              ? "Sign in with valid credentials"
              : "Sign up with valid credentials"}
          </span>
        </div>
        <div className="px-4 py-8 shadowsm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {variant === "REGISTER" && (
              <Input
                disabled={isLoading}
                id="name"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                className="py-6 focus:border-transparent bg-white"
              />
            )}
            <Input
              disabled={isLoading}
              id="email"
              placeholder="Email address"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="py-6 focus:border-transparent bg-white"
            />
            <Input
              disabled={isLoading}
              id="password"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="py-6 focus:border-transparent bg-white"
            />
            <div className="w-full flex justify-center">
              <Button
                disabled={isLoading}
                type="submit"
                className="w-1/2 py-6 font-light bg-primary hover:primary/90"
              >
                {variant === "LOGIN" ? "Sign in" : "Register"}
              </Button>
            </div>
          </form>
          <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
            <div>
              {variant === "LOGIN"
                ? "New to GradeMaster?"
                : "Already have an account?"}
            </div>
            <div
              onClick={toggleVariant}
              className="cursor-pointer text-primary hover:underline"
            >
              {variant === "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
  );
}

export default LoginForm;
