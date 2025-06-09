import {
  LayoutDashboard,
  ScanLine,
  Bot,
  Tractor,
  ClipboardCheck,
  BookOpen,
  Bell,
  UserCircle,
  Settings,
  LogOut,
  ChevronDown,
  Leaf,
  QrCode,
  LineChart,
  Thermometer,
  Droplets,
  Sprout,
  Package,
  Store,
  Home,
  AlertTriangle,
  FileText,
  Download,
  Info,
  Video,
  CheckSquare,
  Warehouse,
  ListChecks,
  Truck,
  Apple,
  ShieldCheck,
  Waypoints,
  FlaskConical,
  MapPin,
  CalendarDays,
  Trees,
  FlaskRound,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type React from 'react';

export const Icons = {
  logo: Leaf,
  dashboard: LayoutDashboard,
  scan: ScanLine,
  aiAssistant: Bot,
  farmManagement: Tractor,
  compliance: ClipboardCheck,
  education: BookOpen,
  notifications: Bell,
  user: UserCircle,
  settings: Settings,
  logout: LogOut,
  chevronDown: ChevronDown,
  leaf: Leaf, // Added missing leaf icon
  qrCode: QrCode,
  lineChart: LineChart,
  temperature: Thermometer,
  humidity: Droplets,
  soilMoisture: Sprout, // Using Sprout as a proxy for soil moisture
  package: Package,
  store: Store,
  home: Home,
  alert: AlertTriangle,
  report: FileText,
  download: Download,
  info: Info,
  video: Video,
  checklist: CheckSquare,
  warehouse: Warehouse,
  audit: ListChecks,
  transport: Truck,
  product: Apple, // Generic product
  foodSafety: ShieldCheck,
  timeline: Waypoints,
  pesticide: FlaskConical, // Representing chemicals
  fertilizer: FlaskRound, // Representing chemicals
  location: MapPin,
  date: CalendarDays,
  crop: Trees,
  spinner: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("animate-spin", className)}
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
  google: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={cn("h-4 w-4", className)} {...props}>
      <title>Google</title>
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.05 1.05-2.36 1.84-4.06 1.84-4.81 0-8.6-3.89-8.6-8.72s3.8-8.72 8.6-8.72c2.63 0 4.5.94 5.63 1.95l2.62-2.58C18.04.66 15.79 0 12.48 0 5.86 0 0 5.96 0 12.73s5.86 12.73 12.48 12.73c3.54 0 6.71-1.22 8.98-3.21.24-.2.47-.41.68-.62v-2.18h-9.15Z" fill="currentColor"/>
    </svg>
  ),
};

export type IconName = keyof typeof Icons;
