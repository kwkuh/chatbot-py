"""Streamlit web UI for chatbot-py.

Run:
    streamlit run app.py
"""

from __future__ import annotations

import streamlit as st
from dotenv import load_dotenv

from chatbot import Chatbot, DEFAULT_MAX_TOKENS, DEFAULT_MODEL, DEFAULT_SYSTEM, DEFAULT_TEMP

load_dotenv()

st.set_page_config(page_title="chatbot-py", page_icon="💬")
st.title("💬 chatbot-py")
st.caption("A simple, open-source LLM chatbot — Claude + Streamlit, ~200 LOC.")

with st.sidebar:
    st.header("Settings")
    model = st.selectbox(
        "Model",
        ["claude-sonnet-4-6", "claude-opus-4-7", "claude-haiku-4-5-20251001"],
        index=0,
    )
    temperature = st.slider("Temperature", 0.0, 1.0, DEFAULT_TEMP, 0.05)
    max_tokens = st.slider("Max tokens", 256, 4096, DEFAULT_MAX_TOKENS, 128)
    system = st.text_area("System prompt", DEFAULT_SYSTEM, height=100)

    if st.button("🧹 New conversation", use_container_width=True):
        st.session_state.pop("bot", None)
        st.session_state.pop("messages", None)
        st.rerun()

if "bot" not in st.session_state or any(
    getattr(st.session_state.bot, k) != v
    for k, v in {"model": model, "temperature": temperature, "max_tokens": max_tokens, "system": system}.items()
):
    st.session_state.bot = Chatbot(
        model=model, temperature=temperature, max_tokens=max_tokens, system=system
    )
    st.session_state.messages = []

for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

if prompt := st.chat_input("Say something..."):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    with st.chat_message("assistant"):
        placeholder = st.empty()
        full = ""
        for chunk in st.session_state.bot.stream(prompt):
            full += chunk
            placeholder.markdown(full + "▌")
        placeholder.markdown(full)
    st.session_state.messages.append({"role": "assistant", "content": full})

usage = st.session_state.bot.usage
st.sidebar.divider()
st.sidebar.metric("Tokens used", usage.total, help=f"in={usage.input_tokens} · out={usage.output_tokens}")
