# ⚡ KaamAsaan - AI-Powered Opportunity Inbox Ranker

> **Your intelligent career assistant that analyzes emails, ranks opportunities, and helps Pakistani students make smarter decisions.**

Built for the **National AI Hackathon 2026** 🇵🇰

[![TypeScript](https://img.shields.io/badge/TypeScript-89.4%25-blue)](https://github.com/MuhammadSubhan404x/KaamAsaan)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black)](https://nextjs.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 🎯 What is KaamAsaan?

**KaamAsaan** (Urdu: کام آسان = "Work Made Easy") is an AI-powered opportunity inbox that helps Pakistani students cut through email noise and focus on what matters.

### The Problem
Students receive dozens of emails daily about scholarships, internships, competitions, and opportunities. Most are:
- ❌ Irrelevant to their profile
- ❌ Already expired
- ❌ Missing critical information
- ❌ Buried in spam

### The Solution
KaamAsaan uses AI to:
- ✅ **Extract** opportunities from raw emails
- ✅ **Score** each one against your profile (fit, urgency, prestige)
- ✅ **Rank** them so you know what to apply to first
- ✅ **Generate** cover letters, roadmaps, and action checklists
- ✅ **Advise** you in English or Roman Urdu

---

## ✨ Features

### 🔍 **Smart Email Analysis**
- Paste raw emails or connect Gmail (OAuth 2.0)
- AI extracts: title, deadline, eligibility, required docs, skills, funding
- Filters spam automatically

### 📊 **Multi-Dimensional Scoring**
- **Fit (45%)**: Skills match, CGPA, location, degree compatibility
- **Urgency (30%)**: Days until deadline (3 days = URGENT)
- **Completeness (15%)**: Has all required info?
- **Prestige (10%)**: Fulbright, Google, HEC, NUST, etc.

### 🏆 **Ranked Results**
- See your top opportunities at a glance
- Urgency alerts (deadlines in 3 days)
- Expandable cards with evidence and action checklists

### 🤖 **AI Career Advisor**
- Chat with an AI that knows Pakistani universities, companies, and salaries
- Responds in English or Roman Urdu (auto-detected)
- Context-aware (knows your profile and top opportunities)

### 🗺️ **Career Roadmap Generator**
- 4-phase roadmaps for roles like ML Engineer, Full-Stack Dev, etc.
- Pakistan-specific: real companies, PKR salaries, local programs
- Actionable steps with resources and milestones

### 📝 **Cover Letter Generator**
- Tailored to each opportunity and your profile
- Professional formatting
- One-click generation

---

## 🚀 Live Demo

**[Try KaamAsaan →](https://kaamasaan.vercel.app)** *(Add your deployment URL here)*

### Demo Mode
Click "Demo Mode" to see pre-analyzed sample emails without pasting anything.

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router, Server Components)
- **TypeScript** (Full type safety)
- **Tailwind CSS** (Custom design system)
- **Framer Motion** (Smooth animations)
- **Lucide React** (Icons)

### Backend
- **Next.js API Routes** (Serverless functions)
- **OpenAI GPT-4o-mini** (Email extraction, scoring, chat, roadmaps)
- **NextAuth.js** (Gmail OAuth 2.0)

### Infrastructure
- **Vercel / Netlify** (Deployment)
- **Docker** (Containerization)
- **Google Cloud Run** (Alternative deployment)

### Design System
- **Linear.app-inspired** (Pixel-perfect recreation)
- **Pure black & white** (Zero color, maximum clarity)
- **Inter Variable font** (Professional typography)
- **8px grid system** (Consistent spacing)

---

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))
- (Optional) Google OAuth credentials for Gmail integration

### 1. Clone the repository
```bash
git clone https://github.com/MuhammadSubhan404x/KaamAsaan.git
cd KaamAsaan
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
# Required
OPENAI_API_KEY=sk-your-key-here

# Optional (for Gmail integration)
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
NEXTAUTH_SECRET=any-random-32-character-string
NEXTAUTH_URL=http://localhost:3000
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🐳 Docker Deployment

### Build the image
```bash
docker build -t kaamasaan .
```

### Run the container
```bash
docker run -p 8080:8080 \
  -e OPENAI_API_KEY=your-key \
  kaamasaan
```

---

## 🌐 Deploy to Production

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the .next folder
```

### Google Cloud Run
```bash
gcloud run deploy kaamasaan \
  --source . \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated
```

---

## 🎨 Design Philosophy

KaamAsaan's UI is inspired by **Linear.app** — the gold standard for modern SaaS design.

### Design Principles
1. **Pure black & white** — Zero color distractions
2. **Hairline borders** — 1px `rgba(255,255,255,0.08)` dividers
3. **Subtle elevation** — 4-level background system
4. **Tight typography** — Inter Variable with `-0.02em` letter-spacing
5. **Micro-interactions** — 150ms transitions, scale(0.98) on click
6. **Dense but breathable** — 8px grid, 12px-16px padding

### CSS Architecture
- **600+ lines** of custom CSS tokens
- **Linear's exact font weights** (510, 590, 680)
- **No Tailwind utility spam** — Clean, semantic classes
- **Responsive** — Mobile-first design

---

## 🧠 How It Works

### 1. Email Extraction (AI)
```typescript
// lib/extractor.ts
const prompt = `Analyze these emails and extract:
- title, organization, deadline, eligibility
- minCGPA, requiredDocs, skills, applicationLink
- fundingMentioned, location, degreeRequirement
Return JSON only.`;

const response = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  response_format: { type: "json_object" },
  messages: [{ role: "user", content: prompt }]
});
```

