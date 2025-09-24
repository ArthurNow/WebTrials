// src/Tiki.jsx

export default function Tiki() {
  return (
    <svg
      id="tiki"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 300"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) scale(1)",
        width: "400px",
        height: "auto",
        zIndex: 0,
      }}
    >
      <defs>
        <linearGradient id="tikigradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e66465" />
          <stop offset="50%" stopColor="#f6b73c" />
          <stop offset="100%" stopColor="#4facfe" />
        </linearGradient>
      </defs>

      <path
        className="cls-1"
        d="M50 20 Q100 0 150 20 L150 280 Q100 300 50 280 Z"
        stroke="url(#tikigradient)"
        strokeWidth="4"
        fill="none"
      />
      {/* Eyes */}
      <path
        className="cls-1"
        d="M70 100 Q100 80 130 100"
        stroke="url(#tikigradient)"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="cls-1"
        d="M70 130 Q100 110 130 130"
        stroke="url(#tikigradient)"
        strokeWidth="4"
        fill="none"
      />
      {/* Mouth */}
      <path
        className="cls-1"
        d="M70 200 Q100 240 130 200"
        stroke="url(#tikigradient)"
        strokeWidth="4"
        fill="none"
      />
    </svg>
  );
}
