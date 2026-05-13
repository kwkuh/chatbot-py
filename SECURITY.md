# Security Policy

## Supported Versions

Only the latest minor release on `main` receives security updates.

| Version | Supported |
| ------- | --------- |
| 0.2.x   | ✅        |
| < 0.2   | ❌        |

## Reporting a Vulnerability

**Please do not file public GitHub issues for security problems.**

Email the maintainer directly:

**14934568+kwkuh@users.noreply.github.com**

Include:
- A description of the issue and its impact
- Steps to reproduce or proof-of-concept
- Affected version(s)
- Any suggested mitigation

You'll get an acknowledgment within 72 hours and a status update within 7 days. Once a fix is available, we'll coordinate a disclosure timeline with you.

## Scope

In scope:
- Vulnerabilities in `chatbot_py/`, `cli.py`, `app.py`, or any first-party code
- Insecure default configurations shipped in this repository

Out of scope:
- Vulnerabilities in upstream provider SDKs (report those upstream — `anthropic`, `openai`, `google-genai`, `ollama`)
- Issues that require the attacker to already have write access to your `.env` or shell
- Denial-of-service from misconfigured rate limits or quotas

## Security best practices for users

- **Never commit `.env`.** It's in `.gitignore` — keep it that way.
- **Rotate keys.** If a key leaks, revoke it at the provider dashboard first, then update `.env`.
- **Treat user-provided system prompts as untrusted.** This project does not sandbox tool use; if you add tools, validate inputs.
- **Pin dependencies in production.** The version ranges in `requirements.txt` are for ease of contribution, not for prod.
