<div align="center">

# 💬 chatbot-py

**An open-source, multi-provider LLM chatbot in Python — Claude · GPT · Gemini · Ollama. Streamlit UI, CLI, library. ~400 LOC you can actually read.**

[![CI](https://github.com/kwkuh/chatbot-py/actions/workflows/ci.yml/badge.svg)](https://github.com/kwkuh/chatbot-py/actions/workflows/ci.yml)
[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](CONTRIBUTING.md)
[![Code of Conduct](https://img.shields.io/badge/Contributor%20Covenant-2.1-blueviolet)](CODE_OF_CONDUCT.md)

[![Anthropic](https://img.shields.io/badge/Anthropic-Claude-d97757?logo=anthropic)](https://www.anthropic.com)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT-412991?logo=openai)](https://platform.openai.com)
[![Google](https://img.shields.io/badge/Google-Gemini-4285F4?logo=google)](https://ai.google.dev)
[![Ollama](https://img.shields.io/badge/Ollama-local-000000?logo=ollama)](https://ollama.com)
[![Streamlit](https://img.shields.io/badge/UI-Streamlit-ff4b4b?logo=streamlit)](https://streamlit.io)

[**Quick start**](#-quick-start) • [**Providers**](docs/PROVIDERS.md) • [**Architecture**](docs/ARCHITECTURE.md) • [**Contributing**](CONTRIBUTING.md) • [**Changelog**](CHANGELOG.md)

</div>

---

## ✨ Why chatbot-py?

Most "ChatGPT clones" on GitHub are buried under heavyweight framework abstractions. **chatbot-py is intentionally tiny** — you can read every line in 15 minutes and understand exactly how an LLM chat loop actually works. Then fork it for your portfolio, your side project, your interview demo.

- 🤝 **Multi-provider** — Anthropic, OpenAI, Google, Ollama. Swap with one flag.
- ⚡ **Streaming** — tokens render as they arrive across all providers.
- 💾 **Conversation memory** — multi-turn out of the box.
- 🔢 **Token + cost tracking** — every call accumulates usage.
- 🖥️ **Three ways to run** — Streamlit web UI, CLI REPL, or import as a library.
- 🪶 **~400 LOC total** — no LangChain, no LlamaIndex, no surprises.
- 🧪 **Tested** — pytest suite with `FakeProvider`, no real API calls in CI.
- 🐳 **Dockerized** — single-command deploy with Compose.
- 📦 **Packaged** — `pip install`-ready via `pyproject.toml`.

## 📺 Demo

**Web UI** — `streamlit run app.py`

```
┌──────────────────────────────────────────────────────────────┐
│  💬 chatbot-py                              [⚙️ Settings ▾]  │
├──────────────────────────────────────────────────────────────┤
│  👤  what is RAG in one sentence?                            │
│  🤖  Retrieval-augmented generation combines an LLM with     │
│      an external knowledge source, retrieving relevant       │
│      documents at query time to ground responses in real     │
│      data and reduce hallucination.                          │
│  👤  show me a 10-line python sketch                         │
│  🤖  ▌                                                       │
└──────────────────────────────────────────────────────────────┘
```

**CLI** — `python cli.py --provider openai`

```
$ python cli.py --provider openai --model gpt-4o-mini
chatbot-py · openai:gpt-4o-mini · /help for commands
you> hi
bot> Hi! How can I help today?
you> /usage
(in=8 out=9 total=17)
```

## 🚀 Quick start

```bash
git clone https://github.com/kwkuh/chatbot-py.git
cd chatbot-py
python -m venv .venv && source .venv/bin/activate
pip install -e ".[all]"
cp .env.example .env   # add at least one provider key
```

Then pick your interface:

```bash
streamlit run app.py                 # web UI
python cli.py                        # terminal REPL
python cli.py --provider google      # use Gemini
python cli.py --provider ollama      # local, no API key
python examples/basic.py             # use as a library
```

### Or with Docker

```bash
docker compose up --build
# open http://localhost:8501
```

## 🤖 Providers

| Provider     | Default model        | Get a key                                            |
| ------------ | -------------------- | ---------------------------------------------------- |
| **Anthropic** (Claude)  | `claude-sonnet-4-6`  | https://console.anthropic.com |
| **OpenAI** (GPT)        | `gpt-4o-mini`        | https://platform.openai.com/api-keys |
| **Google** (Gemini)     | `gemini-2.0-flash`   | https://aistudio.google.com/apikey |
| **Ollama** (local)      | `llama3.2`           | https://ollama.com/download — no key needed |

You can also point the OpenAI provider at **any OpenAI-compatible endpoint** (Groq, Together, vLLM, LM Studio) via `OPENAI_BASE_URL`. Full details in [docs/PROVIDERS.md](docs/PROVIDERS.md).

## 📚 Use as a library

```python
from chatbot_py import Chatbot

bot = Chatbot(
    provider="anthropic",          # or "openai" / "google" / "ollama"
    model="claude-sonnet-4-6",     # optional, falls back to provider default
    system="You are a terse senior engineer.",
    temperature=0.3,
)

print(bot.chat("explain async/await in 2 sentences"))
print(bot.chat("now in 1 sentence"))   # multi-turn — context preserved

# Streaming
for chunk in bot.stream("write a haiku about debugging"):
    print(chunk, end="", flush=True)

# Inspect & export
print(bot.usage.total)
print(bot.export())                    # list of {"role", "content"} dicts
bot.reset()                            # clear history, keep usage
```

## 🏗️ Architecture

```
app.py / cli.py / examples/
        │
        ▼
   Chatbot  ← history · usage · streaming
        │
        ▼
   Provider  ← Anthropic · OpenAI · Google · Ollama
```

Every provider implements the same two-method `Provider` protocol. Read [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full picture.

## 📁 Project structure

```
chatbot-py/
├── chatbot_py/
│   ├── __init__.py           # public API
│   ├── chatbot.py            # Chatbot class
│   ├── types.py              # Message, Usage
│   └── providers/
│       ├── base.py           # Provider protocol
│       ├── anthropic_provider.py
│       ├── openai_provider.py
│       ├── google_provider.py
│       └── ollama_provider.py
├── app.py                    # Streamlit UI
├── cli.py                    # terminal REPL
├── examples/
│   ├── basic.py
│   ├── streaming.py
│   ├── multi_provider.py     # ask all 4 providers the same question
│   ├── system_prompts.py     # curated prompt library
│   └── rag_minimal.py        # 40-line RAG example
├── tests/                    # pytest, no API keys needed
├── docs/
│   ├── ARCHITECTURE.md
│   └── PROVIDERS.md
├── .github/
│   ├── workflows/ci.yml      # lint + typecheck + test on 3.10/3.11/3.12
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
├── Dockerfile
├── docker-compose.yml
├── Makefile
├── pyproject.toml
├── requirements.txt
├── requirements-dev.txt
├── .env.example
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── SECURITY.md
└── LICENSE                   # MIT
```

## 🛠️ Development

```bash
make dev          # install runtime + dev deps + editable package
make test         # pytest
make lint         # ruff check
make fmt          # ruff format
make typecheck    # mypy
make run          # streamlit run app.py
make cli          # python cli.py
make docker       # build docker image
make build        # build wheel + sdist
```

Tests use a `FakeProvider` — no real API calls, no keys required. CI runs on Python 3.10, 3.11, 3.12.

## ⚙️ Configuration

Everything is overridable via `.env`, CLI flags, or `Chatbot(...)` kwargs. The precedence is **kwargs > CLI flags > env vars > built-in defaults**.

```env
CHATBOT_PROVIDER=anthropic          # anthropic | openai | google | ollama
CHATBOT_MODEL=claude-sonnet-4-6     # optional — uses provider default if unset
CHATBOT_TEMPERATURE=0.7
CHATBOT_MAX_TOKENS=1024
CHATBOT_SYSTEM_PROMPT=You are a helpful assistant.

ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
GOOGLE_API_KEY=...
# OLLAMA_HOST=http://localhost:11434  # only override if non-default
# OPENAI_BASE_URL=https://api.groq.com/openai/v1  # any OpenAI-compatible API
```

## 🗺️ Roadmap

- [ ] Tool use / function calling (provider-agnostic interface)
- [ ] Vision (image input)
- [ ] RAG: FAISS / pgvector / Chroma examples
- [ ] Persistent history (SQLite)
- [ ] Streamlit Cloud one-click deploy
- [ ] Multi-provider router (auto-fallback, A/B tests)
- [ ] PyPI release

See [CHANGELOG.md](CHANGELOG.md) for what shipped.

## 🤝 Contributing

PRs welcome — keep it small, keep it readable. Read [CONTRIBUTING.md](CONTRIBUTING.md) first. By participating you agree to the [Code of Conduct](CODE_OF_CONDUCT.md).

## 🔒 Security

Found a vulnerability? Please **don't** open a public issue. See [SECURITY.md](SECURITY.md) for responsible disclosure.

## 📄 License

[MIT](LICENSE) © [Kukuh Laksana](https://github.com/kwkuh) — use it, fork it, ship it.

## 🙏 Acknowledgments

Built on top of the official SDKs from [Anthropic](https://github.com/anthropics/anthropic-sdk-python), [OpenAI](https://github.com/openai/openai-python), [Google](https://github.com/googleapis/python-genai), and [Ollama](https://github.com/ollama/ollama-python). UI by [Streamlit](https://streamlit.io). Thank you to every maintainer.

---

<div align="center">

**[⭐ Star this repo](https://github.com/kwkuh/chatbot-py)** if it helped you learn — it costs nothing and helps others find it.

</div>
