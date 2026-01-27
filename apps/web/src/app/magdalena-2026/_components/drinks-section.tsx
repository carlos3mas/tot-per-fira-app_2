import Button from "@/components/ui/retro-btn"
import Link from "next/link"

export function DrinksSection() {
  return (
    <section className="relative overflow-hidden border border-b border-t-0 border-gray-300 container mx-auto">
      <div className="container mx-auto">
        <div className="p-8 border-gray-300 text-center">
          <h2 className="text-4xl md:text-6xl font-bold font-khand text-[var(--primary-color)] mb-6">
            ¿NECESITAS LA BEBIDA PARA TU COLLA?
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-clash-display mb-8 max-w-3xl mx-auto">
            Nosotros nos encargamos de todo. Cerveza, refrescos, agua, bebidas alcohólicas... 
            Te llevamos todo lo que necesites directamente a tu colla.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link href="/solicitar-presupuesto">
              <Button size="md" variant="default">
                Pide tu presupuesto
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
