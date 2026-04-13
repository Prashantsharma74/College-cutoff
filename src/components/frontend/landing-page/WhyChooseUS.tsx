// // "use client"
// // import { motion } from "framer-motion"
// // import { ShieldCheck, Database, Headphones, Sparkles, TrendingUp, CheckCircle2,Users,UserCircle } from "lucide-react"
// // import Link from "next/link"

// // export default function WhyChooseUs() {
// //   const benefits = [
// //     {
// //       title: "Government, Private & Deemed Specialists",
// //       desc: "Expert guidance across Government, Private, and Deemed medical colleges, including Management and NRI quota admissions across India.",
// //       icon: <Users className="text-yellow-600" />,
// //     },
// //     {
// //       title: "Direct Official Data Sourcing",
// //       desc: "All data is sourced directly from MCC and State Counselling Authorities, ensuring accurate and reliable information — no guesswork.",
// //       icon: <Database className="text-emerald-600" />,
// //     },
// //     {
// //       title: "Verified Closing Rank Cutoff Data",
// //       desc: "Access real closing rank cutoff trends for NEET UG, PG, and MDS based on previous years’ official counselling data.",
// //       icon: <ShieldCheck className="text-yellow-600" />,
// //     },
// //     {
// //       title: "Personalized Paid Counselling",
// //       desc: "Get one-on-one expert guidance via WhatsApp and call support to make the right admission decisions.",
// //       icon: <UserCircle className="text-emerald-600" />,
// //     },
// //   ]

// //   return (
// //     <section className="w-full py-24 bg-gradient-to-b from-white to-yellow-50/30">
// //       <div className="max-w-7xl mx-auto px-6">
// //         <div className="grid lg:grid-cols-2 gap-16 items-center">
          
// //           {/* Left Side: Content */}
// //           <div className="space-y-8">
// //             <div>
// //               <span className="inline-block px-4 py-1.5 bg-yellow-100 text-yellow-800 text-xs font-bold tracking-widest uppercase rounded-full mb-4">
// //                 What Sets Us Apart
// //               </span>
// //               <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.1]">
// //                 Your Medical Career, <br />
// //                 <span className="text-yellow-500">Planned with Data.</span>
// //               </h2>
// //             </div>

// //             <div className="space-y-6">
// //               {benefits.map((item, index) => (
// //                 <motion.div 
// //                   key={index}
// //                   whileHover={{ x: 10 }}
// //                   className="flex gap-5 p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all group"
// //                 >
// //                   <div className="flex-shrink-0 w-12 h-12 bg-white border border-gray-100 shadow-sm rounded-xl flex items-center justify-center group-hover:border-yellow-200 transition-colors">
// //                     {item.icon}
// //                   </div>
// //                   <div>
// //                     <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
// //                     <p className="text-gray-500 leading-relaxed mt-1 text-sm md:text-base">{item.desc}</p>
// //                   </div>
// //                 </motion.div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Right Side: Professional Trust & Accuracy Card */}
// //           <div className="relative">
// //             {/* Soft decorative glow */}
// //             <div className="absolute inset-0 bg-yellow-400 rounded-[3rem] rotate-2 opacity-5 blur-2xl"></div>
            
// //             <div className="relative bg-white border border-yellow-100 p-10 rounded-[3rem] shadow-[0_30px_60px_rgba(234,179,8,0.12)]">
// //               <div className="space-y-8">
// //                 <div className="flex items-center gap-5">
// //                   <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
// //                     <TrendingUp size={28} />
// //                   </div>
// //                   <div>
// //                     <p className="text-xs text-emerald-600 font-bold uppercase tracking-widest">Reliability Score</p>
// //                     <p className="text-3xl font-black text-gray-900 tracking-tight">99.2% Accuracy</p>
// //                   </div>
// //                 </div>

// //                 <div className="space-y-4">
// //                   <p className="text-gray-700 font-semibold text-lg">Comprehensive Data Coverage:</p>
// //                   <ul className="space-y-3">
// //                     {['All India Quota (AIQ) 15%', 'State Quota Counselling (85%)', 'Deemed & Central Universities', 'Management & NRI Quota Seats'].map((text, idx) => (
// //                       <li key={idx} className="flex items-center gap-3 text-gray-600">
// //                         <CheckCircle2 className="text-yellow-500 w-5 h-5 flex-shrink-0" />
// //                         <span className="text-sm font-medium">{text}</span>
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 </div>

// //                 <div className="pt-4">
// //                   <Link href="#predict">
// //                   <button className="w-full py-5 bg-gray-900 text-white rounded-[1.5rem] font-bold hover:bg-yellow-500 transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-yellow-200/50 flex items-center justify-center gap-2">
// //                     Predict My Chances Now
// //                   </button>
// //                   </Link>
// //                   <p className="text-center text-xs text-gray-400 mt-4 font-medium uppercase tracking-widest">
// //                     Updated for 2026 Academic Session
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //         </div>
// //       </div>
// //     </section>
// //   )
// // }

// "use client"
// import { motion } from "framer-motion"
// import { ShieldCheck, Database, TrendingUp, CheckCircle2, Users, UserCircle } from "lucide-react"
// import Link from "next/link"

// export default function WhyChooseUs() {
//   const benefits = [
//     {
//       title: "Government, Private & Deemed Specialists",
//       desc: "Expert guidance across Government, Private, and Deemed colleges including Management & NRI quotas.",
//       icon: <Users className="text-blue-600" />,
//     },
//     {
//       title: "Direct Official Data Sourcing",
//       desc: "Data sourced from MCC & State Counselling Authorities for maximum accuracy.",
//       icon: <Database className="text-blue-600" />,
//     },
//     {
//       title: "Verified Closing Rank Data",
//       desc: "Access real closing rank trends for NEET UG, PG, and MDS.",
//       icon: <ShieldCheck className="text-blue-600" />,
//     },
//     {
//       title: "Personalized Counselling",
//       desc: "One-on-one expert guidance via WhatsApp & call support.",
//       icon: <UserCircle className="text-blue-600" />,
//     },
//   ]

