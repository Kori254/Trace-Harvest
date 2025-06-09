
"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function ConsumerDashboard() {
  const { toast } = useToast();
  const router = useRouter();

  const handleScanProduct = () => {
    router.push("/traceability");
  };

  const handleViewResource = (resource: string) => {
    if (resource === 'education') {
      router.push('/education');
    } else {
      toast({
        title: "Coming Soon",
        description: `Information on ${resource} will be available soon.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight font-headline text-foreground">Consumer Dashboard</h1>
      </div>
      <p className="text-muted-foreground">
        Welcome! Scan your products to trace their journey or learn more about food safety and sustainable practices.
      </p>

      <Card className="shadow-lg bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Trace Your Food</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Scan the QR code on your product packaging to see its full story from farm to you.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center text-center">
          <Icons.qrCode className="h-16 w-16 mb-4" />
          <Button 
            onClick={handleScanProduct} 
            size="lg" 
            className="bg-background text-primary hover:bg-background/90"
          >
            Scan Product QR Code
          </Button>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-lg bg-card">
          <CardHeader>
            <Icons.package className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="font-headline">Recently Scanned Products</CardTitle>
            <CardDescription>View products you've recently traced.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for recently scanned items */}
            <div className="border-2 border-dashed border-border rounded-md p-6 text-center text-muted-foreground">
              <p>No products scanned yet. Scan a product to see its details here!</p>
            </div>
            <Button variant="link" className="mt-2 px-0" onClick={() => handleViewResource('scan history')}>View Full Scan History (Soon)</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-card">
          <CardHeader>
            <Icons.education className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="font-headline">Learn & Discover</CardTitle>
            <CardDescription>Explore resources on food safety and farming.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={() => handleViewResource('education')}>
              <Icons.bookOpen className="mr-2 h-4 w-4" /> Food Safety Guides
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => handleViewResource('featured farms')}>
              <Icons.farmManagement className="mr-2 h-4 w-4" /> Featured Farms & Producers
            </Button>
             <Button variant="outline" className="w-full justify-start" onClick={() => handleViewResource('sustainability')}>
              <Icons.leaf className="mr-2 h-4 w-4" /> Sustainability Practices
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg bg-card">
        <CardHeader>
          <Icons.home className="h-8 w-8 text-primary mb-2" />
          <CardTitle className="font-headline">Featured Farm: Willow Creek Organics</CardTitle>
          <CardDescription>Learn about one of our transparent and sustainable partner farms.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4 items-center">
          <Image 
            src="https://placehold.co/300x200.png" 
            alt="Willow Creek Organics Farm" 
            width={300} 
            height={200}
            data-ai-hint="organic farm landscape"
            className="rounded-md shadow-md"
          />
          <div className="space-y-2">
            <p className="text-muted-foreground">
              Willow Creek Organics is dedicated to providing fresh, healthy produce using sustainable farming methods. 
              They believe in transparency and allow consumers to trace every step of their food's journey.
            </p>
            <Button variant="default" onClick={() => handleViewResource('Willow Creek Organics profile')}>
                Visit Farm Profile (Soon)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
