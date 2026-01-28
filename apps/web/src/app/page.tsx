import { Hero } from "./_components/hero"
import { Services } from "./_components/services"
import { Products } from "./_components/products"
import { OurMission } from "./_components/our-mission"
import { CTASection } from "./_components/cta-section"
import FrequentQuestionts from "./_components/faqs"
import { Testimonials } from "./_components/testimonials"


export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="px-2">
        <Hero />
      </div>
      {/* Separator */}
      <hr className="border-gray-300" />
      <div className="px-2">
        <Services />
        <OurMission />
        <Products />
        <Testimonials />
        <CTASection />
        <FrequentQuestionts />
      </div>
    </div>
  )
}