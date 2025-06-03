import { RecommendationForm } from "@/components/ai-assistant/recommendation-form";

export default function AiAssistantPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight font-headline text-foreground">AI Agricultural Assistant</h1>
      </div>
      <p className="text-muted-foreground">
        Leverage artificial intelligence to get best-practice recommendations for your crops. Our assistant uses advanced models and tools to assess growing practices tailored to your specific crop and region.
      </p>
      <RecommendationForm />
    </div>
  );
}
