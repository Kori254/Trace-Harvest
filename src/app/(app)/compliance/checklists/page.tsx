
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
// Removed useToast as it's no longer directly used for starting a checklist
import Image from "next/image";

export const checklists = [
  {
    id: "pre-harvest",
    title: "Pre-Harvest Safety Checklist",
    description: "Ensure all safety measures are in place before harvesting begins. Covers field conditions, equipment, and worker hygiene.",
    imageHint: "harvest preparation",
  },
  {
    id: "packing-house",
    title: "Packing House Sanitation Checklist",
    description: "Verify cleanliness and sanitation protocols in the packing house. Includes surface testing and pest control.",
    imageHint: "clean facility",
  },
  {
    id: "transportation",
    title: "Produce Transportation Checklist",
    description: "Checklist for ensuring safe transportation of produce, including temperature control and vehicle sanitation.",
    imageHint: "delivery truck",
  },
  {
    id: "worker-hygiene",
    title: "Worker Hygiene & Training Checklist",
    description: "Confirm worker training on hygiene practices and availability of necessary facilities.",
    imageHint: "hygiene training",
  }
];

export default function ChecklistsPage() {
  const router = useRouter();

  const handleStartChecklist = (checklistId: string) => {
    router.push(`/compliance/checklists/${checklistId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight font-headline text-foreground">Digital Audit Checklists</h1>
        <Button variant="outline" onClick={() => router.push('/compliance')}>
          <Icons.logout className="mr-2 h-4 w-4 transform rotate-180" />
          Back to Compliance
        </Button>
      </div>
      <p className="text-muted-foreground">
        Access and manage your food safety audit checklists. Select a checklist below to begin or review.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {checklists.map((checklist) => (
          <Card key={checklist.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <Icons.checklist className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="font-headline">{checklist.title}</CardTitle>
              <CardDescription>{checklist.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <Image
                src={`https://placehold.co/400x200.png`}
                alt={checklist.title}
                width={400}
                height={200}
                className="rounded-md"
                data-ai-hint={checklist.imageHint}
              />
            </CardContent>
            <CardContent>
              <Button
                onClick={() => handleStartChecklist(checklist.id)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Start Checklist
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
       <Card className="mt-6 shadow-lg">
        <CardHeader>
            <CardTitle className="font-headline">Custom Checklists</CardTitle>
            <CardDescription>Create and manage your own custom audit checklists tailored to your specific needs.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">This feature will allow you to build custom checklists. (Coming Soon)</p>
            <Button variant="outline" className="mt-4" disabled>
                <Icons.settings className="mr-2 h-4 w-4" />
                Create Custom Checklist (Soon)
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
