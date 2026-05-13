# Changelog

All notable changes to this project will be documented in this file. Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); this project follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Planned
- Tool use / function calling
- Vision (image input)
- Minimal RAG example with local FAISS
- Persistent chat history (SQLite)
- Multi-provider router

## [0.2.0] — 2026-05-14

### Added
- **Multi-provider support**: Anthropic Claude, OpenAI GPT, Google Gemini, Ollama (local).
- `Provider` protocol in `chatbot_py/providers/base.py` for clean extension.
- `get_provider()` factory with aliases (`claude`/`gpt`/`gemini`).
- CLI flags: `--provider`, `--model`, `--system`, `--temperature`, `--max-tokens`, `--no-stream`.
- CLI REPL commands: `/help`, `/export`.
- Streamlit UI provider switcher.
- Packaging: `pyproject.toml` with optional extras per provider.
- Dev tooling: pytest, ruff, mypy, Makefile, Dockerfile, docker-compose.
- Tests with `FakeProvider` — no API keys needed.
- Community files: `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `CHANGELOG.md`, issue & PR templates.
- GitHub Actions CI: lint + test on Python 3.10/3.11/3.12.

### Changed
- Repository structure: code moved to `chatbot_py/` package.
- `Chatbot.usage` is now a shared `Usage` dataclass with `add()` helper.
- README rewritten as a portfolio-grade landing page.

## [0.1.0] — 2026-05-14

### Added
- Initial release: single-provider (Anthropic) chatbot with Streamlit UI + CLI.
