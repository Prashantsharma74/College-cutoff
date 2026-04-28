// import { createAdminSupabaseClient } from "@/lib/supabase"
// import { NextResponse } from "next/server"

// export async function GET(request: Request) {
//     const supabase = createAdminSupabaseClient()

//     const { searchParams } = new URL(request.url)
//     const courseType = searchParams.get("courseType")

//     const states = [
//         "all",
//         "AN", "AP", "AR", "AS", "BR", "CH", "CG", "CT", "DN",
//         "DL", "DD", "GA", "GJ", "HR", "HP", "JK", "JH",
//         "KA", "KL", "LA", "LD", "MP", "MH", "MN", "ML",
//         "MZ", "NL", "OD", "OT", "PY", "PB", "RJ", "SK",
//         "TN", "TS", "TR", "UP", "UK", "WB"
//     ]

//     const results = []

//     for (let state of states) {
//         try {
//             const tableName =
//                 state === "all"
//                     ? "college_table_all_india"
//                     : `college_table_${state}`

//             let query = supabase
//                 .from(tableName)
//                 .select("college_name")

//             if (courseType) {
//                 query = query.ilike("courseType", `%${courseType}%`)
//             }

//             const { data, error } = await query

//             if (error || !data || data.length === 0) {
//                 results.push({
//                     state,
//                     count: 0,
//                     minYear: null,
//                     maxYear: null,
//                 })
//                 continue
//             }

//             const years = data.map((item) =>
//                 new Date(item.college_name).getFullYear()
//             )

//             results.push({
//                 state,
//                 count: data.length,
//                 minYear: Math.min(...years),
//                 maxYear: Math.max(...years),
//             })

//         } catch (err) {
//             results.push({
//                 state,
//                 count: 0,
//                 minYear: null,
//                 maxYear: null,
//             })
//         }
//     }

//     return NextResponse.json({
//         success: true,
//         data: results,
//     })
// }

import { createAdminSupabaseClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const supabase = createAdminSupabaseClient()

  const { searchParams } = new URL(request.url)
  const courseType = searchParams.get("courseType")?.trim() || null
  const course = searchParams.get("course")?.trim() || null

  const states = [
    "all",
    "AN", "AP", "AR", "AS", "BR", "CH", "CG", "CT", "DN",
    "DL", "DD", "GA", "GJ", "HR", "HP", "JK", "JH",
    "KA", "KL", "LA", "LD", "MP", "MH", "MN", "ML",
    "MZ", "NL", "OD", "OT", "PY", "PB", "RJ", "SK",
    "TN", "TS", "TR", "UP", "UK", "WB"
  ]

  const results = []

  for (let state of states) {
    try {
      const tableName =
        state === "all"
          ? "college_table_all_india"
          : `college_table_${state}`

      // ✅ SAME RPC as your working API
      const { data, error } = await supabase.rpc(
        "get_unique_colleges_data",
        {
          p_table_name: tableName,
          p_course_type: courseType,
          p_course: course,
        }
      )

      if (error) {
        console.error(`Error in ${state}:`, error.message)
        results.push({ state, count: 0 })
        continue
      }

      const count = data?.data?.length || 0

      const rows = data?.data || []

      let minYear: number | null = null
      let maxYear: number | null = null

      if (rows.length > 0) {
        const years = rows.map((item: any) =>
          new Date(item.created_at).getFullYear()
        )

        minYear = Math.min(...years)
        maxYear = Math.max(...years)
      }

      // results.push({
      //   state,
      //   count,
      // })

      results.push({
        state,
        count,
        minYear,
        maxYear,
      })

    } catch (err) {
      console.error(`Catch error in ${state}:`, err)
      results.push({
        state,
        count: 0,
      })
    }
  }

  return NextResponse.json({
    success: true,
    data: results,
  })
}



// import { createAdminSupabaseClient } from "@/lib/supabase"
// import { NextResponse } from "next/server"

// export async function GET(request: Request) {
//   const supabase = createAdminSupabaseClient()

//   const { searchParams } = new URL(request.url)
//   const courseType = searchParams.get("courseType")
//   const course = searchParams.get("course") // ✅ ADD THIS

//   const states = [
//     "all",
//     "AN", "AP", "AR", "AS", "BR", "CH", "CG", "CT", "DN",
//     "DL", "DD", "GA", "GJ", "HR", "HP", "JK", "JH",
//     "KA", "KL", "LA", "LD", "MP", "MH", "MN", "ML",
//     "MZ", "NL", "OD", "OT", "PY", "PB", "RJ", "SK",
//     "TN", "TS", "TR", "UP", "UK", "WB"
//   ]

//   const results = []

//   for (let state of states) {
//     try {
//       const tableName =
//         state === "all"
//           ? "college_table_all_india"
//           : `college_table_${state}`

//       let query = supabase
//         // .from(tableName)
//         // .select("college_name, created_at")
//         .from("college_table_all_india")
//         .select("state, created_at, courseType")
//         .eq("courseType", courseType)

//       // ✅ courseType filter
//       if (courseType) {
//         query = query.ilike("courseType", `%${courseType}%`)
//       }

