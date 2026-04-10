// // "use client"
// // import { useState } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { ChevronDown } from "lucide-react";



// // export default function FAQSection() {
// //   const faqs = [
// //   {
// //     question: "What is NEET College Predictor and how does it work?",
// //     answer: `The NEET College Predictor on collegecutoff.net is a tool that analyzes previous years’ closing rank cutoff data to estimate your admission chances. You simply enter your rank or marks, and the tool matches it with official counselling data to show a list of Government, Private, and Deemed colleges under All India and State quotas.`
// //   },
// //   {
// //     question: "Can I use NEET College Predictor based on rank or marks?",
// //     answer: `Yes, on collegecutoff.net, you can use the predictor based on your NEET rank or marks. Rank-based prediction is generally more accurate since counselling results are released in ranks, while marks-based prediction provides a close estimate.`
// //   },
// //   {
// //     question: "Does it include Government, Private and Deemed colleges?",
// //     answer: `Yes, the predictor on collegecutoff.net covers Government, Private, and Deemed medical colleges across India. It also includes options under Management and NRI quotas wherever applicable.`
// //   },
// //   {
// //     question: "Does this predictor include All India Quota and State Quota?",
// //     answer: `Yes, collegecutoff.net includes both All India Quota (AIQ) and State Quota counselling. You can filter colleges based on your eligibility and domicile for better accuracy.`
// //   },
// //   {
// //     question: "Which courses are covered in the predictor?",
// //     answer: `The predictor on collegecutoff.net supports multiple courses including MBBS, BDS, BAMS, BHMS, MD/MS, MDS, DNB, and Ayurveda PG (AIAPGET), depending on the exam selected.`
// //   },
// //   {
// //     question: "Which year cutoff data is used for prediction?",
// //     answer: `The prediction on collegecutoff.net is based on latest official counselling data, including recent years’ closing rank cutoffs (such as 2024 and 2025) to provide realistic results.`
// //   },
// //   {
// //     question: "How accurate is the NEET College Predictor?",
// //     answer: `The predictor on collegecutoff.net uses official data from MCC and state counselling authorities, making it highly reliable. However, final allotment may vary based on seat availability, category, quota, and counselling rounds.`
// //   },
// //   {
// //     question: "Do you provide counselling support after prediction?",
// //     answer: `Yes, collegecutoff.net offers personalized counselling support to help you choose the right college, understand quota options, and make informed admission decisions.`
// //   },
// // ]
// //   const [active, setActive] = useState<number | null>(0);

// //   return (
// //     <section className="py-24 px-6 sm:px-40">
// //       <div className="text-center mb-16">
// //         <h2 className="text-3xl font-bold tracking-tight text-gray-900">Common Questions</h2>
// //       </div>

// //       <div className="space-y-4">
// //         {faqs.map((faq, i) => (
// //           <div key={i} className="border-b border-gray-100">
// //             <button 
// //               onClick={() => setActive(active === i ? null : i)}
// //               className="w-full flex items-center justify-between py-6 text-left"
// //             >
// //               <span className={`text-lg font-semibold transition-colors ${active === i ? 'text-yellow-600' : 'text-gray-900'}`}>
// //                 {faq.question}
// //               </span>
// //               <motion.div animate={{ rotate: active === i ? 180 : 0 }}>
// //                 <ChevronDown className="w-5 h-5 text-gray-400" />
// //               </motion.div>
// //             </button>
// //             <AnimatePresence>
// //               {active === i && (
// //                 <motion.div
// //                   initial={{ height: 0, opacity: 0 }}
// //                   animate={{ height: "auto", opacity: 1 }}
// //                   exit={{ height: 0, opacity: 0 }}
// //                   className="overflow-hidden"
// //                 >
// //                   <p className="pb-6 text-gray-600 leading-relaxed">{faq.answer}</p>
// //                 </motion.div>
// //               )}
// //             </AnimatePresence>
// //           </div>
// //         ))}
// //       </div>
// //     </section>
// //   );
// // }

