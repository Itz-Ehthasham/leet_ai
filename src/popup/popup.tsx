import { useState } from "react";

function Popup() {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User input:", input);
    // Add your AI logic here
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
            <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
              💡 Get Hint
            </button>
            <button className="bg-purple-50 hover:bg-purple-100 text-purple-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
              📝 Explain
            </button>
            <button className="bg-green-50 hover:bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
              🎯 Solution
            </button>
            <button className="bg-orange-50 hover:bg-orange-100 text-orange-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
              🐛 Debug
            </button>
          </div>

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
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
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