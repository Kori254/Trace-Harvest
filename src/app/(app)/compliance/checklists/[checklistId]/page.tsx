
"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { checklists } from "../page"; // Import checklists from the parent page
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ChecklistDetailPage() {
  const router = useRouter();
  const params = useParams();
  const checklistId = params.checklistId as string;

  const checklist = checklists.find(c => c.id === checklistId);

  if (!checklist) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight font-headline text-foreground">Checklist Not Found</h1>
          <Button variant="outline" onClick={() => router.push('/compliance/checklists')}>
            <Icons.logout className="mr-2 h-4 w-4 transform rotate-180" />
            Back to Checklists
          </Button>
        </div>
        <Card className="shadow-lg bg-card">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center">The checklist with ID "{checklistId}" could not be found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight font-headline text-foreground">
          {checklist.title}
        </h1>
        <Button variant="outline" onClick={() => router.push('/compliance/checklists')}>
          <Icons.logout className="mr-2 h-4 w-4 transform rotate-180" />
          Back to Checklists
        </Button>
      </div>

      <Card className="shadow-lg bg-card">
        <CardHeader>
            <div className="flex items-center mb-2">
                <Icons.checklist className="h-8 w-8 text-primary mr-3" />
                <CardTitle className="font-headline text-2xl text-card-foreground">{checklist.title}</CardTitle>
            </div>
          <CardDescription className="text-muted-foreground">{checklist.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <Image
                src={`https://placehold.co/600x300.png`}
                alt={checklist.title}
                width={600}
                height={300}
                className="rounded-md mx-auto"
                data-ai-hint={`${checklist.imageHint} checklist items`}
              />
          <Alert>
            <Icons.info className="h-4 w-4" />
            <AlertTitle>Interactive Checklist Coming Soon!</AlertTitle>
            <AlertDescription>
              This section will soon contain interactive items for the "{checklist.title}". You'll be able to check off items, add notes, and save your progress.
            </AlertDescription>
          </Alert>
           <Button className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground" disabled>
             <Icons.settings className="mr-2 h-4 w-4" />
             Begin Checklist (Soon)
           </Button>
        </CardContent>
      </Card>
    </div>
  );
}
