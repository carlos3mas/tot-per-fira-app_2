"use client"

import { FireworksBackground } from "@/components/ui/shadcn-io/fireworks-background/fireworks";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function ResponsiveFireworks() {
  const isDesktop = useMediaQuery('(min-width: 1024px)'); // lg breakpoint

  // Configuración dinámica basada en el tamaño de pantalla
  const fireworksConfig = isDesktop 
    ? {
        // Configuración para Desktop - Más intensa
        population: 5,
        color: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff8000", "#8000ff"],
        fireworkSpeed: { min: 3, max: 10 },
        particleSize: { min: 2, max: 6 },
        fireworkSize: { min: 3, max: 8 }
      }
    : {
        // Configuración para Mobile - Menos intensa
        population: 1,
        color: ["#ff0000", "#00ff00", "#0000ff", "#ffff00"],
        fireworkSpeed: { min: 4, max: 8 },
        particleSize: { min: 2, max: 2 },
        fireworkSize: { min: 2, max: 3 }
      };

  return (
    <FireworksBackground
      population={fireworksConfig.population}
      color={fireworksConfig.color}
      fireworkSpeed={fireworksConfig.fireworkSpeed}
      particleSize={fireworksConfig.particleSize}
      fireworkSize={fireworksConfig.fireworkSize}
    />
  );
}
