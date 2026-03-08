from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

app = FastAPI(title="Balen as PM API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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


class SubmissionOut(BaseModel):
    id: int
    message: str
    category: str
    created_at: str


_counter = 0


def _next_id():
    global _counter
    _counter += 1
    return _counter


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
    entry = {
        "id": _next_id(),
        "message": sub.message,
        "category": sub.category,
        "created_at": datetime.now().isoformat(),
    }
    submissions[sub.category].append(entry)
    return entry


@app.get("/api/visitors")
def get_and_increment_visitors():
    global visitor_count
    visitor_count += 1
    return {"count": visitor_count}

