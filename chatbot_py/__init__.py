"""chatbot-py — a simple, open-source, multi-provider LLM chatbot.

Public API:
    Chatbot          — main chat client
    Message, Usage   — value types
    get_provider     — provider factory
"""

from chatbot_py.chatbot import Chatbot
from chatbot_py.providers import get_provider
from chatbot_py.types import Message, Usage

__version__ = "0.2.0"
__all__ = ["Chatbot", "Message", "Usage", "get_provider", "__version__"]
