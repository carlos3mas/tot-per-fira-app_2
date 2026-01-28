import { NumberTicker } from "@/components/magicui/number-ticker"

export function ConfidenceSection() {
  return (
    <section className="relative overflow-hidden border border-b-0 border-t-0 border-gray-300 container mx-auto">
      <div className="container mx-auto">
        <div className="p-8 border-b border-gray-300 text-center">
          <h2 className="text-4xl md:text-6xl font-bold font-khand text-[var(--primary-color)] mb-8">
            CONFIANZA EN NOSOTROS
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-2xl text-gray-700 leading-relaxed font-clash-display mb-8">
              POR LA EXPERIENCIA Y LA CANTIDAD DE GENTE CON LA QUE HEMOS TRABAJADO
            </p>
            
            {/* Número destacado de collas */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-6xl md:text-8xl text-[var(--primary-color)] font-bold font-khand">
                  +
                </span>
                <span className="text-4xl md:text-6xl text-[var(--primary-color)] font-bold font-khand">
                  DE
                </span>
              </div>
              <NumberTicker
                value={21}
                className="text-6xl md:text-8xl text-[var(--primary-color)] font-bold font-khand"
              />
              <span className="text-4xl md:text-6xl font-bold font-khand text-[var(--secondary-color)]">
                COLLAS
              </span>
            </div>
            
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-clash-display">
              Ya han confiado en nosotros para organizar sus fiestas de la Magdalena
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
