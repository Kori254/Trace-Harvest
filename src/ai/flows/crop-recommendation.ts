// 'use server';
/**
 * @fileOverview AI-powered crop recommendation assistant.
 *
 * - cropRecommendation - A function that provides best-practice recommendations for crop growing.
 * - CropRecommendationInput - The input type for the cropRecommendation function.
 * - CropRecommendationOutput - The return type for the cropRecommendation function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CropRecommendationInputSchema = z.object({
  crop: z.string().describe('The type of crop.'),
  region: z.string().describe('The geographical region where the crop is grown.'),
});
export type CropRecommendationInput = z.infer<typeof CropRecommendationInputSchema>;

const GrowingPracticesRelevanceSchema = z.object({
  practice: z.string().describe('The specific growing practice.'),
  isRelevant: z.boolean().describe('Whether the growing practice is relevant for the given crop and region.'),
  reason: z.string().describe('The reason for the relevance assessment.'),
});

const CropRecommendationOutputSchema = z.object({
  recommendations: z.array(
    z.string().describe('A list of best-practice recommendations for growing the specified crop in the specified region.')
  ),
});
export type CropRecommendationOutput = z.infer<typeof CropRecommendationOutputSchema>;

const assessGrowingPracticeRelevance = ai.defineTool({
  name: 'assessGrowingPracticeRelevance',
  description: 'Assess the relevance of a specific growing practice for a given crop and region.',
  inputSchema: z.object({
    crop: z.string().describe('The type of crop.'),
    region: z.string().describe('The geographical region where the crop is grown.'),
    practice: z.string().describe('The specific growing practice to assess.'),
  }),
  outputSchema: GrowingPracticesRelevanceSchema,
  async implementation(input) {
    // Placeholder implementation - replace with actual logic or external API call
    // For now, return a canned response based on the input.
    if (input.crop === 'wheat' && input.region === 'Kansas' && input.practice === 'nitrogen fertilization') {
      return {
        practice: input.practice,
        isRelevant: true,
        reason: 'Nitrogen fertilization is crucial for wheat yield in Kansas.',
      };
    } else if (input.crop === 'corn' && input.region === 'Iowa' && input.practice === 'crop rotation') {
      return {
        practice: input.practice,
        isRelevant: true,
        reason: 'Crop rotation helps manage pests and improve soil health for corn in Iowa.',
      };
    } else {
      return {
        practice: input.practice,
        isRelevant: false,
        reason: 'This growing practice is not typically relevant for this crop and region combination.',
      };
    }
  },
});

export async function cropRecommendation(input: CropRecommendationInput): Promise<CropRecommendationOutput> {
  return cropRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cropRecommendationPrompt',
  input: {schema: CropRecommendationInputSchema},
  output: {schema: CropRecommendationOutputSchema},
  tools: [assessGrowingPracticeRelevance],
  system: `You are an AI assistant providing best-practice recommendations for crop growing. 
  Consider the crop and region specified by the user. 
  Leverage the assessGrowingPracticeRelevance tool to determine if a specific growing practice is relevant for the given crop and region. 
  Provide a list of actionable recommendations to improve crop yields and ensure food safety.
  Focus on practical and easily implementable strategies.`,
  prompt: `Give me recommendations for growing {{crop}} in the region of {{region}}.`,
});

const cropRecommendationFlow = ai.defineFlow(
  {
    name: 'cropRecommendationFlow',
    inputSchema: CropRecommendationInputSchema,
    outputSchema: CropRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
