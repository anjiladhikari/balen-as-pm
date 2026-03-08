import { useState, useEffect } from 'react';
import CATEGORIES from '../categories';

function toId(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav
            className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-surface/90 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/5'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <a href="#top" className="text-xl font-bold tracking-tight shrink-0">
                    <span className="text-primary-light">Balen</span>
                    <span className="text-text-secondary"> as PM</span>
                </a>

                {/* Menu button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-white bg-surface-light/60 hover:bg-surface-lighter border border-white/5 rounded-xl transition-all duration-200 cursor-pointer"
                >
                    <span className="hidden sm:inline">Ministries</span>
                    <svg
                        className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {/* Dropdown panel */}
            {open && (
                <div className="absolute top-full left-0 right-0 bg-surface/95 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/30 animate-in">
                    <div className="max-w-4xl mx-auto px-4 py-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
                            {CATEGORIES.map((cat) => (
                                <a
                                    key={cat.name}
                                    href={`#${toId(cat.name)}`}
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 text-sm text-text-secondary hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200"
                                >
                                    <span className="text-lg">{cat.icon}</span>
                                    <span className="font-medium">{cat.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
