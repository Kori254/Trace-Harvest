
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation"; // Added import

export default function FarmManagementPage() {
  const { toast } = useToast();
  const router = useRouter(); // Added useRouter hook

  const handleManageBatches = () => {
    router.push('/farm-management/batches'); // Navigate to the new batches page
  };

  const handleLogApplications = () => {
    toast({
      title: "Log Chemical Applications",
      description: "This feature is coming soon! You'll be able to log pesticide and fertilizer applications here.",
    });
  };

  const handleSyncData = () => {
    toast({
      title: "Sync Sensor Data",
      description: "This feature is coming soon! You'll be able to sync or manually add IoT sensor data here.",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight font-headline text-foreground">Farm Management</h1>
      <p className="text-muted-foreground">
        Tools to help you record and manage farming practices, inputs, and batch tracking.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <Icons.package className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="font-headline">Batch Creation & Tracking</CardTitle>
            <CardDescription>Log crop, date, location, and chemicals used for each batch.</CardDescription>
          </CardHeader>
          <CardContent>
            <Image src="https://placehold.co/400x200.png" alt="Batch tracking" width={400} height={200} className="rounded-md" data-ai-hint="farm field" />
          </CardContent>
          <CardContent>
            <Button onClick={handleManageBatches} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Manage Batches</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <Icons.pesticide className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="font-headline">Pesticide/Fertilizer Logging</CardTitle>
            <CardDescription>Keep detailed records of all chemical applications per batch.</CardDescription>
          </CardHeader>
           <CardContent>
            <Image src="https://placehold.co/400x200.png" alt="Chemical logging" width={400} height={200} className="rounded-md" data-ai-hint="fertilizer spray" />
          </CardContent>
          <CardContent>
            <Button onClick={handleLogApplications} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Log Applications</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <Icons.temperature className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="font-headline">Sensor Data Sync</CardTitle>
            <CardDescription>Manually add or sync IoT sensor data (temp, humidity, soil moisture).</CardDescription>
          </CardHeader>
           <CardContent>
            <Image src="https://placehold.co/400x200.png" alt="Sensor data" width={400} height={200} className="rounded-md" data-ai-hint="iot sensor" />
          </CardContent>
          <CardContent>
            <Button onClick={handleSyncData} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Sync Data</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 shadow-lg">
        <CardHeader>
            <CardTitle className="font-headline">Traceability Logs</CardTitle>
            <CardDescription>View full traceability logs from farm to distribution.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">This section will display detailed logs for product traceability. Feature coming soon.</p>
            <Image src="https://placehold.co/600x300.png" alt="Traceability log placeholder" width={600} height={300} className="mt-4 rounded-md" data-ai-hint="data flow" />
        </CardContent>
      </Card>
    </div>
  );
}
