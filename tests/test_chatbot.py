from chatbot_py import Chatbot, Message, Usage


def test_chat_appends_history_and_tracks_usage(fake):
    bot = Chatbot(provider=fake, system="sys", temperature=0.1, max_tokens=50)
    reply = bot.chat("hi")
    assert reply == "ok"
    assert [m.role for m in bot.history] == ["user", "assistant"]
    assert bot.history[0].content == "hi"
    assert bot.history[1].content == "ok"
    assert bot.usage.output_tokens == 2  # len("ok")


def test_chat_keeps_multi_turn_context(fake):
    bot = Chatbot(provider=fake)
    bot.chat("first")
    bot.chat("second")
    assert len(bot.history) == 4
    last_call = fake.calls[-1]
    assert [m.content for m in last_call["messages"]] == ["first", "ok", "second"]


def test_stream_yields_chunks_and_records_usage(fake):
    fake.reply = "abcd"
    bot = Chatbot(provider=fake)
    chunks = list(bot.stream("go"))
    assert "".join(chunks) == "abcd"
    assert bot.history[-1].content == "abcd"
    assert bot.usage.output_tokens == 4


def test_reset_clears_history_but_keeps_usage(fake):
    bot = Chatbot(provider=fake)
    bot.chat("hi")
    bot.reset()
    assert bot.history == []
    assert bot.usage.total > 0


def test_export_returns_serializable(fake):
    bot = Chatbot(provider=fake)
    bot.chat("hi")
    exported = bot.export()
    assert exported == [
        {"role": "user", "content": "hi"},
        {"role": "assistant", "content": "ok"},
    ]


def test_default_model_falls_back_to_provider(fake):
    bot = Chatbot(provider=fake)
    assert bot.model == "fake-model"


def test_usage_add_and_total():
    u = Usage(1, 2)
    u.add(Usage(10, 20))
    assert u.input_tokens == 11
    assert u.output_tokens == 22
    assert u.total == 33


def test_message_to_dict():
    assert Message("user", "hi").to_dict() == {"role": "user", "content": "hi"}
