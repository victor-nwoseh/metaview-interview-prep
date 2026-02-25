export const SAMPLE_JD = `Senior Software Engineer — Meridian

Meridian is building the financial infrastructure for creator-led businesses — payments, tax, and treasury tools for independent creators, agencies, and digital-first brands. We've processed $2B in creator earnings and are backed by Andreessen Horowitz ($45M Series B). We're 85 people, growing fast, and building a product that doesn't exist yet.

The role:
We're looking for a Senior Software Engineer to own core infrastructure on our payments platform. You'll work closely with our Head of Engineering and directly with product and design to define and build the systems that move real money at scale.

What you'll do:
- Own the design, implementation, and reliability of payment processing pipelines handling $50M+ monthly volume
- Lead technical architecture decisions for our payouts and reconciliation systems
- Partner with compliance and product to implement regulatory requirements (PCI-DSS, 1099 reporting, state money transmission rules)
- Improve observability, incident response, and on-call practices across the backend
- Mentor 2 junior engineers and set technical standards for a growing team

What we're looking for:
- 5+ years of backend engineering experience, with at least 2 years in a fintech or payments context
- Strong Python — you've shipped production services, not just scripts
- Experience with distributed systems: async processing, message queues, idempotency, eventual consistency
- Hands-on AWS: you've owned infrastructure, not just consumed it (ECS, SQS, RDS, Lambda)
- Experience with financial data: reconciliation, ledgering, or double-entry accounting systems is a strong plus
- You've operated in a startup environment: comfortable with ambiguity, can scope work independently
- React experience is a plus — our team is small and frontend work happens

Compensation: $185–220K base + equity. Remote-first (US timezones).`;

export const SAMPLE_CV = `Alex Chen
Senior Software Engineer
alex.chen@email.com | github.com/alexchen | San Francisco, CA

Experience

Senior Software Engineer — Plaid (2020–2024)
- Led re-architecture of Plaid's transaction enrichment pipeline, reducing P99 latency from 4.2s to 380ms by migrating from synchronous processing to an async SQS/Lambda event-driven architecture
- Designed and implemented idempotent payment retry logic that reduced duplicate transaction errors by 94% across 12 bank integrations
- Built Plaid's internal ledgering service from scratch — a double-entry accounting system processing $8B in annual transaction volume
- Mentored 3 junior engineers through 1:1s and code review; 2 were promoted to mid-level within 18 months
- On-call rotation lead for 18 months; reduced MTTR from 47 minutes to 11 minutes through improved runbooks and alerting

Software Engineer — Brex (2018–2020)
- Built the card transaction processing service in Python/FastAPI, handling 2M+ daily transactions
- Implemented automated 1099 tax reporting pipeline that replaced a fully manual process, covering 40K+ contractors annually
- Contributed to migration from monolith to microservices; owned the spend management service end-to-end

Education
BS Computer Science, UC Berkeley, 2018

Skills
Python, FastAPI, AWS (ECS, SQS, Lambda, RDS, CloudWatch), PostgreSQL, Redis, React, distributed systems, payments, PCI-DSS compliance`;
