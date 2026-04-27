// // import { createAdminSupabaseClient } from "@/lib/supabase"
// // import { NextResponse } from "next/server"

// // export async function GET(request: Request) {
// //     const supabase = createAdminSupabaseClient()

// //     const { searchParams } = new URL(request.url)
// //     const courseType = searchParams.get("courseType")

// //     const states = [
// //         "all",
// //         "AN", "AP", "AR", "AS", "BR", "CH", "CG", "CT", "DN",
// //         "DL", "DD", "GA", "GJ", "HR", "HP", "JK", "JH",
// //         "KA", "KL", "LA", "LD", "MP", "MH", "MN", "ML",
// //         "MZ", "NL", "OD", "OT", "PY", "PB", "RJ", "SK",
// //         "TN", "TS", "TR", "UP", "UK", "WB"
// //     ]

// //     const results = []

// //     for (let state of states) {
// //         try {
// //             const tableName =
// //                 state === "all"
// //                     ? "college_table_all_india"
// //                     : `college_table_${state}`

// //             let query = supabase
// //                 .from(tableName)
// //                 .select("college_name")

// //             if (courseType) {
// //                 query = query.ilike("courseType", `%${courseType}%`)
// //             }

// //             const { data, error } = await query

// //             if (error || !data || data.length === 0) {
// //                 results.push({
// //                     state,
// //                     count: 0,
// //                     minYear: null,
// //                     maxYear: null,
// //                 })
// //                 continue
// //             }

// //             const years = data.map((item) =>
// //                 new Date(item.college_name).getFullYear()
// //             )

// //             results.push({
// //                 state,
// //                 count: data.length,
// //                 minYear: Math.min(...years),
// //                 maxYear: Math.max(...years),
// //             })

// //         } catch (err) {
// //             results.push({
// //                 state,
// //                 count: 0,
// //                 minYear: null,
// //                 maxYear: null,
// //             })
// //         }
// //     }

// //     return NextResponse.json({
// //         success: true,
// //         data: results,
// //     })
// // }

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
//         minYear: Math.min(...years),
//         maxYear: Math.max(...years),
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
import { createAdminSupabaseClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = createAdminSupabaseClient();

  const { searchParams } = new URL(request.url);
  const courseType = searchParams.get("courseType");
  const course = searchParams.get("course");

  let query = supabase
    .from("college_table_all_india")
    .select("state, created_at, courseType, instituteName");

  // ✅ FIXED courseType filter (trim + ilike)
  if (courseType) {
    query = query.ilike("courseType", `%${courseType.trim()}%`);
  }

  // ✅ ONLY FOR NEET UG (with proper condition)
  if (
    courseType === "NEET UG" &&
    course &&
    course !== "All" &&
    course !== "Select Course"
  ) {
    query = query.ilike("course", `%${course}%`);
  }

  console.log("courseType:", courseType)
  console.log("course:", course)

  const { data, error } = await query;

  console.log("data length:", data?.length)
  console.log("sample data:", data?.[0])

  // ❌ error handling
  if (error || !data) {
    return NextResponse.json({
      success: false,
      data: [],
    });
  }

  // ✅ empty data safe return
  if (!data.length) {
    return NextResponse.json({
      success: true,
      data: [],
    });
  }

  const grouped: any = {};

  data.forEach((item) => {
    const state = item.state || "Unknown";

    if (!grouped[state]) {
      grouped[state] = {
        colleges: new Set<string>(),
        years: [] as number[],
      };
    }

    if (item.instituteName) {
      grouped[state].colleges.add(item.instituteName)
    }

    const year = new Date(item.created_at).getFullYear();
    if (!isNaN(year)) {
      grouped[state].years.push(year);
    }
  });

  // 🔥 STATE-WISE RESULT
  const results = Object.keys(grouped).map((state) => ({
    state,
    count: grouped[state].colleges.size,
    minYear:
      grouped[state].years.length > 0
        ? Math.min(...grouped[state].years)
        : null,
    maxYear:
      grouped[state].years.length > 0
        ? Math.max(...grouped[state].years)
        : null,
  }));

  const allIndiaColleges = new Set(
    data.map(d => d.instituteName).filter(Boolean)
  )

  const allYears = data
    .map((d) => new Date(d.created_at).getFullYear())
    .filter((y) => !isNaN(y));

  results.unshift({
    state: "all",
    count: allIndiaColleges.size,
    minYear: allYears.length > 0 ? Math.min(...allYears) : null,
    maxYear: allYears.length > 0 ? Math.max(...allYears) : null,
  });

  return NextResponse.json({
    success: true,
    data: results,
  });
}