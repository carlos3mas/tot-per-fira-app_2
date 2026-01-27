import Button from "@/components/ui/retro-btn"
import Link from "next/link"
import Image from "next/image"
import GlitchText from "@/components/ui/glitch-text";
import { ConfettiWrapper } from "./confetti-wrapper";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden border border-b-0 border-gray-300 container mx-auto pt-20">
      <ConfettiWrapper />
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/pexels-kampus-6760884.jpg"
          alt="Event background"
          fill
          className="object-cover blur-[5px]"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="container mx-auto px-4 justify-center relative z-30">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main headline - H1 Principal */}
          <div className="mb-8 text-center">
            <span className="text-md lg:text-xl font-semibold font-clash-display text-white">¡No te estreses más!</span>
          </div>
          <div className="mb-12 text-center">
            <h1 className="text-6xl lg:text-8xl text-white font-bold font-khand">
              ORGANIZAMOS TU EVENTO IDEAL
            </h1>
          </div>
          {/* Description */}
          <div className="mb-16 max-w-2xl mx-auto text-center">
            <p className="text-base lg:text-xl text-gray-200 leading-relaxed tracking-wider font-clash-display">
              BEBIDAS, CONGELADORES, ALTAVOCES Y MUCHOS MÁS... <br />
              <span className="text-white font-semibold">¡Nosotros nos encargamos de todo!</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-row gap-6 items-center justify-center mb-16">
            <Link href="/solicitar-presupuesto" className="block">
              <Button
                size="md"
                variant="default"
              >
                Crear presupuesto
              </Button>
            </Link>
            <Link href="/contacto" className="block">
              <Button
                size="md"
                variant="secondary"
              >
                Contactar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 
