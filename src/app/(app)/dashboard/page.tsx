
"use client";

import { MetricCard } from "@/components/dashboard/metric-card";
import { PlaceholderChart } from "@/components/dashboard/placeholder-chart";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

export default function DashboardPage() {
  const { toast } = useToast();

  const handleExportReport = () => {
    toast({
      title: "Report Generation Started",
      description: "Your report is being generated and will be available shortly.",
    });
    // In a real app, you would trigger the actual report generation logic here.
  };

  const handleScanProduct = () => {
    toast({
      title: "Scan Product",
      description: "QR code scanning feature coming soon!",
    });
    // In a real app, you would navigate to a scanning page or open a modal.
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight font-headline text-foreground">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleExportReport}>
            <Icons.download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleScanProduct}>
            <Icons.qrCode className="mr-2 h-4 w-4" />
            Scan Product
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Batches Tracked"
          value="1,234"
          icon={Icons.package}
          description="Number of active batches in the system."
          trend="+12.5% from last month"
          trendColor="text-green-600"
        />
        <MetricCard
          title="Compliance Rate"
          value="98.2%"
          icon={Icons.foodSafety}
          description="Adherence to food safety standards."
          trend="+0.5% from last period"
          trendColor="text-green-600"
        />
        <MetricCard
          title="Active IoT Sensors"
          value="567"
          icon={Icons.temperature}
          description="Real-time monitoring devices online."
        />
        <MetricCard
          title="Contamination Alerts"
          value="3"
          icon={Icons.alert}
          description="Active alerts needing attention."
          trendColor="text-red-600"
        />
      </div>

      {/* Charts and other sections */}
      <div className="grid gap-6 md:grid-cols-2">
        <PlaceholderChart title="Batch Growth Over Time" description="Monthly trend of new batches created." />
        <PlaceholderChart title="Sensor Data Overview" description="Average temperature and humidity readings." />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
          <CardHeader>
            <CardTitle className="font-headline text-card-foreground">Recent Activity</CardTitle>
            <CardDescription className="text-muted-foreground">Latest updates and logs from your farms.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                { icon: Icons.farmManagement, text: "New corn batch #CORN001 created in 'North Field'.", time: "2h ago" },
                { icon: Icons.pesticide, text: "Pesticide 'AlphaKill' logged for batch #TOM003.", time: "5h ago" },
                { icon: Icons.temperature, text: "Sensor 'TEMP05' in 'Greenhouse A' reported high temperature.", time: "1 day ago", alert: true },
                { icon: Icons.compliance, text: "GAP audit for 'Farm Sunnydale' completed.", time: "2 days ago" },
              ].map((item, index) => (
                <li key={index} className={`flex items-start space-x-3 p-3 rounded-md ${item.alert ? 'bg-destructive/10' : 'bg-background hover:bg-muted/50'}`}>
                  <item.icon className={`h-5 w-5 mt-1 ${item.alert ? 'text-destructive' : 'text-primary'}`} />
                  <div>
                    <p className="text-sm text-foreground">{item.text}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">View All Activity</Button>
          </CardFooter>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
          <CardHeader>
            <CardTitle className="font-headline text-card-foreground">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-primary hover:bg-primary/90 text-primary-foreground">
              <Icons.package className="mr-2 h-4 w-4" /> Create New Batch
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Icons.pesticide className="mr-2 h-4 w-4" /> Log Chemical Use
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Icons.temperature className="mr-2 h-4 w-4" /> Sync Sensor Data
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Icons.audit className="mr-2 h-4 w-4" /> Start New Audit
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
