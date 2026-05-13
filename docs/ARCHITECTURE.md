# Architecture

`chatbot-py` is structured as three layers, each one small enough to read in a single sitting.

```
┌─────────────────────────────────────────────────────────────────┐
│  Frontends                                                      │
│   app.py (Streamlit)   cli.py (REPL)   examples/*.py (library)  │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Core                                                           │
│   chatbot_py/chatbot.py     ← Chatbot (history, usage, streaming)│
│   chatbot_py/types.py       ← Message, Usage                    │
└─────────────────────────────┬───────────────────────────────────┘
                              │ Provider protocol
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Providers (chatbot_py/providers/)                              │
│   anthropic_provider.py   openai_provider.py                    │
│   google_provider.py      ollama_provider.py                    │
└─────────────────────────────────────────────────────────────────┘
```

## The `Provider` protocol

Every backend implements just two methods (`chatbot_py/providers/base.py`):

```python
class Provider(Protocol):
    name: str
    default_model: str

    def complete(*, model, system, messages, temperature, max_tokens) -> tuple[str, Usage]: ...
    def stream  (*, model, system, messages, temperature, max_tokens) -> Iterator[tuple[str, Usage|None]]: ...
```

The stream contract: yield `(chunk, None)` repeatedly, then a final `("", Usage(...))` once you know token totals. This keeps the iterator interface uniform whether or not the SDK reports usage mid-stream.

## The `Chatbot` class

```python
@dataclass
class Chatbot:
    provider: str | Provider = "anthropic"
    model: str | None = None
    system: str = "You are a helpful assistant."
    temperature: float = 0.7
    max_tokens: int = 1024
    history: list[Message]
    usage: Usage
```

Responsibilities:
- Resolve `provider` string → Provider instance (via `get_provider`)
- Resolve `model` → provider's default if not given
- Maintain `history` across calls
- Accumulate `usage` across calls
- Expose two methods: `chat()` and `stream()`
- Reset (`reset`) and export (`export`) helpers

That's it. No retries, no rate limiting, no auth — those live in the SDKs.

## Why no LangChain?

LangChain solves problems you usually don't have (chains, agents, complex tool orchestration) at the cost of abstractions that change quarterly. For a chat loop, the SDKs are already the right abstraction. This project's goal is to make that visible.

## How streaming actually works

Each provider's `stream()` is a generator. The `Chatbot.stream()` method:

1. Appends the user's message to history.
2. Iterates the provider stream, yielding chunks to the caller.
3. Collects chunks into a single string and appends it to history as the assistant turn.
4. Updates `self.usage` from the final usage tuple.

For the UI, Streamlit's `st.empty().markdown(full + "▌")` pattern gives the typewriter effect.

## Testing strategy

We never hit a real API in tests. `tests/conftest.py` defines `FakeProvider`, which implements the `Provider` protocol with predictable outputs and call recording. Passing it via `Chatbot(provider=fake_instance)` lets us assert on history, usage, and streaming chunks deterministically.

## Extension points

- **New provider?** Implement `Provider`, register in `get_provider`, add to `pyproject.toml` extras.
- **Persistent history?** Subclass `Chatbot` and override `chat`/`stream` to write to your storage of choice.
- **Tool use?** Extend the provider interface with a third method, e.g. `tools_complete(...)`. (See roadmap.)
- **Different UI?** The library is provider-agnostic — wrap it in FastAPI, Discord, Telegram, whatever.
