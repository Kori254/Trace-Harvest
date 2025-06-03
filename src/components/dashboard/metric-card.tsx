import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react"; // Import LucideIcon type

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon; // Use LucideIcon type here
  description?: string;
  trend?: string; // e.g., "+5.2% from last month"
  trendColor?: "text-green-600" | "text-red-600" | "text-muted-foreground";
}

export function MetricCard({ title, value, icon: Icon, description, trend, trendColor = "text-muted-foreground" }: MetricCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-card-foreground font-headline">{title}</CardTitle>
        <Icon className="h-5 w-5 text-accent" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
        {trend && <p className={`text-xs ${trendColor} pt-1`}>{trend}</p>}
      </CardContent>
    </Card>
  );
}
