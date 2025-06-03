
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast"; // Added useToast import

const educationalResources = [
  {
    type: "video",
    title: "Introduction to Food Safety on the Farm",
    description: "Learn the basics of implementing food safety practices during farming.",
    icon: Icons.video,
    imageHint: "farm safety video",
    link: "#", // Link kept for potential future use but not directly used by button now
  },
  {
    type: "infographic",
    title: "5 Key Steps to Hygienic Harvesting",
    description: "A visual guide to ensuring hygiene during the harvesting process.",
    icon: Icons.checklist, // Using checklist as a proxy for infographic for now
    imageHint: "hygiene infographic",
    link: "#",
  },
  {
    type: "checklist",
    title: "Pre-Planting Safety Checklist",
    description: "A comprehensive checklist to ensure your farm is ready for planting.",
    icon: Icons.checklist,
    imageHint: "safety checklist",
    link: "#",
  },
   {
    type: "article",
    title: "Understanding Pesticide Safety Regulations",
    description: "An in-depth article on safe pesticide usage and compliance.",
    icon: Icons.report,
    imageHint: "pesticide regulations",
    link: "#",
  },
];


export default function EducationPage() {
  const { toast } = useToast(); // Initialized useToast

  const handleResourceClick = (resourceTitle: string) => {
    toast({
      title: "Resource Coming Soon",
      description: `Details for "${resourceTitle}" will be available soon.`,
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight font-headline text-foreground">Educational Resources</h1>
      <p className="text-muted-foreground">
        Access videos, infographics, and checklists on food safety, hygiene, and best farming practices.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {educationalResources.map((resource, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <resource.icon className="h-8 w-8 text-primary" />
                <CardTitle className="font-headline text-xl">{resource.title}</CardTitle>
              </div>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
               <Image 
                src={`https://placehold.co/400x200.png`} 
                alt={resource.title} 
                width={400} 
                height={200} 
                className="rounded-md mb-4"
                data-ai-hint={resource.imageHint}
              />
            </CardContent>
            <CardContent>
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => handleResourceClick(resource.title)} // Added onClick handler
              >
                {resource.type === "video" ? "Watch Video" : "View Resource"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="mt-6 shadow-lg">
        <CardHeader>
            <CardTitle className="font-headline">Consumer Education</CardTitle>
            <CardDescription>Learn about safe food consumption and understanding farming practices.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">This section will provide resources specifically for consumers to learn more about where their food comes from and how to handle it safely. Content coming soon!</p>
            <Image src="https://placehold.co/600x300.png" alt="Consumer education placeholder" width={600} height={300} className="mt-4 rounded-md" data-ai-hint="happy consumer food" />
        </CardContent>
      </Card>
    </div>
  );
}
