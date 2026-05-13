"""OpenAI / GPT provider (also works with any OpenAI-compatible base URL)."""

from __future__ import annotations

import os
from typing import Iterator

from chatbot_py.types import Message, Usage


class OpenAIProvider:
    name = "openai"
    default_model = "gpt-4o-mini"

    def __init__(self) -> None:
        from openai import OpenAI
        base_url = os.getenv("OPENAI_BASE_URL")
        self._client = OpenAI(base_url=base_url) if base_url else OpenAI()

    def _messages(self, system: str, messages: list[Message]) -> list[dict]:
        out: list[dict] = []
        if system:
            out.append({"role": "system", "content": system})
        out.extend(m.to_dict() for m in messages)
        return out

    def complete(
        self,
        *,
        model: str,
        system: str,
        messages: list[Message],
        temperature: float,
        max_tokens: int,
    ) -> tuple[str, Usage]:
        resp = self._client.chat.completions.create(
            model=model,
            messages=self._messages(system, messages),
            temperature=temperature,
            max_tokens=max_tokens,
        )
        text = resp.choices[0].message.content or ""
        u = resp.usage
        usage = Usage(u.prompt_tokens if u else 0, u.completion_tokens if u else 0)
        return text, usage

    def stream(
        self,
        *,
        model: str,
        system: str,
        messages: list[Message],
        temperature: float,
        max_tokens: int,
    ) -> Iterator[tuple[str, Usage | None]]:
        stream = self._client.chat.completions.create(
            model=model,
            messages=self._messages(system, messages),
            temperature=temperature,
            max_tokens=max_tokens,
            stream=True,
            stream_options={"include_usage": True},
        )
        final_usage = Usage()
        for chunk in stream:
            if chunk.usage:
                final_usage = Usage(chunk.usage.prompt_tokens, chunk.usage.completion_tokens)
            if not chunk.choices:
                continue
            delta = chunk.choices[0].delta.content
            if delta:
                yield delta, None
        yield "", final_usage
