"""Provider registry. Use `get_provider(name)` to load by string id."""

from __future__ import annotations

from chatbot_py.providers.base import Provider


def get_provider(name: str) -> Provider:
    """Return a provider instance by name.

    Supported: ``anthropic``, ``openai``, ``google``, ``ollama``.
    Aliases: ``claude``→anthropic, ``gpt``→openai, ``gemini``→google.
    """
    key = name.strip().lower()
    aliases = {"claude": "anthropic", "gpt": "openai", "gemini": "google"}
    key = aliases.get(key, key)

    if key == "anthropic":
        from chatbot_py.providers.anthropic_provider import AnthropicProvider
        return AnthropicProvider()
    if key == "openai":
        from chatbot_py.providers.openai_provider import OpenAIProvider
        return OpenAIProvider()
    if key == "google":
        from chatbot_py.providers.google_provider import GoogleProvider
        return GoogleProvider()
    if key == "ollama":
        from chatbot_py.providers.ollama_provider import OllamaProvider
        return OllamaProvider()

    raise ValueError(
        f"Unknown provider: {name!r}. "
        "Supported: anthropic, openai, google, ollama."
    )


__all__ = ["Provider", "get_provider"]
