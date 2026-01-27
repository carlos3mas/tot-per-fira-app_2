import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Button from "@/components/ui/retro-btn"
import Link from "next/link"

export default function   FrequentQuestions() {
  const faqs = [
    {
      question: "¿Qué servicios ofrecemos?",
      answer: "Ofrecemos alquiler de altavoces, congeladores, botelleros, suministro de bebidas, grifos de cerveza, packs de limpieza y menaje. También proporcionamos personal de barra y montaje completo."
    },
    {
      question: "¿En qué zonas trabajamos?",
      answer: "Trabajamos principalmente en la Comunidad Valenciana, con sede en Onda, Castellón. Hemos trabajado en pueblos como Alcora, Villarreal, Burriana y Castellón. Para eventos fuera de esta zona, consúltanos y estudiaremos la viabilidad."
    },
    {
      question: "¿Cuánto tiempo de antelación necesito para reservar?",
      answer: "Recomendamos contactar con al menos 2 semanas de antelación, especialmente en temporada alta. Sin embargo, también podemos atender pedidos de última hora según disponibilidad."
    },
    {
      question: "¿Incluyen montaje y desmontaje?",
      answer: "Sí, nuestro servicio incluye el montaje completo del equipo en el lugar del evento y el desmontaje posterior. Solo necesitas indicarnos dónde y cuándo."
    },
    {
      question: "¿Cómo funciona el pago?",
      answer: "Aceptamos transferencias o efectivo solamente."
    }
  ]

  return (
    <section className="relative overflow-hidden border border-b-0 border-t-0 border-gray-300 container mx-auto  pb-20">
      <div className="container mx-auto">
        <div className="p-4 border-b border-gray-300 text-center bg-[var(--complementary-color-turquoise)]/10">
          <h2 className="text-4xl md:text-8xl font-bold font-khand text-[var(--primary-color)]">PREGUNTAS FRECUENTES</h2>
        </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 p-4">
                <AccordionTrigger className="text-left font-clash-display font-semibold text-lg text-[var(--secondary-color)] hover:text-[var(--primary-color)]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed font-clash-display">
                  {faq.answer}
                </AccordionContent>

              </AccordionItem>
            ))}
          </Accordion>
        <div className="pt-20 border-gray-300 text-center p-4 mb-10">
          <div className="">
            <h3 className="text-5xl md:text-7xl font-bold font-khand text-[var(--primary-color)] mb-6">
              ¿A QUE ESTÁS ESPERANDO?
            </h3>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-clash-display mb-8">
              Haz la prueba con nosotros y no te arrepentirás.
            </p>
            <div className="flex flex-row gap-4 justify-center">
              <Link href="/solicitar-presupuesto" className="block">
                <Button
                  size="md"
                  variant="default"
                >
                  Solicitar Presupuesto
                </Button>
              </Link>
              <Link href="/contacto" className="block">
                <Button
                  variant="outline"
                  size="md"
                >
                  Contactar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
