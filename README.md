🚀 Leety AI – Local AI Coding Assistant (Browser Extension)

Leety AI is a powerful developer-focused browser extension that brings an AI coding assistant directly into your browser. It is designed to help with debugging, code explanations, error fixing, and logic assistance — all while keeping your data 100% local and private.

Unlike cloud-based AI tools, Leety AI runs entirely on your local machine using a locally hosted LLM.

Read the Documentation of the Repo and Ollama 

✨ Key Features

🧠 Local AI Processing – No data sent to external servers

⚡ Instant Responses – Low latency with local inference

🧩 Code Debugging & Fix Suggestions

📝 Code Explanation & Optimization Help

🖱️ In-page Popup UI – Lightweight, fast, and distraction-free

🔐 Privacy First – Your code never leaves your system

🧠 AI Model Used

Leety AI uses the Ollama LLM runtime, which allows large language models to run locally on your system.

✅ Model Requirement

Model: llama3.1:latest

Runtime: Ollama

Execution: Fully local (no internet required after setup)

📦 Prerequisites

Before running the extension, make sure you have:

Node.js (v18 or higher recommended)

Ollama installed locally

A system capable of running local LLMs (8GB RAM minimum recommended)

🔧 Installation Guide
1️⃣ Install Ollama

Download and install Ollama from the official website:

👉 https://ollama.com

Verify installation:

ollama --version

2️⃣ Download the Required Model

Pull the latest LLaMA model locally:

ollama pull llama3.1:latest


Run the model once to ensure it works:

ollama run llama3.1:latest

3️⃣ Start Ollama Server

Make sure Ollama is running in the background:

ollama serve


⚠️ Important:
Ollama runs on http://localhost:11434 by default.
The extension communicates with this local server.

4️⃣ Allow Browser Extension Access (Important)

For Chrome-based extensions, set this environment variable before running Ollama:

Windows (PowerShell)
$env:OLLAMA_ORIGINS="chrome-extension://*"
ollama serve

macOS / Linux
export OLLAMA_ORIGINS="chrome-extension://*"
ollama serve

5️⃣ Install the Extension

Open Chrome → chrome://extensions

Enable Developer Mode

Click Load unpacked

Select the extension project folder

🖥️ How It Works

User types a prompt or sends code from the extension popup

The request is sent to the local Ollama server

llama3.1 processes the request locally

The response is streamed back and rendered in the UI

📌 No cloud calls. No API keys. No tracking.

🛠️ Tech Stack

Frontend: React + TypeScript + Tailwind CSS

Browser APIs: Chrome Extension APIs (Manifest v3)

LLM Runtime: Ollama

Model: LLaMA 3.1 (Latest)

🔒 Privacy & Security

All AI inference runs locally

No prompts or responses are logged externally

No third-party analytics or tracking

Works fully offline after setup

⚠️ Known Limitations

Requires a system capable of running local LLMs

First response may be slightly slower due to model warm-up

Performance depends on CPU/GPU availability

🚧 Future Enhancements

Streaming token-by-token responses

Model selection from UI

Code context awareness (file-level analysis)

Multi-tab memory support

🤝 Contribution

Contributions are welcome!
Feel free to fork the repo, submit PRs, or suggest improvements.

📄 License

This project is licensed under the MIT License.

⭐ Final Note

Leety AI is built for developers who care about speed, privacy, and control.
If you believe AI should run on your machine, this extension is for you.

If you want, I can also:

🔥 Make this more startup-style

🧑‍💻 Rewrite it for recruiters

📦 Add a Setup Troubleshooting section

🎯 Optimize it for GitHub stars

Just tell me 👍
