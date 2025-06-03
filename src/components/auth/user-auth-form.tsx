"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  formType: "signin" | "signup";
}

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  role: z.enum(["farmer", "agri-business", "consumer"]).optional(),
}).refine(data => {
  // if formType is signup, role is required
  if (formTypeGlobal === "signup") {
    return !!data.role;
  }
  return true;
}, {
  message: "Role is required for sign up.",
  path: ["role"],
});


let formTypeGlobal: "signin" | "signup" = "signin"; // Hack to get formType into refine

export function UserAuthForm({ className, formType, ...props }: UserAuthFormProps) {
  formTypeGlobal = formType; // Update global hack
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);

    // In a real app, you would call Firebase Auth here.
    // For now, we'll just show a toast and redirect.
    toast({
      title: formType === "signin" ? "Signed In Successfully" : "Account Created Successfully",
      description: `Welcome, ${values.email}! Redirecting to dashboard...`,
    });
    router.push("/dashboard");
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              disabled={isLoading}
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
            )}
          </div>
          {formType === "signup" && (
             <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select
                onValueChange={(value) => form.setValue("role", value as "farmer" | "agri-business" | "consumer")}
                disabled={isLoading}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="farmer">Farmer</SelectItem>
                  <SelectItem value="agri-business">Agri-Business</SelectItem>
                  <SelectItem value="consumer">Consumer</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.role && (
                <p className="text-sm text-destructive">{form.formState.errors.role.message}</p>
              )}
            </div>
          )}
          <Button disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {formType === "signin" ? "Sign In" : "Create Account"}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {/* Placeholder for social login */}
        <Icons.google className="mr-2 h-4 w-4" /> Google
      </Button>
    </div>
  );
}

// Add spinner and google icons to Icons component
Icons.spinner = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("animate-spin", className)}
    {...props}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

Icons.google = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={cn("h-4 w-4", className)} {...props}>
    <title>Google</title>
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.05 1.05-2.36 1.84-4.06 1.84-4.81 0-8.6-3.89-8.6-8.72s3.8-8.72 8.6-8.72c2.63 0 4.5.94 5.63 1.95l2.62-2.58C18.04.66 15.79 0 12.48 0 5.86 0 0 5.96 0 12.73s5.86 12.73 12.48 12.73c3.54 0 6.71-1.22 8.98-3.21.24-.2.47-.41.68-.62v-2.18h-9.15Z" fill="currentColor"/>
  </svg>
);
