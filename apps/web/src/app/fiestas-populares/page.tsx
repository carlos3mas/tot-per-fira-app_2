import { LandPlot, Flag, MapPin, Music2, Users2, Beer, UtensilsCrossed, Tent } from "lucide-react"
import Button from "@/components/ui/retro-btn"
import Link from "next/link"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Fiestas Populares | Comisiones, Peñas y Ayuntamientos",
  description: "Organización integral de fiestas populares, servicios para comisiones de barrio, peñas, collas y fiestas patronales en Castellón.",
  keywords: [
    "fiestas populares",
    "comisiones de fiestas",
    "fiestas patronales",
    "peñaS",
    "collas",
    "discomóviles",
    "cenas de hermandad",
    "barras para fiestas"
  ],
};

export default function FiestasPopularesPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden border border-b-0 border-gray-300 container mx-auto">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold font-khand text-[var(--primary-color)] mb-6">
              FIESTAS POPULARES
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-clash-display mb-8">
              Servicio integral para comisiones, peñas, collas y ayuntamientos. <br/>
              ¡La fiesta la pones tú, nosotros todo lo demás!
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

      {/* Tipos de Fiestas/Clientes */}
      <section className="relative overflow-hidden border border-b-0 border-t-0 border-gray-300 container mx-auto">
        <div className="container mx-auto">
          <div className="p-4 border-b border-gray-300 text-center bg-[var(--complementary-color-yellow)]/10">
            <h2 className="text-4xl md:text-6xl font-bold font-khand text-[var(--primary-color)]">
              PARA QUIÉN TRABAJAMOS
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            <EventCard
              icon={Users2}
              title="Comisiones de Barrio"
              description="Gestión completa de barras, sonido y montaje para las fiestas de tu barrio"
              bgColor="bg-orange-500"
              accentColor="text-blue-900" /* Dark contrast against orange */
            />
            <EventCard
              icon={LandPlot}
              title="Ayuntamientos"
              description="Infraestructura y servicios para fiestas patronales y eventos municipales"
              bgColor="bg-blue-600"
              accentColor="text-orange-300" /* Orange contrast against blue */
            />
            <EventCard
              icon={Flag}
              title="Peñas y Collas"
              description="Todo lo necesario para tu local o barraca: bebida, neveras y limpieza"
              bgColor="bg-red-500"
              accentColor="text-yellow-300" /* Yellow contrast against red */
            />
            <EventCard
              icon={Beer}
              title="Cenas de Hermandad"
              description="Catering, mesas, sillas y bebida para grandes cenas populares"
              bgColor="bg-yellow-500"
              accentColor="text-red-600" /* Red contrast against yellow */
            />
            <EventCard
              icon={Tent}
              title="Quintos de Pueblo"
              description="Packs especiales de bebida y discomóvil para la semana de fiestas"
              bgColor="bg-green-600"
              accentColor="text-purple-800"
            />
            <EventCard
              icon={Music2}
              title="Verbenas y Discomóviles"
              description="Sonido, iluminación y DJs para que no pare la fiesta"
              bgColor="bg-purple-600"
              accentColor="text-green-300" /* Green contrast against purple */
            />
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="relative overflow-hidden border border-b-0 border-t-0 border-gray-300 container mx-auto">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl md:text-6xl font-bold font-khand text-[var(--primary-color)] text-center mb-12">
            TODOS NUESTROS SERVICIOS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 max-w-6xl mx-auto">
            <ServiceItem title="Barras y Grifos de Cerveza" />
            <ServiceItem title="Suministro de Bebidas" />
            <ServiceItem title="Discomóvil y Sonido" />
            <ServiceItem title="DJ Profesional" />
            <ServiceItem title="Fotógrafo de Eventos" />
            <ServiceItem title="Catering y Paellas" />
            <ServiceItem title="Carpas (Pequeño formato)" />
            <ServiceItem title="Mesas y Sillas" />
            <ServiceItem title="Limpieza de Recintos" />
            <ServiceItem title="Generadores Eléctricos" />
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative overflow-hidden border border-b border-t-0 border-gray-300 container mx-auto">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl md:text-6xl font-bold font-khand text-[var(--primary-color)] mb-6">
            ¡HAGAMOS GRANDE LA FIESTA!
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-clash-display mb-8 max-w-2xl mx-auto">
            Contacta con nosotros para un presupuesto a medida de tu comisión o peña
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
      <p className="text-md md:text-md lg:text-lg font-clash-display text-white">
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
