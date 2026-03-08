import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SubmissionForm from './components/SubmissionForm';
import TopicSection from './components/TopicSection';
import CATEGORIES from './categories';

export default function App() {
  const [submissions, setSubmissions] = useState({});

  const fetchSubmissions = useCallback(async () => {
    try {
      const res = await fetch('/api/submissions');
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
          />
        ))}
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-text-secondary text-sm">
        <p>Built with ❤️ for Nepal — <span className="text-primary-light font-medium">Balen as PM</span></p>
      </footer>
    </div>
  );
}
