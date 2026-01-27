import { Hero } from "./_components/hero"
import { ConfidenceSection } from "./_components/confidence-section"
import { ServicesSection } from "./_components/services-section"
import { AnniversarySection } from "./_components/anniversary-section"
import { DrinksSection } from "./_components/drinks-section"
import { CTASection } from "./_components/cta-section"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Magdalena 2026 | Organiza tus fiestas en Castellón",
  description: "Solicita tu presupuesto para las fiestas de la Magdalena 2026 en Castellón de la Plana y deja que nosotros nos ocupemos de todo.",
  keywords: [
    "magdalena 2026",
    "magdalena castellón",
    "fiestas magdalena",
    "fiestas castellón de la plana",
    "alquiler de equipos de sonido",
    "alquiler de congeladores", 
    "alquiler de botelleros",
    "alquiler de grifos de cerveza",
    "alquiler de mesas y sillas",
    "alquiler de iluminación",
    "bebidas",
    "botellas de agua",
    "botellas de refresco",
    "botellas de cerveza",
    "botellas de vino",
    "organización de fiestas",
    "organización de eventos",
    "organización de fiestas en Castellón",
    "organización de eventos en Castellón",
    "collas magdalena",
    "confianza",
    "conocemos ambiente",
    "precios justos"
  ],
};

export default function MagdalenaPage() {
  return (
    <div className="min-h-screen">
      <div className="px-2">
        <Hero />
      </div>
      <div className="px-2">
        <ConfidenceSection />
        <ServicesSection />
        <DrinksSection />
        <AnniversarySection />
        <CTASection />
      </div>
    </div>
  )
}
