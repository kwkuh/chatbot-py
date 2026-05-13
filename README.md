# chatbot-py

> A simple, open-source LLM chatbot in Python — like ChatGPT, but ~150 lines of code you can actually read. Built with Anthropic Claude, Streamlit UI, conversation memory, and streaming responses.

[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![Anthropic Claude](https://img.shields.io/badge/LLM-Claude%204.7-d97757)](https://www.anthropic.com)
[![Streamlit](https://img.shields.io/badge/UI-Streamlit-ff4b4b)](https://streamlit.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](https://github.com/kwkuh/chatbot-py/pulls)

A minimal, hackable reference implementation of an LLM-powered chatbot for learning, prototyping, and portfolio. Three modes: **Streamlit web UI**, **CLI**, and **importable library**. Swap models in one line. Pluggable system prompt. Token usage tracking. No frameworks, no abstractions you have to learn — just the Anthropic SDK.

---

## Features

- 💬 **Multi-turn chat** with conversation memory
- ⚡ **Streaming responses** (tokens render as they arrive)
- 🖥️ **Streamlit web UI** + **CLI** + **Python API**
- 🎛️ **Configurable system prompt, temperature, max tokens, model**
- 🔢 **Token usage & cost tracking** per session
- 🧹 **Reset / new conversation** button
- 🪶 **Tiny** — under 200 LOC total, no framework lock-in
- 🔌 **Provider-swappable** — Anthropic by default; OpenAI adapter in `examples/`
- 🔒 **API key via `.env`** — no secrets in code

## Demo

```
$ python cli.py
chatbot-py · Claude Sonnet 4.6 · type /reset to clear, /quit to exit
you> what is retrieval-augmented generation in one sentence?
bot> RAG combines an LLM with an external knowledge source — the model retrieves
     relevant documents at query time and conditions its answer on them, which
     reduces hallucination and lets you ground responses in private data.
you> show me a 10-line python sketch
bot> ...
```

Web UI:

```bash
streamlit run app.py
# open http://localhost:8501
```

## Quick start

```bash
git clone https://github.com/kwkuh/chatbot-py.git
cd chatbot-py
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # then add your ANTHROPIC_API_KEY
```

Run the web UI:

```bash
streamlit run app.py
```

Or the CLI:

```bash
python cli.py
```

Or use as a library:

```python
from chatbot import Chatbot

bot = Chatbot(system="You are a terse senior engineer.")
print(bot.chat("explain async/await in 2 sentences"))
print(bot.chat("now in 1 sentence"))   # remembers context
```

## Configuration

`.env`:

```
ANTHROPIC_API_KEY=sk-ant-...
CHATBOT_MODEL=claude-sonnet-4-6
CHATBOT_TEMPERATURE=0.7
CHATBOT_MAX_TOKENS=1024
CHATBOT_SYSTEM_PROMPT=You are a helpful assistant.
```

Override programmatically:

```python
bot = Chatbot(
    model="claude-opus-4-7",
    temperature=0.3,
    max_tokens=2048,
    system="You answer only in haiku.",
)
```

## Architecture

```
┌──────────────┐    ┌──────────────┐    ┌───────────────────┐
│  app.py      │    │  cli.py      │    │  your_script.py   │
│  (Streamlit) │    │  (terminal)  │    │  (library use)    │
└──────┬───────┘    └──────┬───────┘    └─────────┬─────────┘
       │                   │                      │
       └───────────┬───────┴──────────────────────┘
                   ▼
            ┌──────────────┐
            │ chatbot.py   │  ← core Chatbot class
            │              │     • history management
            │              │     • streaming
            │              │     • token tracking
            └──────┬───────┘
                   ▼
            ┌──────────────┐
            │ Anthropic    │
            │ Claude API   │
            └──────────────┘
```

Total: 3 files, ~200 LOC. Read it in 10 minutes.

## Project structure

```
chatbot-py/
├── chatbot.py          # core Chatbot class (streaming, memory, tokens)
├── app.py              # Streamlit web UI
├── cli.py              # terminal REPL
├── examples/
│   ├── openai_adapter.py    # drop-in OpenAI provider
│   ├── system_prompts.py    # curated system prompt library
│   └── rag_minimal.py       # 40-line RAG example
├── requirements.txt
├── .env.example
└── README.md
```

## Roadmap

- [ ] Tool use / function calling
- [ ] Vision (image input)
- [ ] RAG example with local FAISS index
- [ ] Persistent chat history (SQLite)
- [ ] Streamlit Cloud one-click deploy
- [ ] Docker image
- [ ] Multi-provider router (Claude / GPT / Gemini / local Ollama)

## Why this exists

A learning-grade reference for the AI engineering interview circuit. Most "ChatGPT clones" on GitHub are buried under LangChain abstractions you have to unlearn. This one is intentionally tiny: read `chatbot.py`, understand how an LLM chat loop actually works, fork it for your portfolio.

## Contributing

PRs welcome. Keep it small, keep it readable, no heavyweight frameworks.

## License

MIT © [Kukuh Laksana](https://kukuh.la) — use it, fork it, ship it.
