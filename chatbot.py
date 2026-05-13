"""Core Chatbot class — multi-turn chat with Anthropic Claude.

Streaming, conversation memory, token usage tracking. ~80 LOC.
"""

from __future__ import annotations

import os
from dataclasses import dataclass, field
from typing import Iterator

from anthropic import Anthropic


DEFAULT_MODEL = os.getenv("CHATBOT_MODEL", "claude-sonnet-4-6")
DEFAULT_TEMP = float(os.getenv("CHATBOT_TEMPERATURE", "0.7"))
DEFAULT_MAX_TOKENS = int(os.getenv("CHATBOT_MAX_TOKENS", "1024"))
DEFAULT_SYSTEM = os.getenv("CHATBOT_SYSTEM_PROMPT", "You are a helpful assistant.")


@dataclass
class Usage:
    input_tokens: int = 0
    output_tokens: int = 0

    @property
    def total(self) -> int:
        return self.input_tokens + self.output_tokens


@dataclass
class Chatbot:
    system: str = DEFAULT_SYSTEM
    model: str = DEFAULT_MODEL
    temperature: float = DEFAULT_TEMP
    max_tokens: int = DEFAULT_MAX_TOKENS
    history: list[dict] = field(default_factory=list)
    usage: Usage = field(default_factory=Usage)
    _client: Anthropic = field(default_factory=Anthropic)

    def chat(self, message: str) -> str:
        """Send a message, return the full reply (non-streaming)."""
        self.history.append({"role": "user", "content": message})
        resp = self._client.messages.create(
            model=self.model,
            system=self.system,
            max_tokens=self.max_tokens,
            temperature=self.temperature,
            messages=self.history,
        )
        reply = resp.content[0].text
        self.history.append({"role": "assistant", "content": reply})
        self.usage.input_tokens += resp.usage.input_tokens
        self.usage.output_tokens += resp.usage.output_tokens
        return reply

    def stream(self, message: str) -> Iterator[str]:
        """Send a message, yield reply chunks as they arrive."""
        self.history.append({"role": "user", "content": message})
        chunks: list[str] = []
        with self._client.messages.stream(
            model=self.model,
            system=self.system,
            max_tokens=self.max_tokens,
            temperature=self.temperature,
            messages=self.history,
        ) as stream:
            for text in stream.text_stream:
                chunks.append(text)
                yield text
            final = stream.get_final_message()

        self.history.append({"role": "assistant", "content": "".join(chunks)})
        self.usage.input_tokens += final.usage.input_tokens
        self.usage.output_tokens += final.usage.output_tokens

    def reset(self) -> None:
        """Clear conversation history (keeps system prompt and usage stats)."""
        self.history.clear()
