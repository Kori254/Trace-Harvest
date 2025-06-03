"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebar } from "@/components/ui/sidebar"; // Ensure this import is correct

const navItems = [
  { href: "/dashboard", icon: Icons.dashboard, label: "Dashboard", tooltip: "Dashboard" },
  { href: "/traceability", icon: Icons.scan, label: "Traceability", tooltip: "Scan & Trace" },
  { href: "/ai-assistant", icon: Icons.aiAssistant, label: "AI Assistant", tooltip: "AI Assistant" },
  { href: "/farm-management", icon: Icons.farmManagement, label: "Farm Mgmt", tooltip: "Farm Management" },
  { href: "/compliance", icon: Icons.compliance, label: "Compliance", tooltip: "Compliance Tools" },
  { href: "/education", icon: Icons.education, label: "Resources", tooltip: "Learning Resources" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state: sidebarState } = useSidebar();

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left">
      <SidebarHeader className="p-2 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Icons.logo className="w-8 h-8 text-primary" />
          {sidebarState === 'expanded' && <span className="font-bold text-lg text-foreground">TraceHarvest</span>}
        </Link>
        {sidebarState === 'expanded' && <SidebarTrigger className="hidden md:flex" />}
      </SidebarHeader>
      <Separator />
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  isActive={pathname.startsWith(item.href)}
                  tooltip={item.tooltip}
                  className="justify-start"
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <Separator />
      <SidebarFooter className="p-2">
        <Link href="/settings" passHref legacyBehavior>
          <SidebarMenuButton className="justify-start">
            <Icons.settings className="h-5 w-5" />
            Settings
          </SidebarMenuButton>
        </Link>
        <Button variant="ghost" className="justify-start w-full">
           <Icons.logout className="h-5 w-5 mr-2" />
           {sidebarState === 'expanded' ? 'Logout' : ''}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
