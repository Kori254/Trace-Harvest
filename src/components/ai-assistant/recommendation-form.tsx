"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";
import { cropRecommendation, type CropRecommendationInput, type CropRecommendationOutput } from "@/ai/flows/crop-recommendation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const recommendationSchema = z.object({
  crop: z.string().min(1, "Crop name is required"),
  region: z.string().min(1, "Region is required"),
});

type RecommendationFormValues = z.infer<typeof recommendationSchema>;

export function RecommendationForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<CropRecommendationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RecommendationFormValues>({
    resolver: zodResolver(recommendationSchema),
  });

  const onSubmit: SubmitHandler<RecommendationFormValues> = async (data) => {
    setIsLoading(true);
    setRecommendations(null);
    setError(null);
    try {
      const result = await cropRecommendation(data);
      setRecommendations(result);
      toast({
        title: "Recommendations Generated",
        description: `Found ${result.recommendations.length} recommendations for ${data.crop} in ${data.region}.`,
      });
    } catch (e) {
      console.error("Error fetching recommendations:", e);
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setError(`Failed to get recommendations: ${errorMessage}`);
      toast({
        title: "Error",
        description: `Could not fetch recommendations. ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg bg-card">
        <CardHeader>
          <CardTitle className="font-headline text-card-foreground flex items-center">
            <Icons.aiAssistant className="mr-2 h-6 w-6 text-primary" />
            Get Crop Recommendations
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter crop and region details to receive AI-powered growing advice.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="crop" className="font-semibold">Crop Name</Label>
              <Input
                id="crop"
                {...register("crop")}
                placeholder="e.g., Wheat, Corn, Tomatoes"
                className="mt-1 bg-background"
              />
              {errors.crop && <p className="text-sm text-destructive mt-1">{errors.crop.message}</p>}
            </div>
            <div>
              <Label htmlFor="region" className="font-semibold">Geographical Region</Label>
              <Input
                id="region"
                {...register("region")}
                placeholder="e.g., Kansas, Iowa, Central Valley California"
                className="mt-1 bg-background"
              />
              {errors.region && <p className="text-sm text-destructive mt-1">{errors.region.message}</p>}
            </div>
            <div className="flex space-x-2">
              <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.bot className="mr-2 h-4 w-4" />
                )}
                Get Recommendations
              </Button>
              <Button type="button" variant="outline" onClick={() => { reset(); setRecommendations(null); setError(null); }} disabled={isLoading}>
                Clear
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <Icons.alert className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {recommendations && recommendations.recommendations.length > 0 && (
        <Card className="shadow-lg bg-card">
          <CardHeader>
            <CardTitle className="font-headline text-card-foreground">Generated Recommendations</CardTitle>
            <CardDescription className="text-muted-foreground">
              Best practices for {recommendations.recommendations.length > 0 ? `${(recommendations as any)._input?.crop || 'your crop'} in ${(recommendations as any)._input?.region || 'your region'}` : 'your crop and region'}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 list-disc pl-5">
              {recommendations.recommendations.map((rec, index) => (
                <li key={index} className="text-foreground">
                  {rec}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {recommendations && recommendations.recommendations.length === 0 && (
         <Alert>
            <Icons.info className="h-4 w-4" />
            <AlertTitle>No Specific Recommendations</AlertTitle>
            <AlertDescription>
              The AI could not generate specific recommendations for the provided crop and region based on its current knowledge. You may want to try a broader region or a more common crop.
            </AlertDescription>
          </Alert>
      )}
    </div>
  );
}
