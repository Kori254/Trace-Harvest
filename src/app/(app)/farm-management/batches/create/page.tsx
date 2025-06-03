
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function CreateBatchPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real app, you would handle form submission, API calls, etc.
    toast({
      title: "Batch Creation Initiated",
      description: "Batch creation functionality is being implemented. This is a placeholder.",
    });
    // Potentially redirect after "successful" submission or clear form
    // router.push('/farm-management/batches'); 
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight font-headline text-foreground">Create New Batch</h1>
        <Button variant="outline" onClick={() => router.back()}>
          <Icons.logout className="mr-2 h-4 w-4 transform rotate-180" />
          Back to Batches
        </Button>
      </div>
      <p className="text-muted-foreground">
        Fill in the details below to create a new farm batch.
      </p>
      <Card className="shadow-lg bg-card">
        <CardHeader>
          <CardTitle className="font-headline text-card-foreground">New Batch Details</CardTitle>
          <CardDescription>All fields marked with * are required.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="batchId" className="font-semibold">Batch ID*</Label>
              <Input id="batchId" placeholder="e.g., CORN2024-001" className="mt-1 bg-background" required />
            </div>
            <div>
              <Label htmlFor="cropType" className="font-semibold">Crop Type*</Label>
              <Input id="cropType" placeholder="e.g., Corn, Tomatoes, Wheat" className="mt-1 bg-background" required />
            </div>
            <div>
              <Label htmlFor="plantingDate" className="font-semibold">Planting Date*</Label>
              <Input id="plantingDate" type="date" className="mt-1 bg-background" required />
            </div>
            <div>
              <Label htmlFor="location" className="font-semibold">Location / Field*</Label>
              <Input id="location" placeholder="e.g., North Field, Greenhouse A" className="mt-1 bg-background" required />
            </div>
            <div>
              <Label htmlFor="notes" className="font-semibold">Notes (Optional)</Label>
              <Textarea id="notes" placeholder="Any additional notes about this batch..." className="mt-1 bg-background min-h-[100px]" />
            </div>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Icons.package className="mr-2 h-4 w-4" />
              Create Batch
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
