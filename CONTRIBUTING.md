# Contributing to chatbot-py

First — thanks for considering a contribution. This project is intentionally tiny and exists to be a clear, hackable reference for LLM chat in Python. Contributions that **keep it small and readable** are the most welcome.

## Ground rules

1. **No heavy frameworks.** No LangChain / LlamaIndex / agent frameworks. The whole point is a transparent reference.
2. **Provider parity.** New features should work across all four providers (Anthropic, OpenAI, Google, Ollama) or be clearly scoped to one.
3. **Tests required.** Any code change ships with a test. Use the `FakeProvider` fixture in `tests/conftest.py` — never hit a real API in tests.
4. **Type hints + docstrings.** Public API gets type hints and a one-line docstring.

## Dev setup

```bash
git clone https://github.com/kwkuh/chatbot-py.git
cd chatbot-py
python -m venv .venv && source .venv/bin/activate
make dev               # installs runtime + dev deps + the package in editable mode
cp .env.example .env   # add at least one provider key
```

## Workflow

```bash
make test         # run the test suite
make lint         # ruff check
make fmt          # ruff format
make typecheck    # mypy
```

All four must pass locally before opening a PR. CI runs the same set on every push.

## Branch & commit conventions

- Branch from `main`. Name: `feat/<short>`, `fix/<short>`, `docs/<short>`.
- Commit subject in imperative present tense: `add gemini provider`, not `added gemini provider`.
- One logical change per PR.

## Adding a new provider

1. Create `chatbot_py/providers/<name>_provider.py` implementing the `Provider` protocol (see `chatbot_py/providers/base.py`).
2. Register it in `chatbot_py/providers/__init__.py:get_provider`.
3. Add its dependency under `[project.optional-dependencies]` in `pyproject.toml`.
4. Add a `PROVIDER_MODELS` entry in `app.py`.
5. Add `.env` keys in `.env.example`.
6. Add a section in the README "Providers" table.
7. Tests: extend `tests/test_providers.py` with the provider name; if you can mock the SDK cleanly, add a streaming test.

## Reporting bugs / requesting features

Open an issue using the templates in `.github/ISSUE_TEMPLATE`. Include:
- Python version, OS
- Provider + model
- Minimal reproducer
- Expected vs. actual

## Code of Conduct

Be respectful. See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## License

By contributing, you agree your contributions are licensed under the MIT License.
