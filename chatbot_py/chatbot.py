"""Provider-agnostic chatbot client."""

from __future__ import annotations

import os
from dataclasses import dataclass, field
from typing import Iterator

from chatbot_py.providers import Provider, get_provider
from chatbot_py.types import Message, Usage


DEFAULT_PROVIDER = os.getenv("CHATBOT_PROVIDER", "anthropic")
DEFAULT_TEMP = float(os.getenv("CHATBOT_TEMPERATURE", "0.7"))
DEFAULT_MAX_TOKENS = int(os.getenv("CHATBOT_MAX_TOKENS", "1024"))
DEFAULT_SYSTEM = os.getenv("CHATBOT_SYSTEM_PROMPT", "You are a helpful assistant.")


@dataclass
class Chatbot:
    """Multi-turn chat client. Provider-agnostic."""

    provider: str | Provider = DEFAULT_PROVIDER
    model: str | None = None
    system: str = DEFAULT_SYSTEM
    temperature: float = DEFAULT_TEMP
    max_tokens: int = DEFAULT_MAX_TOKENS
    history: list[Message] = field(default_factory=list)
    usage: Usage = field(default_factory=Usage)

    def __post_init__(self) -> None:
        self._provider: Provider = (
            self.provider if isinstance(self.provider, Provider) else get_provider(self.provider)
        )
        env_model = os.getenv("CHATBOT_MODEL")
        self.model = self.model or env_model or self._provider.default_model

    @property
    def provider_name(self) -> str:
        return self._provider.name

    def chat(self, message: str) -> str:
        """Send a message, return the full reply."""
        self.history.append(Message("user", message))
        reply, usage = self._provider.complete(
            model=self.model,
            system=self.system,
            messages=self.history,
            temperature=self.temperature,
            max_tokens=self.max_tokens,
        )
        self.history.append(Message("assistant", reply))
        self.usage.add(usage)
        return reply

    def stream(self, message: str) -> Iterator[str]:
        """Send a message, yield reply chunks as they arrive."""
        self.history.append(Message("user", message))
        chunks: list[str] = []
        final_usage: Usage | None = None
        for piece, usage in self._provider.stream(
            model=self.model,
            system=self.system,
            messages=self.history,
            temperature=self.temperature,
            max_tokens=self.max_tokens,
        ):
            if piece:
                chunks.append(piece)
                yield piece
            if usage is not None:
                final_usage = usage

        self.history.append(Message("assistant", "".join(chunks)))
        if final_usage is not None:
            self.usage.add(final_usage)

    def reset(self) -> None:
        """Clear conversation history (keeps system prompt and usage stats)."""
        self.history.clear()

    def export(self) -> list[dict]:
        """Return history as a JSON-serializable list of dicts."""
        return [m.to_dict() for m in self.history]
