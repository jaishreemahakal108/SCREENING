🧠 SCREENING — AI-Powered Interview Platform
---------------------------------------------
Summary :-> 
SCREENING is an intelligent, end-to-end AI-driven interview automation platform built with React, Next.js, Node.js, Express.js, Convex, Supabase, and Stream.
It enables recruiters to conduct real-time video interviews, generate AI-based coding and theory questions, and receive automated feedback and analytics — all from a single unified dashboard.

🚀 About the Project :-> 
SCREENING is designed to automate and simplify the entire candidate evaluation lifecycle.
It combines AI automation with real-time human-led collaboration — offering recruiters flexibility, insight, and efficiency.

The system is divided into two main modules:-
🧠 1. AI Interview Scheduler (AI-Led Interviews)
🧩 Conducted completely by an AI model (Gemini + ChatGPT).
🧩 The candidate interacts with the AI, which dynamically:
🧩 Generates domain-specific questions.
🧩 Evaluates candidate answers in real time.
🧩 Generates detailed feedback and performance analysis.
🧩 Interviewer dashboards display the AI’s evaluation and final recommendations.
🧩 Database Used → Supabase
 Why Supabase?
-> Provides a PostgreSQL-based backend that’s ideal for structured data like user profiles, AI evaluations, and interview results.
-> Handles secure authentication, storage, and REST APIs out of the box.
-> Its serverless functions simplify backend automation like sending email invites or storing feedback.
-> Scalable and reliable for long-term data storage (interview results, candidate details, analytics).

🎥 2. Video Calling Module (Human-Led Interviews):-
🧩 Built using Stream for secure, real-time one-on-one or multi-interviewer sessions.
🧩 Integrated Clerk and Google Auth for user authentication and access control.
🧩 Supports live coding assessments, collaborative feedback, and automatic recordings.
🧩 Enables multiple interviewers to join the same call, review code, and evaluate candidates together.
🧩 Database Used → Convex
Why Convex?
-> Offers real-time, reactive data synchronization, perfect for features like:
-> Instant updates of participants’ statuses
-> Live feedback submission
-> Shared interview states and session management
-> Serverless & low-latency, removing the need for polling or manual refresh.
-> Simplifies database logic with reactive “mutations” and “queries” — ideal for high-frequency, short-lived data (e.g., video call session data, messages, live code updates).

🌟 Key Features
1-> 🎥 Real-Time Video Interviews
High-quality, low-latency video calls using Stream SDK.
Secure interviewer and candidate login with Clerk and Google Auth.
Multi-interviewer support with shared screen and collaborative tools.
Auto-recording of sessions for later review.

2-> 💻 Live Code Editor
Real-time collaborative coding environment for technical interviews.
Supports multiple programming languages.
Features live execution, syntax highlighting, and shared state updates.

3-> 🤖 AI Question Generation & Evaluation
Uses Gemini and ChatGPT APIs to generate domain-specific interview questions dynamically.
Evaluates responses and produces context-aware performance analysis.
Stores and displays insights in interviewer dashboards.

4-> 🧑‍💻 Multi-Interviewer Collaboration
Multiple interviewers can join a candidate’s session simultaneously.
Shared coding editor and synchronized feedback panel for collective evaluation.

5-> ⭐ Smart Feedback System
Interviewers or AI provide structured feedback:
   ✅ Pass/Fail
   ⭐ Star Rating
   💬 Comments
Feedback is stored in Supabase / Convex depending on the module.

6-> ✉️ Automated Notifications
Generates unique, secure, and shareable interview links.
Sends automated email invitations and reminders with embedded meeting details.

⚙️ Tech Stack:-
------------------------------------------------------------------------------------
  | Category                  | Technologies                                     |
  | ------------------------- | ------------------------------------------------ |
  |   Frontend                | Next.js, React, Tailwind CSS, TypeScript         |
  |   Backend                 | Node.js, Express.js                              |
  |   Databases               | Supabase (AI module), Convex (Video-call module) |
  |   Authentication          | Google Auth, Clerk                               |
  |   Video Calls             | Stream SDK                                       |
  |   AI Models               | Gemini API, ChatGPT (OpenAI API)                 |
  |   Email & Notifications   | Supabase Functions / Nodemailer                  |
  |   Version Control         | Git & GitHub                                     |
  |   Deployment              | Netlify                                          |
------------------------------------------------------------------------------------
  
🧭 Architecture Overview:-
SCREENING/
│
├── ai-interview-scheduler/       # AI-led interviews (Gemini + ChatGPT + Supabase)
│   ├── Next.js frontend (AI chat + feedback UI)
│   ├── Node.js backend (AI orchestration)
│   └── Supabase for data & storage
│
└── screening-videocall/          # Human-led interviews (Stream + Convex + Clerk)
    ├── Next.js frontend (video call + live code)
    ├── Convex for real-time database
    └── Feedback & recording management