"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const faqs = [
    {
      question: "What is NEET College Predictor and how does it work?",
      answer: `The NEET College Predictor on collegecutoff.net is a tool that analyzes previous years’ closing rank cutoff data to estimate your admission chances. You simply enter your rank or marks, and the tool matches it with official counselling data to show a list of Government, Private, and Deemed colleges under All India and State quotas.`
    },
    {
      question: "Can I use NEET College Predictor based on rank or marks?",
      answer: `Yes, on collegecutoff.net, you can use the predictor based on your NEET rank or marks. Rank-based prediction is generally more accurate since counselling results are released in ranks, while marks-based prediction provides a close estimate.`
    },
    {
      question: "Does it include Government, Private and Deemed colleges?",
      answer: `Yes, the predictor on collegecutoff.net covers Government, Private, and Deemed medical colleges across India. It also includes options under Management and NRI quotas wherever applicable.`
    },
    {
      question: "Does this predictor include All India Quota and State Quota?",
      answer: `Yes, collegecutoff.net includes both All India Quota (AIQ) and State Quota counselling. You can filter colleges based on your eligibility and domicile for better accuracy.`
    },
    {
      question: "Which courses are covered in the predictor?",
      answer: `The predictor on collegecutoff.net supports multiple courses including MBBS, BDS, BAMS, BHMS, MD/MS, MDS, DNB, and Ayurveda PG (AIAPGET), depending on the exam selected.`
    },
    {
      question: "Which year cutoff data is used for prediction?",
      answer: `The prediction on collegecutoff.net is based on latest official counselling data, including recent years’ closing rank cutoffs (such as 2024 and 2025) to provide realistic results.`
    },
    {
      question: "How accurate is the NEET College Predictor?",
      answer: `The predictor on collegecutoff.net uses official data from MCC and state counselling authorities, making it highly reliable. However, final allotment may vary based on seat availability, category, quota, and counselling rounds.`
    },
    {
      question: "Do you provide counselling support after prediction?",
      answer: `Yes, collegecutoff.net offers personalized counselling support to help you choose the right college, understand quota options, and make informed admission decisions.`
    },
  ]

  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 sm:px-20 bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-blue-600/80">
            Everything you need to know about NEET College Predictor
          </p>
        </div>

        {/* FAQ Cards */}
        <div className="space-y-5">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-2xl border transition-all duration-300 ${active === i
                  ? "bg-white shadow-xl border-blue-500"
                  : "bg-white border-blue-100 hover:shadow-md"
                }`}
            >
              <button
                onClick={() => setActive(active === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span
                  className={`text-lg font-semibold ${active === i ? "text-blue-700" : "text-gray-900"
                    }`}
                >
                  {faq.question}
                </span>

                <motion.div
                  animate={{ rotate: active === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-2 rounded-full ${active === i
                      ? "bg-blue-100"
                      : "bg-blue-50"
                    }`}
                >
                  <ChevronDown className="w-5 h-5 text-blue-600" />
                </motion.div>
              </button>

              <AnimatePresence>
                {active === i && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="px-6 pb-6"
                  >
                    <div className="h-px bg-blue-100 mb-4" />
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// "use client"
// import { useState } from "react";
// import { motion } from "framer-motion";

// export default function FAQSection() {
//   const faqs = [
//     {
//       question: "What is NEET College Predictor and how does it work?",
//       answer: `The NEET College Predictor on collegecutoff.net is a tool that analyzes previous years’ closing rank cutoff data to estimate your admission chances. You simply enter your rank or marks, and the tool matches it with official counselling data to show a list of Government, Private, and Deemed colleges under All India and State quotas.`
//     },
//     {
//       question: "Can I use NEET College Predictor based on rank or marks?",
//       answer: `Yes, on collegecutoff.net, you can use the predictor based on your NEET rank or marks. Rank-based prediction is generally more accurate since counselling results are released in ranks, while marks-based prediction provides a close estimate.`
//     },
//     {
//       question: "Does it include Government, Private and Deemed colleges?",
//       answer: `Yes, the predictor on collegecutoff.net covers Government, Private, and Deemed medical colleges across India. It also includes options under Management and NRI quotas wherever applicable.`
//     },
//     {
//       question: "Does this predictor include All India Quota and State Quota?",
//       answer: `Yes, collegecutoff.net includes both All India Quota (AIQ) and State Quota counselling. You can filter colleges based on your eligibility and domicile for better accuracy.`
//     },
//     {
//       question: "Which courses are covered in the predictor?",
//       answer: `The predictor on collegecutoff.net supports multiple courses including MBBS, BDS, BAMS, BHMS, MD/MS, MDS, DNB, and Ayurveda PG (AIAPGET), depending on the exam selected.`
//     },
//     {
//       question: "Which year cutoff data is used for prediction?",
//       answer: `The prediction on collegecutoff.net is based on latest official counselling data, including recent years’ closing rank cutoffs (such as 2024 and 2025) to provide realistic results.`
//     },
//     {
//       question: "How accurate is the NEET College Predictor?",
//       answer: `The predictor on collegecutoff.net uses official data from MCC and state counselling authorities, making it highly reliable. However, final allotment may vary based on seat availability, category, quota, and counselling rounds.`
//     },
//     {
//       question: "Do you provide counselling support after prediction?",
//       answer: `Yes, collegecutoff.net offers personalized counselling support to help you choose the right college, understand quota options, and make informed admission decisions.`
//     },
//   ]

//   const [active, setActive] = useState(0);

//   return (
//     <section className="py-24 px-6 sm:px-20 bg-gradient-to-b from-blue-50 to-white">
//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

//         {/* LEFT SIDE (Questions list) */}
//         <div className="space-y-3">
//           <h2 className="text-3xl font-bold text-blue-900 mb-6">
//             FAQs
//           </h2>

//           {faqs.map((faq, i) => (
//             <button
//               key={i}
//               onClick={() => setActive(i)}
//               className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-300 border ${active === i
//                   ? "bg-blue-600 text-white border-blue-600 shadow-md"
//                   : "bg-white border-blue-100 hover:bg-blue-50"
//                 }`}
//             >
//               {faq.question}
//             </button>
//           ))}
//         </div>

//         {/* RIGHT SIDE (Answer) */}
//         <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8 flex items-center">
//           <motion.div
//             key={active}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <h3 className="text-2xl font-semibold text-blue-900 mb-4">
//               {faqs[active].question}
//             </h3>
//             <p className="text-gray-600 leading-relaxed text-lg">
//               {faqs[active].answer}
//             </p>
//           </motion.div>
//         </div>

//       </div>
//     </section>
//   );
// }