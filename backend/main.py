import os
import re
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

app = FastAPI(title="Balen as PM API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://balen-as-pm.vercel.app",
        "http://localhost:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Groq client
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

CATEGORIES = [
    "Finance",
    "Urban Development",
    "Energy, Water Resources and Irrigation",
    "Physical Infrastructure and Transportation",
    "Law, Justice and Parliamentary Affairs",
    "Labour, Employment and Social Security",
    "Defence",
    "Education, Science and Technology",
    "Agriculture and Livestock Development",
    "Culture, Tourism and Civil Aviation",
    "Health and Population",
]

# In-memory store
submissions: dict[str, list[dict]] = {cat: [] for cat in CATEGORIES}
visitor_count = 0


class SubmissionCreate(BaseModel):
    message: str
    category: str
    name: Optional[str] = None


class SubmissionUpdate(BaseModel):
    message: str


class SubmissionOut(BaseModel):
    id: int
    message: str
    category: str
    name: Optional[str] = None
    created_at: str


_counter = 0


def _next_id():
    global _counter
    _counter += 1
    return _counter


def is_english(text: str) -> bool:
    """Check if text is primarily English (ASCII latin characters)."""
    cleaned = re.sub(r'[0-9\s\.\,\!\?\;\:\'\"\-\(\)\@\#\$\%\&\*]', '', text)
    if not cleaned:
        return False
    latin_chars = sum(1 for c in cleaned if ord(c) < 128)
    ratio = latin_chars / len(cleaned)
    return ratio > 0.8


def is_devanagari(text: str) -> bool:
    """Check if text contains Devanagari script (Nepali)."""
    devanagari = sum(1 for c in text if '\u0900' <= c <= '\u097F')
    return devanagari > len(text) * 0.3


def polish_english(text: str) -> str:
    """Use Groq to fix grammar/spelling without changing meaning."""
    try:
        response = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a grammar corrector. Fix only grammar and spelling errors "
                        "in the user's text. Do NOT add new content, opinions, or change the "
                        "meaning. Keep it in the same tone and style. Return ONLY the corrected "
                        "text, nothing else. If the text is already correct, return it as-is."
                    ),
                },
                {"role": "user", "content": text},
            ],
            temperature=0,
            max_tokens=500,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"Groq error: {e}")
        return text


def process_message(text: str) -> str:
    """Detect language and polish if English."""
    if is_devanagari(text):
        return text
    elif is_english(text):
        nepali_roman_patterns = [
            'cha', 'chha', 'xa', 'ko', ' ma ', ' le ', ' lai ',
            'haru', 'garnu', 'huncha', 'bhayo', 'parcha',
            'ramro', 'desh', 'nepali', 'hamro', 'hami',
        ]
        lower = text.lower()
        nepali_hits = sum(1 for p in nepali_roman_patterns if p in lower)
        if nepali_hits >= 2:
            return text
        return polish_english(text)
    return text


@app.get("/api/categories")
def get_categories():
    return CATEGORIES


@app.get("/api/submissions")
def get_all_submissions():
    return submissions


@app.get("/api/submissions/{category}")
def get_submissions_by_category(category: str):
    if category not in submissions:
        return []
    return submissions[category]


@app.post("/api/submissions", response_model=SubmissionOut)
def create_submission(sub: SubmissionCreate):
    if sub.category not in submissions:
        submissions[sub.category] = []
    polished = process_message(sub.message.strip())
    entry = {
        "id": _next_id(),
        "message": polished,
        "category": sub.category,
        "name": sub.name.strip() if sub.name else None,
        "created_at": datetime.now().isoformat(),
    }
    submissions[sub.category].append(entry)
    return entry


@app.put("/api/submissions/{submission_id}", response_model=SubmissionOut)
def update_submission(submission_id: int, update: SubmissionUpdate):
    for cat_list in submissions.values():
        for entry in cat_list:
            if entry["id"] == submission_id:
                polished = process_message(update.message.strip())
                entry["message"] = polished
                return entry
    raise HTTPException(status_code=404, detail="Submission not found")


@app.get("/api/visitors")
def get_and_increment_visitors():
    global visitor_count
    visitor_count += 1
    return {"count": visitor_count}
