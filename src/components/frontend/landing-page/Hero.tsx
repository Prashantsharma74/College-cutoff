import { Check, Search, Lock } from "lucide-react"
import React from "react"
import Link from "next/link"

import { CollegePredictorTest } from "../college-predictor/CollegePredictorTest"
import { Poppins, Roboto } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});


export function Hero() {
  return (
    <section id="predict" className="grid pc:grid-cols-[50%_50%] gap-6 lg:gap-12 pt-4 pb-12 pc:pt-8 relative w-full -mt-16 sm:-mt-0">
      {/* LEFT SIDE CONTENT */}
      <div className="flex flex-col justify-center items-start w-full text-left px-5 sm:px-0">
        <div className="space-y-2 sm:space-y-6 w-full max-w-[650px]">



          {/* <span className="inline-block bg-gradient-to-r from-[#ffedd5] to-transparent text-[#0A5092] text-xs sm:text-sm font-medium pl-4 pr-8 py-[6px] rounded-full">
            India’s Most Accurate NEET College Predictor
          </span>

          <h1 className="text-[26px] sm:text-[40px] md:text-[46px] lg:text-[50px] font-semibold sm:font-extrabold leading-[1.15] text-[#0A5092] tracking-tight -mt-10 sm:mt-0">
            Check Which Medical{" "}
            <br className="hidden sm:block" />
            Colleges You Can Get
          </h1>

          <p className="text-[14px] sm:text-[18px] text-gray-700">
            Find Your{" "}
            <span className="font-semibold text-[#f97316]">
              NEET 2026 College
            </span>{" "}
            Based on Official Closing Ranks
          </p>


          <div className={`space-y-1 sm:space-y-3 pt-0 sm:pt-2 ${poppins.className}`}>
            {[
              "Based on official 2025 cutoffs",
              "Covers All India & State Quotas",
              "Includes Govt & Private Colleges",
              "Shows last 2 years trends",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <Check
                  className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] text-orange-500"
                  strokeWidth={3}
                />
                <span className=" text-[13px] sm:text-[16px] md:text-[17px] text-gray-700 font-normal">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-[#e1effe] to-transparent rounded-full pl-4 pr-8 sm:pl-5 sm:pr-10 py-2.5 w-fit">
            <Search className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] text-[#244B78]" />
            <span className="text-[10px] sm:text-[14px] md:text-[15px] font-semibold text-gray-700">
              12,000+ Students<span className="font-normal"> Already Checked Their Chances</span>
            </span>
          </div> */}

          <div className="space-y-6 max-w-[620px]">

            {/* 🔵 Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs sm:text-sm font-medium bg-blue-100 text-blue-700 rounded-full shadow-sm">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              India’s Most Accurate NEET Predictor
            </span>

            {/* 🔥 Heading */}
            <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              Check Which Medical
              <br className="hidden sm:block" />
              Colleges You Can Get
            </h1>

            {/* ✨ Subheading */}
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Find your{" "}
              <span className="font-semibold text-blue-600">
                NEET 2026 college
              </span>{" "}
              using official closing rank data from AIQ & State counselling.
            </p>

            {/* ✅ Features */}
            <div className="space-y-3 pt-2">
              {[
                "Based on official 2025 cutoff data",
                "Covers AIQ & State Quota",
                "Includes Govt & Private Colleges",
                "Shows last 2 years trends",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">

                  {/* Icon */}
                  <div className="w-5 h-5 flex items-center justify-center rounded-full bg-orange-100 text-orange-500">
                    ✓
                  </div>

                  {/* Text */}
                  <span className="text-gray-700 text-sm sm:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* 📊 Trust Strip */}
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-blue-50 w-fit border border-blue-100">

              <Search className="w-4 h-4 text-blue-600" />

              <span className="text-sm text-gray-700">
                <span className="font-semibold text-blue-600">12,000+</span>{" "}
                students already checked their chances
              </span>

            </div>

          </div>

          {/* <div className="pc:hidden mt-6 mb-8 w-full">
            <CollegePredictorTest />
          </div> */}

          {/* <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-white/50 p-5 w-full sm:w-[600px] relative mt-4 pc:mt-8">
            <div className="grid grid-cols-5 text-[11px] md:text-[14px] font-bold text-gray-500 border-b border-gray-200 pb-3">
              <span className="text-center">College Name <span className="text-gray-400 font-normal">↕</span></span>
              <span className="text-center">Course</span>
              <span className="text-center">Quota</span>
              <span className="text-center">Closing Rank/ Marks R1 2025</span>
              <span className="text-center">Closing Rank/ Marks R1 2024</span>
            </div>

            <div className="space-y-4 mt-4">
              {[
                { clg: "AIIMS, New Delhi", course: "MBBS", quota: "Open", rank1: "48/657", rank2: "57/500" },
                { clg: "AIIMS, Bhopal", course: "MBBS", quota: "Open", rank1: "98/618", rank2: "277/450" },
                { clg: "AIIMS, Patna", course: "MBBS", quota: "Open", rank1: "86/598", rank2: "607/440" },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-5 items-center">
                  <span className="text-center text-[14px] sm:text-[15px] text-gray-700 font-medium">
                    {row.clg}
                  </span>
                  <span className="text-center text-[14px] sm:text-[15px] text-gray-700 font-medium">
                    {row.course}
                  </span>
                  <span className="text-center text-[14px] sm:text-[15px] text-gray-700 font-medium">
                    {row.quota}
                  </span>
                  <span className="text-center text-[14px] sm:text-[15px] text-gray-700 font-medium">
                    {row.rank1}
                  </span>
                  <span className="text-center text-[14px] sm:text-[15px] text-gray-700 font-medium">
                    {row.rank2}
                  </span>
                </div>
              ))}
            </div>

            <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2">
              <Link href="#how-it-works">
                <button className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white text-[14px] md:text-[15px] font-semibold px-8 py-[10px] rounded-md shadow-lg hover:opacity-95 transition whitespace-nowrap">
                  See How it Works ›
                </button>
              </Link>
            </div>
          </div> */}
          <div className="relative w-full max-w-[650px] mt-8">

            {/* Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">

              {/* Header */}
              <div className="grid grid-cols-5 bg-blue-50 text-xs sm:text-sm font-semibold text-gray-600 px-4 py-3">
                <span className="text-center">College Name <span className="text-gray-400 font-normal">↕</span></span>
                <span className="text-center">Course</span>
                <span className="text-center">Quota</span>
                <span className="text-center">Closing Rank/ Marks R1 2025</span>
                <span className="text-center">Closing Rank/ Marks R1 2024</span>
              </div>

              {/* Rows */}
              <div className="divide-y">
                {[
                  { clg: "AIIMS, New Delhi", course: "MBBS", quota: "Open", rank1: "48/657", rank2: "57/500" },
                  { clg: "AIIMS, Bhopal", course: "MBBS", quota: "Open", rank1: "98/618", rank2: "277/450" },
                  { clg: "AIIMS, Patna", course: "MBBS", quota: "Open", rank1: "86/598", rank2: "607/440" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-5 items-center px-4 py-3 text-sm hover:bg-blue-50 transition"
                  >
                    <span className="font-medium text-gray-800">
                      {row.clg}
                    </span>

                    <span className="text-center text-gray-600">
                      {row.course}
                    </span>

                    <span className="text-center text-gray-600">
                      {row.quota}
                    </span>

                    <span className="text-center font-semibold text-blue-600">
                      {row.rank1}
                    </span>

                    <span className="text-center text-orange-500">
                      {row.rank2}
                    </span>
                  </div>
                ))}
              </div>

            </div>

            {/* CTA */}
            <div className="flex justify-center mt-5">
              <Link href="#how-it-works">
                <button className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow-md hover:bg-blue-700 transition">
                  See How It Works →
                </button>
              </Link>
            </div>

          </div>
        </div>
      </div>

      <div className="hidden pc:flex justify-end items-center w-full">
        <CollegePredictorTest />
      </div>
    </section>

  )
}
