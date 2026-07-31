export default function DoctorAnimation() {
  return (
    <svg viewBox="0 0 500 540" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <style>{`
          /* Environment Animations */
          .da-float    { animation: da-float 4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          .da-float-b1 { animation: da-float 5s ease-in-out infinite; animation-delay: 0.7s; transform-box: fill-box; transform-origin: center; }
          .da-float-b2 { animation: da-float 5.5s ease-in-out infinite; animation-delay: 1.4s; transform-box: fill-box; transform-origin: center; }
          .da-float-b3 { animation: da-float 6s ease-in-out infinite; animation-delay: 2.1s; transform-box: fill-box; transform-origin: center; }
          .da-ring1    { animation: da-ring 3s ease-out infinite; transform-box: fill-box; transform-origin: center; }
          .da-ring2    { animation: da-ring 3s ease-out infinite; animation-delay: 1.5s; transform-box: fill-box; transform-origin: center; }
          .da-spark1   { animation: da-spark 2.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          .da-spark2   { animation: da-spark 2.8s ease-in-out infinite; animation-delay: 0.9s; transform-box: fill-box; transform-origin: center; }
          .da-ecg      { stroke-dasharray: 220; stroke-dashoffset: 220; animation: da-ecg 2.4s ease-in-out infinite; }
          
          /* Baby Blink Animation */
          .baby-blink  { animation: baby-blink 5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }

          @keyframes da-float   { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
          @keyframes da-ring    { 0% { transform: scale(1); opacity:.35; } 100% { transform: scale(1.55); opacity:0; } }
          @keyframes da-spark   { 0%,100% { opacity:0; transform: scale(.4) rotate(0deg); } 50% { opacity:1; transform: scale(1) rotate(25deg); } }
          @keyframes da-ecg     { 0%,100% { stroke-dashoffset: 220; } 50% { stroke-dashoffset: 0; } }
          @keyframes baby-blink { 0%, 90%, 100% { transform: scaleY(1); } 95% { transform: scaleY(0.1); } }
        `}</style>

        {/* Gradients & Filters */}
        <radialGradient id="da-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C2E0D2" />
          <stop offset="100%" stopColor="#EAEDFB" />
        </radialGradient>
        
        {/* Advanced Skin: Three-stop radial for subsurface scattering look */}
        <radialGradient id="baby-skin-mesh" cx="42%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#FFF9F6" />
          <stop offset="60%" stopColor="#FFE0D3" />
          <stop offset="100%" stopColor="#F9CBB9" />
        </radialGradient>

        <filter id="da-shadow">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#2E3A9E" floodOpacity="0.1" />
        </filter>

        {/* Inner high-gloss polish */}
        <filter id="baby-polish">
          <feFlood floodColor="white" floodOpacity="0.4" result="light" />
          <feComposite in="light" in2="SourceGraphic" operator="in" />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in="SourceGraphic" operator="over" />
        </filter>
      </defs>

      {/* ── BACKGROUND ── */}
      <circle cx="250" cy="278" r="205" fill="url(#da-bg)" opacity=".7" />
      <circle cx="250" cy="278" r="205" fill="none" stroke="#4353CF" strokeWidth="1.5" strokeDasharray="5 10" opacity=".12" className="da-ring1" />
      <circle cx="250" cy="278" r="205" fill="none" stroke="#4353CF" strokeWidth="1.5" strokeDasharray="5 10" opacity=".12" className="da-ring2" />

      {/* ── MAIN BABY ASSET (Floats) ── */}
      <g className="da-float" filter="url(#da-shadow)">
        
        {/* --- LEGS AND LOWER BODY (Continuous Path) --- */}
        {/* Defined as a sitting posture with 'weighted' fat logic */}
        <path d="
          M 250,440 
          C 180,440 145,430 145,385 
          C 145,340 165,315 185,285 
          C 185,245 315,245 315,285 
          C 335,315 355,340 355,385 
          C 355,430 320,440 250,440 Z" 
          fill="#4353CF" filter="url(#baby-polish)"
        />
        
        {/* Organic Thigh Folds */}
        <path d="M 175,405 C 140,405 130,445 165,455 C 200,465 220,430 220,400" fill="url(#baby-skin-mesh)" />
        <path d="M 325,405 C 360,405 370,445 335,455 C 300,465 280,430 280,400" fill="url(#baby-skin-mesh)" />

        {/* --- CHUBBY ARMS & HANDS (Continuous integration) --- */}
        <path d="M 185,295 C 145,295 130,345 160,375" stroke="url(#baby-skin-mesh)" strokeWidth="28" strokeLinecap="round" fill="none" />
        <path d="M 315,295 C 355,295 370,345 340,375" stroke="url(#baby-skin-mesh)" strokeWidth="28" strokeLinecap="round" fill="none" />

        {/* --- HEAD (Organic, Non-Circular "Squash" jawline) --- */}
        {/* Defined by wider 'meatiness' in the cheeks and soft temples */}
        <path d="
          M 250,325 
          C 170,325 135,295 135,210 
          C 135,115 365,115 365,210 
          C 365,295 330,325 250,325 Z" 
          fill="url(#baby-skin-mesh)" filter="url(#baby-polish)"
        />

        {/* Ears */}
        <circle cx="140" cy="215" r="18" fill="url(#baby-skin-mesh)" />
        <circle cx="360" cy="215" r="18" fill="url(#baby-skin-mesh)" />

        {/* --- PREMIUM EYES (The 'Magnific' Glassy Look) --- */}
        <g className="baby-blink">
          {/* Base */}
          <circle cx="205" cy="215" r="16" fill="#1E293B" />
          <circle cx="295" cy="215" r="16" fill="#1E293B" />
          
          {/* Pupil Depth */}
          <circle cx="205" cy="215" r="9" fill="#0F172A" />
          <circle cx="295" cy="215" r="9" fill="#0F172A" />
          
          {/* Layered Highlights */}
          <circle cx="212" cy="207" r="6" fill="white" />
          <circle cx="198" cy="223" r="3" fill="white" opacity="0.4" />
          <circle cx="302" cy="207" r="6" fill="white" />
          <circle cx="288" cy="223" r="3" fill="white" opacity="0.4" />
        </g>

        {/* --- FACE DETAILS --- */}
        {/* Blush - Radial Gradient for zero-edge look */}
        <radialGradient id="da-blush">
          <stop offset="0%" stopColor="#FB7185" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FB7185" stopOpacity="0" />
        </radialGradient>
        <circle cx="185" cy="265" r="28" fill="url(#da-blush)" />
        <circle cx="315" cy="265" r="28" fill="url(#da-blush)" />

        {/* Nose & Smile */}
        <path d="M 243,252 Q 250,258 257,252" stroke="#E0A387" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 230,285 Q 250,305 270,285" stroke="#BE123C" strokeWidth="4.5" fill="none" strokeLinecap="round" />

        {/* Artistic Hair Wisp */}
        <path d="M 245,130 C 245,130 250,100 265,115" stroke="#78350F" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.5" />
      </g>

      {/* ── FLOATING BADGES ── */}
      <g className="da-float-b1" filter="url(#da-shadow)">
        <rect x="362" y="140" width="108" height="54" rx="14" fill="white" />
        <text x="380" y="164" fontFamily="Georgia,serif" fontSize="11" fontWeight="700" fill="#2E3A9E">4.9 ★★★★★</text>
        <text x="380" y="181" fontFamily="Arial,sans-serif" fontSize="9" fill="#6670A0">Trusted Care</text>
      </g>

      <g className="da-float-b2" filter="url(#da-shadow)">
        <rect x="30" y="160" width="100" height="54" rx="14" fill="#4353CF" />
        <text x="50" y="184" fontFamily="Georgia,serif" fontSize="16" fontWeight="700" fill="#E2E8F0">100%</text>
        <text x="50" y="200" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#ABB3E0">Safe & Secure</text>
      </g>

      {/* ── SPARKLES ── */}
      <g className="da-spark1"><path d="M 96 120 L 99 113 L 102 120 L 109 123 L 102 126 L 99 133 L 96 126 L 89 123 Z" fill="#4353CF" opacity=".6" /></g>
      <g className="da-spark2"><path d="M 392 264 L 394.5 258.5 L 397 264 L 402.5 266.5 L 397 269 L 394.5 274.5 L 392 269 L 386.5 266.5 Z" fill="#4353CF" opacity=".4" /></g>

      {/* ── ECG ANIMATION CARD ── */}
      <g className="da-float-b3">
        <rect x="130" y="440" width="240" height="50" rx="14" fill="white" filter="url(#da-shadow)" />
        <polyline
          points="145,465 170,465 183,448 191,482 200,465 215,465 221,453 227,477 233,465 310,465"
          stroke="#4353CF" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
          className="da-ecg"
        />
        <circle cx="310" cy="465" r="4" fill="#4353CF" opacity="0.5" />
      </g>
    </svg>
  );
}