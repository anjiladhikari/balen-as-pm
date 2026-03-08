export default function NepalFlag({ className = '', mirror = false }) {
    return (
        <div className={`${className} ${mirror ? 'scale-x-[-1]' : ''}`}>
            <svg
                viewBox="0 0 200 400"
                className="w-full h-full"
                style={{ filter: 'drop-shadow(0 4px 20px rgba(220,20,60,0.3))' }}
            >
                <defs>
                    {/* Waving animation path */}
                    <clipPath id={mirror ? 'flagClipR' : 'flagClipL'}>
                        <polygon points="10,30 160,100 50,100 160,230 10,370">
                            <animate
                                attributeName="points"
                                dur="3s"
                                repeatCount="indefinite"
                                values="
                  10,30 160,100 50,100 160,230 10,370;
                  10,30 155,95 55,105 155,225 10,370;
                  10,30 165,105 45,95 165,235 10,370;
                  10,30 160,100 50,100 160,230 10,370
                "
                            />
                        </polygon>
                    </clipPath>
                </defs>

                {/* Flagpole */}
                <rect x="5" y="0" width="6" height="400" rx="3" fill="#4a3728" />
                <circle cx="8" cy="8" r="8" fill="#c9a94e" />

                {/* Flag with wave animation */}
                <g clipPath={`url(#${mirror ? 'flagClipR' : 'flagClipL'})`}>
                    {/* Blue border */}
                    <polygon points="10,25 170,100 55,100 170,235 10,380" fill="#003893">
                        <animate
                            attributeName="points"
                            dur="3s"
                            repeatCount="indefinite"
                            values="
                10,25 170,100 55,100 170,235 10,380;
                10,25 165,95 60,105 165,230 10,380;
                10,25 175,105 50,95 175,240 10,380;
                10,25 170,100 55,100 170,235 10,380
              "
                        />
                    </polygon>

                    {/* Red body */}
                    <polygon points="14,32 160,98 58,98 160,228 14,372" fill="#DC143C">
                        <animate
                            attributeName="points"
                            dur="3s"
                            repeatCount="indefinite"
                            values="
                14,32 160,98 58,98 160,228 14,372;
                14,32 155,93 63,103 155,223 14,372;
                14,32 165,103 53,93 165,233 14,372;
                14,32 160,98 58,98 160,228 14,372
              "
                        />
                    </polygon>

                    {/* Moon crescent - upper */}
                    <circle cx="80" cy="65" r="18" fill="white">
                        <animate attributeName="cx" dur="3s" repeatCount="indefinite" values="80;78;82;80" />
                    </circle>
                    <circle cx="80" cy="60" r="15" fill="#DC143C">
                        <animate attributeName="cx" dur="3s" repeatCount="indefinite" values="80;78;82;80" />
                    </circle>

                    {/* Moon rays */}
                    {[0, 30, 60, 90, 120, 150].map((angle, i) => (
                        <line
                            key={i}
                            x1="80"
                            y1="40"
                            x2={80 + 12 * Math.cos((angle * Math.PI) / 180)}
                            y2={40 - 12 * Math.sin((angle * Math.PI) / 180)}
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                        >
                            <animate attributeName="x1" dur="3s" repeatCount="indefinite" values="80;78;82;80" />
                            <animate
                                attributeName="x2"
                                dur="3s"
                                repeatCount="indefinite"
                                values={`${80 + 12 * Math.cos((angle * Math.PI) / 180)};${78 + 12 * Math.cos((angle * Math.PI) / 180)};${82 + 12 * Math.cos((angle * Math.PI) / 180)};${80 + 12 * Math.cos((angle * Math.PI) / 180)}`}
                            />
                        </line>
                    ))}

                    {/* Sun - lower */}
                    <circle cx="85" cy="200" r="16" fill="white">
                        <animate attributeName="cx" dur="3s" repeatCount="indefinite" values="85;83;87;85" />
                    </circle>
                    {/* Sun rays as 12-point star */}
                    {Array.from({ length: 12 }).map((_, i) => {
                        const angle = (i * 30 * Math.PI) / 180;
                        return (
                            <line
                                key={`ray-${i}`}
                                x1="85"
                                y1="200"
                                x2={85 + 24 * Math.cos(angle)}
                                y2={200 + 24 * Math.sin(angle)}
                                stroke="white"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            >
                                <animate attributeName="x1" dur="3s" repeatCount="indefinite" values="85;83;87;85" />
                                <animate
                                    attributeName="x2"
                                    dur="3s"
                                    repeatCount="indefinite"
                                    values={`${85 + 24 * Math.cos(angle)};${83 + 24 * Math.cos(angle)};${87 + 24 * Math.cos(angle)};${85 + 24 * Math.cos(angle)}`}
                                />
                            </line>
                        );
                    })}
                </g>

                {/* Subtle wave overlay for realism */}
                <polygon
                    points="10,25 170,100 55,100 170,235 10,380"
                    fill="url(#waveGradient)"
                    opacity="0.15"
                >
                    <animate
                        attributeName="points"
                        dur="3s"
                        repeatCount="indefinite"
                        values="
              10,25 170,100 55,100 170,235 10,380;
              10,25 165,95 60,105 165,230 10,380;
              10,25 175,105 50,95 175,240 10,380;
              10,25 170,100 55,100 170,235 10,380
            "
                    />
                </polygon>
                <defs>
                    <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="white" />
                        <stop offset="40%" stopColor="transparent" />
                        <stop offset="60%" stopColor="white" />
                        <stop offset="100%" stopColor="transparent" />
                        <animate attributeName="x1" dur="2s" repeatCount="indefinite" values="-1;0" />
                        <animate attributeName="x2" dur="2s" repeatCount="indefinite" values="0;1" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}
