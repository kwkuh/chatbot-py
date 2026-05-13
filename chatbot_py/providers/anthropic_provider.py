"""Anthropic Claude provider."""

from __future__ import annotations

from typing import Iterator

from chatbot_py.types import Message, Usage


class AnthropicProvider:
    name = "anthropic"
    default_model = "claude-sonnet-4-6"

    def __init__(self) -> None:
        from anthropic import Anthropic
        self._client = Anthropic()

    def complete(
        self,
        *,
        model: str,
        system: str,
        messages: list[Message],
        temperature: float,
        max_tokens: int,
    ) -> tuple[str, Usage]:
        resp = self._client.messages.create(
            model=model,
            system=system,
            max_tokens=max_tokens,
            temperature=temperature,
            messages=[m.to_dict() for m in messages],
        )
        text = "".join(b.text for b in resp.content if getattr(b, "type", None) == "text")
        usage = Usage(resp.usage.input_tokens, resp.usage.output_tokens)
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
        with self._client.messages.stream(
            model=model,
            system=system,
            max_tokens=max_tokens,
            temperature=temperature,
            messages=[m.to_dict() for m in messages],
        ) as stream:
            for text in stream.text_stream:
                yield text, None
            final = stream.get_final_message()
        yield "", Usage(final.usage.input_tokens, final.usage.output_tokens)
