"""Streamlit web UI for chatbot-py.

Run:
    streamlit run app.py
"""

from __future__ import annotations

import streamlit as st
from dotenv import load_dotenv

from chatbot_py import Chatbot
from chatbot_py.chatbot import DEFAULT_MAX_TOKENS, DEFAULT_SYSTEM, DEFAULT_TEMP

load_dotenv()

st.set_page_config(page_title="chatbot-py", page_icon="💬")
st.title("💬 chatbot-py")
st.caption("Open-source multi-provider LLM chatbot — Claude · GPT · Gemini · Ollama.")

PROVIDER_MODELS: dict[str, list[str]] = {
    "anthropic": ["claude-sonnet-4-6", "claude-opus-4-7", "claude-haiku-4-5-20251001"],
    "openai":    ["gpt-4o-mini", "gpt-4o", "gpt-4-turbo", "gpt-3.5-turbo"],
    "google":    ["gemini-2.0-flash", "gemini-1.5-pro", "gemini-1.5-flash"],
    "ollama":    ["llama3.2", "llama3.1", "mistral", "qwen2.5", "phi3"],
}

with st.sidebar:
    st.header("Settings")
    provider = st.selectbox("Provider", list(PROVIDER_MODELS.keys()), index=0)
    model = st.selectbox("Model", PROVIDER_MODELS[provider], index=0)
    temperature = st.slider("Temperature", 0.0, 1.0, DEFAULT_TEMP, 0.05)
    max_tokens = st.slider("Max tokens", 256, 4096, DEFAULT_MAX_TOKENS, 128)
    system = st.text_area("System prompt", DEFAULT_SYSTEM, height=100)
    if st.button("🧹 New conversation", use_container_width=True):
        st.session_state.pop("bot", None)
        st.session_state.pop("messages", None)
        st.rerun()

config = dict(provider=provider, model=model, temperature=temperature, max_tokens=max_tokens, system=system)
if "bot_config" not in st.session_state or st.session_state.bot_config != config:
    try:
        st.session_state.bot = Chatbot(**config)
        st.session_state.bot_config = config
        st.session_state.messages = st.session_state.get("messages", [])
    except Exception as e:
        st.error(f"Failed to initialize provider `{provider}`: {e}")
        st.stop()

for msg in st.session_state.get("messages", []):
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

if prompt := st.chat_input("Say something..."):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    with st.chat_message("assistant"):
        placeholder = st.empty()
        full = ""
        try:
            for chunk in st.session_state.bot.stream(prompt):
                full += chunk
                placeholder.markdown(full + "▌")
            placeholder.markdown(full)
        except Exception as e:
            placeholder.error(f"Error: {e}")
            full = f"[error: {e}]"
    st.session_state.messages.append({"role": "assistant", "content": full})

usage = st.session_state.bot.usage
st.sidebar.divider()
st.sidebar.metric("Tokens used", usage.total, help=f"in={usage.input_tokens} · out={usage.output_tokens}")
st.sidebar.caption(f"`{st.session_state.bot.provider_name}:{st.session_state.bot.model}`")
