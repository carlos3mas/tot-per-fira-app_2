"use client"

import { useState } from "react"
import Link from "next/link"
import Button from "@/components/ui/retro-btn"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import GlitchText from "./ui/glitch-text"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navigationLinks = [
    { href: "/", label: "Inicio" },
    { href: "/eventos-corporativos", label: "Eventos Corporativos" },
    { href: "/eventos-personalizados", label: "Eventos Personalizados" },
    { href: "/fiestas-populares", label: "Fiestas Populares" },
    { href: "/magdalena-2026", label: "Magdalena 2026" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <GlitchText className="text-[var(--primary-color)] font-khand font-bold text-2xl md:text-4xl whitespace-nowrap" shadowColor1="var(--complementary-color-yellow)" shadowColor2="#00ffff">
              TOT PER FIRA
            </GlitchText>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-8">
            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-[var(--primary-color)] transition-colors duration-200 font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-3">
              <Link href="/contacto" className="block">
                <Button
                  variant="outline"
                  size="sm"
                >
                  Contactar
                </Button>
              </Link>
              <Link href="/solicitar-presupuesto" className="block">
                <Button
                  size="sm"
                  variant="default"
                >
                  Crear presupuesto
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="xl:hidden flex items-center space-x-3">
            <Link href="/solicitar-presupuesto" className="block">
              <Button
                size="md"
                className="p-2"
                variant="default"
              >
                Presupuesto
              </Button>
            </Link>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <Button
                variant="outline"
                size="md"
                className="p-2"
                onClick={() => setIsOpen(true)}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] bg-white border-l border-gray-200"

              >
                <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                <div className="flex flex-col h-full p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between py-6 border-b border-gray-200">
                    <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                      <span className="text-[var(--primary-color)] font-khand font-bold text-2xl">TOT PER FIRA</span>
                    </Link>
                  </div>

                  {/* Navigation Links */}
                  <div className="flex-1 py-8">
                    <div className="space-y-2">
                      {navigationLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block text-gray-700 hover:text-[var(--primary-color)] transition-all duration-200 font-medium text-lg py-3 px-4 rounded-lg hover:bg-gray-50"
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* CTA Section */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="space-y-3">
                      <Link href="/solicitar-presupuesto" className="block" onClick={() => setIsOpen(false)}>
                        <Button
                          variant="default"
                          className="w-full"
                        >
                          Crear presupuesto
                        </Button>
                      </Link>
                      <Link href="/contacto" className="block" onClick={() => setIsOpen(false)}>
                        <Button
                          variant="outline"
                          className="w-full"
                        >
                          Contactar
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
