import type {
  GenerateResponseParamsType,
  ModalInterface,
} from '../interface/ModalInterface'
import { generateObjectResponce } from '../utils'

/**
 * Custom Ollama language model implementation compatible with the ai sdk
 */
class OllamaLanguageModel {
  readonly specificationVersion = 'v1'
  readonly provider = 'ollama'
  readonly defaultObjectGenerationMode = 'tool' as const
  readonly modelId: string
  readonly baseUrl: string

  constructor(modelId: string, baseUrl: string = 'http://127.0.0.1:11434') {
    this.modelId = modelId
    this.baseUrl = baseUrl
  }

  async doGenerate(params: any): Promise<any> {
    const messages = params.prompt.map((p: any) => {
      if (p.type === 'system') {
        return { role: 'system', content: p.text }
      } else if (p.type === 'text') {
        return { role: p.role === 'user' ? 'user' : 'assistant', content: p.text }
      }
      return p
    })

    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.modelId,
        messages: messages,
        stream: false,
      }),
    })

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`)
    }

    const data = await response.json()

    return {
      rawCall: { rawPrompt: params.prompt, rawSettings: {} },
      finishReason: 'stop',
      usage: {
        promptTokens: data.prompt_eval_count || 0,
        completionTokens: data.eval_count || 0,
      },
      text: data.message.content,
    }
  }

  async doStream(params: any): Promise<any> {
    // For streaming, we'll still use the non-streaming endpoint for simplicity
    // You can implement streaming support if needed
    return this.doGenerate(params)
  }
}

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
      const model = new OllamaLanguageModel('llama3.2:3b', this.baseUrl)

      let data = await generateObjectResponce({
        model: model,
        messages: props.messages,
        systemPrompt: props.systemPrompt,
        prompt: props.prompt,
        extractedCode: props.extractedCode,
      })

      return {
        error: null,
        success: data.object,
      }
    } catch (error: any) {
      return { error, success: null }
    }
  }
}
