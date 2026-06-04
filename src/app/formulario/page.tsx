'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FormularioPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/#planes');
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
      <p className="text-white/40 text-sm">Redirigiendo...</p>
    </main>
  );
}
