export interface GenerateResponseParamsType {
  messages?: Array<{ role: string; content: string }>;
  systemPrompt?: string;
  prompt: string;
  extractedCode?: string;
}

export interface GenerateResponseReturnType extends Promise<{
  error: Error | null;
  success: any;
}> {}

export interface ModalInterface {
  name: string;
  init(): void;
  generateResponse(params: GenerateResponseParamsType): GenerateResponseReturnType;
}
