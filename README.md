# Interview Prep Agent
### AI-Powered Interview Preparation for Hiring Teams

---

## The Teardown

### What Metaview Gets Right

Metaview has made the smartest strategic move in recruiting AI: expanding from a single product into a platform.

Most companies in this space stayed narrow — BrightHire focused on compliance, Pillar on candidate experience. Metaview bet on breadth and AI quality. The result is four products (Notetaker, Reports, Job Posts, Sourcing) that cover more of the hiring workflow than any competitor, with each product feeding data into the others.

This creates a compounding advantage. Every interview the Notetaker captures enriches the data layer that powers Reports, sharpens Sourcing's understanding of what "good" looks like, and gives Job Posts real signal about what roles actually require versus what JDs claim. The December 2025 update — enriching AI notes with JDs and CVs from the ATS — was a quiet but significant move. It means Metaview's outputs are no longer just transcription; they're contextual analysis grounded in role requirements and candidate history.

The product velocity is also notable. In the last three months alone: PDF note delivery, ATS document enrichment, sourcing transparency (showing reasoning behind candidate selection), personal knowledge preferences, AI Reports 2.0 with custom templates and prompt improvement, and custom ATS field support. For a small team, this is exceptional shipping cadence.

With $50M raised and GV leading the Series B, the thesis is clear: Metaview is building the AI operating system for recruiting. Not a point solution. A platform.

### The Blind Spot

Here is the hiring workflow with Metaview's coverage mapped:

| Stage | Metaview Coverage |
|---|---|
| Job definition / intake | AI Job Posts |
| Sourcing | AI Sourcing |
| Screening | AI Sourcing (partial — matching and ranking) |
| **Interview preparation** | **Nothing** |
| Interview conduct | AI Notetaker |
| Post-interview analysis | AI Reports 2.0 |
| Decision / offer | AI Reports (partial — data, not recommendations) |

There is a gap between sourcing a candidate and interviewing them. The Notetaker captures what happens during the interview. Reports analyzes what happened after. But nothing in Metaview's product suite helps interviewers prepare *before* the conversation starts.

The irony is that Metaview already has the inputs needed to solve this. Since December 2025, the platform ingests job descriptions and candidate CVs from the ATS to enrich post-interview notes. Those same inputs — the JD, the CV, the role requirements, and now the historical interview data from past candidates — are exactly what's needed to generate a tailored interview preparation brief *before* the call begins.

The data is there. It's just being used in one direction.

### Why This Gap Matters

This is not a minor feature request. Interview preparation is upstream of everything Metaview does.

**The quality of the interview determines the quality of everything downstream.** If a hiring manager shows up unprepared — asking generic questions, missing critical competency areas, failing to probe gaps in the candidate's background — then the Notetaker captures a mediocre conversation, Reports analyzes weak signal, and the hiring decision is worse for it. No amount of post-interview AI can compensate for a poorly conducted interview.

This is not a theoretical problem. It is the single most common complaint recruiters have about hiring managers: they arrive unprepared. They read the CV five minutes before the call. They ask the same questions regardless of the role or candidate. They lack structured evaluation criteria. Recruiters spend hours briefing hiring managers before interviews — time that could be eliminated by an AI agent that already has all the context.

**The competitive window is open.** BrightHire was the one competitor that offered interviewer guidance — tailored interview plans and structured prompts. BrightHire was acquired by Zoom in November 2025. That capability is being absorbed into a video conferencing platform, not a recruiting platform. The standalone market for AI-powered interview preparation, built for interviewers rather than candidates, is unoccupied.

And it is built for interviewers that matters. Every AI interview prep tool on the market today — Final Round AI, Huru, Skillora, Interviews.chat — is designed for candidates. The interviewer side, which is where the leverage actually sits (one interviewer conducts hundreds of interviews; one candidate does a handful), is wide open.

**This gap also has a platform-strengthening effect.** An interview prep agent that uses Metaview's existing data (JDs, CVs, historical interview patterns from Reports) gives users a reason to keep that data in Metaview. It deepens the moat. And it creates a feedback loop: prep agent improves the interview → Notetaker captures richer signal → Reports surfaces better insights → prep agent learns what good interviews look like → next prep brief is even better.

### What I Built

To demonstrate this opportunity, I built a working prototype: an AI Interview Prep Agent.

You give it a job description and a candidate's CV. It returns a structured interview preparation brief: tailored questions mapped to role competencies, specific areas to probe based on the candidate's background, evaluation criteria for each question, and red flags or gaps worth exploring.

This is a proof of concept built in a single sprint — scoped to demonstrate the opportunity, not to ship to production. The architecture is designed to extend: deeper ATS integration, historical interview pattern learning, and team-level calibration are natural next steps.

The gap is real, the inputs already exist in the platform, and the opportunity is sitting in plain sight.

---

## About the Prototype

This is a working implementation of the Interview Prep Agent described above. Paste a job description and a candidate's CV — the app produces a structured, AI-generated interview brief in real time: role competency map, candidate-specific questions (grounded in the actual CV), evaluation criteria for each question, gaps to explore, and a recommended interview flow. Every output is specific to the JD and CV provided. There are no generic questions.

**[Live Demo →][demo-link]**

---

## Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Styling:** Tailwind CSS + Tailwind Typography
- **Backend:** Python + FastAPI (async streaming)
- **LLM:** Anthropic Claude (`claude-sonnet-4-6`)
- **Deployment:** Vercel (frontend) + Railway (backend)

---

## Running Locally

### Prerequisites

- Python 3.11+
- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com)

### 1. Clone the repo

```bash
git clone https://github.com/[your-username]/metaview-interview-prep.git
cd metaview-interview-prep
```

### 2. Start the backend

```bash
cd backend
python -m venv .venv

# Mac/Linux
source .venv/bin/activate

# Windows
.venv\Scripts\activate

pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory:

```
ANTHROPIC_API_KEY=your-api-key-here
ALLOWED_ORIGINS=http://localhost:5173
```

Start the server:

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.

### 3. Start the frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### 4. Try it

Click **"Try an example →"** in the top-right of the input panel to pre-fill the form with a realistic job description and CV, then click **Generate Interview Brief**.

---

## Architecture

```
User Input (JD + CV)
        │
        ▼
  React Frontend
  (InputForm → useGenerateBrief hook)
        │
        │  POST /api/generate
        ▼
  FastAPI Backend
  (prompt.py: builds system prompt + user prompt)
        │
        │  Streaming API call
        ▼
  Anthropic Claude (claude-sonnet-4-6)
        │
        │  text/plain stream
        ▼
  FastAPI StreamingResponse
        │
        │  ReadableStream chunks
        ▼
  React Frontend
  (useGenerateBrief: accumulates chunks into state)
        │
        ▼
  InterviewBrief component
  (react-markdown + Tailwind Typography)
        │
        ▼
  Rendered Interview Brief
```

The prompt instructs Claude to produce five structured sections in markdown: Role Competency Map, Candidate-Specific Questions, Evaluation Criteria, Gaps & Red Flags, and Interview Flow Recommendation. Every question is required to cite a specific element from the candidate's CV — generic output is explicitly prohibited by the prompt.

---

[demo-link]: https://[to-be-updated-after-deployment]
