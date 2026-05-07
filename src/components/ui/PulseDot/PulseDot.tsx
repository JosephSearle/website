interface PulseDotProps {
  'aria-label'?: string
}

export default function PulseDot({ 'aria-label': ariaLabel }: PulseDotProps) {
  return (
    <span
      role="img"
      aria-label={ariaLabel}
      className="relative inline-block w-[9px] h-[9px] rounded-full bg-terracotta"
      style={{
        boxShadow: '0 0 0 2px rgba(196,101,42,0.18), 0 0 10px rgba(196,101,42,0.55)',
      }}
    >
      <style>{`
        @keyframes pulse-ring {
          0%   { transform: scale(0.6); opacity: 0.6; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        .pulse-ring {
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          background: #c4652a;
          animation: pulse-ring 1.8s ease-out infinite;
        }
        .pulse-ring-delayed { animation-delay: 0.6s; opacity: 0.35; }
      `}</style>
      <span className="pulse-ring" />
      <span className="pulse-ring pulse-ring-delayed" />
    </span>
  )
}
