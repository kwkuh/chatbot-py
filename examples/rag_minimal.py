"""Minimal RAG in ~40 lines: dumb TF-IDF retrieval over a list of strings.

Not for production — this exists to show the *pattern*: retrieve, then condition.
For real RAG, swap the retriever for FAISS / pgvector / a vector DB.
"""

from __future__ import annotations

import re
from collections import Counter
from math import log

from chatbot_py import Chatbot


DOCS = [
    "The Eiffel Tower is in Paris and was completed in 1889.",
    "Mount Bromo is an active volcano in East Java, Indonesia.",
    "Jakarta is the capital of Indonesia and home to over 10 million people.",
    "Borobudur, in Central Java, is the world's largest Buddhist temple.",
    "The rupiah (IDR) is the official currency of Indonesia.",
]


def tokenize(s: str) -> list[str]:
    return re.findall(r"[a-z]+", s.lower())


def tfidf_retrieve(query: str, docs: list[str], k: int = 2) -> list[str]:
    doc_tokens = [tokenize(d) for d in docs]
    df = Counter()
    for tokens in doc_tokens:
        for t in set(tokens):
            df[t] += 1
    idf = {t: log(len(docs) / c) for t, c in df.items()}
    q = tokenize(query)
    scores = []
    for i, tokens in enumerate(doc_tokens):
        tf = Counter(tokens)
        score = sum(tf[t] * idf.get(t, 0.0) for t in q)
        scores.append((score, i))
    scores.sort(reverse=True)
    return [docs[i] for _, i in scores[:k]]


def answer(question: str) -> str:
    context = "\n".join(f"- {c}" for c in tfidf_retrieve(question, DOCS))
    bot = Chatbot(system=(
        "Answer using only the provided context. If the context doesn't contain the "
        "answer, say you don't know."
    ))
    return bot.chat(f"Context:\n{context}\n\nQuestion: {question}")


if __name__ == "__main__":
    print(answer("What is the currency of Indonesia?"))
