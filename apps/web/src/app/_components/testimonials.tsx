import { cn } from "@/lib/utils"
import { Star } from "lucide-react"

interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
  date: string
  profilePhoto?: string
}

// Datos de respaldo en caso de que la API falle
const fallbackTestimonials: Testimonial[] = [
  {
    name: "Alba",
    role: "Reseña de Google",
    content: "He contado con ellos por varios años, para feria, y tienen un trato excelente. Si hay algún problema al momento te buscan solución.",
    rating: 5,
    date: "Hace 2 semanas"
  },
  {
    name: "Carlos Martí Aguado",
    role: "Reseña de Google",
    content: "Muy profesionales! Atentos a todos los problemas y con rápidas soluciones. Un trato espectacular. Muy recomendables",
    rating: 5,
    date: "Hace 2 semanas"
  },
  {
    name: "María Martínez",
    role: "Reseña de Google",
    content: "Llevamos varias fiestas de nuestro pueblo confiando en Tot per Fira y estamos contentas, siempre están atentos para cualquier cosa que necesitamos.",
    rating: 5,
    date: "Hace 2 semanas"
  },
  {
    name: "Laia Chiva",
    role: "Reseña de Google",
    content: "Equipo profesional para facilitar los eventos se encargan de todo el proceso 🌟",
    rating: 5,
    date: "Hace 2 semanas"
  },
  {
    name: "Ismael Gil Vives",
    role: "Reseña de Google",
    content: "Excelente servicio y atención al cliente. Muy recomendable para eventos.",
    rating: 5,
    date: "Hace 2 semanas"
  },
  {
    name: "Manuela Navarro",
    role: "Reseña de Google",
    content: "Muy contentos con el servicio. Profesionales y atentos en todo momento.",
    rating: 5,
    date: "Hace 2 semanas"
  }
]

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="relative flex flex-col gap-4 border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]">
      {/* Rating */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < testimonial.rating
                ? "fill-[var(--primary-color)] text-[var(--primary-color)]"
                : "fill-gray-200 text-gray-200"
            )}
          />
        ))}
      </div>

      {/* Content */}
      <p className="font-khand text-lg leading-relaxed text-gray-700">
        "{testimonial.content}"
      </p>

      {/* Author */}
      <div className="mt-auto border-t-2 border-black pt-4">
        <p className="font-clash-display font-semibold text-black">
          {testimonial.name}
        </p>
        <p className="font-khand text-sm text-gray-600">{testimonial.role}</p>
        <p className="font-khand text-xs text-gray-400 mt-1">{testimonial.date}</p>
      </div>
    </div>
  )
}

function MarqueeRow({
  testimonials,
  reverse = false,
  speed = 40
}: {
  testimonials: Testimonial[]
  reverse?: boolean
  speed?: number
}) {
  // Duplicate testimonials exactly twice for seamless infinite scroll
  // The animation will reset when the first set completes, creating a perfect loop
  const duplicatedTestimonials = [...testimonials, ...testimonials]
  
  return (
    <div className="relative w-full overflow-hidden py-4">
      <div
        className="flex gap-4 will-change-transform"
        style={{
          animation: reverse ? `marquee-reverse ${speed}s linear infinite` : `marquee ${speed}s linear infinite`,
          width: 'max-content'
        }}
      >
        {duplicatedTestimonials.map((testimonial, idx) => (
          <div key={idx} className="w-[350px] flex-shrink-0">
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>
    </div>
  )
}

async function fetchGoogleReviews(): Promise<Testimonial[]> {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY
    const placeId = process.env.GOOGLE_PLACE_ID

    if (!apiKey || !placeId) {
      console.warn('Google Places API credentials not found, using fallback reviews')
      return fallbackTestimonials
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}&language=es`
    
    const response = await fetch(url, {
      next: { revalidate: 3600 } // Cache por 1 hora
    })

    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.status !== 'OK') {
      throw new Error(`Google API status: ${data.status}`)
    }

    // Transformar las reseñas al formato del componente
    const reviews = data.result?.reviews?.map((review: any) => ({
      name: review.author_name,
      role: 'Reseña de Google',
      content: review.text,
      rating: review.rating,
      date: review.relative_time_description,
      profilePhoto: review.profile_photo_url
    })) || []

    return reviews.length > 0 ? reviews : fallbackTestimonials
  } catch (error) {
    console.error('Error fetching Google reviews, using fallback:', error)
    return fallbackTestimonials
  }
}

export async function Testimonials() {
  const testimonials = await fetchGoogleReviews()
  
  return (
    <section className="relative overflow-hidden border border-b-0 border-t-0 border-gray-300 container mx-auto">
      <div className="container mx-auto">
        {/* Header */}
        <div className="p-4 border-b border-gray-300 text-center bg-[var(--complementary-color-green)]/10">
          <h2 className="text-4xl md:text-8xl font-bold font-khand text-[var(--primary-color)]">
            ¿QUÉ DICEN NUESTROS CLIENTES?
          </h2>
        </div>
        
        {/* Marquee Container */}
        <div className="py-8 md:py-12">
          <p className="font-khand text-center mb-8 text-xl text-gray-600 md:text-2xl">
            Cientos de clientes satisfechos confían en nosotros
          </p>

          {/* Marquee Grid - Single row */}
          <div className="relative flex flex-col gap-4 mb-12">
            <MarqueeRow testimonials={testimonials} speed={180} />
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <a
              href="https://www.google.com/search?q=TOT+PER+FIRA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-black bg-[var(--primary-color)] px-8 py-4 font-clash-display text-lg font-semibold text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
            >
              Ver más reseñas en Google
              <Star className="h-5 w-5 fill-white" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
} 