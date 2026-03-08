'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="mx-auto max-w-[900px] px-6 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors">
            <ArrowLeft size={18} />
            <Image src="/img/logo.svg" alt="PuroCode" width={28} height={28} className="h-7 w-auto" />
            <span className="font-bold text-lg text-[var(--text)]">PuroCode</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-[900px] px-6 py-12 md:py-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Términos de Servicio</h1>
        <p className="text-[var(--text-tertiary)] text-sm mb-10">Última actualización: 8 de marzo de 2026</p>

        <div className="prose-custom space-y-8 text-[var(--text-secondary)] text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[var(--text)] mb-3">1. Aceptación de los Términos</h2>
            <p>
              Al acceder y utilizar los servicios de PuroCode (en adelante &quot;la Empresa&quot;), incluyendo el sitio web purocode.com
              y cualquier servicio relacionado, usted acepta cumplir y quedar vinculado por estos Términos de Servicio.
              Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text)] mb-3">2. Descripción de los Servicios</h2>
            <p>PuroCode ofrece servicios de desarrollo web, incluyendo pero no limitado a:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Diseño y desarrollo de páginas web corporativas</li>
              <li>Desarrollo de landing pages</li>
              <li>Desarrollo de tiendas en línea (e-commerce)</li>
              <li>Desarrollo de aplicaciones web personalizadas (SaaS)</li>
              <li>Mantenimiento y soporte técnico</li>
              <li>Registro y gestión de dominios</li>
              <li>Servicios de hosting y despliegue</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text)] mb-3">3. Proceso de Contratación</h2>
            <p>
              El proceso de contratación se inicia mediante el envío de un formulario de briefing a través de nuestro sitio web.
              Una vez recibido, nuestro equipo evaluará los requerimientos y le contactará para confirmar los detalles del proyecto.
            </p>
            <p className="mt-2">
              La cotización proporcionada tiene una validez de 15 días hábiles desde su emisión. Los precios están sujetos
              a cambios según la complejidad final del proyecto. El inicio del desarrollo está condicionado al pago del
              anticipo acordado.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text)] mb-3">4. Pagos y Facturación</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Anticipo:</strong> Se requiere un pago inicial del 50% del valor total del proyecto antes de comenzar
                el desarrollo, salvo acuerdo diferente por escrito.
              </li>
              <li>
                <strong>Pago final:</strong> El 50% restante debe ser cancelado antes de la entrega final y puesta en
                producción del proyecto.
              </li>
              <li>
                <strong>Métodos de pago:</strong> Transferencia bancaria, tarjeta de crédito/débito u otros medios
                acordados previamente.
              </li>
              <li>
                <strong>Recargos por urgencia:</strong> Los proyectos con plazos de entrega acelerados pueden incluir
                un recargo adicional según el nivel de urgencia seleccionado.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text)] mb-3">5. Plazos de Entrega</h2>
            <p>
              Los plazos de entrega estimados se comunican al momento de la contratación y dependen del tipo y complejidad
              del proyecto. PuroCode se compromete a cumplir con los plazos acordados, sin embargo, retrasos causados por la
              falta de entrega de contenido o materiales por parte del cliente podrán extender los plazos proporcionalmente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text)] mb-3">6. Revisiones y Modificaciones</h2>
            <p>
              Cada proyecto incluye un número determinado de rondas de revisión que se especificará en la cotización.
              Las modificaciones que excedan el alcance original del proyecto podrán generar costos adicionales que
              serán comunicados y aprobados por el cliente antes de su implementación.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text)] mb-3">7. Propiedad Intelectual</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Una vez completado el pago total, el cliente adquiere los derechos de uso sobre el producto final entregado.
              </li>
              <li>
                PuroCode se reserva el derecho de utilizar el proyecto como parte de su portafolio, salvo acuerdo
                de confidencialidad por escrito.
              </li>
              <li>
                Las librerías, frameworks y componentes de código abierto utilizados mantienen sus respectivas licencias.
              </li>
              <li>
                El código fuente desarrollado específicamente para el proyecto es transferido al cliente tras el pago completo.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text)] mb-3">8. Garantía y Soporte</h2>
            <p>
              PuroCode ofrece un período de garantía de 30 días tras la entrega final del proyecto, durante el cual
              se corregirán sin costo adicional errores técnicos o bugs atribuibles al desarrollo. Este período no
              cubre modificaciones de diseño, nuevas funcionalidades ni problemas causados por intervención de terceros
              en el código.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text)] mb-3">9. Cancelación y Reembolsos</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                El cliente puede cancelar el proyecto en cualquier momento mediante notificación escrita.
              </li>
              <li>
                Si la cancelación ocurre antes del inicio del desarrollo, se reembolsará el 100% del anticipo.
              </li>
              <li>
                Si la cancelación ocurre durante el desarrollo, se evaluará el porcentaje de avance y se facturará
                proporcionalmente el trabajo realizado. La diferencia, si la hay, será reembolsada.
              </li>
              <li>
                No se realizarán reembolsos una vez entregado el proyecto final.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text)] mb-3">10. Responsabilidades del Cliente</h2>
            <p>El cliente se compromete a:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Proporcionar toda la información, contenido y materiales necesarios en los plazos acordados.</li>
              <li>Designar una persona de contacto responsable para la toma de decisiones del proyecto.</li>
              <li>Revisar y aprobar los entregables dentro de los plazos establecidos.</li>
              <li>Mantener la confidencialidad de las credenciales de acceso proporcionadas.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text)] mb-3">11. Limitación de Responsabilidad</h2>
            <p>
              PuroCode no será responsable por daños indirectos, incidentales o consecuentes derivados del uso
              o la imposibilidad de uso de los productos entregados. Nuestra responsabilidad máxima estará limitada
              al monto total pagado por el cliente por el proyecto en cuestión.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text)] mb-3">12. Modificaciones a los Términos</h2>
            <p>
              PuroCode se reserva el derecho de modificar estos términos en cualquier momento. Las modificaciones
              entrarán en vigor una vez publicadas en el sitio web. El uso continuado de nuestros servicios tras
              la publicación de cambios constituye su aceptación de los nuevos términos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text)] mb-3">13. Ley Aplicable</h2>
            <p>
              Estos términos se rigen por las leyes de la República de Chile. Cualquier disputa será sometida
              a la jurisdicción de los tribunales competentes de la ciudad de Santiago de Chile.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text)] mb-3">14. Contacto</h2>
            <p>
              Para consultas sobre estos términos, puede contactarnos a través de:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Email: <a href="mailto:contactopurocode@gmail.com" className="text-[var(--primary)] hover:underline">contactopurocode@gmail.com</a></li>
              <li>WhatsApp: <a href="https://wa.me/56956994930" className="text-[var(--primary)] hover:underline">+56 9 5699 4930</a></li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
