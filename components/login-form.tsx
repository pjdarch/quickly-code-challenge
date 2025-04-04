"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "@/lib/actions/auth";
import { LoginSchema, loginSchema } from "@/lib/schemas/auth";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    setIsLoading(true);
    setServerError("");

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    const response = await loginAction(formData);

    if (response?.error) {
      setServerError(response.error);
    } else {
      redirect("/profile");
    }

    setIsLoading(false); 
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Log in</h1>
        <p className="text-muted-foreground text-sm text-balance">
        Welcome back! Please sign in to continue.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} placeholder="Business email" required />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div className="grid gap-1">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} required />
          {errors.password  && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Loading..." : "Log in"}
        </Button>
      </div>
    </form>
  )
}
