import Button from "@/components/ui/retro-btn"
import Link from "next/link"


export function OurMission() {
  return (
    <section className="relative overflow-hidden border border-b border-t-0 border-gray-300 container mx-auto pt-20 pb-20">
        <div className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-lg text-[var(--secondary-color)] mb-4 font-clash-display font-bold">NUESTRA MISIÓN</span>
              <h2 className="text-4xl md:text-6xl font-bold font-khand text-[var(--primary-color)] mb-4">
                Nos esforzamos en darte un trato personalizado
              </h2>
            </div>
            <div>
              <div className="space-y-6">
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  En <strong className="text-[var(--primary-color)]">Tot per Fira</strong>, creemos que cada cliente es único y merece una atención especial.
                </p>

                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  Nos esforzamos al máximo para que el trato con cada uno de vosotros sea lo más cercano y personalizado posible.
                </p>

                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  Queremos que te sientas como en casa y que confíes plenamente en nosotros para hacer realidad tu evento.
                </p>

                <div className="bg-gray-50 p-6 border-l-4 border-[var(--primary-color)]">
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    <strong>¿Tienes dudas?</strong> Siempre estamos disponibles para resolver cualquier consulta que tengas, ya sea por teléfono, email o WhatsApp.
                  </p>
                </div>
              </div>

              
            </div>
            
          </div>
        </div>
        <div className="mt-8 flex flex-row gap-4 justify-center">
                <Link href="/solicitar-presupuesto">
                  <Button
                    size="md"
                    variant="default"
                  >
                    Solicitar Presupuesto
                  </Button>
                </Link>
                <Link href="/contacto">
                  <Button
                    variant="outline"
                    size="md"
                  >
                    Contactar
                  </Button>
                </Link>
              </div>
    </section>
  )
}