//   return (
//     <section className="w-full py-24 bg-gradient-to-br from-blue-50 via-white to-blue-100">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="grid lg:grid-cols-2 gap-16 items-center">

//           {/* LEFT */}
//           <div className="space-y-10">
//             <div>
//               <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-4">
//                 Why Choose Us
//               </span>

//               <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
//                 Smart Decisions,
//                 <br />
//                 <span className="text-blue-600">Backed by Data</span>
//               </h2>
//             </div>

//             <div className="space-y-5">
//               {benefits.map((item, index) => (
//                 <motion.div
//                   key={index}
//                   whileHover={{ x: 6 }}
//                   className="flex gap-4 p-5 rounded-2xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
//                 >
//                   <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
//                     {item.icon}
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800">
//                       {item.title}
//                     </h3>
//                     <p className="text-gray-500 text-sm mt-1">
//                       {item.desc}
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           {/* RIGHT CARD */}
//           <div className="relative">

//             {/* Glow */}
//             <div className="absolute inset-0 bg-blue-400 opacity-10 blur-3xl rounded-3xl"></div>

//             <div className="relative bg-white border border-blue-100 p-10 rounded-3xl shadow-xl">

//               {/* Accuracy */}
//               <div className="flex items-center gap-4 mb-8">
//                 <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
//                   <TrendingUp size={26} />
//                 </div>

//                 <div>
//                   <p className="text-xs text-blue-600 font-semibold uppercase">
//                     Reliability Score
//                   </p>
//                   <p className="text-3xl font-bold text-gray-900">
//                     99.2% Accuracy
//                   </p>
//                 </div>
//               </div>

//               {/* List */}
//               <div className="space-y-3 mb-8">
//                 {[
//                   "All India Quota (AIQ)",
//                   "State Counselling",
//                   "Deemed Universities",
//                   "Management & NRI Quota"
//                 ].map((text, idx) => (
//                   <div key={idx} className="flex items-center gap-3 text-gray-600">
//                     <CheckCircle2 className="text-orange-500 w-5 h-5" />
//                     <span className="text-sm font-medium">{text}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* CTA */}
//               <Link href="#predict">
//                 <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
//                   Predict My Chances
//                 </button>
//               </Link>

//               <p className="text-center text-xs text-gray-400 mt-4">
//                 Updated for 2026 Session
//               </p>

//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   )
// }


"use client"
import { motion } from "framer-motion"
import { ShieldCheck, Database, TrendingUp, CheckCircle2, Users, UserCircle } from "lucide-react"
import Link from "next/link"

export default function WhyChooseUs() {
  const benefits = [
    {
      title: "All College Types Covered",
      desc: "Government, Private & Deemed colleges including Management & NRI quotas.",
      icon: <Users />,
    },
    {
      title: "Official Verified Data",
      desc: "Directly sourced from MCC & State counselling authorities.",
      icon: <Database />,
    },
    {
      title: "Real Closing Rank Trends",
      desc: "Accurate past data for UG, PG & MDS counselling.",
      icon: <ShieldCheck />,
    },
    {
      title: "1-on-1 Expert Guidance",
      desc: "Personal counselling via WhatsApp & call support.",
      icon: <UserCircle />,
    },
  ]

  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">

      {/* 🔥 Background Glow */}
      {/* <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-blue-400 opacity-20 blur-3xl rounded-full"></div> */}
      {/* <div className="absolute bottom-[-120px] left-[-120px] w-[300px] h-[300px] bg-orange-400 opacity-20 blur-3xl rounded-full"></div> */}

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-10">

          <div>
            <span className="inline-block px-4 py-1 text-sm bg-blue-100 text-blue-700 rounded-full mb-4">
              Why Students Trust Us
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Data Driven
              <br />
              <span className="text-blue-600">College Decisions</span>
            </h2>

            <p className="text-gray-600 mt-4 max-w-md">
              Make smarter admission choices with accurate data, expert insights, and personalized guidance.
            </p>
          </div>

          {/* BENEFITS */}
          <div className="grid sm:grid-cols-2 gap-5">
            {benefits.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:border-orange-600 transition-all"
              >
                {/* <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 mb-3"> */}
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-blue-50 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
                  {item.icon}
                </div>

                <h3 className="font-semibold text-gray-800 text-sm mb-1">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-xs">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

        {/* RIGHT SIDE - FEATURE CARD */}
        <div className="relative">

          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 md:p-10 relative overflow-hidden">

            {/* Gradient border glow */}
            {/* <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-blue-400 to-orange-400 opacity-20 rounded-3xl"></div> */}

            {/* Content */}
            <div className="relative z-10">

              {/* Accuracy */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <TrendingUp size={26} />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Reliability Score</p>
                  <p className="text-3xl font-bold text-gray-900">
                    99.2%
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-200 mb-6"></div>

              {/* List */}
              <div className="space-y-3 mb-8">
                {[
                  "AIQ & State Counselling",
                  "Deemed Universities",
                  "Management & NRI Seats",
                  "Latest 2025 Data"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle2 className="text-orange-500 w-5 h-5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link href="#predict">
                <button className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-blue-300/40">
                  Predict My Chances 🚀
                </button>
              </Link>

              <p className="text-center text-xs text-gray-400 mt-4">
                Updated for 2026 Counselling
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}