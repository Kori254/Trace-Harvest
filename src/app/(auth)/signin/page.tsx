import Link from "next/link";
import { UserAuthForm } from "@/components/auth/user-auth-form";
import { Icons } from "@/components/icons";

export default function SignInPage() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-12 w-12 text-primary" />
        <h1 className="text-2xl font-semibold tracking-tight font-headline">
          Welcome Back to TraceHarvest
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account.
        </p>
      </div>
      <UserAuthForm formType="signin" />
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/signup"
          className="underline underline-offset-4 hover:text-primary"
        >
          Sign Up
        </Link>
      </p>
    </>
  );
}
