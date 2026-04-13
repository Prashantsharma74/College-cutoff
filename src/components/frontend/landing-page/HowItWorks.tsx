// "use client"
// import { motion } from "framer-motion";
// import { ClipboardList, Search, Edit, MapPin, CheckSquare, BarChart3,BookOpen,Globe,Filter } from "lucide-react";

// export default function HowItWorks() {
//   const steps = [
//     { title: "Select Your Exam", desc: "Choose your exam such as NEET UG, NEET PG, NEET MDS, NEET SS, DNB, or AIAPGET (Ayurveda) to start predicting your college.", icon: <ClipboardList className="text-yellow-600"/> },
//     { title: "Enter Your Rank or Marks", desc: "Provide your NEET rank or marks to get accurate college predictions based on your performance.", icon: <Search className="text-emerald-600"/> },
//     { title: "Choose Your Course", desc: "Select your preferred course like MBBS, BDS, BAMS, BHMS (NEET UG) or relevant PG courses depending on your exam.", icon: <BookOpen className="text-yellow-600"/> },
//     { title: "Select Counselling Type (AIQ or State Quota)", desc: "Choose between All India Quota (AIQ) or State Counselling to see college options based on your eligibility.", icon: <Globe className="text-emerald-600"/> },
//     { title: "Apply Category & Quota Filters (UG Only)", desc: "For NEET UG, refine results using category, reservation, and quota filters for more accurate predictions.", icon: <Filter className="text-yellow-600"/> },
//     { title: "Get Your Eligible Colleges", desc: "View a list of government, private, and deemed medical colleges based on official closing rank cutoff data (2024 & 2025).", icon: <BarChart3 className="text-emerald-600"/> },
//   ];

//   return (
//     <section id="how-it-works" className="py-20">
//       <div className="text-center mb-16">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-800">How Predictor 2026 Works</h2>
//         <div className="w-20 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
//         {steps.map((step, i) => (
//           <motion.div
//             key={i}
//             whileHover={{ y: -5 }}
//             className="group relative bg-white/80 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(234,179,8,0.15)] transition-all duration-300"
//           >
//             <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-yellow-500 font-bold border border-yellow-500">
//               {i + 1}
//             </div>
//             <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
//               {step.icon}
//             </div>
//             <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
//             <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }

"use client"
import { motion } from "framer-motion";
import { ClipboardList, Search, BookOpen, Globe, Filter, BarChart3 } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Select Your Exam",
      desc: "Choose NEET UG, PG, MDS, SS, DNB or AIAPGET to begin.",
      icon: <ClipboardList />,
    },
    {
      title: "Enter Rank / Marks",
      desc: "Input your NEET rank or marks for accurate prediction.",
      icon: <Search />,
    },
    {
      title: "Choose Course",
      desc: "Select MBBS, BDS, BAMS, BHMS or PG courses.",
      icon: <BookOpen />,
    },
    {
      title: "Select Counselling Type",
      desc: "Choose AIQ or State quota based on eligibility.",
      icon: <Globe />,
    },
    {
      title: "Apply Filters",
      desc: "Refine results with category & quota filters.",
      icon: <Filter />,
    },
    {
      title: "Get Colleges",
      desc: "See eligible colleges based on latest cutoff data.",
      icon: <BarChart3 />,
    },
  ];

  return (
    <section className="relative py-24 px-4 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">

      {/* 🔵 Glow */}
      <div className="absolute top-[-80px] right-[-80px] w-64 h-64 bg-blue-400 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-80px] left-[-80px] w-64 h-64 bg-orange-400 opacity-20 blur-3xl rounded-full"></div>

      {/* Heading */}
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1 text-sm bg-blue-100 text-blue-700 rounded-full mb-4">
          How It Works
        </span>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Simple Steps to Predict Your College
        </h2>

        <p className="text-gray-600 mt-3">
          Follow these steps to get accurate college predictions
        </p>
      </div>

      {/* Steps */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {steps.map((step, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            className="relative bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300"
          >

            {/* Step Number */}
            <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold shadow-md">
              {i + 1}
            </div>

            {/* Icon */}
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              {step.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {step.title}
            </h3>

            {/* Desc */}
            <p className="text-gray-500 text-sm leading-relaxed">
              {step.desc}
            </p>

          </motion.div>
        ))}

      </div>
    </section>
  );
}