import Button from "@/components/ui/retro-btn"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="relative overflow-hidden border border-b border-t border-gray-300 container mx-auto">
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="p-8 sm:border-b-0 border-b border-gray-300">
            <span className="text-base md:text-lg text-[var(--secondary-color)] mb-4 font-clash-display font-bold">
              TRATO DIRECTO Y PERSONAL
            </span>
            <h3 className="text-4xl md:text-6xl font-bold font-khand text-[var(--primary-color)] mb-6">
              Hablamos en confianza
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed font-clash-display mb-8">
              No somos una empresa fría y distante. Somos gente de aquí, que conocemos 
              las collas, las tradiciones y lo que realmente necesitas para que tu fiesta 
              de la Magdalena sea inolvidable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
              <Link href="/contacto">
                <Button size="md" variant="default">
                  Habla con nosotros
                </Button>
              </Link>
              <Link href="/solicitar-presupuesto">
                <Button size="md" variant="secondary">
                  Pide presupuesto
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-rows-4">
            <FeatureCard
              title="Conversación directa"
              description="Hablamos contigo directamente, sin intermediarios ni formularios complicados"
            />
            <FeatureCard
              title="Conocemos el ambiente"
              description="Somos de aquí, conocemos las collas y las tradiciones de la Magdalena de Castellón"
            />
            <FeatureCard
              title="Precios justos"
              description="Te damos el mejor precio sin sorpresas ni costes ocultos"
            />
            <FeatureCard
              title="Disponibilidad total"
              description="Estamos disponibles cuando nos necesites, incluso en fin de semana"
              className="border-b-0"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  title,
  description,
  className = ""
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={`row-span-1 sm:border-l border-b border-gray-300 p-6 ${className}`}>
      <div className="flex flex-col">
        <h4 className="text-2xl font-bold font-khand text-[var(--primary-color)] mb-2">
          {title}
        </h4>
        <span className="text-md text-gray-600 font-clash-display">
          {description}
        </span>
      </div>
    </div>
  );
}
