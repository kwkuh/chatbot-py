# Providers

`chatbot-py` ships with four providers. Pick one with `provider=` or `$CHATBOT_PROVIDER`.

| Provider     | Aliases  | Default model        | Env vars                                   | Install               |
| ------------ | -------- | -------------------- | ------------------------------------------ | --------------------- |
| `anthropic`  | `claude` | `claude-sonnet-4-6`  | `ANTHROPIC_API_KEY`                        | `pip install anthropic` |
| `openai`     | `gpt`    | `gpt-4o-mini`        | `OPENAI_API_KEY`, optional `OPENAI_BASE_URL` | `pip install openai`    |
| `google`     | `gemini` | `gemini-2.0-flash`   | `GOOGLE_API_KEY` (or `GEMINI_API_KEY`)     | `pip install google-genai` |
| `ollama`     |          | `llama3.2`           | optional `OLLAMA_HOST` (default `http://localhost:11434`) | `pip install ollama`    |

Install all at once: `pip install -e ".[all]"` (from a clone) or `pip install "chatbot-py[all]"` once published.

## Anthropic (Claude)

```python
from chatbot_py import Chatbot
bot = Chatbot(provider="anthropic", model="claude-opus-4-7")
print(bot.chat("hi"))
```

## OpenAI (GPT) — and any OpenAI-compatible endpoint

```python
bot = Chatbot(provider="openai", model="gpt-4o-mini")
```

Point at any OpenAI-compatible API (Together, Groq, vLLM, LM Studio, etc.) by setting `OPENAI_BASE_URL`:

```bash
OPENAI_BASE_URL=https://api.groq.com/openai/v1 \
OPENAI_API_KEY=gsk_... \
python cli.py --provider openai --model llama-3.1-70b-versatile
```

## Google (Gemini)

```python
bot = Chatbot(provider="google", model="gemini-1.5-pro")
```

## Ollama (local)

Install Ollama and pull a model first:

```bash
# https://ollama.com/download
ollama pull llama3.2
```

Then:

```python
bot = Chatbot(provider="ollama", model="llama3.2")
```

No API key required. Great for offline dev and zero-cost iteration.

## Adding your own

See [CONTRIBUTING.md → Adding a new provider](../CONTRIBUTING.md#adding-a-new-provider) and `chatbot_py/providers/base.py` for the protocol.