//       // ✅ ONLY FOR NEET UG
//       if (courseType === "NEET UG" && course && course !== "All") {
//         query = query.ilike("course", `%${course}%`)
//       }

//       const { data, error } = await query

//       if (error || !data || data.length === 0) {
//         results.push({
//           state,
//           count: 0,
//           minYear: null,
//           maxYear: null,
//         })
//         continue
//       }

//       // ✅ UNIQUE COLLEGE COUNT (FIXED)
//       const uniqueColleges = new Set(
//         data.map((item) => item.college_name)
//       )

//       // year calculation
//       const years = data.map((item) =>
//         new Date(item.created_at).getFullYear()
//       )

//       results.push({
//         state,
//         count: uniqueColleges.size,
//     minYear: allYears.length ? Math.min(...allYears) : null,
//     maxYear: allYears.length ? Math.max(...allYears) : null,
//       })

//     } catch (err) {
//       results.push({
//         state,
//         count: 0,
//         minYear: null,
//         maxYear: null,
//       })
//     }
//   }

//   return NextResponse.json({
//     success: true,
//     data: results,
//   })
// }

// import { createAdminSupabaseClient } from "@/lib/supabase";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   const supabase = createAdminSupabaseClient();

//   const { searchParams } = new URL(request.url);
//   const courseType = searchParams.get("courseType");
//   const course = searchParams.get("course");

//   let query = supabase
//     .from("college_table_all_india")
//     .select("state, created_at, courseType, instituteName");

//   // if (courseType) {
//   //   query = query.ilike("courseType", `%${courseType.trim()}%`);
//   // }

//   if (courseType) {
//     query = query.eq("courseType", courseType.trim());
//   }

//   if (
//     courseType === "NEET UG" &&
//     course &&
//     course !== "All" &&
//     course !== "Select Course"
//   ) {
//     // query = query.ilike("course", `%${course}%`);
//     query = query.eq("course", course.trim());
//   }

//   console.log("courseType:", courseType)
//   console.log("course:", course)

//   const { data, error } = await query;

//   console.log("data length:", data?.length)
//   console.log("sample data:", data?.[0])

//   if (error || !data) {
//     return NextResponse.json({
//       success: false,
//       data: [],
//     });
//   }

//   if (!data.length) {
//     return NextResponse.json({
//       success: true,
//       data: [],
//     });
//   }

//   const grouped: any = {};

//   data.forEach((item) => {
//     const state = item.state || "Unknown";

//     if (!grouped[state]) {
//       grouped[state] = {
//         colleges: new Set<string>(),
//         years: [] as number[],
//       };
//     }

//     if (item.instituteName) {
//       grouped[state].colleges.add(item.instituteName)
//     }

//     const year = new Date(item.created_at).getFullYear();
//     if (!isNaN(year)) {
//       grouped[state].years.push(year);
//     }
//   });

//   const results = Object.keys(grouped).map((state) => ({
//     state,
//     count: grouped[state].colleges.size,
//     minYear:
//       grouped[state].years.length > 0
//         ? Math.min(...grouped[state].years)
//         : null,
//     maxYear:
//       grouped[state].years.length > 0
//         ? Math.max(...grouped[state].years)
//         : null,
//   }));

//   const allIndiaColleges = new Set(
//     data.map(d => d.instituteName).filter(Boolean)
//   )

//   const allYears = data
//     .map((d) => new Date(d.created_at).getFullYear())
//     .filter((y) => !isNaN(y));

//   results.unshift({
//     state: "all",
//     count: allIndiaColleges.size,
//     minYear: allYears.length > 0 ? Math.min(...allYears) : null,
//     maxYear: allYears.length > 0 ? Math.max(...allYears) : null,
//   });

//   return NextResponse.json({
//     success: true,
//     data: results,
//   });
// }

// import { createAdminSupabaseClient } from "@/lib/supabase";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   const supabase = createAdminSupabaseClient();

//   const { searchParams } = new URL(request.url);
//   const courseType = searchParams.get("courseType");
//   const course = searchParams.get("course");

//   let query = supabase
//     .from("college_table_all_india")
//     .select("state, created_at, courseType, instituteName, course");

//   // ✅ EXACT MATCH (NO ILIKE)
//   if (courseType) {
//     query = query.eq("courseType", courseType.trim());
//   }

//   if (
//     courseType === "NEET UG" &&
//     course &&
//     course !== "All" &&
//     course !== "Select Course"
//   ) {
//     query = query.eq("course", course.trim());
//   }

//   const { data, error } = await query;

//   if (error || !data) {
//     return NextResponse.json({
//       success: false,
//       data: [],
//     });
//   }

//   if (!data.length) {
//     return NextResponse.json({
//       success: true,
//       data: [],
//     });
//   }

//   // 🔥 NORMALIZE FUNCTIONS
//   const normalizeState = (str: string) =>
//     str?.toLowerCase().trim();

//   const normalizeCollege = (str: string) =>
//     str?.toLowerCase().trim();

//   const formatState = (str: string) =>
//     str.replace(/\b\w/g, (c) => c.toUpperCase());

