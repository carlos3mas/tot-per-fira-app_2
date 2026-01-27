import Button from "@/components/ui/retro-btn";


export function CTASection() {
  return (
    <section className="relative overflow-hidden border border-b border-t border-gray-300 container mx-auto">
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="p-4 sm:border-b-0 border-b border-gray-300">
            <span className="text-base md:text-lg text-[var(--secondary-color)] mb-4 font-clash-display font-bold">DÉJALO EN NUESTRAS MANOS Y LLÉVATE TODO EL MÉRITO</span>
            <h2 className="text-4xl md:text-6xl font-bold font-khand text-[var(--primary-color)] mb-4">
              Sabemos mejor que nadie el coñazo de organizarlo todo
            </h2>

          </div>
          <div className="grid grid-rows-4">
            <FeatureCard
              title="+10 años de experiencia"
              description="Conocemos perfectamente el sector de eventos y fiestas"
            />
            <FeatureCard
              title="Atención personalizada"
              description="Nos ajustamos a tus necesidades específicas"
            />
            <FeatureCard
              title="Servicio integral"
              description="Sonido, bebida, montaje, barra y personal"
            />
            <FeatureCard
              title="Flexibilidad total"
              description="Nos adaptamos a cualquier tipo de fiesta o evento"
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
    <div className={`row-span-1 sm:border-l border-b border-gray-300 p-4 ${className}`}>
      <div className="flex flex-col">
        <h4 className="text-2xl font-bold font-khand text-[var(--primary-color)]">
          {title}
        </h4>
        <span className="text-md text-muted-foreground">
          {description}
        </span>
      </div>
    </div>
  );
}