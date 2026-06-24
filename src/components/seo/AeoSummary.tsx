import React from "react";

interface AeoSummaryProps {
  serviceName: string;
  targetAudience: string;
  location: string;
  benefits: string;
  timeframeFactors: string;
  priceFactors: string;
  technologies: string;
  differentiator: string;
  process: string;
  deliverables: string;
}

export default function AeoSummary({
  serviceName,
  targetAudience,
  location,
  benefits,
  timeframeFactors,
  priceFactors,
  technologies,
  differentiator,
  process,
  deliverables,
}: AeoSummaryProps) {
  return (
    <section 
      aria-labelledby="resumen-rapido-title" 
      className="container mx-auto px-4 py-8 max-w-4xl bg-gray-50 dark:bg-gray-900 rounded-2xl mb-12 border border-gray-100 dark:border-gray-800"
    >
      <h2 id="resumen-rapido-title" className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Resumen rápido: {serviceName}
      </h2>
      <div className="space-y-4 text-gray-700 dark:text-gray-300">
        <p>
          <strong>¿Qué es y para quién?:</strong> PuroCode desarrolla {serviceName} para {targetAudience} en {location}.
        </p>
        <p>
          <strong>¿Qué incluye?:</strong> El servicio incluye {benefits}. Al finalizar, el cliente recibe {deliverables}.
        </p>
        <p>
          <strong>¿Cuánto demora y qué tecnologías usamos?:</strong> El plazo típico depende de {timeframeFactors}. Trabajamos con {technologies}.
        </p>
        <p>
          <strong>¿Cuánto cuesta?:</strong> El precio depende de {priceFactors}.
        </p>
        <p>
          <strong>¿Por qué PuroCode?:</strong> {differentiator}. Nuestro proceso ágil incluye: {process}.
        </p>
      </div>
    </section>
  );
}
