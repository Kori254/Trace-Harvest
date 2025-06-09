
"use client";

import { MetricCard } from "@/components/dashboard/metric-card";
import { PlaceholderChart } from "@/components/dashboard/placeholder-chart";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function AgriBusinessDashboard() {
  const { toast } = useToast();
  const router = useRouter();

  const handleFeatureClick = (featureName: string) => {
    toast({
      title: "Feature Coming Soon",
      description: `${featureName} will be available soon.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight font-headline text-foreground">Agri-Business Dashboard</h1>
        <Button variant="outline" onClick={() => handleFeatureClick("Export Business Report")}>
          <Icons.download className="mr-2 h-4 w-4" />
          Export Business Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Supply Chains"
          value="78"
          icon={Icons.timeline}
          description="Number of ongoing supply chain operations."
        />
        <MetricCard
          title="Logistics Efficiency"
          value="92.5%"
          icon={Icons.transport}
          description="On-time delivery and cost-effectiveness."
           trend="+1.2% from last quarter"
          trendColor="text-green-600"
        />
        <MetricCard
          title="Supplier Compliance"
          value="85%"
          icon={Icons.compliance}
          description="Suppliers meeting quality and safety standards."
        />
        <MetricCard
          title="Inventory Turnover"
          value="6.2"
          icon={Icons.warehouse}
          description="Rate of stock sold and replenished."
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <PlaceholderChart title="Shipment Volume Trends" description="Monthly inbound and outbound shipment volumes." />
        <PlaceholderChart title="Supplier Performance Overview" description="Key metrics for top suppliers." />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-lg bg-card">
          <CardHeader>
            <CardTitle className="font-headline text-card-foreground">Key Operations</CardTitle>
            <CardDescription className="text-muted-foreground">Monitor and manage critical business operations.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button variant="outline" className="w-full justify-start py-6 text-base" onClick={() => handleFeatureClick("Track Bulk Shipments")}>
              <Icons.transport className="mr-3 h-6 w-6" /> Track Bulk Shipments
            </Button>
             <Button variant="outline" className="w-full justify-start py-6 text-base" onClick={() => handleFeatureClick("Manage Inventory")}>
              <Icons.warehouse className="mr-3 h-6 w-6" /> Manage Inventory
            </Button>
            <Button variant="outline" className="w-full justify-start py-6 text-base" onClick={() => router.push('/compliance')}>
              <Icons.audit className="mr-3 h-6 w-6" /> View Supplier Audits
            </Button>
            <Button variant="outline" className="w-full justify-start py-6 text-base" onClick={() => handleFeatureClick("Contract Management")}>
              <Icons.report className="mr-3 h-6 w-6" /> Contract Management
            </Button>
          </CardContent>
           <CardFooter>
            <p className="text-xs text-muted-foreground">Access detailed views for each operational area.</p>
          </CardFooter>
        </Card>
        <Card className="shadow-lg bg-card">
          <CardHeader>
            <CardTitle className="font-headline text-card-foreground">Market Insights</CardTitle>
             <CardDescription className="text-muted-foreground">Stay updated with market trends and pricing.</CardDescription>
          </CardHeader>
          <CardContent>
            <Image src="https://placehold.co/400x200.png" alt="Market data graph" width={400} height={200} className="rounded-md" data-ai-hint="market graph" />
            <Button variant="link" className="mt-2 px-0" onClick={() => handleFeatureClick("View Market Analysis")}>View Detailed Market Analysis (Soon)</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
