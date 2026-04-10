"use client"
import { motion } from "framer-motion";
import { ClipboardList, Search, Edit, MapPin, CheckSquare, BarChart3,BookOpen,Globe,Filter } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    { title: "Select Your Exam", desc: "Choose your exam such as NEET UG, NEET PG, NEET MDS, NEET SS, DNB, or AIAPGET (Ayurveda) to start predicting your college.", icon: <ClipboardList className="text-yellow-600"/> },
    { title: "Enter Your Rank or Marks", desc: "Provide your NEET rank or marks to get accurate college predictions based on your performance.", icon: <Search className="text-emerald-600"/> },
    { title: "Choose Your Course", desc: "Select your preferred course like MBBS, BDS, BAMS, BHMS (NEET UG) or relevant PG courses depending on your exam.", icon: <BookOpen className="text-yellow-600"/> },
    { title: "Select Counselling Type (AIQ or State Quota)", desc: "Choose between All India Quota (AIQ) or State Counselling to see college options based on your eligibility.", icon: <Globe className="text-emerald-600"/> },
    { title: "Apply Category & Quota Filters (UG Only)", desc: "For NEET UG, refine results using category, reservation, and quota filters for more accurate predictions.", icon: <Filter className="text-yellow-600"/> },
    { title: "Get Your Eligible Colleges", desc: "View a list of government, private, and deemed medical colleges based on official closing rank cutoff data (2024 & 2025).", icon: <BarChart3 className="text-emerald-600"/> },
  ];

  return (
    <section id="how-it-works" className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">How Predictor 2026 Works</h2>
        <div className="w-20 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="group relative bg-white/80 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(234,179,8,0.15)] transition-all duration-300"
          >
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-yellow-500 font-bold border border-yellow-500">
              {i + 1}
            </div>
            <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


// "use client"
// import { motion } from "framer-motion";
// import { ClipboardList, Search, BookOpen, Globe, Filter, BarChart3 } from "lucide-react";

// export default function HowItWorks() {
//   const steps = [
//     { title: "Select Your Exam", desc: "Choose your exam such as NEET UG, NEET PG, NEET MDS, NEET SS, DNB, or AIAPGET.", icon: ClipboardList },
//     { title: "Enter Rank / Marks", desc: "Provide your NEET rank or marks for accurate prediction.", icon: Search },
//     { title: "Choose Course", desc: "Select MBBS, BDS, BAMS, BHMS or PG courses.", icon: BookOpen },
//     { title: "Select Counselling", desc: "Choose AIQ or State Quota based on eligibility.", icon: Globe },
//     { title: "Apply Filters", desc: "Filter by category, quota and reservation.", icon: Filter },
//     { title: "Get Colleges", desc: "View eligible colleges based on latest data.", icon: BarChart3 },
//   ];

//   return (
//     <section className="py-12 bg-gradient-to-b from-blue-50 to-white px-6" style={{paddingBottom:"0px"}}>
//       <div className="max-w-6xl mx-auto">

//         {/* Heading */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-blue-900">
//             How Predictor Works
//           </h2>
//           <p className="text-blue-600 mt-2">
//             Simple step-by-step process to find your best college
//           </p>
//         </div>

//         {/* Timeline */}
//         <div className="relative">

//           {/* Line */}
//           <div className="hidden md:block absolute top-10 left-0 right-0 h-1 bg-blue-100"></div>

//           <div className="grid md:grid-cols-6 gap-8 relative z-10">

//             {steps.map((step, i) => {
//               const Icon = step.icon;
//               return (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ delay: i * 0.1 }}
//                   className="text-center group"
//                 >

//                   {/* Circle Icon */}
//                   <div className="w-14 h-14 mx-auto rounded-full bg-white border-2 border-blue-200 flex items-center justify-center shadow-md group-hover:border-blue-500 transition">
//                     <Icon className="text-blue-600 w-6 h-6" />
//                   </div>

//                   {/* Step Number */}
//                   <div className="text-xs text-blue-500 mt-2 font-medium">
//                     Step {i + 1}
//                   </div>

//                   {/* Title */}
//                   <h3 className="text-md font-semibold text-gray-900 mt-2">
//                     {step.title}
//                   </h3>

//                   {/* Description */}
//                   <p className="text-sm text-gray-500 mt-1">
//                     {step.desc}
//                   </p>

//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }