"use client";

import { useState } from 'react';
import { QrScanner } from "@/components/traceability/qr-scanner";
import { ProductTimelineDisplay } from "@/components/traceability/product-timeline-display";

export default function TraceabilityPage() {
  const [scannedProductId, setScannedProductId] = useState<string | null>(null);

  const handleProductScanned = (productId: string) => {
    setScannedProductId(productId);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight font-headline text-foreground">Product Traceability</h1>
      <div className="grid md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-1">
          <QrScanner onScan={handleProductScanned} />
        </div>
        <div className="md:col-span-2">
          {scannedProductId ? (
            <ProductTimelineDisplay productId={scannedProductId} />
          ) : (
            <div className="p-8 text-center text-muted-foreground border-2 border-dashed border-border rounded-lg min-h-[300px] flex flex-col items-center justify-center bg-card">
              <p className="text-lg">Scan a QR code or enter a product ID to see its journey.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
