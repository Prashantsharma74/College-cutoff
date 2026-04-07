import { SignInPopup } from "@/components/common/popups/SignInPopup"
import { Container } from "@/components/frontend/Container"
import { FELayout } from "@/components/frontend/FELayout"
import FAQSection from "@/components/frontend/landing-page/FAQSection"
import { Hero } from "@/components/frontend/landing-page/Hero"
import HowItWorks from "@/components/frontend/landing-page/HowItWorks"
import { StatsSection } from "@/components/frontend/landing-page/StatsSection"
import WhyChooseUs from "@/components/frontend/landing-page/WhyChooseUS"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NEET College Predictor 2026 | MBBS, PG, MDS, DNB",
  description:
    // "Use our free NEET 2026 College Predictor to check MBBS, NEET UG, NEET PG, NEET MDS, DNB & AIAPGET colleges based on your marks or rank. Get accurate state quota and government college predictions instantly.",
    "Use collegecutoff.net NEET College Predictor 2026 to check MBBS, BDS, BAMS, PG (MD, MS), MDS, DNB, NEET SS and Ayurveda PG colleges by rank or marks. Get accurate AIQ and State Quota closing ranks with official counselling data.",
  keywords: [
    // "neet college predictor",
    // "neet college predictor 2026",
    // "neet 2026 college predictor based on marks",
    // "neet college predictor based on rank",
    // "neet ug college predictor",
    // "neet pg college predictor",
    // "neet mds college predictor",
    // "aiapget 2026",
    // "dnb diploma",
    // "minimum marks required in neet for mbbs in government college"
    "neet college predictor",
    "college predictor neet",
    "neet college predictor 2026",
    "neet 2026 college predictor",
    "neet 2026 college predictor based on marks",
    "neet college predictor based on rank",
    "neet college predictor on basis of marks",
    "neet 2026 college predictor free",
    "college predictor neet 2026",
    "neet college predictor state quota",
    "mbbs college predictor",
    "neet rank vs college",
    "neet ug college predictor",
    "college predictor neet ug 2026",
    "neet pg college predictor",
    "neet pg 2026 college predictor",
    "neet ug 2026",
    "neet pg 2026",
    "neet mds 2026",
    "neet ss 2025",
    "aiapget 2026",
    "nta aiapget 2026",
    "dnb",
    "dnb diploma",
    "neet mds college predictor",
    "college predictor neet mds",
    "minimum marks required in neet for mbbs in government college",
  ],
};

export default function Home() {
  return (
    <FELayout>
      {/*<div className="py-16 pc:py-20 relative bg-gradient-to-b from-white via-yellow-50 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 min-h-dvh">
        <Container className=" max-w-[1600px]">
          <Hero />
        </Container>
      </div>*/}

      <div className="py-12 pc:py-16 relative bg-gradient-to-b from-white via-yellow-50 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 min-h-dvh overflow-hidden">
        {/* CSS Dot Pattern with Bottom-to-Top Fade */}
        <div 
          className="absolute inset-0 z-0 opacity-60 pointer-events-none dark:opacity-10" 
          style={{ 
            // backgroundImage: 'radial-gradient(#9ca3af 2px, transparent 1.5px)', 
            // backgroundSize: '26px 26px',
            // maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 5%, rgba(0,0,0,0) 85%)',
            // WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 5%, rgba(0,0,0,0) 85%)'
          }}
        ></div>
        
        {/* Increased max width from 1200px to 1400px to reduce empty side space */}
        <Container className="max-w-[1400px] relative z-10 px-2 sm:px-6">
          <Hero />
        </Container>
      </div>

      {/* <Container className="max-w-[1600px]">
        <TrustedBy />
      </Container> */}

      <Container className="max-w-[1600px]">
        <Container className="max-w-[1600px]">
          <HowItWorks />
        </Container>
      </Container>

      <div className="py-16 pc:py-20 relative bg-gradient-to-b from-white via-yellow-50 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <StatsSection />
      </div>

      <div className="py-16 pc:py-20 relative bg-gradient-to-b from-white via-yellow-50 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <Container className="max-w-[1600px]">
          <WhyChooseUs />
        </Container>
      </div>

      {/* <Container className="max-w-[1600px]">
        <TestimonialsSection />
      </Container>

      <div className="py-16 pc:py-20 relative bg-gradient-to-b from-white via-yellow-50 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <Container className="max-w-[1600px]">
          <CtaSection />
        </Container>
      </div> */}

      <Container className="max-w-[1600px]">
        <FAQSection />
      </Container>

      <SignInPopup />
    </FELayout>
  )
}

