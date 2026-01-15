import { useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'settings' | 'history'>('home')
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const sendToOllama = async (prompt: string) => {
    setLoading(true)
    setResponse('')

    try {
      const result = await chrome.runtime.sendMessage({
        action: 'generateWithOllama',
        params: {
          prompt,
          extractedCode: '',
          systemPrompt: 'You are a helpful LeetCode coding assistant. Provide clear, concise explanations and hints.',
        },
      })

      if (result?.success && result?.data) {
        setResponse(result.data.response || JSON.stringify(result.data))
      } else {
        setResponse('Error: ' + (result?.error || 'No response from Ollama'))
      }
    } catch (error: any) {
      setResponse('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      sendToOllama(input)
      setInput('')
    }
  }

  const handleQuickAction = (action: string) => {
    const prompts: Record<string, string> = {
      hint: 'Give me a hint to solve this problem without revealing the full solution.',
      explain: 'Explain this problem and what approach I should consider.',
      solution: 'Provide a complete solution with explanation.',
      debug: 'Help me debug my current code and identify issues.',
    }
    sendToOllama(prompts[action])
  }

  return (
    <div className="w-[400px] min-h-[500px] bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl backdrop-blur-sm">
            🤖
          </div>
          <div>
            <h1 className="text-2xl font-bold">Leety AI</h1>
            <p className="text-sm opacity-90">Your LeetCode Companion</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 bg-white">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'home'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          🏠 Home
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'history'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          📚 History
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'settings'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          ⚙️ Settings
        </button>
      </div>

      {/* Content Area */}
      <div className="p-4">
        {activeTab === 'home' && (
          <div className="space-y-4">
            {/* Quick Actions */}
            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => handleQuickAction('hint')} disabled={loading} className="bg-white hover:bg-blue-50 border-2 border-blue-200 text-blue-700 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:scale-105 hover:shadow-md disabled:opacity-50">
                  💡 Get Hint
                </button>
                <button onClick={() => handleQuickAction('explain')} disabled={loading} className="bg-white hover:bg-purple-50 border-2 border-purple-200 text-purple-700 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:scale-105 hover:shadow-md disabled:opacity-50">
                  📝 Explain
                </button>
                <button onClick={() => handleQuickAction('solution')} disabled={loading} className="bg-white hover:bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:scale-105 hover:shadow-md disabled:opacity-50">
                  🎯 Solution
                </button>
                <button onClick={() => handleQuickAction('debug')} disabled={loading} className="bg-white hover:bg-orange-50 border-2 border-orange-200 text-orange-700 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:scale-105 hover:shadow-md disabled:opacity-50">
                  🐛 Debug
                </button>
              </div>
            </div>

            {/* Response Display */}
            {loading && (
              <div className="p-4 bg-gray-50 rounded-xl text-sm text-gray-600">
                Generating response...
              </div>
            )}
            {response && !loading && (
              <div className="p-4 bg-blue-50 rounded-xl text-sm text-gray-800 whitespace-pre-wrap max-h-60 overflow-y-auto">
                {response}
              </div>
            )}

            {/* Chat Input */}
            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Ask Anything</h2>
              <form onSubmit={handleSubmit} className="space-y-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question here..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                  rows={3}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-xl font-medium transition-all hover:shadow-lg disabled:opacity-50"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Pro Tip */}
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-xl border-2 border-blue-200">
              <p className="text-xs text-gray-700">
                💡 <strong>Pro Tip:</strong> Try solving problems yourself first! Use AI as a learning tool, not a shortcut.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">Recent Problems</h2>
            {[
              { title: 'Two Sum', difficulty: 'Easy', solved: true },
              { title: 'Add Two Numbers', difficulty: 'Medium', solved: true },
              { title: 'Longest Substring', difficulty: 'Medium', solved: false },
            ].map((problem, idx) => (
              <div
                key={idx}
                className="bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-sm text-gray-800">{problem.title}</h3>
                    <span
                      className={`text-xs ${
                        problem.difficulty === 'Easy'
                          ? 'text-green-600'
                          : problem.difficulty === 'Medium'
                          ? 'text-orange-600'
                          : 'text-red-600'
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                  </div>
                  {problem.solved && <span className="text-green-600">✓</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">Preferences</h2>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Enable Hints</span>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Show Solutions</span>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Auto-Debug</span>
                <input type="checkbox" className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">About</h3>
              <p className="text-xs text-gray-600 mb-2">Version 1.0.0</p>
              <a
                href="https://github.com/Itz-Ehthasham/leet_ai.git"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline"
              >
                View on GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App