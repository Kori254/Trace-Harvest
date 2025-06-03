import Link from 'next/link';
import { Icons } from '@/components/icons';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://placehold.co/1200x800.png?text=Sustainable+Farming')",
            // data-ai-hint is not standard for style attributes, so we apply a class
          }}
          data-ai-hint="sustainable farming"
        />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/" className="flex items-center gap-2">
            <Icons.logo className="h-8 w-8 text-primary-foreground" /> {/* Ensuring visibility on dark bg */}
            <span className="font-headline">TraceHarvest</span>
          </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg font-headline">
              &ldquo;Empowering the future of agriculture with technology that ensures safety, transparency, and sustainability from seed to supper.&rdquo;
            </p>
            <footer className="text-sm">The TraceHarvest Team</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8 flex items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px]">
          {children}
          <p className="px-8 text-center text-sm text-muted-foreground">
            By continuing, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
