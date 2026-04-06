"use client"
import { motion } from "framer-motion"
import { ShieldCheck, Database, Headphones, Sparkles, TrendingUp, CheckCircle2,Users,UserCircle } from "lucide-react"
import Link from "next/link"

export default function WhyChooseUs() {
  const benefits = [
    {
      title: "Government, Private & Deemed Specialists",
      desc: "Expert guidance across Government, Private, and Deemed medical colleges, including Management and NRI quota admissions across India.",
      icon: <Users className="text-yellow-600" />,
    },
    {
      title: "Direct Official Data Sourcing",
      desc: "All data is sourced directly from MCC and State Counselling Authorities, ensuring accurate and reliable information — no guesswork.",
      icon: <Database className="text-emerald-600" />,
    },
    {
      title: "Verified Closing Rank Cutoff Data",
      desc: "Access real closing rank cutoff trends for NEET UG, PG, and MDS based on previous years’ official counselling data.",
      icon: <ShieldCheck className="text-yellow-600" />,
    },
    {
      title: "Personalized Paid Counselling",
      desc: "Get one-on-one expert guidance via WhatsApp and call support to make the right admission decisions.",
      icon: <UserCircle className="text-emerald-600" />,
    },
  ]

  return (
    <section className="w-full py-24 bg-gradient-to-b from-white to-yellow-50/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <div className="space-y-8">
            <div>
              <span className="inline-block px-4 py-1.5 bg-yellow-100 text-yellow-800 text-xs font-bold tracking-widest uppercase rounded-full mb-4">
                What Sets Us Apart
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.1]">
                Your Medical Career, <br />
                <span className="text-yellow-500">Planned with Data.</span>
              </h2>
            </div>

            <div className="space-y-6">
              {benefits.map((item, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ x: 10 }}
                  className="flex gap-5 p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-white border border-gray-100 shadow-sm rounded-xl flex items-center justify-center group-hover:border-yellow-200 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                    <p className="text-gray-500 leading-relaxed mt-1 text-sm md:text-base">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Professional Trust & Accuracy Card */}
          <div className="relative">
            {/* Soft decorative glow */}
            <div className="absolute inset-0 bg-yellow-400 rounded-[3rem] rotate-2 opacity-5 blur-2xl"></div>
            
            <div className="relative bg-white border border-yellow-100 p-10 rounded-[3rem] shadow-[0_30px_60px_rgba(234,179,8,0.12)]">
              <div className="space-y-8">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
                    <TrendingUp size={28} />
                  </div>
                  <div>
                    <p className="text-xs text-emerald-600 font-bold uppercase tracking-widest">Reliability Score</p>
                    <p className="text-3xl font-black text-gray-900 tracking-tight">99.2% Accuracy</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-700 font-semibold text-lg">Comprehensive Data Coverage:</p>
                  <ul className="space-y-3">
                    {['All India Quota (AIQ) 15%', 'State Quota Counselling (85%)', 'Deemed & Central Universities', 'Management & NRI Quota Seats'].map((text, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-600">
                        <CheckCircle2 className="text-yellow-500 w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-medium">{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <Link href="#predict">
                  <button className="w-full py-5 bg-gray-900 text-white rounded-[1.5rem] font-bold hover:bg-yellow-500 transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-yellow-200/50 flex items-center justify-center gap-2">
                    Predict My Chances Now
                  </button>
                  </Link>
                  <p className="text-center text-xs text-gray-400 mt-4 font-medium uppercase tracking-widest">
                    Updated for 2026 Academic Session
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
