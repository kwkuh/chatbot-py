"""Terminal REPL for chatbot-py.

Usage:
    python cli.py
    python cli.py --provider openai
    python cli.py --provider google --model gemini-2.0-flash
    python cli.py --provider ollama --model llama3.2

REPL commands: /reset /usage /export /help /quit
"""

from __future__ import annotations

import argparse
import json
import sys

from dotenv import load_dotenv

from chatbot_py import Chatbot


HELP = """commands:
  /reset    clear conversation history
  /usage    show token usage so far
  /export   print history as JSON
  /help     this help
  /quit     exit"""


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="chatbot-py terminal REPL")
    p.add_argument("--provider", default=None, help="anthropic | openai | google | ollama")
    p.add_argument("--model", default=None)
    p.add_argument("--system", default=None, help="system prompt override")
    p.add_argument("--temperature", type=float, default=None)
    p.add_argument("--max-tokens", type=int, default=None)
    p.add_argument("--no-stream", action="store_true", help="disable streaming")
    return p.parse_args()


def main() -> int:
    load_dotenv()
    args = parse_args()
    kwargs = {k: v for k, v in {
        "provider": args.provider,
        "model": args.model,
        "system": args.system,
        "temperature": args.temperature,
        "max_tokens": args.max_tokens,
    }.items() if v is not None}
    bot = Chatbot(**kwargs)
    print(f"chatbot-py · {bot.provider_name}:{bot.model} · /help for commands")

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
        if msg == "/help":
            print(HELP)
            continue
        if msg == "/reset":
            bot.reset()
            print("(history cleared)")
            continue
        if msg == "/usage":
            u = bot.usage
            print(f"(in={u.input_tokens} out={u.output_tokens} total={u.total})")
            continue
        if msg == "/export":
            print(json.dumps(bot.export(), indent=2))
            continue

        if args.no_stream:
            print(f"bot> {bot.chat(msg)}")
        else:
            print("bot> ", end="", flush=True)
            for chunk in bot.stream(msg):
                print(chunk, end="", flush=True)
            print()


if __name__ == "__main__":
    sys.exit(main())
