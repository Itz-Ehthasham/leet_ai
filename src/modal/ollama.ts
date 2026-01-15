import type {
  GenerateResponseParamsType,
  ModalInterface,
} from '../interface/ModalInterface'

export class OllamaModal implements ModalInterface {
  name = 'ollama'
  // Default Ollama API URL - can be configured via environment or settings
  private baseUrl: string = 'http://127.0.0.1:11434'

  init() {
    // Modal initialization with default configuration
  }

  async generateResponse(
    props: GenerateResponseParamsType
  ): Promise<{ error: Error | null; success: any }> {
    try {
      const userMessage = props.extractedCode 
        ? `${props.prompt}\n\nCode:\n${props.extractedCode}`
        : props.prompt;

      const messages = [
        ...(props.systemPrompt ? [{ role: 'system', content: props.systemPrompt }] : []),
        ...(props.messages || []).map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: userMessage },
      ];

      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3.1:latest',
          messages: messages,
          stream: false,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ollama API error: ${errorText}`);
      }

      const data = await response.json();

      return {
        error: null,
        success: {
          response: data.message.content,
        },
      };
    } catch (error: any) {
      return { error, success: null };
    }
  }
}
