export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Logo with pulse */}
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-violet-700 flex items-center justify-center shadow-lg shadow-purple-500/20 animate-pulse">
            <span className="text-white font-bold text-2xl">&lt;/&gt;</span>
          </div>
          {/* Rotating ring */}
          <div className="absolute -inset-3">
            <div className="w-full h-full rounded-3xl border-2 border-transparent border-t-purple-500 border-r-emerald-400 animate-spin" />
          </div>
        </div>

        {/* Text */}
        <div className="flex items-center gap-1.5 text-[var(--text-tertiary)] text-sm font-medium">
          <span>Cargando</span>
          <span className="flex gap-0.5">
            <span className="w-1 h-1 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-1 h-1 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "300ms" }} />
          </span>
        </div>
      </div>
    </div>
  );
}
