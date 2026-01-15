import { useState } from "react";
import { extractLeetCodeProblem, extractUserCode } from "../utils/leetcode";

function Popup() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendToOllama = async (prompt: string) => {
    setLoading(true);
    setResponse("");
    const problem = extractLeetCodeProblem();
    const code = extractUserCode();

    console.log('Sending to Ollama:', { prompt, problem, code });

    try {
      const result = await chrome.runtime.sendMessage({
        action: 'generateWithOllama',
        params: {
          prompt: `${prompt}\n\nProblem: ${problem.title}\n${problem.description}`,
          extractedCode: code,
          systemPrompt: 'You are a helpful LeetCode coding assistant. Provide clear, concise explanations and hints.',
        },
      });

      console.log('Ollama result:', result);

      if (result?.success && result?.data) {
        setResponse(result.data.response || JSON.stringify(result.data));
      } else {
        setResponse('Error: ' + (result?.error || 'No response from Ollama'));
      }
    } catch (error: any) {
      console.error('Ollama error:', error);
      setResponse('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendToOllama(input);
    }
  };

  const handleQuickAction = (action: string) => {
    const prompts: Record<string, string> = {
      hint: 'Give me a hint to solve this problem without revealing the full solution.',
      explain: 'Explain this problem and what approach I should consider.',
      solution: 'Provide a complete solution with explanation.',
      debug: 'Help me debug my current code and identify issues.',
    };
    sendToOllama(prompts[action]);
  };

  return (
    <div className="fixed bottom-24 right-6 z-[999998] w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">🤖 Leety AI</h2>
            <p className="text-xs opacity-90">Your coding assistant</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 max-h-96 overflow-y-auto">
        <div className="space-y-3">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => handleQuickAction('hint')} disabled={loading} className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
              💡 Get Hint
            </button>
            <button onClick={() => handleQuickAction('explain')} disabled={loading} className="bg-purple-50 hover:bg-purple-100 text-purple-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
              📝 Explain
            </button>
            <button onClick={() => handleQuickAction('solution')} disabled={loading} className="bg-green-50 hover:bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
              🎯 Solution
            </button>
            <button onClick={() => handleQuickAction('debug')} disabled={loading} className="bg-orange-50 hover:bg-orange-100 text-orange-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
              🐛 Debug
            </button>
          </div>

          {/* Response Display */}
          {loading && (
            <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
              Generating response...
            </div>
          )}
          {response && !loading && (
            <div className="p-3 bg-blue-50 rounded-lg text-sm text-gray-800 whitespace-pre-wrap">
              {response}
            </div>
          )}

          {/* Chat Input */}
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </form>

          {/* Info Card */}
          <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
            <p className="text-xs text-gray-700">
              💡 <strong>Pro Tip:</strong> Try solving the problem yourself first, then use AI for hints!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;