//   const grouped: any = {};

//   data.forEach((item) => {
//     const stateKey = normalizeState(item.state || "unknown");

//     if (!grouped[stateKey]) {
//       grouped[stateKey] = {
//         colleges: new Set<string>(),
//         years: [] as number[],
//       };
//     }

//     if (item.instituteName) {
//       grouped[stateKey].colleges.add(
//         normalizeCollege(item.instituteName)
//       );
//     }

//     const year = new Date(item.created_at).getFullYear();
//     if (!isNaN(year)) {
//       grouped[stateKey].years.push(year);
//     }
//   });

//   // ✅ STATE RESULTS
//   // const results = Object.keys(grouped).map((state) => ({
//   //   state: formatState(state),
//   //   count: grouped[state].colleges.size,
//   //   minYear:
//   //     grouped[state].years.length > 0
//   //       ? Math.min(...grouped[state].years)
//   //       : null,
//   //   maxYear:
//   //     grouped[state].years.length > 0
//   //       ? Math.max(...grouped[state].years)
//   //       : null,
//   // }));

//   const results = Object.keys(grouped).map((state) => ({
//     state,
//     count: grouped[state].count, // ✅ total rows
//     minYear:
//       grouped[state].years.length > 0
//         ? Math.min(...grouped[state].years)
//         : null,
//     maxYear:
//       grouped[state].years.length > 0
//         ? Math.max(...grouped[state].years)
//         : null,
//   }));

//   // ✅ ALL INDIA FIXED
//   const allIndiaColleges = new Set(
//     data
//       .map((d) => d.instituteName?.toLowerCase().trim())
//       .filter(Boolean)
//   );

//   const allYears = data
//     .map((d) => new Date(d.created_at).getFullYear())
//     .filter((y) => !isNaN(y));

//   // results.unshift({
//   //   state: "All India",
//   //   count: allIndiaColleges.size,
//   //   minYear: allYears.length ? Math.min(...allYears) : null,
//   //   maxYear: allYears.length ? Math.max(...allYears) : null,
//   // });

//   results.unshift({
//     state: "All India",
//     count: data.length,
//     minYear: Math.min(...data.map(d => new Date(d.created_at).getFullYear())),
//     maxYear: Math.max(...data.map(d => new Date(d.created_at).getFullYear())),
//   });

//   return NextResponse.json({
//     success: true,
//     data: results,
//   });
// }

// import { createAdminSupabaseClient } from "@/lib/supabase";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   const supabase = createAdminSupabaseClient();

//   const { searchParams } = new URL(request.url);

//   const courseType = searchParams.get("courseType")?.trim();
//   const course = searchParams.get("course")?.trim();

//   // 🔥 BASE QUERY (same as list API)
//   let query = supabase
//     .from("college_table_all_india")
//     .select("state, created_at, instituteName, courseType, course");

//   // ✅ COURSE TYPE FILTER
//   if (courseType) {
//     query = query.eq("courseType", courseType);
//   }

//   // ✅ COURSE FILTER (IMPORTANT FIX)
//   if (course) {
//     query = query.eq("course", course);
//   }

//   // 🔍 DEBUG (remove later)
//   console.log("Filters =>", { courseType, course });

//   const { data, error } = await query;

//   if (error || !data) {
//     console.error("Supabase Error:", error);
//     return NextResponse.json({
//       success: false,
//       data: [],
//     });
//   }

//   if (!data.length) {
//     return NextResponse.json({
//       success: true,
//       data: [],
//     });
//   }

//   // 🔥 GROUP BY STATE (TOTAL ROW COUNT, NOT UNIQUE)
//   const grouped: Record<
//     string,
//     { count: number; years: number[] }
//   > = {};

//   data.forEach((item) => {
//     const state = item.state?.trim() || "Unknown";

//     if (!grouped[state]) {
//       grouped[state] = {
//         count: 0,
//         years: [],
//       };
//     }

//     // ✅ TOTAL COUNT (IMPORTANT)
//     grouped[state].count += 1;

//     const year = new Date(item.created_at).getFullYear();
//     if (!isNaN(year)) {
//       grouped[state].years.push(year);
//     }
//   });

//   // 🔥 BUILD RESULT
//   const results = Object.keys(grouped).map((state) => ({
//     state,
//     count: grouped[state].count,
//     minYear:
//       grouped[state].years.length > 0
//         ? Math.min(...grouped[state].years)
//         : null,
//     maxYear:
//       grouped[state].years.length > 0
//         ? Math.max(...grouped[state].years)
//         : null,
//   }));

//   // 🔥 ALL INDIA (TOTAL ROWS)
//   const allYears = data
//     .map((d) => new Date(d.created_at).getFullYear())
//     .filter((y) => !isNaN(y));

//   results.unshift({
//     state: "All India",
//     count: data.length, // ✅ EXACT MATCH WITH UI
//     minYear: allYears.length ? Math.min(...allYears) : null,
//     maxYear: allYears.length ? Math.max(...allYears) : null,
//   });

//   return NextResponse.json({
//     success: true,
//     data: results,
//   });
// }