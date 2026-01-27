import Button from "@/components/ui/retro-btn"
import Link from "next/link"
import Image from "next/image"
import GlitchText from "@/components/ui/glitch-text";
import { ResponsiveFireworks } from "./responsive-fireworks";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden border border-b-0 border-gray-300 container mx-auto pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/pexels-picjumbo-com-55570-196652.jpg"
          alt="Event background"
          fill
          className="object-cover blur-[5px]"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className="container mx-auto px-4 relative z-30">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left side - Text content with fireworks background */}
          <div className="text-center lg:text-left relative">
            {/* Fireworks background covering the entire left section */}
            <div className="absolute inset-0 z-0">
              <ResponsiveFireworks />
            </div>

            {/* Content with proper z-index to appear above fireworks */}
            <div className="relative z-10">
              {/* Main headline */}
              <div className="mb-8">
                <span className="text-md lg:text-xl font-semibold font-clash-display text-white">¡Magdalena 2026!</span>
              </div>
              <div className="mb-12">
                <h1 className="text-6xl lg:text-8xl text-white font-bold font-khand">
                  TODO PARA LAS FIESTAS DE CASTELLÓN
                </h1>
              </div>

              {/* Description */}
              <div className="mb-16 max-w-2xl lg:max-w-none">
                <p className="text-base lg:text-xl text-gray-200 leading-relaxed tracking-wider font-clash-display">
                  CONOCEMOS CASTELLÓN Y SUS TRADICIONES <br />
                  <span className="text-white font-semibold">LA MAGDALENA MERECE LO MEJOR</span>
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start justify-center lg:justify-start">
                <Link href="/solicitar-presupuesto">
                  <Button
                    size="md"
                    variant="default"
                  >
                    Crea tu presupuesto
                  </Button>
                </Link>
                <Link href="/contacto">
                  <Button
                    size="md"
                    variant="secondary"
                  >
                    Contacta con nosotros
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right side - Poster image */}
          <div className="flex justify-center lg:justify-end mb-5">
            <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/images/cartel-magdalena-2026.jpg"
                  alt="Cartel oficial Magdalena 2026 - Fira i Festes de la Magdalena, Castelló de la Plana"
                  fill
                  className="object-contain"
                  priority
                  quality={100}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
