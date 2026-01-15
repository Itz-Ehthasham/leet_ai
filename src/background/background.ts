import { OllamaModal } from '../modal/ollama'
import type { GenerateResponseParamsType } from '../interface/ModalInterface'

// Initialize Ollama modal
const ollamaModal = new OllamaModal()
ollamaModal.init()

// Message listener for communication with popup/content scripts
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  // Handle Ollama generation requests
  if (request.action === 'generateWithOllama') {
    handleOllamaGeneration(request.params)
      .then(response => sendResponse({ success: true, data: response }))
      .catch(error => sendResponse({ 
        success: false, 
        error: error.message || 'Unknown error occurred' 
      }))
    return true // Required for async response
  }

  // Health check for Ollama connection
  if (request.action === 'checkOllamaHealth') {
    checkOllamaHealth()
      .then(isHealthy => sendResponse({ success: true, isHealthy }))
      .catch(error => sendResponse({ success: false, error: error.message }))
    return true
  }

  // Get available models
  if (request.action === 'getOllamaModels') {
    getAvailableModels()
      .then(models => sendResponse({ success: true, models }))
      .catch(error => sendResponse({ success: false, error: error.message }))
    return true
  }
})

/**
 * Handle Ollama text generation
 */
async function handleOllamaGeneration(params: GenerateResponseParamsType) {
  try {
    const result = await ollamaModal.generateResponse(params)
    
    if (result.error) {
      throw new Error(result.error.message || 'Generation failed')
    }
    
    return result.success
  } catch (error: any) {
    console.error('Ollama generation error:', error)
    throw error
  }
}

/**
 * Check if Ollama is running and accessible
 */
async function checkOllamaHealth(): Promise<boolean> {
  try {
    const response = await fetch('http://127.0.0.1:11434/api/tags', {
      method: 'GET',
    })
    return response.ok
  } catch (error) {
    console.error('Ollama health check failed:', error)
    return false
  }
}

/**
 * Get list of available Ollama models
 */
async function getAvailableModels(): Promise<string[]> {
  try {
    const response = await fetch('http://127.0.0.1:11434/api/tags', {
      method: 'GET',
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch models')
    }
    
    const data = await response.json()
    return data.models?.map((m: any) => m.name) || []
  } catch (error) {
    console.error('Failed to get Ollama models:', error)
    throw error
  }
}

// Log when service worker starts
console.log('Ollama background service worker initialized')