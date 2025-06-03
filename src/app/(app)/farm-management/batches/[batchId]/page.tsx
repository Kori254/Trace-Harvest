
"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import type { Batch } from "@/types";
import { format } from "date-fns";
import { mockBatches } from "../page"; // Import mockBatches from the parent page
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function BatchDetailPage() {
  const router = useRouter();
  const params = useParams();
  const batchId = params.batchId as string;

  const batch = mockBatches.find(b => b.id === batchId);

  if (!batch) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight font-headline text-foreground">Batch Not Found</h1>
          <Button variant="outline" onClick={() => router.push('/farm-management/batches')}>
            <Icons.logout className="mr-2 h-4 w-4 transform rotate-180" />
            Back to Batches
          </Button>
        </div>
        <Card className="shadow-lg bg-card">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center">The batch with ID "{batchId}" could not be found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusColorClasses = (status: Batch['status']) => {
    switch (status) {
      case 'growing': return 'bg-green-500 hover:bg-green-500/90';
      case 'harvested': return 'bg-yellow-500 hover:bg-yellow-500/90';
      case 'processing': return 'bg-blue-500 hover:bg-blue-500/90';
      case 'in-transit': return 'bg-purple-500 hover:bg-purple-500/90';
      case 'retail': return 'bg-indigo-500 hover:bg-indigo-500/90';
      case 'sold': return 'bg-gray-500 hover:bg-gray-500/90';
      default: return 'bg-gray-500 hover:bg-gray-500/90';
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight font-headline text-foreground">
          Batch Details: {batch.crop} - {batch.id}
        </h1>
        <Button variant="outline" onClick={() => router.push('/farm-management/batches')}>
          <Icons.logout className="mr-2 h-4 w-4 transform rotate-180" />
          Back to Batches
        </Button>
      </div>

      <Card className="shadow-lg bg-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="font-headline text-2xl text-card-foreground">{batch.crop} - {batch.id}</CardTitle>
            <Badge className={`${getStatusColorClasses(batch.status)} text-primary-foreground`}>
              {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
            </Badge>
          </div>
          <CardDescription>Location: {batch.location}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <Icons.date className="mr-2 h-4 w-4 text-primary" />
              <strong>Planting Date:</strong>&nbsp;{format(batch.plantingDate, "MMMM d, yyyy")}
            </div>
            {batch.harvestDate && (
              <div className="flex items-center">
                <Icons.checklist className="mr-2 h-4 w-4 text-primary" />
                <strong>Harvest Date:</strong>&nbsp;{format(batch.harvestDate, "MMMM d, yyyy")}
              </div>
            )}
            <div className="flex items-center">
              <Icons.crop className="mr-2 h-4 w-4 text-primary" />
              <strong>Crop Type:</strong>&nbsp;{batch.crop}
            </div>
             <div className="flex items-center">
              <Icons.location className="mr-2 h-4 w-4 text-primary" />
              <strong>Location:</strong>&nbsp;{batch.location}
            </div>
          </div>
          {batch.notes && (
            <div>
                <h3 className="text-lg font-semibold mb-1 font-headline text-foreground">Notes</h3>
                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">{batch.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {batch.chemicalsUsed && batch.chemicalsUsed.length > 0 && (
        <Card className="shadow-lg bg-card">
          <CardHeader>
            <CardTitle className="font-headline text-card-foreground flex items-center">
              <Icons.pesticide className="mr-2 h-5 w-5 text-primary" />Chemicals Used
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Date Applied</TableHead>
                  <TableHead>Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batch.chemicalsUsed.map((chem, index) => (
                  <TableRow key={index}>
                    <TableCell>{chem.name}</TableCell>
                    <TableCell>{format(chem.date, "MMMM d, yyyy")}</TableCell>
                    <TableCell>{chem.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {batch.iotSensorData && batch.iotSensorData.length > 0 && (
        <Card className="shadow-lg bg-card">
          <CardHeader>
            <CardTitle className="font-headline text-card-foreground flex items-center">
                <Icons.temperature className="mr-2 h-5 w-5 text-primary" />IoT Sensor Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sensor ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batch.iotSensorData.map((sensor, index) => (
                  <TableRow key={index}>
                    <TableCell>{sensor.sensorId}</TableCell>
                    <TableCell>{sensor.type.charAt(0).toUpperCase() + sensor.type.slice(1)}</TableCell>
                    <TableCell>{sensor.value}{sensor.type === 'temperature' ? '°C' : sensor.type === 'humidity' ? '%' : ''}</TableCell>
                    <TableCell>{format(sensor.timestamp, "MMMM d, yyyy HH:mm")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
