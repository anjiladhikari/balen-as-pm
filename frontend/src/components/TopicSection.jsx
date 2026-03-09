import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '';

function toId(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

export default function TopicSection({ category, submissions = [], onUpdated }) {
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');
    const [saving, setSaving] = useState(false);

    function startEdit(sub) {
        setEditingId(sub.id);
        setEditText(sub.message);
    }

    function cancelEdit() {
        setEditingId(null);
        setEditText('');
    }

    async function saveEdit(id) {
        setSaving(true);
        try {
            const res = await fetch(`${API_URL}/api/submissions/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: editText }),
            });
            if (res.ok) {
                setEditingId(null);
                setEditText('');
                onUpdated?.();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    }

    return (
        <section
            id={toId(category.name)}
            className="py-12 px-4"
        >
            <div className="max-w-4xl mx-auto">
                {/* Section header */}
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">{category.icon}</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                        {category.name}
                    </h2>
                    <span className="ml-auto bg-surface-lighter text-text-secondary text-xs font-semibold px-3 py-1 rounded-full">
                        {submissions.length} {submissions.length === 1 ? 'voice' : 'voices'}
                    </span>
                </div>

                {/* Submissions list */}
                {submissions.length === 0 ? (
                    <div className="bg-surface rounded-xl border border-white/5 p-8 text-center">
                        <p className="text-text-secondary text-sm">
                            No submissions yet. Be the first to share your voice for{' '}
                            <span className="text-primary-light font-medium">{category.name}</span>!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {submissions.map((sub) => (
                            <div
                                key={sub.id}
                                className="bg-surface rounded-xl border border-white/5 p-5 hover:border-primary/20 transition-all duration-300 group"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        {sub.name && (
                                            <span className="text-xs font-medium text-primary-light">
                                                {sub.name}
                                            </span>
                                        )}
                                        <span className="text-xs text-text-secondary">
                                            {new Date(sub.created_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </span>
                                    </div>
                                    {editingId !== sub.id && (
                                        <button
                                            onClick={() => startEdit(sub)}
                                            className="opacity-0 group-hover:opacity-100 text-xs text-text-secondary hover:text-primary-light transition-all cursor-pointer"
                                        >
                                            ✏️ Edit
                                        </button>
                                    )}
                                </div>

                                {editingId === sub.id ? (
                                    <div className="space-y-3">
                                        <textarea
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            rows={3}
                                            className="w-full bg-surface-light border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none text-sm"
                                        />
                                        <div className="flex gap-2 justify-end">
                                            <button
                                                onClick={cancelEdit}
                                                className="px-4 py-1.5 text-xs text-text-secondary hover:text-white border border-white/10 rounded-lg transition-all cursor-pointer"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => saveEdit(sub.id)}
                                                disabled={saving || !editText.trim()}
                                                className="px-4 py-1.5 text-xs bg-primary hover:bg-primary-light text-white rounded-lg transition-all disabled:opacity-40 cursor-pointer"
                                            >
                                                {saving ? 'Saving...' : 'Save'}
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-text-primary text-sm leading-relaxed">
                                        {sub.message}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Divider */}
                <div className="mt-12 border-b border-white/5" />
            </div>
        </section>
    );
}
