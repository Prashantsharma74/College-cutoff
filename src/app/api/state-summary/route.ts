import { createAdminSupabaseClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const supabase = createAdminSupabaseClient()

    const { searchParams } = new URL(request.url)
    const courseType = searchParams.get("courseType")

    //   const states = ["all", "AP", "MH", "KA", "UP"]
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

            let query = supabase
                .from(tableName)
                .select("created_at")

            if (courseType) {
                // query = query.eq("courseType", courseType)
                query = query.ilike("courseType", `%${courseType}%`)
            }

            const { data, error } = await query

            if (error || !data || data.length === 0) {
                results.push({
                    state,
                    count: 0,
                    minYear: null,
                    maxYear: null,
                })
                continue
            }

            const years = data.map((item) =>
                new Date(item.created_at).getFullYear()
            )

            results.push({
                state,
                count: data.length,
                minYear: Math.min(...years),
                maxYear: Math.max(...years),
            })

        } catch (err) {
            results.push({
                state,
                count: 0,
                minYear: null,
                maxYear: null,
            })
        }
    }

    return NextResponse.json({
        success: true,
        data: results,
    })
}