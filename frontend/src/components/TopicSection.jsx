function toId(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

export default function TopicSection({ category, submissions = [] }) {
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
                                    <span className="text-xs text-text-secondary">
                                        {new Date(sub.created_at).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </div>
                                <p className="text-text-primary text-sm leading-relaxed">
                                    {sub.message}
                                </p>
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
