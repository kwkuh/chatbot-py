"""Smallest possible usage."""

from chatbot_py import Chatbot

bot = Chatbot()  # picks provider from $CHATBOT_PROVIDER (default: anthropic)
print(bot.chat("Explain LLM in one sentence."))
print(bot.chat("Now in five words."))
print(f"tokens: {bot.usage.total}")
