"""Provider protocol — every backend implements the same two methods."""

from __future__ import annotations

from typing import Iterator, Protocol, runtime_checkable

from chatbot_py.types import Message, Usage


@runtime_checkable
class Provider(Protocol):
    """A chat backend. Implementations live in ``chatbot_py.providers.*``."""

    name: str
    default_model: str

    def complete(
        self,
        *,
        model: str,
        system: str,
        messages: list[Message],
        temperature: float,
        max_tokens: int,
    ) -> tuple[str, Usage]:
        """Return the assistant reply and token usage (non-streaming)."""

    def stream(
        self,
        *,
        model: str,
        system: str,
        messages: list[Message],
        temperature: float,
        max_tokens: int,
    ) -> Iterator[tuple[str, Usage | None]]:
        """Yield ``(chunk, usage)``. Usage is ``None`` until the final chunk."""
