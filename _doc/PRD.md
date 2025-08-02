# Flowdesk – Product Requirements Document (MVP)

_Version 1.0 · Gmail-Focused MVP · January 2025_

---

## 📑 Table of Contents

1. [Purpose](#1--purpose)
2. [Problem](#2--problem)
3. [MVP Goals & Success Metrics](#3--mvp-goals--success-metrics)
4. [MVP Scope](#4--mvp-scope)
5. [Out-of-Scope](#5--out-of-scope)
6. [Technical Specs](#6--technical-specs)
7. [Success Criteria](#7--success-criteria)

---

## 1 · Purpose

> **Flowdesk** turns your Gmail support history into an intelligent AI agent that deflects ≈70% of tickets—zero setup complexity, zero help center maintenance.

**Core Value**: In under 10 minutes, connect Gmail → AI learns your support patterns → embed chat widget → customers get instant, contextual answers based on how YOU actually resolve issues.

---

## 2 · Problem

### Target User: Solo founders & small teams using Gmail for support

**Current Pain Points:**
- **Gmail support is reactive**: Same questions over and over via email
- **No 24/7 coverage**: Customers wait hours/days for simple answers
- **Help centers are complex**: Creating & maintaining docs is time-consuming
- **Gmail history is wasted**: Years of resolved conversations sit unused

**The Opportunity**: Gmail already contains your perfect support knowledge base—just need AI to learn from it.

---

## 3 · MVP Goals & Success Metrics

### Success Metrics (30 days post-launch)

| Metric                | Target      | How Measured                    |
| --------------------- | ----------- | ------------------------------- |
| **Setup Speed**       | < 10 min    | Signup → working chat widget    |
| **Conversation Deflection** | ≥ 70%       | % auto-resolved without escalation |
| **Response Time**     | ≤ 5s        | Chat widget performance logs    |
| **User Satisfaction** | ≥ 4.0/5     | Simple thumbs up/down in chat   |
| **Active Users**      | 50+ users   | Users with connected Gmail + active widget |

### MVP Success Definition
**"Can a user go from signup to working AI support in under 10 minutes, with AI that gives answers based on their actual Gmail support patterns?"**

---

## 4 · MVP Scope (Gmail-Only)

### 4.1 Core Features

1. **🔐 Google OAuth Integration**
   - One-click Gmail access (read-only)
   - Auto-create organization on first signup

2. **📧 Gmail History Import**
   - Extract support email threads
   - Identify Q&A patterns from resolved conversations
   - Vectorize content for similarity search

3. **🤖 AI Response Engine**
   - Search Gmail vectors for relevant context
   - Generate responses using GPT-4o-mini
   - Return contextual answers based on YOUR support style

4. **💬 Embeddable Chat Widget**
   - Simple iframe embed for any website
   - Clean UI with satisfaction feedback (👍👎)
   - Mobile-responsive design

5. **📊 Basic Analytics Dashboard**
   - 4 core metrics: Deflection rate, Response time, CSAT, Total conversations
   - 7-day and 30-day views
   - CSV export for deeper analysis

### 4.2 User Stories

| User Type           | Need                                           | So That                                    |
| ------------------- | ---------------------------------------------- | ------------------------------------------ |
| **Solo Founder**    | Connect Gmail → instant AI support            | I focus on product, not repetitive emails |
| **Small Team CEO**  | AI trained on our actual support conversations | Customers get consistent, brand-appropriate answers |
| **Customer**        | Instant help based on past resolutions        | I don't wait hours for common questions    |

### 4.3 MVP User Flow

```
1. Sign up (Google OAuth) → Auto-create organization
2. Connect Gmail → Grant read-only access  
3. Import emails → AI processes historical threads (progress bar)
4. Get embed code → Add 3 lines to website
5. Customer chats → AI searches Gmail context → Responds in <5s
```

**Success Path**: User completes entire flow in under 10 minutes with zero technical setup required.

---

## 5 · Out-of-Scope (MVP)

### ❌ Removed for Focus
- **Multiple integrations** (Intercom, Zendesk, Slack) → Post-MVP
- **Team management** (members, roles, invitations) → Post-MVP  
- **Multiple AI agents** per organization → Post-MVP
- **Complex analytics** (cost-savings, conversation sources) → Post-MVP
- **Human escalation** workflows → Post-MVP
- **Voice/phone support** → V2+
- **Knowledge base creation** tools → V2+

### ✅ Post-MVP Roadmap
- **Q2 2025**: Intercom & Zendesk integrations, team collaboration
- **Q3 2025**: Human escalation, advanced analytics, multiple agents
- **Q4 2025**: Voice integration, multi-language support

---

## 6 · Technical Specs

### 6.1 Architecture

```
Next.js 15 App (Frontend + API Routes)
├─ Better Auth (Google OAuth + email/password)
├─ Prisma ORM → SQLite (production: PostgreSQL)  
├─ OpenAI GPT-4o-mini (AI responses)
└─ Qdrant Cloud (vector storage & search)

Gmail API Integration
└─ Background processing for email import

Embeddable Chat Widget  
└─ React component (iframe embed)
```

### 6.2 Tech Stack

| Component       | Choice                | Rationale                     |
| --------------- | --------------------- | ----------------------------- |
| **Frontend**    | Next.js 15 + TypeScript | Full-stack, Vercel-optimized |
| **Database**    | SQLite + Prisma      | Zero-config for MVP          |
| **Auth**        | Better Auth           | Google OAuth built-in        |
| **AI**          | OpenAI GPT-4o-mini    | Best price/performance        |
| **Vector DB**   | Qdrant Cloud          | Managed, simple setup        |
| **Deployment** | Vercel                | Zero-config Next.js hosting  |

### 6.3 Key API Endpoints

| Endpoint                    | Purpose                           |
| --------------------------- | --------------------------------- |
| `POST /api/gmail/connect`   | Initiate Gmail OAuth flow         |
| `GET /api/gmail/import`     | Check email import status         |
| `POST /api/chat`            | Process chat widget messages      |
| `GET /api/analytics`        | Fetch dashboard metrics           |

### 6.4 Data Models (Simplified)

```typescript
// Core models for MVP
User { id, email, name, createdAt }
Organization { id, name, userId } // 1:1 with User for MVP
AIAgent { id, orgId, name, systemPrompt } // One per org
Conversation { id, orgId, status, createdAt }
Message { id, conversationId, content, role, isFromAI }
Analytics { id, orgId, date, totalConversations, resolvedByAI }
```

### 6.5 Security & Privacy

- **Gmail Access**: Read-only OAuth scope; emails encrypted at rest
- **Data Retention**: User controls data; deleted on account closure
- **API Security**: Rate limiting, CORS, input validation
- **Compliance**: GDPR-ready (SOC 2 post-MVP)

---

## 7 · Success Criteria

### 7.1 Launch Readiness Checklist

**Technical:**
- [ ] Gmail OAuth working end-to-end
- [ ] Email import processing ≥90% success rate
- [ ] Chat widget embeddable on any website  
- [ ] AI responses using Gmail conversation context
- [ ] Analytics dashboard showing real-time metrics
- [ ] Complete user flow under 10 minutes

**Business:**
- [ ] Pricing set at $49/month (profitable at 1k conversations)
- [ ] Basic error handling & user feedback
- [ ] Simple onboarding flow with progress indicators

### 7.2 30-Day Post-Launch Goals

**User Metrics:**
- 50+ active users with Gmail connected
- ≥70% conversation auto-resolution rate
- <5s average AI response time
- ≥4.0/5.0 customer satisfaction
- 80%+ user completion rate (signup → working widget)

**Business Metrics:**
- Profitable unit economics at $49/month
- <5% monthly churn rate
- Positive user feedback & feature requests for V2

### 7.3 MVP Cost Structure

**Monthly Operating Costs (1k conversations):**
- Vercel Pro: $20
- OpenAI API: ~$50  
- Qdrant Cloud: $25
- **Total COGS: ~$95**

**Target Pricing**: $49/month → Break-even at ~500 conversations, 50% margin at 1k.

---

## 8 · Implementation Priorities

### Phase 1: Core Infrastructure (Week 1-2)
1. Gmail OAuth integration
2. Email import & processing pipeline
3. Vector storage setup (Qdrant)

### Phase 2: AI & Chat (Week 3-4)  
4. AI response engine with Gmail context
5. Chat widget component
6. Basic analytics dashboard

### Phase 3: Polish & Launch (Week 5-6)
7. User onboarding flow
8. Error handling & edge cases
9. Performance optimization
10. Launch preparation

---

**Document Owner**: Engineering Team  
**Last Updated**: January 2025  
**Status**: Ready to implement  
**Next Review**: After MVP launch + 30 days