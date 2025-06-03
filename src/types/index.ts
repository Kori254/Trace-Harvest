import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: LucideIcon;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}

// Example User type - expand as needed
export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'farmer' | 'agri-business' | 'consumer' | 'admin';
  avatarUrl?: string;
}

// Example Batch type
export interface Batch {
  id: string;
  crop: string;
  plantingDate: Date;
  harvestDate?: Date;
  location: string; // Could be GeoPoint or structured address
  chemicalsUsed?: Array<{ name: string; date: Date; quantity: string }>;
  iotSensorData?: Array<{ sensorId: string; timestamp: Date; type: 'temperature' | 'humidity' | 'soilMoisture'; value: number }>;
  status: 'growing' | 'harvested' | 'processing' | 'in-transit' | 'retail' | 'sold';
}
