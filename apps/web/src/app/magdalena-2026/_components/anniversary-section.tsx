import Button from "@/components/ui/retro-btn"
import Link from "next/link"

export function AnniversarySection() {
  return (
    <section className="relative overflow-hidden border border-b-0 border-t-0 border-gray-300 container mx-auto">
      <div className="container mx-auto">
        <div className="p-8 border-b border-gray-300 text-center bg-pink-300/10 space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold font-khand text-[var(--primary-color)]">
            ¿TU COLLA QUIERE MONTAR UNA FIESTA?
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-clash-display max-w-3xl mx-auto">
            ¡Nosotros nos encargamos de montar la fiesta perfecta!
            Barras, sonido, iluminación, personal y bebida... ¡todo incluido!
          </p>


        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6 border-b md:border-r border-gray-300 bg-white">
            <h3 className="text-2xl md:text-3xl font-bold font-khand text-[var(--secondary-color)] mb-6">
              ¿Qué incluye?
            </h3>
            <ul className="space-y-4 text-gray-600 font-clash-display">
              <li className="flex items-center gap-3">
                <span className="text-[var(--primary-color)] font-bold text-xl">✓</span>
                Montaje completo de barras
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[var(--primary-color)] font-bold text-xl">✓</span>
                Equipo de sonido profesional
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[var(--primary-color)] font-bold text-xl">✓</span>
                Iluminación
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[var(--primary-color)] font-bold text-xl">✓</span>
                Personal de servicio
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[var(--primary-color)] font-bold text-xl">✓</span>
                Suministro de bebidas
              </li>
            </ul>
          </div>

          <div className="p-6 border-b border-gray-300 bg-white">
            <h3 className="text-2xl md:text-3xl font-bold font-khand text-[var(--secondary-color)] mb-6">
              ¿Por qué elegirnos?
            </h3>
            <ul className="space-y-4 text-gray-600 font-clash-display">
              <li className="flex items-center gap-3">
                <span className="text-[var(--primary-color)] font-bold text-xl">→</span>
                + 10 años de experiencia
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[var(--primary-color)] font-bold text-xl">→</span>
                + de 50 collas confían en nosotros
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[var(--primary-color)] font-bold text-xl">→</span>
                Servicio integral y personalizado
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[var(--primary-color)] font-bold text-xl">→</span>
                Precios competitivos
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[var(--primary-color)] font-bold text-xl">→</span>
                Trato cercano y directo
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4 pb-4">
          <Link href="/contacto">
            <Button size="md" variant="default">
              Resolvemos tus dudas
            </Button>
          </Link>
          <Link href="/solicitar-presupuesto">
            <Button size="md" variant="secondary">
              Pide tu presupuesto
            </Button>
          </Link>
        </div>

      </div>
    </section>
  )
}