### 2. Multi-Dimensional Scoring
```typescript
// lib/scoringEngine.ts
const total = Math.round(
  fit.score * 0.45 +        // Skills, CGPA, location match
  urgency.score * 0.30 +    // Days until deadline
  completeness.score * 0.15 + // Has all required info?
  prestige.score * 0.10     // Organization reputation
);
```

### 3. Ranking & Display
```typescript
// Sort by total score, assign ranks
ranked.sort((a, b) => b.score.total - a.score.total);
ranked.forEach((r, i) => (r.rank = i + 1));
```

---

## 🇵🇰 Pakistan-Specific Features

### Universities Recognized
VU, NUST, FAST-NUCES, LUMS, IBA, COMSATS, UET Lahore, GIKI, PIEAS, NED, ITU

### Companies Database
Systems Limited, Arbisoft, NetSol, 10Pearls, Folio3, Tkxel, Tintash, VentureDive, Devsinc

### Salary Ranges
- Entry-level Lahore/Islamabad: Rs. 40,000–80,000/month
- Entry-level Karachi: Rs. 60,000–100,000/month
- Remote (USD): $400–$1,200/month

### Programs & Scholarships
- **Government**: Ignite, ICSP, DigiSkills, NAVTTC, P@SHA, PSEB
- **HEC**: Need-Based, USAID Merit, Ehsaas, PhD Indigenous, OS-100
- **Global**: Google STEP, Microsoft Aspire, Meta University, Outreachy, MLH Fellowship, GSoC, Fulbright, DAAD, Chevening, Erasmus Mundus

### Language Support
- **Roman Urdu detection** — Automatically responds in Roman Urdu if you write in it
- **Bilingual advisor** — Switches seamlessly between English and Urdu

---

## 📊 Project Structure

```
KaamAsaan/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts      # Email extraction + scoring
│   │   ├── chat/route.ts         # AI career advisor
│   │   ├── roadmap/route.ts      # Career roadmap generator
│   │   ├── gmail/route.ts        # Gmail OAuth integration
│   │   └── cover-letter/route.ts # Cover letter generator
│   ├── page.tsx                  # Main app (analyzer tab)
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Linear.app design system
├── components/
│   ├── OpportunityCard.tsx       # Expandable opportunity row
│   ├── ResultsPanel.tsx          # Ranked results table
│   ├── AdvisorTab.tsx            # AI chat interface
│   ├── RoadmapTab.tsx            # Career roadmap UI
│   ├── ProfileForm.tsx           # User profile input
│   ├── EmailInput.tsx            # Email paste area
│   └── MacbookHero.tsx           # Cinematic landing animation
├── lib/
│   ├── extractor.ts              # OpenAI email parsing
│   ├── scoringEngine.ts          # Multi-dimensional scoring
│   ├── dateParser.ts             # Deadline parsing
│   ├── auth.ts                   # NextAuth config
│   ├── types.ts                  # TypeScript interfaces
│   └── utils.ts                  # Helper functions
├── public/                       # Static assets
├── Dockerfile                    # Docker config
├── netlify.toml                  # Netlify config
└── package.json                  # Dependencies
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Areas for Improvement
- [ ] Add automated tests (Jest + React Testing Library)
- [ ] Implement user authentication (Clerk or Supabase)
- [ ] Add database persistence (PostgreSQL + Prisma)
- [ ] Set up error tracking (Sentry)
- [ ] Add rate limiting (Upstash Redis)
- [ ] Improve security (input sanitization, CORS, CSP headers)
- [ ] Add CI/CD pipeline (GitHub Actions)
- [ ] Write API documentation (OpenAPI/Swagger)

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Muhammad Subhan**  
- GitHub: [@MuhammadSubhan404x](https://github.com/MuhammadSubhan404x)
- Built for: National AI Hackathon 2026 🇵🇰

---

## 🙏 Acknowledgments

- **Linear.app** — Design inspiration
- **OpenAI** — GPT-4o-mini API
- **Vercel** — Next.js framework and hosting
- **Pakistani tech community** — Domain knowledge and feedback

---

## 📸 Screenshots

### Main Analyzer
![Analyzer](https://via.placeholder.com/800x450?text=Add+Screenshot+Here)

### AI Career Advisor
![Advisor](https://via.placeholder.com/800x450?text=Add+Screenshot+Here)

### Career Roadmap
![Roadmap](https://via.placeholder.com/800x450?text=Add+Screenshot+Here)

---

## 🔮 Roadmap

### v0.2 (Next 2 weeks)
- [ ] User authentication
- [ ] Database persistence
- [ ] Automated testing (40% coverage)
- [ ] Security hardening

### v0.3 (Next month)
- [ ] Email notifications (deadline reminders)
- [ ] Search & filter
- [ ] Export to PDF/CSV
- [ ] Mobile app (React Native)

### v1.0 (3 months)
- [ ] Team collaboration features
- [ ] Analytics dashboard
- [ ] Browser extension
- [ ] API for third-party integrations

---

## 💬 Support

- **Issues**: [GitHub Issues](https://github.com/MuhammadSubhan404x/KaamAsaan/issues)
- **Discussions**: [GitHub Discussions](https://github.com/MuhammadSubhan404x/KaamAsaan/discussions)
- **Email**: *(Add your email here)*

---

## ⭐ Star History

If you find KaamAsaan useful, please consider giving it a star! ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=MuhammadSubhan404x/KaamAsaan&type=Date)](https://star-history.com/#MuhammadSubhan404x/KaamAsaan&Date)

---

<div align="center">
  <strong>Made with ❤️ in Pakistan 🇵🇰</strong>
  <br>
  <sub>Helping students make smarter career decisions, one email at a time.</sub>
</div>
