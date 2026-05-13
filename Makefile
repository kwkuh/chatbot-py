.PHONY: help install dev test lint fmt typecheck run cli build clean docker

help:
	@echo "chatbot-py — available targets:"
	@echo "  make install     install runtime deps"
	@echo "  make dev         install dev deps (test + lint + type)"
	@echo "  make test        run pytest"
	@echo "  make lint        run ruff lint"
	@echo "  make fmt         run ruff format"
	@echo "  make typecheck   run mypy"
	@echo "  make run         launch Streamlit UI"
	@echo "  make cli         launch terminal REPL"
	@echo "  make build       build wheel + sdist"
	@echo "  make docker      build Docker image"
	@echo "  make clean       remove build artifacts"

install:
	pip install -r requirements.txt

dev:
	pip install -e ".[all,dev]"

test:
	pytest -q

lint:
	ruff check .

fmt:
	ruff format .

typecheck:
	mypy chatbot_py

run:
	streamlit run app.py

cli:
	python cli.py

build:
	python -m build

docker:
	docker build -t chatbot-py:latest .

clean:
	rm -rf build/ dist/ *.egg-info .pytest_cache .ruff_cache .mypy_cache
	find . -type d -name __pycache__ -exec rm -rf {} +
