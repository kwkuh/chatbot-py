"""Terminal REPL for chatbot-py.

Commands:
    /reset   clear conversation history
    /usage   show token usage so far
    /quit    exit
"""

from __future__ import annotations

import sys

from dotenv import load_dotenv

from chatbot import Chatbot


def main() -> int:
    load_dotenv()
    bot = Chatbot()
    print(f"chatbot-py · {bot.model} · type /reset, /usage, /quit")

    while True:
        try:
            msg = input("you> ").strip()
        except (EOFError, KeyboardInterrupt):
            print()
            return 0

        if not msg:
            continue
        if msg == "/quit":
            return 0
        if msg == "/reset":
            bot.reset()
            print("(history cleared)")
            continue
        if msg == "/usage":
            print(f"(in={bot.usage.input_tokens} out={bot.usage.output_tokens} total={bot.usage.total})")
            continue

        print("bot> ", end="", flush=True)
        for chunk in bot.stream(msg):
            print(chunk, end="", flush=True)
        print()


if __name__ == "__main__":
    sys.exit(main())
