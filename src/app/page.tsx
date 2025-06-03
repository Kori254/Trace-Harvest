import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold text-foreground font-headline">TraceHarvest</span>
        </Link>
        <nav className="space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button variant="default" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1 container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground font-headline">
            Revolutionizing Agriculture with Transparency and Safety
          </h1>
          <p className="text-lg text-muted-foreground">
            TraceHarvest connects farmers, agri-businesses, and consumers through a unified platform, ensuring food safety and complete traceability from farm to table.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/dashboard">Explore Features</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <Image 
            src="https://placehold.co/600x400.png" 
            alt="Abstract representation of agricultural technology"
            data-ai-hint="agriculture technology"
            width={600} 
            height={400} 
            className="rounded-lg shadow-xl"
          />
        </div>
      </main>

      <footer className="bg-muted/50 py-8 text-center">
        <div className="container mx-auto px-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TraceHarvest. All rights reserved.
          </p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="text-sm hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="text-sm hover:underline">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
