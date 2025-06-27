# Flowdesk – Product Requirements Document

_Version 0.3 · 27 Jun 2025_

---

## 📑 Table of Contents

1. [Purpose](#1--purpose)
2. [Problem](#2--problem)
3. [Goals & Success Metrics](#3--goals--success-metrics)
4. [MVP Scope](#4--mvp-scope)
5. [Out‑of‑Scope](#5--out-of-scope)
6. [Constraints & Risks](#6--constraints--risks)
7. [Open Questions](#7--open-questions)
8. [Roadmap Ideas](#8--roadmap-ideas)
9. [Feature Specifications](#9--feature-specifications)
10. [Architecture Snapshot](#10--architecture-snapshot)
11. [Appendix](#11--appendix)

---

## 1 · Purpose

> **Flowdesk** turns repetitive support chats into an always‑on AI agent that deflects ≈ 80 % of tickets—without maintaining a help center.

## 2 · Problem

- **Repetitive questions** clog support queues.
- **Help‑center upkeep** is time‑consuming and often out‑of‑date.
- **24 / 7 coverage** requires expensive staffing or outsourcing.

## 3 · Goals & Success Metrics

### 3.1 Quantitative Targets

| Metric             | Target     | How Measured            |
| ------------------ | ---------- | ----------------------- |
| Ticket deflection  |  ≥ 80 %    | % tickets auto‑resolved |
| Avg. response time |  ≤ 5 s     | Chat logs               |
| CSAT (AI chats)    |  ≥ 4.5 / 5 | Post‑chat survey        |
| Payback period     |  < 7 days  | Cost‑savings analysis   |

### 3.2 Qualitative Goals

- **< 15 min onboarding** using existing chat history only.
- **“Feels human” replies**—minimal hallucinations; tone matches brand.

---

## 4 · MVP Scope

### 4.1 Core Features

1. **Chat Ingestion** – Import & vectorize historical transcripts (Intercom, Zendesk, Gmail).
2. **LLM Reply Engine** – Generate context‑aware answers + confidence score.
3. **Fallback Routing** – Low‑confidence → human agent hand‑off.
4. **Continuous Learning** – Retrain nightly on newly resolved tickets.
5. **Dashboard** – Real‑time deflection, CSAT, cost‑savings.

### 4.2 Key User Stories

| Role          | “I need to…”                              | So that                          |
| ------------- | ----------------------------------------- | -------------------------------- |
| Support Lead  | Connect Intercom & cut repetitive tickets | Team handles only edge‑cases     |
| Founder / COO | See real‑time cost savings                | Justify ROI & staffing decisions |
| End‑Customer  | Get instant, accurate answers at 2 a.m.   | Solve my problem without waiting |

### 4.3 High‑Level User Flow

```
Admin signup → Connect chat source → Click **Train**
          ↓
    Data ingested & indexed (progress bar)
          ↓
  Drop‑in JS widget / SDK installed
          ↓
 Customer asks question ↔ AI responds (< 5 s)
          ↓
Low confidence? → Seamless escalate to human
```

## 5 · Out‑of‑Scope

- Voice / phone IVR.
- Outsourced human‑agent marketplace.
- Stand‑alone knowledge‑base authoring.

## 6 · Constraints & Risks

- **Privacy & Compliance** – GDPR, SOC 2, PII redaction.
- **LLM Hallucinations** – Guardrails + human fallback.
- **Initial Integrations** – Launch with Intercom, Zendesk & Gmail.

## 7 · Open Questions

1. Pricing model: per‑seat, per‑ticket, or savings‑share?
2. Should replies include source citations?
3. Multilingual support at launch or post‑MVP?

## 8 · Roadmap Ideas (V2+)

- Auto‑translate for global teams.
- Brand‑tone fine‑tuning/voice cloning.
- Generate & update help‑center articles from chats.

---

## 9 · Feature Specifications

### 9.1 Chat Ingestion

| Aspect         | Detail                                                               |
| -------------- | -------------------------------------------------------------------- |
| **Scope**      | Import transcripts + metadata (user ID, tags, resolution).           |
| **APIs**       | Intercom REST, Zendesk REST, Gmail API.                              |
| **Internal**   | `POST /api/sources`, `GET /api/import_status/{job_id}`.              |
| **Edge Cases** | Malformed JSON, > 10 MB attachments, PII detection, API rate limits. |
| **Done When**  | ≥ 95 % rows ingested & searchable; visible in dashboard.             |

### 9.2 LLM Reply Engine

| Aspect         | Detail                                                                     |
| -------------- | -------------------------------------------------------------------------- |
| **Scope**      | Use top‑k vectors + system prompt → `answer`, `confidence`, `tokens_used`. |
| **LLMs**       | OpenAI GPT‑4o‑mini (primary), Anthropic Claude Haiku (fallback).           |
| **Edge Cases** | Hallucinations, profanity, unsupported language.                           |
| **Done When**  | P95 response ≤ 5 s; toxicity < 0.01.                                       |

### 9.3 Fallback Routing

| Aspect         | Detail                                                     |
| -------------- | ---------------------------------------------------------- |
| **Trigger**    | `confidence < 0.75` _or_ user types “agent”.               |
| **Action**     | Transfer with full context; preserve transcript.           |
| **Edge Cases** | No human online → queue & notify; infinite loop safeguard. |
| **Done When**  | False‑positive escalations < 1 %.                          |

### 9.4 Continuous Learning

| Aspect         | Detail                                                               |
| -------------- | -------------------------------------------------------------------- |
| **Mechanism**  | Append resolved Q\&A pairs; nightly re‑vectorize delta via cron job. |
| **Edge Cases** | Mass data deletion, vector drift.                                    |
| **Done When**  | Deflection rate steady/increasing week‑over‑week.                    |

### 9.5 Dashboard

| Aspect         | Detail                                                         |
| -------------- | -------------------------------------------------------------- |
| **Scope**      | Live charts (Deflection %, CSAT, Savings, Tokens). CSV export. |
| **Tech**       | Next.js · shadcn/ui · Recharts.                                |
| **Edge Cases** | Data gap > 5 min, large date range.                            |
| **Done When**  | P95 load < 1 s for 30‑day view.                                |

---

## 10 · Architecture Snapshot

### 10.1 Component Map (text)

```
React Client → HTTPS → FastAPI Gateway
       ├─ Auth (BetterAuth → JWT)
         ├─ Vector Service (Qdrant)
         ├─ LLM Service (OpenAI / Claude wrapper)
         └─ Postgres (users, orgs, metrics)

Background Workers (Celery + Redis)
  └─ Ingestion & Continuous Learning

Dashboard → TimescaleDB hypertables
S3 Storage for attachments
```

### 10.2 Tech Choices

| Layer         | Primary                                | Backup / Rationale            |
| ------------- | -------------------------------------- | ----------------------------- |
| LLM           | OpenAI GPT‑4o‑mini                     | Claude Haiku via feature flag |
| Vector DB     | Qdrant Cloud                           | Pinecone (GCP regions)        |
| Infra         | AWS (ECS Fargate, ALB, CloudFront)     | Fly.io for dev tier           |
| Observability | Grafana Cloud · Sentry · OpenTelemetry |                               |

### 10.3 Data Privacy & Compliance

- **Encryption** – TLS 1.3 in transit; AES‑256 at rest.
- **PII Redaction** – Presidio before vectorization.
- **User Deletion** – Cascade delete within 24 h.
- **Audit Logs** – CloudTrail + S3 Object Lock.

### 10.4 Reliability & Scaling

- **SLO** – P95 latency < 5 s per reply.
- Autoscale LLM pods on RPS.
- Vector DB replicas per AZ.
- Circuit‑breaker on LLM timeouts → escalate.

### 10.5 Cost of Goods (1 k tickets/day)

| Item                     | Monthly Cost                    |
| ------------------------ | ------------------------------- |
| OpenAI tokens (\~ 150 k) | ≈ \$90                          |
| Qdrant (1 m vectors)     | \$50                            |
| AWS (ECS + RDS + S3)     | \$120                           |
| **Total**                | **≈ \$260 (\~ \$0.008/ticket)** |

---

## 11 · Appendix

**Document Owner:** Abhi
**Stakeholders:** Engineering · Design · Support Ops · Compliance
