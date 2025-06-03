
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function CompliancePage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleViewChecklists = () => {
    router.push('/compliance/checklists');
  };

  const handleAccessForms = () => {
    toast({
      title: "Access Forms",
      description: "Loading regulatory forms and inspection reminders. (Feature coming soon)",
    });
  };

  const handleGenerateReports = () => {
    toast({
      title: "Generate Reports",
      description: "Report generation initiated. (Feature coming soon)",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight font-headline text-foreground">Compliance Management</h1>
      <p className="text-muted-foreground">
        Tools to manage compliance with food safety standards, including checklists, regulatory forms, and exportable reports.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <Icons.audit className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="font-headline">Digital Audit Checklists</CardTitle>
            <CardDescription>Access and complete digital food safety audit checklists for each batch.</CardDescription>
          </CardHeader>
          <CardContent>
            <Image src="https://placehold.co/400x200.png" alt="Audit checklist" width={400} height={200} className="rounded-md" data-ai-hint="checklist form" />
          </CardContent>
          <CardContent>
            <Button onClick={handleViewChecklists} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">View Checklists</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <Icons.report className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="font-headline">Regulatory Forms & Alerts</CardTitle>
            <CardDescription>Manage regulatory forms and receive reminders for inspections.</CardDescription>
          </CardHeader>
          <CardContent>
            <Image src="https://placehold.co/400x200.png" alt="Regulatory forms" width={400} height={200} className="rounded-md" data-ai-hint="document stack" />
          </CardContent>
          <CardContent>
            <Button onClick={handleAccessForms} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Access Forms</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <Icons.download className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="font-headline">Exportable Reports</CardTitle>
            <CardDescription>Generate PDF or CSV reports for certification bodies and internal audits.</CardDescription>
          </CardHeader>
           <CardContent>
            <Image src="https://placehold.co/400x200.png" alt="Export reports" width={400} height={200} className="rounded-md" data-ai-hint="file export" />
          </CardContent>
          <CardContent>
            <Button onClick={handleGenerateReports} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Generate Reports</Button>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6 shadow-lg">
        <CardHeader>
            <CardTitle className="font-headline">Compliance Standards</CardTitle>
            <CardDescription>Information on various food safety standards (e.g., GAP, HACCP).</CardDescription>
        </CardHeader>
        <CardContent>
            <ul className="space-y-2">
                <li className="flex items-center"><Icons.foodSafety className="h-5 w-5 mr-2 text-primary"/> Good Agricultural Practices (GAP)</li>
                <li className="flex items-center"><Icons.foodSafety className="h-5 w-5 mr-2 text-primary"/> Hazard Analysis Critical Control Point (HACCP)</li>
                <li className="flex items-center"><Icons.foodSafety className="h-5 w-5 mr-2 text-primary"/> Global Food Safety Initiative (GFSI)</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">Detailed checklists and guidance for each standard will be available here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
