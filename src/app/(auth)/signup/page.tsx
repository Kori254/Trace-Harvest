import Link from "next/link";
import { UserAuthForm } from "@/components/auth/user-auth-form";
import { Icons } from "@/components/icons";

export default function SignUpPage() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-12 w-12 text-primary" />
        <h1 className="text-2xl font-semibold tracking-tight font-headline">
          Create your TraceHarvest Account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your details below to get started.
        </p>
      </div>
      <UserAuthForm formType="signup" />
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/auth/signin"
          className="underline underline-offset-4 hover:text-primary"
        >
          Sign In
        </Link>
      </p>
    </>
  );
}
