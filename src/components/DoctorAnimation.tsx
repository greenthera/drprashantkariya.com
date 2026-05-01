export default function DoctorAnimation() {
  return (
    <svg viewBox="0 0 500 540" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <style>{`
          .da-float    { animation: da-float 4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          .da-float-b1 { animation: da-float 5s ease-in-out infinite; animation-delay: 0.7s; transform-box: fill-box; transform-origin: center; }
          .da-float-b2 { animation: da-float 5.5s ease-in-out infinite; animation-delay: 1.4s; transform-box: fill-box; transform-origin: center; }
          .da-float-b3 { animation: da-float 6s ease-in-out infinite; animation-delay: 2.1s; transform-box: fill-box; transform-origin: center; }
          .da-breathe  { animation: da-breathe 3s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          .da-ring1    { animation: da-ring 3s ease-out infinite; transform-box: fill-box; transform-origin: center; }
          .da-ring2    { animation: da-ring 3s ease-out infinite; animation-delay: 1.5s; transform-box: fill-box; transform-origin: center; }
          .da-beat     { animation: da-beat 1.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          .da-spark1   { animation: da-spark 2.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          .da-spark2   { animation: da-spark 2.8s ease-in-out infinite; animation-delay: 0.9s; transform-box: fill-box; transform-origin: center; }
          .da-spark3   { animation: da-spark 2.8s ease-in-out infinite; animation-delay: 1.8s; transform-box: fill-box; transform-origin: center; }
          .da-ecg      { stroke-dasharray: 220; stroke-dashoffset: 220; animation: da-ecg 2.4s ease-in-out infinite; }

          @keyframes da-float   { 0%,100% { transform: translateY(0);    } 50% { transform: translateY(-14px); } }
          @keyframes da-breathe { 0%,100% { transform: scale(1);          } 50% { transform: scale(1.06);      } }
          @keyframes da-ring    { 0%      { transform: scale(1); opacity:.35; } 100% { transform: scale(1.55); opacity:0; } }
          @keyframes da-beat    { 0%,100%,70% { transform: scale(1); } 15%,45% { transform: scale(1.4); } }
          @keyframes da-spark   { 0%,100% { opacity:0; transform: scale(.4) rotate(0deg); } 50% { opacity:1; transform: scale(1) rotate(25deg); } }
          @keyframes da-ecg     { 0%,100% { stroke-dashoffset: 220; } 50% { stroke-dashoffset: 0; } }
        `}</style>

        <radialGradient id="da-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#C2E0D2" />
          <stop offset="100%" stopColor="#E8F4EE" />
        </radialGradient>
        <radialGradient id="da-skin" cx="35%" cy="25%" r="70%">
          <stop offset="0%"   stopColor="#E0AA7A" />
          <stop offset="100%" stopColor="#E0AA7D" />
        </radialGradient>
        <linearGradient id="da-coat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EDF5F1" />
        </linearGradient>
        <linearGradient id="da-scrubs" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#0E5A45" />
          <stop offset="100%" stopColor="#063322" />
        </linearGradient>
        <linearGradient id="da-blanket" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#B2D4C2" />
          <stop offset="100%" stopColor="#7AA88E" />
        </linearGradient>
        <filter id="da-shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#063322" floodOpacity="0.13" />
        </filter>
      </defs>

      {/* ── BACKGROUND ── */}
      <circle cx="250" cy="278" r="205" fill="url(#da-bg)" opacity=".7" />
      <circle cx="250" cy="278" r="205" fill="none" stroke="#0A4B38" strokeWidth="1.5" strokeDasharray="5 10" opacity=".12" className="da-ring1" />
      <circle cx="250" cy="278" r="205" fill="none" stroke="#0A4B38" strokeWidth="1.5" strokeDasharray="5 10" opacity=".12" className="da-ring2" />

      {/* ── MAIN GROUP (floats) ── */}
      <g className="da-float">

        {/* coat body */}
        <path d="M 162 222 Q 154 302 152 388 L 348 388 Q 346 302 338 222 Q 300 213 250 213 Q 200 213 162 222 Z" fill="url(#da-coat)" />

        {/* scrubs at collar */}
        <path d="M 208 220 L 208 255 L 250 270 L 292 255 L 292 220 Q 274 210 250 210 Q 226 210 208 220 Z" fill="url(#da-scrubs)" />

        {/* left lapel */}
        <path d="M 162 222 L 204 222 L 208 255 L 226 268 L 210 302 L 152 312 Z" fill="#EDF5F1" />
        {/* right lapel */}
        <path d="M 338 222 L 296 222 L 292 255 L 274 268 L 290 302 L 348 312 Z" fill="#EDF5F1" />

        {/* buttons */}
        {[292, 314, 336].map((y, i) => <circle key={i} cx="250" cy={y} r="4.5" fill="#D0E6DC" />)}

        {/* left arm */}
        <path d="M 162 242 Q 120 285 106 332 Q 126 354 162 367 L 172 338 Q 144 326 150 300 L 162 264 Z" fill="url(#da-skin)" />
        <path d="M 162 242 Q 122 283 108 328 Q 120 344 146 356 Q 136 332 142 308 L 162 264 Z" fill="url(#da-coat)" />

        {/* right arm */}
        <path d="M 338 242 Q 380 285 394 332 Q 374 354 338 367 L 328 338 Q 356 326 350 300 L 338 264 Z" fill="url(#da-skin)" />
        <path d="M 338 242 Q 378 283 392 328 Q 380 344 354 356 Q 364 332 358 308 L 338 264 Z" fill="url(#da-coat)" />

        {/* hands */}
        <ellipse cx="148" cy="366" rx="26" ry="17" fill="url(#da-skin)" />
        <ellipse cx="352" cy="366" rx="26" ry="17" fill="url(#da-skin)" />

        {/* ── NECK — wider / masculine ── */}
        <rect x="224" y="184" width="52" height="32" rx="6" fill="url(#da-skin)" />
        {/* adam's apple hint */}
        <ellipse cx="250" cy="196" rx="8" ry="5" fill="#B87850" opacity=".2" />

        {/* ── HEAD — masculine jaw shape ── */}
        <path d="
          M 204,148
          Q 200,105 220,88
          Q 234,77 250,77
          Q 266,77 280,88
          Q 300,105 296,148
          Q 300,172 290,186
          Q 274,202 250,204
          Q 226,202 210,186
          Q 200,172 204,148
          Z
        " fill="url(#da-skin)" />

        {/* jaw shadow — beard stubble area */}
        <path d="
          M 210,178
          Q 226,202 250,204
          Q 274,202 290,178
          Q 276,194 250,197
          Q 224,194 210,178
          Z
        " fill="#1A0C06" opacity=".13" />
        {/* side jaw shadow */}
        <ellipse cx="212" cy="172" rx="12" ry="10" fill="#1A0C06" opacity=".09" />
        <ellipse cx="288" cy="172" rx="12" ry="10" fill="#1A0C06" opacity=".09" />

        {/* ── HAIR — short professional male cut ── */}
        <path d="
          M 204,138
          Q 202,96 222,84
          Q 236,75 250,75
          Q 264,75 278,84
          Q 298,96 296,138
          Q 286,106 268,100
          Q 258,96 250,96
          Q 242,96 232,100
          Q 214,106 204,138
          Z
        " fill="#1A0E08" />
        {/* fade sides — very short at temples */}
        <rect x="198" y="128" width="11" height="26" rx="5" fill="#1A0E08" opacity=".5" />
        <rect x="291" y="128" width="11" height="26" rx="5" fill="#1A0E08" opacity=".5" />
        {/* side part */}
        <path d="M 224,80 Q 226,96 229,112" stroke="#0E0806" strokeWidth="2" strokeLinecap="round" fill="none" opacity=".4" />

        {/* ── EARS ── */}
        <ellipse cx="199" cy="154" rx="9" ry="13" fill="url(#da-skin)" />
        <ellipse cx="301" cy="154" rx="9" ry="13" fill="url(#da-skin)" />

        {/* ── EYES ── */}
        <ellipse cx="232" cy="150" rx="7" ry="6" fill="#16100A" />
        <ellipse cx="268" cy="150" rx="7" ry="6" fill="#16100A" />
        <circle cx="234" cy="148" r="2.2" fill="white" />
        <circle cx="270" cy="148" r="2.2" fill="white" />

        {/* ── EYEBROWS — flat, heavy, masculine ── */}
        <path d="M 218,132 L 244,128" stroke="#1A0E08" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M 256,128 L 282,132" stroke="#1A0E08" strokeWidth="5" strokeLinecap="round" fill="none" />

        {/* ── NOSE — defined male nose ── */}
        <path d="M 248,156 L 248,172 Q 243,176 241,175" stroke="#9A6848" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M 248,172 Q 252,178 258,175" stroke="#9A6848" strokeWidth="2" strokeLinecap="round" fill="none" />
        <ellipse cx="244" cy="174" rx="5" ry="3.5" fill="#9A6848" opacity=".18" />
        <ellipse cx="256" cy="174" rx="5" ry="3.5" fill="#9A6848" opacity=".18" />

        {/* ── SMILE — calm, professional ── */}
        <path d="M 237,184 Q 250,192 263,184" stroke="#A06848" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* ── BABY (breathes) ── */}
        <g className="da-breathe">
          <ellipse cx="250" cy="378" rx="90" ry="54" fill="url(#da-blanket)" />
          <path d="M 162,368 Q 184,396 250,400 Q 316,396 338,368 Q 306,386 250,388 Q 194,386 162,368 Z" fill="#6A9880" />
          <ellipse cx="250" cy="356" rx="64" ry="37" fill="#A0C8B4" />
          <circle cx="250" cy="322" r="34" fill="#F2C496" />
          <path d="M 232,292 Q 242,282 252,289" stroke="#8C6040" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 248,287 Q 257,280 266,287" stroke="#8C6040" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 238,318 Q 241,315 245,318" stroke="#7A4A28" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 255,318 Q 258,315 262,318" stroke="#7A4A28" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 242,330 Q 250,336 258,330" stroke="#C08060" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="234" cy="326" r="9" fill="#FFB0A0" opacity=".3" />
          <circle cx="266" cy="326" r="9" fill="#FFB0A0" opacity=".3" />
        </g>

        {/* ── STETHOSCOPE ── */}
        <path d="M 224 210 Q 220 242 226 268 Q 232 288 250 294 Q 268 288 274 268 Q 280 242 276 210"
          stroke="#C4973A" strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="224" cy="210" r="6.5" fill="#C4973A" />
        <circle cx="276" cy="210" r="6.5" fill="#C4973A" />
        <circle cx="250" cy="298" r="11" fill="none" stroke="#C4973A" strokeWidth="4" />
        <circle cx="250" cy="298" r="5.5" fill="#C4973A" className="da-beat" />

      </g>

      {/* ── FLOATING BADGES ── */}
      <g className="da-float-b1" filter="url(#da-shadow)">
        <rect x="362" y="174" width="108" height="54" rx="14" fill="white" />
        <text x="380" y="198" fontFamily="Georgia,serif" fontSize="11" fontWeight="700" fill="#063322">4.8 ★★★★★</text>
        <text x="380" y="215" fontFamily="Arial,sans-serif" fontSize="9" fill="#6B7B6A">Google Reviews</text>
      </g>

      <g className="da-float-b2" filter="url(#da-shadow)">
        <rect x="30" y="190" width="100" height="54" rx="14" fill="#0A4B38" />
        <text x="50" y="214" fontFamily="Georgia,serif" fontSize="16" fontWeight="700" fill="#C4973A">15+</text>
        <text x="50" y="230" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#A8C5BB">Yrs Experience</text>
      </g>

      <g className="da-float-b3" filter="url(#da-shadow)">
        <rect x="362" y="362" width="100" height="52" rx="14" fill="#063322" />
        <text x="380" y="383" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#A8C5BB">NICU Level III</text>
        <text x="380" y="399" fontFamily="Georgia,serif" fontSize="10" fontWeight="700" fill="#C4973A">Advanced Care</text>
      </g>

      {/* ── SPARKLES ── */}
      <g className="da-spark1">
        <path d="M 96 150 L 99 143 L 102 150 L 109 153 L 102 156 L 99 163 L 96 156 L 89 153 Z" fill="#C4973A" opacity=".75" />
      </g>
      <g className="da-spark2">
        <path d="M 392 294 L 394.5 288.5 L 397 294 L 402.5 296.5 L 397 299 L 394.5 304.5 L 392 299 L 386.5 296.5 Z" fill="#C4973A" opacity=".6" />
      </g>
      <g className="da-spark3">
        <path d="M 108 390 L 110 385 L 112 390 L 117 392.5 L 112 395 L 110 400 L 108 395 L 103 392.5 Z" fill="#0A4B38" opacity=".5" />
      </g>

      {/* ── ECG CARD ── */}
      <g className="da-float-b3">
        <rect x="130" y="438" width="240" height="50" rx="14" fill="white" filter="url(#da-shadow)" />
        <polyline
          points="145,463 170,463 183,446 191,480 200,463 215,463 221,451 227,475 233,463 310,463"
          stroke="#0A4B38" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
          className="da-ecg"
        />
        <circle cx="310" cy="463" r="4" fill="#C4973A" className="da-beat" />
      </g>

    </svg>
  );
}