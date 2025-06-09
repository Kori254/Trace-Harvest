
"use client";

import { useState, type ReactNode } from "react";
import { FarmerDashboard } from "@/components/dashboard/farmer-dashboard";
import { AgriBusinessDashboard } from "@/components/dashboard/agri-business-dashboard";
import { ConsumerDashboard } from "@/components/dashboard/consumer-dashboard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";

type UserRole = "farmer" | "agri-business" | "consumer";

export default function DashboardPage() {
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>("farmer");

  let RoleSpecificDashboard: ReactNode;

  switch (currentUserRole) {
    case "farmer":
      RoleSpecificDashboard = <FarmerDashboard />;
      break;
    case "agri-business":
      RoleSpecificDashboard = <AgriBusinessDashboard />;
      break;
    case "consumer":
      RoleSpecificDashboard = <ConsumerDashboard />;
      break;
    default:
      RoleSpecificDashboard = <p>Invalid role selected.</p>;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card shadow-md">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center">
              <Icons.user className="mr-2 h-5 w-5 text-primary" />
              <Label htmlFor="role-switcher" className="text-sm font-medium text-muted-foreground mr-2">
                View Dashboard As:
              </Label>
            </div>
            <Select value={currentUserRole} onValueChange={(value) => setCurrentUserRole(value as UserRole)}>
              <SelectTrigger id="role-switcher" className="w-full sm:w-[200px] bg-background">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="farmer">Farmer</SelectItem>
                <SelectItem value="agri-business">Agri-Business</SelectItem>
                <SelectItem value="consumer">Consumer</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground sm:ml-auto text-center sm:text-left">
              (This role switcher is for demonstration purposes)
            </p>
          </div>
        </CardContent>
      </Card>
      {RoleSpecificDashboard}
    </div>
  );
}
