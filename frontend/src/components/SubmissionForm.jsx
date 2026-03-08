import { useState } from 'react';
import CATEGORIES from '../categories';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function SubmissionForm({ onSubmitted }) {
    const [message, setMessage] = useState('');
    const [category, setCategory] = useState(CATEGORIES[0].name);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!message.trim()) return;

        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/submissions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: message.trim(), category }),
            });
            if (res.ok) {
                setMessage('');
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
                onSubmitted?.();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const selectedCat = CATEGORIES.find((c) => c.name === category);

    return (
        <section className="py-16 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Share Your Voice</h2>
                    <p className="text-text-secondary">
                        Submit your ideas, expectations, or demands to the relevant ministry.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-surface rounded-2xl p-6 md:p-8 border border-white/5 shadow-xl space-y-5"
                >
                    {/* Category pills */}
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-3">
                            Select Ministry
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.name}
                                    type="button"
                                    onClick={() => setCategory(cat.name)}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 cursor-pointer ${category === cat.name
                                        ? 'bg-primary/20 border-primary text-primary-light shadow-sm shadow-primary/10'
                                        : 'bg-surface-light border-white/10 text-text-secondary hover:border-white/20 hover:text-white'
                                        }`}
                                >
                                    {cat.icon} {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Selected category indicator */}
                    <div className="flex items-center gap-2 bg-surface-light/50 rounded-lg px-4 py-2.5">
                        <span className="text-lg">{selectedCat?.icon}</span>
                        <span className="text-sm text-primary-light font-medium">{category}</span>
                    </div>

                    {/* Message */}
                    <div>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="What do you want to see changed? Share your ideas, demands, or expectations..."
                            rows={4}
                            required
                            className="w-full bg-surface-light border border-white/10 rounded-xl px-4 py-3 text-white placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading || !message.trim()}
                        className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Submitting...
                            </span>
                        ) : (
                            '🚀 Submit Your Voice'
                        )}
                    </button>

                    {/* Success message */}
                    {success && (
                        <div className="text-center text-green-400 text-sm font-medium animate-pulse">
                            ✅ Your submission was recorded!
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
}
