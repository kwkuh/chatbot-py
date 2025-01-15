```
$ whois domain-sell

% IANA WHOIS server
% This query returned 1 object

███████╗███████╗██╗     ██╗     
██╔════╝██╔════╝██║     ██║     
███████╗█████╗  ██║     ██║     
╚════██║██╔══╝  ██║     ██║     
███████║███████╗███████╗███████╗
╚══════╝╚══════╝╚══════╝╚══════╝
                                

domain:       DOMAIN-SELL
status:       ACTIVE
status:       SHIPPING
created:      2025-01-15
expires:      never

registrant:   Kukuh Laksana
country:      ID
url:          https://kukuh.la

source:       WHOIS.KUKUH.LA
```

---

## What

Single-file HTML one-pager for selling individual domains via Stripe. Drop on the domain itself, add a Stripe payment link, done.

## Usage

Edit the `CFG` block at the bottom of `index.html`, create a Stripe payment link, deploy to the domain you're selling.

## Why

Sedo / Dan / Afternic take 10-20% commission. Stripe takes 2.9% + $0.30. Self-hosted means you keep more on big sales.
