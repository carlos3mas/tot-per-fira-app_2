import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Outfit, Montserrat } from "next/font/google";
import "../index.css";
import Providers from "@/components/providers";
import { Navbar } from "@/components/navbar";
import localFont from "next/font/local";
import { ConditionalFooter } from "@/components/conditional-footer";
import { unstable_ViewTransition as ViewTransition } from 'react'
import { structuredData } from "@/lib/structured-data";
import CookieBanner from "@/components/analytics/cookie-banner";
import ConditionalGoogleAnalytics from "@/components/analytics/conditional-google-analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const clashDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/ClashDisplay-Extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashDisplay-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashDisplay-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashDisplay-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-clash-display",
});

const khand = localFont({
  src: [
    {
      path: "../../public/fonts/Khand-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Khand-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Khand-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Khand-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Khand-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Khand-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-khand",
});

export const metadata: Metadata = {
  title: {
    default: "Tot Per Fira | Sonido, bebidas y eventos en Onda, Castellón",
    template: "%s | Tot Per Fira"
  },
  description: "Alquiler de equipos de sonido, congeladores y bebidas en Onda, Castellón. Más de 10 años organizando eventos, fiestas y peñas con servicio profesional.",
  keywords: [
    "alquiler sonido Onda",
    "equipos música fiestas Castellón",
    "organización eventos Onda",
    "congeladores alquiler",
    "botelleros fiestas",
    "grifos cerveza",
    "barras eventos",
    "peñas Castellón",
    "fiestas populares",
    "sonido profesional",
    "eventos Betxí",
    "celebraciones Vila-Real",
    "material fiestas",
    "hielo eventos",
    "montaje desmontaje",
    "personal barra",
    "Tot Per Fira",
    "alquiler equipos de sonido",
    "alquiler congeladores",
    "venta de bebidas",
    "Fira d'Onda",
    "Feria de Onda"
  ],
  authors: [{ name: "Tot Per Fira" }],
  creator: "Tot Per Fira",
  publisher: "Tot Per Fira",
  metadataBase: new URL("https://totperfira.es"),
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://totperfira.es",
    title: "Tot Per Fira | Sonido y bebidas para fiestas en Castellón",
    description: "Soluciones para fiestas y eventos: sonido, congeladores, bebidas y personal en Onda y Castellón. Servicio profesional con más de 10 años de experiencia.",
    siteName: "Tot Per Fira",
    images: [
      {
        url: "/images/LOGO_Cuadrado_fondo_azul.jpg",
        width: 1200,
        height: 630,
        alt: "Tot Per Fira - Equipos de sonido, congeladores y bebidas en Onda, Castellón",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tot Per Fira | Sonido y bebidas para fiestas en Castellón",
    description: "Alquiler de sonido, congeladores y bebidas para fiestas en Onda y Castellón. Organización profesional de eventos y peñas.",
    images: ["/images/LOGO_Cuadrado_fondo_azul.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: "Servicios de Eventos",
  classification: "Alquiler de Equipos y Organización de Eventos",
  other: {
    "geo.region": "ES-VC",
    "geo.placename": "Onda, Castellón",
    "geo.position": "39.9687;-0.2625",
    "ICBM": "39.9687, -0.2625",
    "business:contact_data:locality": "Onda",
    "business:contact_data:region": "Castellón",
    "business:contact_data:country_name": "España",
  },
}


export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="light">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${montserrat.variable} ${clashDisplay.variable} ${khand.variable} antialiased scroll-smooth`}
      >
        <Providers>
          <ViewTransition>
            <div className="min-h-screen">
              <Navbar />
              <main>

                {children}
                <CookieBanner />
              </main>
              <ConditionalFooter />
            </div>
            <ConditionalGoogleAnalytics />
          </ViewTransition>
        </Providers>
      </body>
    </html>
  );
}
