"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';

interface QrScannerProps {
  onScan: (productId: string) => void;
}

export function QrScanner({ onScan }: QrScannerProps) {
  const [manualInput, setManualInput] = useState('');

  const handleManualSubmit = () => {
    if (manualInput.trim()) {
      onScan(manualInput.trim());
    }
  };

  // In a real app, this would integrate with a camera and QR scanning library
  const handleSimulateScan = () => {
    onScan("SIM_PROD_12345"); // Simulate a scan with a test ID
  };

  return (
    <Card className="shadow-lg bg-card">
      <CardHeader>
        <CardTitle className="font-headline text-card-foreground flex items-center">
          <Icons.qrCode className="mr-2 h-6 w-6 text-primary" />
          Scan Product QR Code
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-square bg-muted/50 rounded-md flex items-center justify-center p-4">
          {/* Placeholder for camera feed */}
          <Image 
            src="https://placehold.co/300x300.png?text=Camera+Feed" 
            alt="QR Scanner Placeholder" 
            width={300} 
            height={300}
            data-ai-hint="camera qr"
            className="rounded"
          />
        </div>
        <Button onClick={handleSimulateScan} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Icons.scan className="mr-2 h-4 w-4" /> Simulate Scan
        </Button>
        <div className="flex items-center space-x-2">
          <Input 
            type="text" 
            placeholder="Or enter Product ID manually" 
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            className="bg-background"
          />
          <Button onClick={handleManualSubmit} variant="outline">Submit</Button>
        </div>
      </CardContent>
    </Card>
  );
}
