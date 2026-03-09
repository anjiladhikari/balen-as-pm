import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SubmissionForm from './components/SubmissionForm';
import TopicSection from './components/TopicSection';
import CATEGORIES from './categories';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function App() {
  const [submissions, setSubmissions] = useState({});
  const [visitors, setVisitors] = useState(0);

  
  const fetchSubmissions = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/submissions`);
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
      }
    } catch (err) {
      console.error('Failed to fetch submissions:', err);
    }
  }, []);

  useEffect(() => {
    fetchSubmissions();
    fetch(`${API_URL}/api/visitors`)
      .then((r) => r.json())
      .then((d) => setVisitors(d.count))
      .catch(() => { });
  }, [fetchSubmissions]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <SubmissionForm onSubmitted={fetchSubmissions} />

      {/* Topic Sections */}
      <div className="pb-20">
        {CATEGORIES.map((cat) => (
          <TopicSection
            key={cat.name}
            category={cat}
            submissions={submissions[cat.name] || []}
            onUpdated={fetchSubmissions}
          />
        ))}
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-4 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <p className="text-text-secondary text-sm">
            Built with ❤️ for Nepal — <span className="text-primary-light font-medium">Balen as PM</span>
          </p>
          <div className="flex items-center gap-1.5 text-sm text-text-secondary">
            <span>Total Visitors:</span>
            <span>👥</span>
            <span>{visitors.toLocaleString()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
