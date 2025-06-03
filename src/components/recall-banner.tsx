"use client";

import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Link from 'next/link';

interface Recall {
  id: string;
  title: string;
  description: string;
  date: string;
  link?: string;
}

const mockRecalls: Recall[] = [
  { 
    id: "recall001", 
    title: "Urgent: Batch X Spinach Recall", 
    description: "Potential E. coli contamination found in spinach batch X harvested on 2023-12-01. Consumers are advised not to consume and return the product.", 
    date: "2023-12-15",
    link: "/recalls/recall001" 
  },
];


export function RecallBanner() {
  const [activeRecalls, setActiveRecalls] = useState<Recall[]>(mockRecalls); // Populate with actual recall data
  const [isVisible, setIsVisible] = useState(activeRecalls.length > 0);

  if (!isVisible || activeRecalls.length === 0) {
    return null;
  }

  const currentRecall = activeRecalls[0]; // Display one recall at a time for simplicity

  return (
    <div className="container mx-auto px-4 py-2">
      <Alert variant="destructive" className="shadow-md">
        <Icons.alert className="h-5 w-5" />
        <AlertTitle className="font-bold">Product Recall Notification!</AlertTitle>
        <AlertDescription>
          <p className="font-semibold">{currentRecall.title} ({currentRecall.date})</p>
          <p className="mt-1">{currentRecall.description}</p>
          <div className="mt-2 space-x-2">
            {currentRecall.link && (
              <Button variant="outline" size="sm" asChild className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive">
                <Link href={currentRecall.link}>Learn More</Link>
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)} className="text-destructive hover:bg-destructive/10">
              Dismiss
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}
