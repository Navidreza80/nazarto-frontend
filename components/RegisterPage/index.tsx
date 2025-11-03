"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/hooks/useRegister";
import { cn } from "@/lib/utils";
import registerValidationSchema from "@/schemas/registerSchema";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useFormik } from "formik";
import { Loader } from "lucide-react";
import Link from "next/link";

const fp = typeof window !== undefined && (await FingerprintJS.load());
const result = fp && (await fp.get());
const fingerprint = result && result.visitorId;

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { mutate, isPending } = useRegister();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      if (fingerprint) {
        mutate({ ...values, fingerprint });
      }
    },
    validationSchema: registerValidationSchema,
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className={cn("flex flex-col gap-8 w-full", className)}
      {...props}
    >
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary">
          Join Nazarto
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Create your account to start creating surveys
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username" className="font-semibold">
            Username
          </Label>
          <Input
            value={formik.values.username}
            onChange={formik.handleChange}
            id="username"
            name="username"
            type="text"
            placeholder="Choose a username"
            required
            className="h-12 rounded-xl px-4 border-border focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all"
          />
          {formik.errors.username && formik.touched.username ? (
            <div className="text-red-500 text-sm">{formik.errors.username}</div>
          ) : null}
        </div>
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
          {formik.errors.email && formik.touched.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
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
            placeholder="Create a strong password"
            className="h-12 rounded-xl px-4 border-border focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className="h-12 rounded-xl text-base font-semibold bg-primary/70 cursor-pointer text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all"
        >
          {isPending ? <Loader className="animate-spin" /> : "Create Account"}
        </Button>
      </div>
      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary hover:text-primary/80 underline underline-offset-4"
        >
          Sign in
        </Link>
      </div>
    </form>
  );
}
