
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import type { Batch } from "@/types";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const mockBatches: Batch[] = [
  {
    id: "BATCH001",
    crop: "Corn",
    plantingDate: new Date("2024-03-15"),
    location: "North Field",
    status: "growing",
    chemicalsUsed: [{ name: "Fertilizer X", date: new Date("2024-04-01"), quantity: "10kg/ha" }],
    iotSensorData: [{ sensorId: "TEMP01", timestamp: new Date(), type: "temperature", value: 25 }],
  },
  {
    id: "BATCH002",
    crop: "Tomatoes",
    plantingDate: new Date("2024-04-01"),
    harvestDate: new Date("2024-07-15"),
    location: "Greenhouse A",
    status: "harvested",
  },
  {
    id: "BATCH003",
    crop: "Wheat",
    plantingDate: new Date("2023-10-20"),
    location: "West Acre",
    status: "processing",
  },
  {
    id: "BATCH004",
    crop: "Soybeans",
    plantingDate: new Date("2024-05-01"),
    location: "South Plot",
    status: "in-transit",
  },
];

export default function ManageBatchesPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleCreateNewBatch = () => {
    router.push('/farm-management/batches/create');
  };

  const handleViewBatchDetails = (batchId: string) => {
    toast({
      title: "View Batch Details",
      description: `Viewing details for batch ${batchId} is coming soon!`,
    });
    // Future: router.push(`/farm-management/batches/${batchId}`);
  };

  const getStatusColorClasses = (status: Batch['status']) => {
    switch (status) {
      case 'growing':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'harvested':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'processing':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'in-transit':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'retail':
        return 'bg-indigo-100 text-indigo-700 border-indigo-300';
      case 'sold':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight font-headline text-foreground">Manage Batches</h1>
        <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => router.back()}>
              <Icons.logout className="mr-2 h-4 w-4 transform rotate-180" />
              Back
            </Button>
            <Button onClick={handleCreateNewBatch} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Icons.package className="mr-2 h-4 w-4" /> Create New Batch
            </Button>
        </div>
      </div>
        <p className="text-muted-foreground">
          View, create, and manage your farm batches. Track progress from planting to harvest.
        </p>

      {mockBatches.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center">No batches found. Get started by creating a new batch!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockBatches.map((batch) => (
            <Card key={batch.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="font-headline text-xl text-card-foreground">{batch.crop} - {batch.id}</CardTitle>
                      <CardDescription>{batch.location}</CardDescription>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusColorClasses(batch.status)}`}>
                      {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
                    </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                      <Icons.date className="mr-2 h-4 w-4 text-primary" />
                      Planted: {format(batch.plantingDate, "MMMM d, yyyy")}
                  </div>
                  {batch.harvestDate && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Icons.checklist className="mr-2 h-4 w-4 text-primary" />
                          Harvested: {format(batch.harvestDate, "MMMM d, yyyy")}
                      </div>
                  )}
                  <div className="flex items-center text-sm text-muted-foreground">
                      <Icons.crop className="mr-2 h-4 w-4 text-primary" />
                      Crop Type: {batch.crop}
                  </div>
                  {batch.chemicalsUsed && batch.chemicalsUsed.length > 0 && (
                      <div className="flex items-center text-sm text-muted-foreground">
                          <Icons.pesticide className="mr-2 h-4 w-4 text-primary" />
                          Chemicals: {batch.chemicalsUsed[0].name}{batch.chemicalsUsed.length > 1 ? ` (+${batch.chemicalsUsed.length -1})` : ''}
                      </div>
                  )}
                  {batch.iotSensorData && batch.iotSensorData.length > 0 && (
                      <div className="flex items-center text-sm text-muted-foreground">
                          <Icons.temperature className="mr-2 h-4 w-4 text-primary" />
                          Sensors Active: {batch.iotSensorData.length}
                      </div>
                  )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => handleViewBatchDetails(batch.id)}>
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
