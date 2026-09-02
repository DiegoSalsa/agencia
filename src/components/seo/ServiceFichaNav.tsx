import Link from "next/link";
import { SERVICE_FICHAS } from "@/lib/serviceFichas";

export default function ServiceFichaNav({
  title = "Fichas de servicio",
}: {
  title?: string;
}) {
  return (
    <section className="px-6 py-10 bg-[var(--bg)] border-b border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-tertiary)] mb-4">
          {title}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {SERVICE_FICHAS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 hover:border-[var(--primary)] transition-colors"
            >
              <span className="block text-sm font-semibold text-[var(--text)]">{item.label}</span>
              <span className="block text-xs text-[var(--text-tertiary)] mt-1">{item.price}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
