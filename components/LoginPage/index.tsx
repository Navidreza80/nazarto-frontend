"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/useLogin";
import { cn } from "@/lib/utils";
import loginValidationSchema from "@/schemas/loginSchema";
import { useFormik } from "formik";
import { Loader } from "lucide-react";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { mutate, isPending } = useLogin();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      mutate(values);
    },
    validationSchema: loginValidationSchema,
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className={cn("flex flex-col gap-8 w-full", className)}
      {...props}
    >
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary">
          Welcome to Nazarto
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Sign in to access your survey dashboard
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email" className="font-semibold">
            Email
          </Label>
          <Input
            value={formik.values.email}
            onChange={formik.handleChange}
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="h-12 rounded-xl px-4 border-border focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all"
          />
          {formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password" className="font-semibold">
            Password
          </Label>

          <Input
            value={formik.values.password}
            onChange={formik.handleChange}
            id="password"
            name="password"
            type="password"
            required
            placeholder="Enter your password"
            className="h-12 rounded-xl px-4 border-border focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all"
          />
          {formik.errors.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="h-12 rounded-xl text-base font-semibold bg-primary/70 cursor-pointer text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all"
        >
          {isPending ? <Loader className="animate-spin" /> : "Sign In"}
        </Button>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-primary hover:text-primary/80 underline underline-offset-4"
        >
          Sign up
        </Link>
      </div>
    </form>
  );
}
