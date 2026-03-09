import balenImg from '../assets/balen.png';
import nepalFlagGif from '../assets/nepal-flag.gif';

export default function Hero() {
    return (
        <section id="top" className="relative py-20 px-4 flex flex-col items-center text-center overflow-hidden">
            {/* Gradient glow behind photo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

            {/* Portrait with flags */}
            <div className="relative mb-8 flex items-center gap-6 md:gap-12">
                {/* Left flag */}
                <img
                    src={nepalFlagGif}
                    alt="Nepal Flag"
                    className="w-20 h-auto md:w-28 lg:w-36 shrink-0 drop-shadow-[0_4px_20px_rgba(220,20,60,0.4)]"
                />

                {/* Portrait */}
                <div className="relative">
                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden ring-4 ring-primary/50 ring-offset-4 ring-offset-[#0f0f1a] shadow-2xl shadow-primary/20">
                        <img
                            src={balenImg}
                            alt="Balen Shah"
                            className="w-full h-full object-cover object-top"
                        />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                         FOR NEPAL
                    </div>
                </div>

                {/* Right flag (mirrored) */}
                <img
                    src={nepalFlagGif}
                    alt="Nepal Flag"
                    className="w-20 h-auto md:w-28 lg:w-36 shrink-0 scale-x-[-1] drop-shadow-[0_4px_20px_rgba(220,20,60,0.4)]"
                />
            </div>

            {/* Headline */}
            <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
                <span className="text-white">We Believe in You.</span>
                <br />
                <span className="bg-gradient-to-r from-primary-light via-accent to-primary bg-clip-text text-transparent">
                    You Have No Excuse Now.
                </span>
            </h1>

            <p className="relative text-text-secondary text-lg md:text-xl max-w-2xl leading-relaxed">
                The people have spoken. Every voice matters. Share your ideas, expectations,
                and demands for a better Nepal — organized by the ministries that need to hear them.
            </p>

            {/* Scroll indicator */}
            <div className="mt-10 animate-bounce">
                <svg className="w-6 h-6 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
}
