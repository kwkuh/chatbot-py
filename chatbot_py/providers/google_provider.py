"""Google Gemini provider."""

from __future__ import annotations

import os
from typing import Iterator

from chatbot_py.types import Message, Usage


class GoogleProvider:
    name = "google"
    default_model = "gemini-2.0-flash"

    def __init__(self) -> None:
        from google import genai
        api_key = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")
        self._genai = genai
        self._client = genai.Client(api_key=api_key) if api_key else genai.Client()

    def _contents(self, messages: list[Message]) -> list[dict]:
        contents: list[dict] = []
        for m in messages:
            role = "user" if m.role == "user" else "model"
            contents.append({"role": role, "parts": [{"text": m.content}]})
        return contents

    def _config(self, system: str, temperature: float, max_tokens: int):
        from google.genai import types
        return types.GenerateContentConfig(
            system_instruction=system or None,
            temperature=temperature,
            max_output_tokens=max_tokens,
        )

    def complete(
        self,
        *,
        model: str,
        system: str,
        messages: list[Message],
        temperature: float,
        max_tokens: int,
    ) -> tuple[str, Usage]:
        resp = self._client.models.generate_content(
            model=model,
            contents=self._contents(messages),
            config=self._config(system, temperature, max_tokens),
        )
        text = resp.text or ""
        u = resp.usage_metadata
        usage = Usage(
            getattr(u, "prompt_token_count", 0) or 0,
            getattr(u, "candidates_token_count", 0) or 0,
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
        stream = self._client.models.generate_content_stream(
            model=model,
            contents=self._contents(messages),
            config=self._config(system, temperature, max_tokens),
        )
        final_usage = Usage()
        for chunk in stream:
            if chunk.text:
                yield chunk.text, None
            if getattr(chunk, "usage_metadata", None):
                u = chunk.usage_metadata
                final_usage = Usage(
                    getattr(u, "prompt_token_count", 0) or 0,
                    getattr(u, "candidates_token_count", 0) or 0,
                )
        yield "", final_usage
