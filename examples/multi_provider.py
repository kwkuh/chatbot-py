"""Ask the same question to every provider and compare."""

from chatbot_py import Chatbot

QUESTION = "In one sentence, what is retrieval-augmented generation?"

for provider in ["anthropic", "openai", "google", "ollama"]:
    try:
        bot = Chatbot(provider=provider)
        print(f"\n=== {provider}:{bot.model} ===")
        print(bot.chat(QUESTION))
    except Exception as e:
        print(f"\n=== {provider} ===\n[skipped: {e}]")
