"""Ollama local provider — run models on your own machine, no API key."""

from __future__ import annotations

import os
from typing import Iterator

from chatbot_py.types import Message, Usage


class OllamaProvider:
    name = "ollama"
    default_model = "llama3.2"

    def __init__(self) -> None:
        import ollama
        host = os.getenv("OLLAMA_HOST")
        self._client = ollama.Client(host=host) if host else ollama.Client()

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
        resp = self._client.chat(
            model=model,
            messages=self._messages(system, messages),
            options={"temperature": temperature, "num_predict": max_tokens},
        )
        text = resp["message"]["content"]
        usage = Usage(
            int(resp.get("prompt_eval_count") or 0),
            int(resp.get("eval_count") or 0),
        )
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
        final_usage = Usage()
        for chunk in self._client.chat(
            model=model,
            messages=self._messages(system, messages),
            options={"temperature": temperature, "num_predict": max_tokens},
            stream=True,
        ):
            piece = chunk.get("message", {}).get("content", "")
            if piece:
                yield piece, None
            if chunk.get("done"):
                final_usage = Usage(
                    int(chunk.get("prompt_eval_count") or 0),
                    int(chunk.get("eval_count") or 0),
                )
        yield "", final_usage
