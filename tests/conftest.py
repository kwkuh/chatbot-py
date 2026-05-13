"""A fake in-memory provider so tests run without network or API keys."""

from __future__ import annotations

from typing import Iterator

import pytest

from chatbot_py.types import Message, Usage


class FakeProvider:
    name = "fake"
    default_model = "fake-model"

    def __init__(self, reply: str = "ok") -> None:
        self.reply = reply
        self.calls: list[dict] = []

    def _record(self, **kw) -> None:
        self.calls.append(kw)

    def complete(self, *, model, system, messages, temperature, max_tokens):
        self._record(model=model, system=system, messages=list(messages),
                     temperature=temperature, max_tokens=max_tokens, mode="complete")
        return self.reply, Usage(input_tokens=len(messages), output_tokens=len(self.reply))

    def stream(self, *, model, system, messages, temperature, max_tokens) -> Iterator:
        self._record(model=model, system=system, messages=list(messages),
                     temperature=temperature, max_tokens=max_tokens, mode="stream")
        for ch in self.reply:
            yield ch, None
        yield "", Usage(input_tokens=len(messages), output_tokens=len(self.reply))


@pytest.fixture
def fake() -> FakeProvider:
    return FakeProvider()
