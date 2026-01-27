import { Building2, Users, Presentation, Coffee, Award, Briefcase } from "lucide-react"
import Button from "@/components/ui/retro-btn"
import Link from "next/link"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Eventos Corporativos | Organización profesional de eventos",
  description: "Organización y servicios para eventos corporativos en Castellón. Conferencias, presentaciones, team building y celebraciones empresariales.",
  keywords: [
    "eventos corporativos",
    "eventos empresariales",
    "organización eventos empresa",
    "conferencias castellón",
    "team building",
    "eventos profesionales",
    "catering corporativo",
    "sonido eventos empresa",
    "castellón eventos corporativos"
  ],
};

export default function EventosCorporativosPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden border border-b-0 border-gray-300 container mx-auto">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold font-khand text-[var(--primary-color)] mb-6">
              EVENTOS CORPORATIVOS
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-clash-display mb-8">
              Organización profesional de eventos empresariales con servicio integral
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
          <div className="p-4 border-b border-gray-300 text-center bg-[var(--complementary-color-green)]/10">
            <h2 className="text-4xl md:text-6xl font-bold font-khand text-[var(--primary-color)]">
              TIPOS DE EVENTOS CORPORATIVOS
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            <EventCard
              icon={Presentation}
              title="Conferencias y Presentaciones"
              description="Todo tipo de bebidas y catering para tus conferencias y presentaciones"
              bgColor="bg-[var(--secondary-color)]"
              accentColor="text-[var(--primary-color)]"
            />
            <EventCard
              icon={Users}
              title="Team Building"
              description="Eventos de integración y actividades para fortalecer equipos de trabajo"
              bgColor="bg-[var(--primary-color)]"
              accentColor="text-[var(--secondary-color)]"
            />
            <EventCard
              icon={Coffee}
              title="Networking y Cócteles"
              description="Organización de eventos de networking con catering y bebidas premium"
              bgColor="bg-[var(--secondary-color)]"
              accentColor="text-[var(--primary-color)]"
            />
            <EventCard
              icon={Award}
              title="Celebraciones Empresariales"
              description="Fiestas de empresa, aniversarios y celebraciones corporativas"
              bgColor="bg-[var(--primary-color)]"
              accentColor="text-[var(--secondary-color)]"
            />
            <EventCard
              icon={Briefcase}
              title="Ferias y Stands"
              description="Montaje y equipamiento para ferias comerciales y exposiciones"
              bgColor="bg-[var(--secondary-color)]"
              accentColor="text-[var(--primary-color)]"
            />
            <EventCard
              icon={Building2}
              title="Inauguraciones"
              description="Eventos de inauguración de oficinas, locales y nuevos proyectos"
              bgColor="bg-[var(--primary-color)]"
              accentColor="text-[var(--secondary-color)]"
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
            <ServiceItem title="Equipos de sonido profesional" />
            <ServiceItem title="Catering" />
            <ServiceItem title="Refrescos" />
            <ServiceItem title="Bebidas alcohólicas" />
            <ServiceItem title="Gran variedad de cervezas" />
            <ServiceItem title="Personal de servicio" />
            <ServiceItem title="Montaje y desmontaje" />
            <ServiceItem title="Coordinación del evento" />
            <ServiceItem title="Decoración corporativa" />
            <ServiceItem title="DJ" />
            <ServiceItem title="Fotógrafo" />
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative overflow-hidden border border-b border-t-0 border-gray-300 container mx-auto">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl md:text-6xl font-bold font-khand text-[var(--primary-color)] mb-6">
            ¿LISTO PARA TU EVENTO CORPORATIVO?
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-clash-display mb-8 max-w-2xl mx-auto">
            Contacta con nosotros y te ayudaremos a organizar un evento corporativo profesional y exitoso
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
  accentColor
}: {
  icon: any,
  title: string,
  description: string,
  bgColor: string,
  accentColor: string
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
