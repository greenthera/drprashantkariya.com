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
          @keyframes da-spark   { 0%,100% { opacity:0; transform: scale(.4) rotate(0deg);  } 50% { opacity:1; transform: scale(1) rotate(25deg); } }
          @keyframes da-ecg     { 0%,100% { stroke-dashoffset: 220; } 50% { stroke-dashoffset: 0; } }
        `}</style>

        <radialGradient id="da-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#C2E0D2" />
          <stop offset="100%" stopColor="#E8F4EE" />
        </radialGradient>
        <radialGradient id="da-skin" cx="35%" cy="30%" r="70%">
          <stop offset="0%"   stopColor="#ECBE9A" />
          <stop offset="100%" stopColor="#CC9470" />
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
        <path d="M 168 218 Q 160 298 158 385 L 342 385 Q 340 298 332 218 Q 296 210 250 210 Q 204 210 168 218 Z" fill="url(#da-coat)" />

        {/* scrubs at collar */}
        <path d="M 210 216 L 210 252 L 250 266 L 290 252 L 290 216 Q 272 207 250 207 Q 228 207 210 216 Z" fill="url(#da-scrubs)" />

        {/* left lapel */}
        <path d="M 168 218 L 206 218 L 210 252 L 228 264 L 212 298 L 158 308 Z" fill="#EDF5F1" />
        {/* right lapel */}
        <path d="M 332 218 L 294 218 L 290 252 L 272 264 L 288 298 L 342 308 Z" fill="#EDF5F1" />

        {/* buttons */}
        {[290, 310, 330].map((y, i) => <circle key={i} cx="250" cy={y} r="4.5" fill="#D0E6DC" />)}

        {/* left arm */}
        <path d="M 168 240 Q 128 282 115 328 Q 133 348 168 360 L 176 332 Q 150 322 154 298 L 168 260 Z" fill="url(#da-skin)" />
        <path d="M 168 240 Q 130 280 118 324 Q 128 338 152 348 Q 142 326 148 304 L 168 260 Z" fill="url(#da-coat)" />

        {/* right arm */}
        <path d="M 332 240 Q 372 282 385 328 Q 367 348 332 360 L 324 332 Q 350 322 346 298 L 332 260 Z" fill="url(#da-skin)" />
        <path d="M 332 240 Q 370 280 382 324 Q 372 338 348 348 Q 358 326 352 304 L 332 260 Z" fill="url(#da-coat)" />

        {/* hands */}
        <ellipse cx="155" cy="360" rx="24" ry="16" fill="url(#da-skin)" />
        <ellipse cx="345" cy="360" rx="24" ry="16" fill="url(#da-skin)" />

        {/* neck */}
        <rect x="228" y="178" width="44" height="34" rx="5" fill="url(#da-skin)" />

        {/* head */}
        <circle cx="250" cy="143" r="52" fill="url(#da-skin)" />

        {/* hair */}
        <path d="M 200 136 Q 204 84 250 82 Q 296 84 300 136 Q 282 108 250 106 Q 218 108 200 136 Z" fill="#2C1C10" />
        <path d="M 200 136 Q 192 146 194 158 Q 197 146 204 141 Z" fill="#2C1C10" />
        <path d="M 300 136 Q 308 146 306 158 Q 303 146 296 141 Z" fill="#2C1C10" />

        {/* ears */}
        <ellipse cx="199" cy="150" rx="9" ry="12" fill="url(#da-skin)" />
        <ellipse cx="301" cy="150" rx="9" ry="12" fill="url(#da-skin)" />

        {/* eyes */}
        <circle cx="232" cy="150" r="6" fill="#18100A" />
        <circle cx="268" cy="150" r="6" fill="#18100A" />
        <circle cx="234" cy="148" r="2.2" fill="white" />
        <circle cx="270" cy="148" r="2.2" fill="white" />

        {/* eyebrows */}
        <path d="M 223 137 Q 231 133 239 137" stroke="#2C1C10" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 261 137 Q 269 133 277 137" stroke="#2C1C10" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* warm smile */}
        <path d="M 235 168 Q 250 178 265 168" stroke="#B07050" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* ── BABY (breathes) ── */}
        <g className="da-breathe">
          {/* swaddle base */}
          <ellipse cx="250" cy="372" rx="86" ry="52" fill="url(#da-blanket)" />
          <path d="M 166 362 Q 186 390 250 396 Q 314 390 334 362 Q 302 380 250 382 Q 198 380 166 362 Z" fill="#6A9880" />
          {/* upper swaddle */}
          <ellipse cx="250" cy="350" rx="62" ry="36" fill="#A0C8B4" />
          {/* baby head */}
          <circle cx="250" cy="318" r="34" fill="#F2C496" />
          {/* baby hair wisps */}
          <path d="M 232 289 Q 242 279 252 286" stroke="#8C6040" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 248 284 Q 257 277 266 284" stroke="#8C6040" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* eyes closed */}
          <path d="M 238 314 Q 241 311 245 314" stroke="#7A4A28" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 255 314 Q 258 311 262 314" stroke="#7A4A28" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* tiny smile */}
          <path d="M 242 326 Q 250 332 258 326" stroke="#C08060" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* blush */}
          <circle cx="234" cy="322" r="9" fill="#FFB0A0" opacity=".3" />
          <circle cx="266" cy="322" r="9" fill="#FFB0A0" opacity=".3" />
        </g>

        {/* ── STETHOSCOPE ── */}
        <path d="M 224 206 Q 220 238 226 264 Q 232 284 250 290 Q 268 284 274 264 Q 280 238 276 206"
          stroke="#C4973A" strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="224" cy="206" r="6.5" fill="#C4973A" />
        <circle cx="276" cy="206" r="6.5" fill="#C4973A" />
        <circle cx="250" cy="294" r="11" fill="none" stroke="#C4973A" strokeWidth="4" />
        <circle cx="250" cy="294" r="5.5" fill="#C4973A" className="da-beat" />

      </g>

      {/* ── FLOATING BADGES ── */}
      {/* Stars / rating */}
      <g className="da-float-b1" filter="url(#da-shadow)">
        <rect x="362" y="174" width="108" height="54" rx="14" fill="white" />
        <text x="380" y="198" fontFamily="Georgia,serif" fontSize="11" fontWeight="700" fill="#063322">4.8 ★★★★★</text>
        <text x="380" y="215" fontFamily="Arial,sans-serif" fontSize="9" fill="#6B7B6A">Google Reviews</text>
      </g>

      {/* Experience */}
      <g className="da-float-b2" filter="url(#da-shadow)">
        <rect x="30" y="190" width="100" height="54" rx="14" fill="#0A4B38" />
        <text x="50" y="214" fontFamily="Georgia,serif" fontSize="16" fontWeight="700" fill="#C4973A">15+</text>
        <text x="50" y="230" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#A8C5BB">Yrs Experience</text>
      </g>

      {/* NICU badge */}
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
        <rect x="130" y="434" width="240" height="50" rx="14" fill="white" filter="url(#da-shadow)" />
        <polyline
          points="145,459 170,459 183,442 191,476 200,459 215,459 221,447 227,471 233,459 310,459"
          stroke="#0A4B38" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
          className="da-ecg"
        />
        <circle cx="310" cy="459" r="4" fill="#C4973A" className="da-beat" />
      </g>

    </svg>
  );
}
