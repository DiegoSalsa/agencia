'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/landing/Footer';

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="mx-auto max-w-[900px] px-6 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors">
            <ArrowLeft size={18} />
            <Image src="/img/logo.svg" alt="PuroCode" width={28} height={28} className="h-7 w-auto dark:brightness-100 brightness-0" />
            <span className="font-bold text-lg text-[var(--text)]">PuroCode</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-[900px] px-6 py-12 md:py-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Política de Privacidad</h1>
        <p className="text-[var(--text-tertiary)] text-sm mb-10">Última actualización: 8 de marzo de 2026</p>

        <div className="prose-custom space-y-8 text-[var(--text-secondary)] text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[var(--text)] mb-3">1. Información General</h2>
            <p>
              PuroCode (en adelante &quot;la Empresa&quot;) se compromete a proteger la privacidad de sus usuarios y clientes.
              Esta Política de Privacidad describe cómo recopilamos, usamos, almacenamos y protegemos su información
              personal cuando utiliza nuestro sitio web purocode.com y servicios relacionados.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text)] mb-3">2. Información que Recopilamos</h2>
            <p>Podemos recopilar los siguientes tipos de información:</p>
            
            <h3 className="text-lg font-medium text-[var(--text)] mt-4 mb-2">2.1 Información proporcionada por el usuario</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Nombre completo (nombre, apellido paterno, apellido materno)</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono</li>
              <li>Nombre de la empresa o proyecto</li>
              <li>Información del proyecto (tipo de sitio web, preferencias de diseño, contenido)</li>
              <li>Preferencia de dominio</li>
            </ul>

            <h3 className="text-lg font-medium text-[var(--text)] mt-4 mb-2">2.2 Información recopilada automáticamente</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Dirección IP (utilizada exclusivamente para limitar consultas de dominio)</li>
              <li>Tipo de navegador y dispositivo</li>
              <li>Páginas visitadas y tiempo de permanencia</li>
              <li>País y zona horaria (para mostrar precios en moneda local)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text)] mb-3">3. Uso de la Información</h2>
            <p>Utilizamos la información recopilada para los siguientes fines:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Procesar y gestionar las solicitudes de desarrollo web (briefings)</li>
              <li>Comunicarnos con usted respecto a su proyecto</li>
              <li>Enviar cotizaciones y documentos relacionados con el servicio</li>
              <li>Verificar la disponibilidad de dominios solicitados</li>
              <li>Proporcionar acceso al portal de clientes para seguimiento de proyectos</li>
              <li>Generar enlaces de acceso seguros (magic links) para el portal</li>
              <li>Personalizar la experiencia del usuario (idioma, moneda, zona horaria)</li>
              <li>Mejorar nuestros servicios y la experiencia de navegación</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text)] mb-3">4. Almacenamiento y Seguridad</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                La información se almacena en servidores seguros proporcionados por proveedores de infraestructura
                de confianza (Vercel, Turso).
              </li>
              <li>
                Utilizamos cifrado en tránsito (HTTPS/TLS) para proteger la transmisión de datos.
              </li>
              <li>
                Las contraseñas y tokens de autenticación se almacenan de forma segura utilizando
                algoritmos de hash criptográficos (HMAC-SHA256).
              </li>
              <li>
                Los enlaces de acceso al portal de clientes (magic links) expiran después de 30 minutos
                y son de un solo uso.
              </li>
              <li>
                Las sesiones del portal de clientes tienen una duración máxima de 7 días.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text)] mb-3">5. Compartición de Datos</h2>
            <p>
              PuroCode <strong>no vende, alquila ni comparte</strong> información personal con terceros
              para fines de marketing. Podemos compartir información únicamente en los siguientes casos:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Proveedores de servicio:</strong> Con proveedores que nos ayudan a operar nuestros servicios
                (hosting, email, bases de datos), quienes están obligados a proteger su información.
              </li>
              <li>
                <strong>Verificación de dominios:</strong> Al verificar disponibilidad de un dominio, consultamos
                la API de Porkbun enviando únicamente el nombre del dominio a consultar, sin datos personales.
              </li>
              <li>
                <strong>Requisitos legales:</strong> Cuando sea requerido por ley, orden judicial o autoridad competente.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text)] mb-3">6. Cookies y Tecnologías Similares</h2>
            <p>
              Nuestro sitio utiliza distintos tipos de cookies:
            </p>

            <h3 className="text-base font-semibold text-[var(--text)] mt-4 mb-2">Cookies esenciales</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Cookie de sesión del portal:</strong> Una cookie HttpOnly segura para mantener la sesión
                de clientes autenticados en el portal. Expira a los 7 días.
              </li>
              <li>
                <strong>Preferencia de cookies:</strong> Almacena su elección sobre el uso de cookies
                analíticas (<code className="text-xs">cookie_consent</code>). Expira en 1 año.
              </li>
              <li>
                <strong>Preferencias de idioma y tema:</strong> Se almacenan localmente en su navegador
                (localStorage) y no se envían a nuestros servidores.
              </li>
            </ul>

            <h3 className="text-base font-semibold text-[var(--text)] mt-4 mb-2">Cookies analíticas (opcionales)</h3>
            <p>
              Con su consentimiento, utilizamos <strong>Google Analytics 4</strong> para comprender cómo
              los usuarios interactúan con nuestro sitio y mejorar la experiencia. Google Analytics
              establece las siguientes cookies:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <code className="text-xs">_ga</code>: Identifica usuarios únicos. Expira a los 2 años.
              </li>
              <li>
                <code className="text-xs">_ga_*</code>: Mantiene el estado de la sesión. Expira a los 2 años.
              </li>
            </ul>
            <p className="mt-2">
              Estas cookies <strong>solo se activan si usted acepta las cookies analíticas</strong> a través
              del banner de consentimiento que aparece en su primera visita. Puede cambiar su preferencia
              en cualquier momento limpiando las cookies de su navegador.
            </p>
            <p className="mt-2">
              No utilizamos cookies de publicidad ni compartimos datos analíticos con terceros
              más allá de Google Analytics.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text)] mb-3">7. Derechos del Usuario</h2>
            <p>Usted tiene derecho a:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Acceso:</strong> Solicitar una copia de la información personal que tenemos sobre usted.</li>
              <li><strong>Rectificación:</strong> Solicitar la corrección de datos inexactos o incompletos.</li>
              <li><strong>Eliminación:</strong> Solicitar la eliminación de su información personal de nuestros sistemas.</li>
              <li><strong>Portabilidad:</strong> Solicitar sus datos en un formato estructurado y de uso común.</li>
              <li><strong>Oposición:</strong> Oponerse al procesamiento de sus datos en determinadas circunstancias.</li>
            </ul>
            <p className="mt-2">
              Para ejercer cualquiera de estos derechos, puede contactarnos a{' '}
              <a href="mailto:contactopurocode@gmail.com" className="text-[var(--primary)] hover:underline">
                contactopurocode@gmail.com
              </a>.
              Responderemos a su solicitud en un plazo máximo de 15 días hábiles.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text)] mb-3">8. Retención de Datos</h2>
            <p>
              Conservamos la información personal durante el tiempo necesario para cumplir con los fines
              para los que fue recopilada, incluyendo obligaciones legales y contractuales. Los briefings
              y datos de proyectos se conservan por un período mínimo de 2 años tras la finalización del proyecto.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text)] mb-3">9. Menores de Edad</h2>
            <p>
              Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos intencionalmente
              información de menores. Si descubrimos que hemos recopilado información de un menor,
              la eliminaremos de inmediato.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text)] mb-3">10. Cambios en esta Política</h2>
            <p>
              Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento.
              Los cambios serán publicados en esta página con la fecha de la última actualización.
              Le recomendamos revisar esta página periódicamente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text)] mb-3">11. Legislación Aplicable</h2>
            <p>
              Esta política se rige por la Ley N° 19.628 sobre Protección de la Vida Privada de la República
              de Chile y demás normativa aplicable en materia de protección de datos personales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text)] mb-3">12. Contacto</h2>
            <p>
              Si tiene preguntas o inquietudes sobre esta Política de Privacidad, puede contactarnos a través de:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Email: <a href="mailto:contactopurocode@gmail.com" className="text-[var(--primary)] hover:underline">contactopurocode@gmail.com</a></li>
              <li>WhatsApp: <a href="https://wa.me/56949255006" className="text-[var(--primary)] hover:underline">+56 9 4925 5006</a></li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
