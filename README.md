🌐 **Live Site:** [https://balen-as-pm.vercel.app](https://balen-as-pm.vercel.app)

# Balen as PM 🇳🇵

A platform for citizens of Nepal to share their voices, ideas, and expectations with the government — organized by ministry.

## Features

- 🗳️ **Submit suggestions** to  government ministries
- 🤖 **AI grammar polishing** — English submissions are auto-corrected via Groq (Llama 3.3 70B)
- 🇳🇵 **Multilingual support** — Nepali (देवनागरी), Nepali Romanized, and English
- ✏️ **Edit submissions** after posting
- 👥 **Visitor counter** — tracks total site visitors
- 🗄️ **Persistent storage** — powered by Supabase (PostgreSQL)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite + Tailwind CSS |
| Backend | FastAPI (Python) |
| Database | Supabase (PostgreSQL) |
| AI | Groq API (Llama 3.3 70B) |
| Hosting | Vercel (frontend) + Render (backend) |

## Getting Started

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# Add your keys to backend/.env
uvicorn main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

**Backend (`backend/.env`):**
```
GROQ_API_KEY=your_groq_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
```

**Frontend (Vercel):**
```
VITE_API_URL=https://your-backend.onrender.com
```

## Contributing

This is an open-source project. Feel free to fork, submit PRs, or open issues!

## License

Open Source — Built with ❤️ for Nepal