"""Stream tokens as they arrive."""

from chatbot_py import Chatbot

bot = Chatbot(system="You answer in short bullet points.")
for chunk in bot.stream("List 3 facts about the Indonesian rupiah."):
    print(chunk, end="", flush=True)
print()
