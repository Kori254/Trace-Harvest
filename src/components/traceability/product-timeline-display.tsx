import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import Image from "next/image";

interface TimelineEvent {
  stage: string;
  icon: React.ElementType;
  date: string;
  location: string;
  details?: string[];
  temperature?: string;
  humidity?: string;
}

interface ProductTimelineDisplayProps {
  productId: string;
  // In a real app, product data would be fetched based on productId
}

const mockProductData = {
  name: "Organic Tomatoes - Batch #T0M4T0",
  imageUrl: "https://placehold.co/300x200.png",
  imageAiHint: "tomatoes crate",
  timeline: [
    { stage: "Farming", icon: Icons.farmManagement, date: "2023-10-01", location: "Green Valley Farms", details: ["Planted using organic seeds", "Fertilizer: Compost Tea applied"], temperature: "22°C", humidity: "60%" },
    { stage: "Harvesting", icon: Icons.crop, date: "2023-12-15", location: "Green Valley Farms", details: ["Hand-picked at peak ripeness"] },
    { stage: "Processing & Packaging", icon: Icons.package, date: "2023-12-16", location: "GVF Packing House", details: ["Washed and sorted", "Packed in recyclable clamshells"], temperature: "18°C", humidity: "55%" },
    { stage: "Transportation", icon: Icons.transport, date: "2023-12-17", location: "En route to Distributor", details: ["Refrigerated truck #TRK007"], temperature: "4°C", humidity: "85% (controlled)" },
    { stage: "Distribution Center", icon: Icons.warehouse, date: "2023-12-18", location: "Fresh Foods DC", details: ["Quality check passed"], temperature: "5°C", humidity: "80%" },
    { stage: "Retail Shelf", icon: Icons.store, date: "2023-12-19", location: "Local Grocer, Aisle 3", details: ["Available for purchase"] },
  ] as TimelineEvent[],
};


export function ProductTimelineDisplay({ productId }: ProductTimelineDisplayProps) {
  if (!productId) {
    return (
      <Card className="shadow-lg bg-card">
        <CardHeader>
          <CardTitle className="font-headline text-card-foreground">Product Traceability</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Scan or enter a product ID to view its journey.</p>
        </CardContent>
      </Card>
    );
  }
  
  const product = mockProductData; // Use mock data for now

  return (
    <Card className="shadow-lg bg-card">
      <CardHeader>
        <CardTitle className="font-headline text-card-foreground">{product.name}</CardTitle>
        <CardDescription className="text-muted-foreground">Product ID: {productId}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Image 
            src={product.imageUrl} 
            alt={product.name} 
            width={300} 
            height={200} 
            className="rounded-lg mx-auto shadow-md"
            data-ai-hint={product.imageAiHint}
          />
        </div>
        <div className="relative pl-6">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-border ml-[7px]"></div>

          {product.timeline.map((event, index) => (
            <div key={index} className="mb-8 relative">
              <div className="absolute left-0 top-0 -ml-[2px] -mt-[2px] transform -translate-x-1/2 bg-background p-1 rounded-full">
                <event.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-foreground font-headline">{event.stage}</h4>
                <p className="text-sm text-muted-foreground">{event.date} - {event.location}</p>
                {event.details && (
                  <ul className="list-disc list-inside text-xs text-muted-foreground mt-1">
                    {event.details.map((detail, i) => <li key={i}>{detail}</li>)}
                  </ul>
                )}
                {(event.temperature || event.humidity) && (
                   <div className="mt-1 text-xs text-muted-foreground flex items-center space-x-3">
                    {event.temperature && <span className="flex items-center"><Icons.temperature className="h-3 w-3 mr-1 text-accent"/> {event.temperature}</span>}
                    {event.humidity && <span className="flex items-center"><Icons.humidity className="h-3 w-3 mr-1 text-accent"/> {event.humidity}</span>}
                   </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
