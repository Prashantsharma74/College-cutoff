import { Award, Users, Building, BookMarked } from "lucide-react"
import { Container } from "../Container"

export function StatsSection() {
  const stats = [
    { icon: <Award className="h-6 w-6" />, value: "8+", label: "Years of Expertise" },
    { icon: <Users className="h-6 w-6" />, value: "30k+", label: "Students Registered" },
    { icon: <Building className="h-6 w-6" />, value: "500+", label: "Colleges Covered" },
    { icon: <BookMarked className="h-6 w-6" />, value: "25k+", label: "Queries Answered" },
  ];

  return (
    <section className="w-full py-20 relative overflow-hidden ">
      {/* Refined Background: Soft Yellow Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.08),transparent_70%)]" />

      <Container>
        <div className="relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Our Impact in Numbers
            </h2>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* The "Professional Bar" Layout */}
          <div className="bg-white border border-yellow-100 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(234,179,8,0.1)] grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-yellow-100">
            {stats.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center px-4 group">
                <div className="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center text-yellow-600 mb-4 group-hover:bg-yellow-500 group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <span className="text-4xl font-bold text-gray-900 tabular-nums leading-none">
                  {item.value}
                </span>
                <span className="text-sm font-medium text-gray-500 mt-3 uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

// import { Award, Users, Building, BookMarked } from "lucide-react"
// import { Container } from "../Container"

// export function StatsSection() {
//   const stats = [
//     { icon: <Award className="h-6 w-6" />, value: "8+", label: "Years of Expertise" },
//     { icon: <Users className="h-6 w-6" />, value: "30k+", label: "Students Registered" },
//     { icon: <Building className="h-6 w-6" />, value: "500+", label: "Colleges Covered" },
//     { icon: <BookMarked className="h-6 w-6" />, value: "25k+", label: "Queries Answered" },
//   ];

//   return (
//     <section className="w-full py-24 relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">

//       {/* 🔵 Soft Blue Glow Background */}
//       <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30" />
//       <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-300 rounded-full blur-3xl opacity-20" />

//       <Container>
//         <div className="relative z-10">

//           {/* Heading */}
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-blue-900 tracking-tight">
//               Our Impact in Numbers
//             </h2>
//             <div className="w-20 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
//           </div>

//           {/* 🔥 Modern Card Grid */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {stats.map((item, i) => (
//               <div
//                 key={i}
//                 className="group relative bg-white/70 backdrop-blur-xl border border-blue-100 rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
//               >

//                 {/* subtle hover glow */}
//                 <div className="absolute inset-0 rounded-2xl bg-blue-500/0 group-hover:bg-blue-500/5 transition"></div>

//                 {/* Icon */}
//                 <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
//                   {item.icon}
//                 </div>

//                 {/* Value */}
//                 <div className="text-3xl md:text-4xl font-bold text-gray-900">
//                   {item.value}
//                 </div>

//                 {/* Label */}
//                 <div className="text-sm text-gray-500 mt-2 font-medium">
//                   {item.label}
//                 </div>

//               </div>
//             ))}
//           </div>

//         </div>
//       </Container>
//     </section>
//   )
// }