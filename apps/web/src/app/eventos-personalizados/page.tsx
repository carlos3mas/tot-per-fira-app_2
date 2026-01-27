import { Heart, Cake, PartyPopper, Music2, Users2, Sparkles, Ticket } from "lucide-react"
import Button from "@/components/ui/retro-btn"
import Link from "next/link"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Eventos Personalizados | Organización de fiestas y celebraciones",
  description: "Organización de eventos personalizados en Castellón. Bodas, cumpleaños, bautizos, comuniones y celebraciones familiares.",
  keywords: [
    "eventos personalizados",
    "fiestas privadas",
    "bodas castellón",
    "cumpleaños",
    "bautizos",
    "comuniones",
    "celebraciones familiares",
    "organización fiestas",
    "eventos particulares castellón"
  ],
};

export default function EventosPersonalizadosPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden border border-b-0 border-gray-300 container mx-auto">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold font-khand text-[var(--primary-color)] mb-6">
              EVENTOS PERSONALIZADOS
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-clash-display mb-8">
              Hacemos realidad tus celebraciones más especiales con un servicio personalizado
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/solicitar-presupuesto">
                <Button size="md" variant="default">
                  Solicitar Presupuesto
                </Button>
              </Link>
              <Link href="/contacto">
                <Button size="md" variant="outline">
                  Contactar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Eventos */}
      <section className="relative overflow-hidden border border-b-0 border-t-0 border-gray-300 container mx-auto">
        <div className="container mx-auto">
          <div className="p-4 border-b border-gray-300 text-center bg-[var(--complementary-color-pink)]/10">
            <h2 className="text-4xl md:text-6xl font-bold font-khand text-[var(--primary-color)]">
              TIPOS DE CELEBRACIONES
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            <EventCard
              icon={Heart}
              title="Bodas"
              description="Organización completa de tu día especial con todos los detalles"
              bgColor="bg-pink-500"
              accentColor="text-yellow-300"
            />
            <EventCard
              icon={Cake}
              title="Cumpleaños"
              description="Fiestas de cumpleaños inolvidables para todas las edades"
              bgColor="bg-purple-500"
              accentColor="text-green-300"
            />
            <EventCard
              icon={Sparkles}
              title="Bautizos y Comuniones"
              description="Celebraciones religiosas con elegancia y buen gusto"
              bgColor="bg-blue-400"
              accentColor="text-indigo-900"
            />
            <EventCard
              icon={Ticket}
              title="Festivales"
              description="Montaje de barras, carpas y casetas para tickets con personal el personal necesario."
              bgColor="bg-orange-500"
              accentColor="text-blue-900"
            />
            <EventCard
              icon={Music2}
              title="Fiestas Temáticas"
              description="Eventos personalizados con temática a tu elección"
              bgColor="bg-teal-500"
              accentColor="text-yellow-400"
            />
            <EventCard
              icon={Users2}
              title="Reuniones Familiares"
              description="Celebraciones familiares, aniversarios y encuentros especiales"
              bgColor="bg-green-500"
              accentColor="text-purple-800"
            />
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="relative overflow-hidden border border-b-0 border-t-0 border-gray-300 container mx-auto">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl md:text-6xl font-bold font-khand text-[var(--primary-color)] text-center mb-12">
            NUESTROS SERVICIOS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 max-w-6xl mx-auto">
            <ServiceItem title="Equipos de sonido y música" />
            <ServiceItem title="DJ profesional" />
            <ServiceItem title="Charanga en vivo" />
            <ServiceItem title="Catering" />
            <ServiceItem title="Refrescos" />
            <ServiceItem title="Bebidas alcohólicas" />
            <ServiceItem title="Gran variedad de cervezas" />
            <ServiceItem title="Congeladores y hielo" />
            <ServiceItem title="Decoración personalizada" />
            <ServiceItem title="Personal de servicio" />
            <ServiceItem title="Montaje y desmontaje" />
            <ServiceItem title="Packs de limpieza y menaje" />
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="relative overflow-hidden border border-b-0 border-t-0 border-gray-300 container mx-auto">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl md:text-6xl font-bold font-khand text-[var(--primary-color)] text-center mb-12">
            ¿POR QUÉ ELEGIRNOS?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Experiencia Local"
              description="Más de 10 años organizando eventos en Onda, Castellón y alrededores"
            />
            <FeatureCard
              title="Servicio Personalizado"
              description="Adaptamos cada detalle a tus necesidades y preferencias"
            />
            <FeatureCard
              title="Todo Incluido"
              description="Nos encargamos de todo: montaje, servicio y desmontaje"
            />
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative overflow-hidden border border-b border-t-0 border-gray-300 container mx-auto">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl md:text-6xl font-bold font-khand text-[var(--primary-color)] mb-6">
            ¿PREPARADO PARA TU CELEBRACIÓN?
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-clash-display mb-8 max-w-2xl mx-auto">
            Cuéntanos tu idea y haremos que tu evento sea inolvidable
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/solicitar-presupuesto">
              <Button size="md" variant="default">
                Solicitar Presupuesto
              </Button>
            </Link>
            <Link href="/contacto">
              <Button size="md" variant="secondary">
                Más Información
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function EventCard({
  icon: Icon,
  title,
  description,
  bgColor,
  accentColor = "text-white"
}: {
  icon: any,
  title: string,
  description: string,
  bgColor: string,
  accentColor?: string
}) {
  return (
    <div className={`${bgColor} p-8 text-center min-h-[350px] flex flex-col items-center justify-center`}>
      <Icon className={`w-30 h-30 mb-6 ${accentColor}`} />
      <h3 className={`text-4xl md:text-4xl lg:text-6xl font-bold font-khand mb-4 ${accentColor}`}>
        {title}
      </h3>
      <p className="text-md md:text-md lg:text-lg text-white font-clash-display">
        {description}
      </p>
    </div>
  )
}

function ServiceItem({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[var(--primary-color)] font-bold text-2xl">✓</span>
      <span className="text-lg font-clash-display text-gray-700">{title}</span>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string, description: string }) {
  return (
    <div className="bg-gray-50 p-6 border-2 border-gray-200 text-center">
      <h3 className="text-2xl font-bold font-khand text-[var(--primary-color)] mb-3">
        {title}
      </h3>
      <p className="text-gray-600 font-clash-display">
        {description}
      </p>
    </div>
  )
}
