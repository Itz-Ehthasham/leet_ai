import { generateObject } from 'ai';
import { z } from 'zod';

interface GenerateObjectParams {
  model: any;
  messages?: Array<{ role: string; content: string }>;
  systemPrompt?: string;
  prompt: string;
  extractedCode?: string;
}

export async function generateObjectResponce(params: GenerateObjectParams) {
  const { model, messages = [], systemPrompt, prompt, extractedCode } = params;

  const schema = z.object({
    response: z.string().describe('The AI generated response'),
    code: z.string().optional().describe('Code snippet if applicable'),
  });

  const userMessage = extractedCode 
    ? `${prompt}\n\nCode:\n${extractedCode}`
    : prompt;

  const result = await generateObject({
    model,
    schema,
    messages: [
      ...(systemPrompt ? [{ role: 'system' as const, content: systemPrompt }] : []),
      ...messages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      { role: 'user' as const, content: userMessage },
    ],
  });

  return result;
}
