
"use client"

import SearchAndSelect from "@/components/common/SearchAndSelect"
import { SignInPopup } from "@/components/common/popups/SignInPopup"
import { Container } from "@/components/frontend/Container"
import { FELayout } from "@/components/frontend/FELayout"
import { useAppState } from "@/hooks/useAppState"
import useFetch from "@/hooks/useFetch"
import { IOption } from "@/types/GlobalTypes"
import { autoComplete, clearReactHookFormValueAndStates, isEmpty } from "@/utils/utils"
import { ArrowRight, MapPin, Search, Users, GraduationCap, BarChart3, } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState, useCallback, useMemo } from "react"
import { useForm } from "react-hook-form"
import Breadcrumbs from "@/components/common/Breadcrumbs"
import Seo from "@/components/Seo"

// State list
const STATES: { name: string; slug: string; code: string; popular?: boolean }[] = [
  { name: "All India", slug: "all-india", code: "all" },
  { name: "Andaman and Nicobar Islands", slug: "andaman-and-nicobar-islands", code: "AN" },
  { name: "Andhra Pradesh", slug: "andhra-pradesh", popular: true, code: "AD" },
  { name: "Arunachal Pradesh", slug: "arunachal-pradesh", code: "AR" },
  { name: "Assam", slug: "assam", code: "AS" },
  { name: "Bihar", slug: "bihar", code: "BR" },
  { name: "Chandigarh", slug: "chandigarh", code: "CH" },
  { name: "Chhattisgarh", slug: "chhattisgarh", code: "CG" },
  { name: "Dadra and Nagar Haveli", slug: "dadra-and-nagar-haveli", code: "DN" },
  { name: "Delhi", slug: "delhi", code: "DL" },
  { name: "Daman and Diu", slug: "daman-and-diu", code: "DD" },
  { name: "Goa", slug: "goa", code: "GA" },
  { name: "Gujarat", slug: "gujarat", popular: true, code: "GJ" },
  { name: "Haryana", slug: "haryana", code: "HR" },
  { name: "Himachal Pradesh", slug: "himachal-pradesh", code: "HP" },
  { name: "Jammu and Kashmir", slug: "jammu-and-kashmir", code: "JK" },
  { name: "Jharkhand", slug: "jharkhand", code: "JH" },
  { name: "Karnataka", slug: "karnataka", popular: true, code: "KA" },
  { name: "Kerala", slug: "kerala", popular: true, code: "KL" },
  { name: "Ladakh", slug: "ladakh", code: "LA" },
  { name: "Lakshadweep", slug: "lakshadweep", code: "LD" },
  { name: "Madhya Pradesh", slug: "madhya-pradesh", code: "MP" },
  { name: "Maharashtra", slug: "maharashtra", popular: true, code: "MH" },
  { name: "Manipur", slug: "manipur", code: "MN" },
  { name: "Meghalaya", slug: "meghalaya", code: "ML" },
  { name: "Mizoram", slug: "mizoram", code: "MZ" },
  { name: "Nagaland", slug: "nagaland", code: "NL" },
  { name: "Odisha", slug: "odisha", code: "OD" },
  { name: "Pondicherry", slug: "pondicherry", code: "PY" },
  { name: "Punjab", slug: "punjab", code: "PB" },
  { name: "Rajasthan", slug: "rajasthan", code: "RJ" },
  { name: "Sikkim", slug: "sikkim", code: "SK" },
  { name: "Tamil Nadu", slug: "tamil-nadu", popular: true, code: "TN" },
  { name: "Telangana", slug: "telangana", popular: true, code: "TS" },
  { name: "Tripura", slug: "tripura", code: "TR" },
  { name: "Uttar Pradesh", slug: "uttar-pradesh", popular: true, code: "UP" },
  { name: "Uttarakhand", slug: "uttarakhand", code: "UK" },
  { name: "West Bengal", slug: "west-bengal", code: "WB" },
]

const pageContent = {
  "NEET UG": {
    title: "Closing Ranks for MBBS, BDS & Ayurveda Courses",
    desc: "Explore college-wise cut-offs and closing ranks for NEET UG counselling including All India & State Quotas for MBBS, BDS & AYUSH courses.",
  },
  "NEET PG": {
    title: "Closing Ranks for MD/MS & PG Medical Courses",
    desc: "Check NEET PG closing ranks and cut-offs for MD/MS, DNB and diploma courses across All India & State counselling.",
  },
  "NEET MDS": {
    title: "Closing Ranks for MDS Dental Courses",
    desc: "Explore NEET MDS counselling data, college-wise closing ranks and seat allotment trends for dental PG courses.",
  },
  "NEET SS": {
    title: "Closing Ranks for Super Speciality Courses",
    desc: "Find NEET SS closing ranks and counselling trends for DM, MCh and super-speciality medical courses.",
  },
  "INICET": {
    title: "Closing Ranks for INICET Colleges",
    desc: "Check AIIMS, JIPMER and other INI institutes closing ranks through INICET counselling.",
  },
  "DNB": {
    title: "Closing Ranks for DNB Courses",
    desc: "Explore DNB counselling data, hospital-wise closing ranks and seat allotment trends.",
  },
  "AIAPGET": {
    title: "Closing Ranks for Ayurveda PG Courses",
    desc: "Find AIAPGET counselling data and closing ranks for Ayurveda, Homeopathy and other AYUSH PG courses.",
  },
}

const courseOptions = {
  "NEET UG": ["MBBS", "BDS", "BAMS", "BHMS"],
  "NEET PG": ["MD", "MS", "Diploma", "DNB"],
  "NEET MDS": ["MDS"],
  "NEET SS": ["DM", "MCh"],
  "INICET": ["MD", "MS"],
  "DNB": ["DNB"],
  "AIAPGET": ["Ayurveda", "Homeopathy"],
}

const ALLOWED_PREDICTORS = ["NEET UG", "NEET PG", "NEET MDS", "AIAPGET (Ayurveda)", ""]

export default function ClosingRanks() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"all" | "popular">("all")
  const [selectedType, setSelectedType] = useState<IOption>()
  const [selectedCourse, setSelectedCourse] = useState<IOption>()
  const [predictorTypeList, setPredictorTypeList] = useState<IOption[]>([])
  const [coursesList, setCoursesList] = useState<IOption[]>([])
  const [isCourseLoading, setIsCourseLoading] = useState<boolean>(false)
  const [stateSummary, setStateSummary] = useState<any[]>([])

  const searchParams = useSearchParams()
  const courseType = searchParams.get("courseType")
  const course = searchParams.get("course")
  const router = useRouter()
  const { showToast } = useAppState()
  const { setValue, setError, clearErrors, control, formState: { errors } } = useForm()

  const currentContent =
    pageContent[selectedType?.text] || {
      title: "Closing Ranks for Medical, Dental & Ayurveda Courses",
      desc: "Explore college-wise cut-offs and closing ranks from All India and State counselling for all rounds across UG, PG & Super-Specialization.",
    }

  const fetchStateSummary = async (courseType: string) => {
    try {
      const res = await fetch(`/api/state-summary?courseType=${courseType}`)
      const json = await res.json()
      console.log("testing Data", json)
      if (json?.success) {
        setStateSummary(json.data)
      }
    } catch (err) {
      console.error("State summary error:", err)
    }
  }

  // useEffect(() => {
  //   if (selectedType) {
  //     fetchStateSummary(selectedType.text)
  //   }
  // }, [selectedType])

  useEffect(() => {
    if (!selectedType && predictorTypeList.length > 0) {
      const defaultType = predictorTypeList[0] // ya "NEET UG"
      setSelectedType(defaultType)
      fetchStateSummary(defaultType.text)
    }
  }, [predictorTypeList])

  const updateURL = useCallback((params: Record<string, string>, replace = true) => {
    const query = new URLSearchParams(params).toString();
    const url = `/closing-ranks?${query}`;

    if (replace) {
      router.replace(url, { scroll: false });
    } else {
      router.push(url);
    }
  }, [router]);
  // Fetch predictor types
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/get-courses-types")
        const json = await res.json()
        if (Array.isArray(json?.data)) {
          setPredictorTypeList(json.data.map((q: IOption) => ({ id: q.id, text: q.type })))
        }
        //  const staticUGOptions = [
        //   { id: "MBBS", text: "NEET UG-MBBS" },
        //   { id: "BDS", text: "NEET UG-BDS" },
        //   { id: "BAMS", text: "NEET UG-BAMS" },
        //   { id: "BHMS", text: "NEET UG-BHMS" },
        // ];

        // const dynamicOptions = json.data.map((q: IOption) => ({
        //   id: q.id,
        //   text: q.type,
        // }));
        // const filterOp = dynamicOptions?.filter((d:IOption)=>d.type!=="NEET UG")

        // setPredictorTypeList([...staticUGOptions, ...filterOp]);
      } catch (err) {
        console.error("Error fetching course types:", err)
      }
    })()
  }, [])

  const getStateData = (code: string) => {
    return stateSummary.find((item) => item.state === code)
  }

  // Fetch courses by type
  const getCoursesByType = useCallback(async (type: string) => {
    setIsCourseLoading(true)
    try {
      const res = await fetch(`/api/get-courses?type=${encodeURIComponent(type)}`)
      const { data } = await res.json()
      setCoursesList(Array.isArray(data) ? data.map((c: IOption) => ({ id: c.id, text: c.text })) : [])
    } catch (err) {
      console.error("Error fetching courses:", err)
    } finally {
      setIsCourseLoading(false)
    }
  }, [])

  // Filtered states (memoized)
  const filteredStates = useMemo(() => {
    const base = ALLOWED_PREDICTORS.includes(selectedType?.text || "") ? STATES : [STATES[0]]
    return base.filter(
      s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (activeTab === "all" || s.popular)
    )
  }, [selectedType, searchQuery, activeTab])

  // Helpers
  const buildRedirectURL = (state: { name: string; code: string }) => {
    if (!selectedType?.text) return ""
    const courseParam = selectedType.text === "NEET UG" ? selectedCourse?.text || "" : ""
    const stateParam = state.code === "all" ? "All India" : state.name
    return `/closing-ranks/${state.code}?state=${encodeURIComponent(stateParam)}&courseType=${encodeURIComponent(selectedType.text)}&course=${encodeURIComponent(courseParam)}`
  }

  const validateSelection = () => {
    if (!selectedType?.text) {
      setError("courseType", { type: "manual", message: "Please select a Course Type" })
      showToast("error", "Please select a Course Type")
      updateURL({ courseType: "", course: "" })
      return false
    }
    if (selectedType.text === "NEET UG" && !selectedCourse?.text) {
      setError("course", { type: "manual", message: "Please select a Course" })
      showToast("error", "Please select a Course")
      updateURL({ courseType: selectedType.text, course: "" })
      return false
    }
    return true
  }

  return (
    <FELayout>
      <Seo
        title={`${selectedType?.text || "All"} Closing Ranks 2025 - State & Branch Wise Cutoff`}
        description={`Check ${selectedType?.text || ""} closing ranks, state wise and branch wise cutoff trends for latest counselling.`}
        keywords={`college closing ranks, ${selectedType?.text}, cutoff ranks, counselling data`}
      />
      {/* <section className="w-full px-2 py-10 bg-gradient-to-r from-yellow-50 to-emerald-50">
        <div className="md:text-right">
          <Breadcrumbs />
        </div>
        <Container className="pt-6 md:pt-0 px-2 text-center mx-auto">

          {selectedType?.text && (
            <div className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700 border border-blue-200 mb-5">
              {selectedType.text}
            </div>
          )}

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-[#165dc4] leading-tight">
            {currentContent.title}
          </h1>

          <p className="text-gray-600 md:text-lg max-w-5xl mx-auto leading-relaxed">
            {currentContent.desc}
          </p>

        </Container>

      </section> */}

      <section className="w-full py-5 px-4 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">

        {/* 🔵 Glow Effects */}
        <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-blue-400 opacity-20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-[-120px] left-[-120px] w-[350px] h-[350px] bg-blue-500 opacity-20 blur-3xl rounded-full"></div>

        <div className="relative z-10">

          {/* Breadcrumb */}
          <div className="md:text-right mb-6">
            <Breadcrumbs />
          </div>

          <Container className="text-center max-w-4xl mx-auto">

            {/* 🏷 Badge */}
            {selectedType?.text && (
              <div className="inline-block mb-6 px-5 py-1.5 rounded-full text-sm font-medium bg-white/70 backdrop-blur-md border border-blue-200 text-blue-700 shadow-sm">
                {selectedType.text}
              </div>
            )}

            {/* 🧠 Title */}
            {/* <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6" style={{lineHeight:"65px"}}>
              {currentContent.title}
            </h1> */}
            <h1 className="
  text-3xl 
  sm:text-4xl 
  md:text-5xl 
  lg:text-6xl 
  font-bold 
  text-gray-900 
  leading-snug 
  md:leading-[55px] 
  lg:leading-[65px] 
  mb-6
">
              {currentContent.title}
            </h1>

            {/* 📄 Description */}
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              {currentContent.desc}
            </p>

          </Container>

        </div>
      </section>

      <section className="w-full px-2 pt-4 pb-10">
        <Container>
          {/* Tabs */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                States & Union Territories
              </h2>
              <p className="text-gray-500 text-sm md:text-base">
                Select a region to view detailed closing ranks
              </p>
            </div>
          </div>

          {/* Filters */}
          {/* <div className=" flex flex-col md:flex-row justify-between gap-4 mb-4"> */}
          <div className="bg-white/70 border border-gray-200 rounded-2xl p-4 md:p-5 shadow-sm flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <SearchAndSelect
                name="courseType"
                setValue={setValue}
                placeholder="Select Course Type"
                label="Course Type"
                value={selectedType}
                onChange={({ selectedValue }) => {
                  setSelectedType(selectedValue)
                  setSelectedCourse(undefined)
                  clearErrors("courseType")
                  if (selectedValue.text === "NEET UG") getCoursesByType(selectedValue.text)
                  updateURL({ courseType: selectedValue.text })
                }}
                control={control}
                defaultOption={{ id: courseType || "", text: courseType || "" }}
                options={predictorTypeList}
                searchAPI={(txt, set) => autoComplete(txt, predictorTypeList, set)}
                wrapperClass="md:max-w-[200px] w-full"
                errors={errors}
              />
              {selectedType?.text === "NEET UG" && (
                <SearchAndSelect
                  setValue={setValue}
                  name="course"
                  label="Select Course"
                  placeholder="Select Course"
                  value={selectedCourse}
                  onChange={({ selectedValue }) => {
                    setSelectedCourse(selectedValue)
                    clearErrors("course")
                    updateURL({ courseType: selectedType?.text || "", course: selectedValue.text })
                  }}
                  control={control}
                  defaultOption={{ id: course || "", text: course || "" }}
                  options={coursesList}
                  loading={isCourseLoading}
                  // disabled={isEmpty(coursesList)}
                  searchAPI={(txt, set) => autoComplete(txt, coursesList, set)}
                  errors={errors}
                  wrapperClass="md:max-w-[200px] w-full"
                />
              )}
            </div>
            <div className="relative md:max-w-[500px] w-full">
              <div className="font-medium">Search State</div>
              <Search className="absolute left-3 top-10 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="States or Union Territories..."
                className="pl-10 pr-4 py-3 rounded-lg outline-none border focus:ring-1 focus:ring-yellow-500 w-full"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* States Grid */}
          {/* <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredStates.map(state => (
              <Link
                key={state.slug}
                href={buildRedirectURL(state)}
                onClick={e => !validateSelection() && e.preventDefault()}
                className="group bg-white rounded-xl border p-5 hover:shadow-md hover:border-yellow-300 flex flex-col"
              >
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-yellow-500" />
                    <h3 className="font-medium text-gray-900 group-hover:text-yellow-600">
                      {state.name}
                    </h3>
                  </div>
                  {state.popular && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">Popular</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-3">{state.name} - {selectedType?.text} Colleges List</p>
                <div className="mt-auto flex items-center text-sm text-yellow-600 font-medium">
                  View Closing Ranks <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            ))}
          </div> */}
          {/* <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredStates.map((state) => (
              <Link
                key={state.slug}
                href={buildRedirectURL(state)}
                onClick={(e) => !validateSelection() && e.preventDefault()}
                className="group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition">
                    {state.name}
                  </h3>
                </div>

                <div className="space-y-2 text-sm text-gray-600">

                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-gray-400" />
                    <span>{state.collegeCount || 2} Colleges</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-gray-400" />
                    <span>2024 & 2025 Counselling Data</span>
                  </div>

                </div>

                <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                  View Closing Ranks
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            ))}
          </div> */}


          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredStates.map((state) => {
              const meta = getStateData(state.code)
              const count = meta?.count || 0;
              const hasData = meta?.minYear && meta?.maxYear;

              return (
                <Link
                  key={state.slug}
                  href={buildRedirectURL(state)}
                  onClick={(e) => !validateSelection() && e.preventDefault()}
                  className="group relative bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col overflow-hidden"
                >

                  {/* 🔵 Subtle top gradient strip (premium feel) */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-300"></div>

                  {/* 🔥 Popular Badge */}
                  {state.popular && (
                    <span className="absolute top-3 right-3 bg-blue-100 text-blue-700 text-[11px] px-2 py-0.5 rounded-full font-medium">
                      🔥 Popular
                    </span>
                  )}

                  {/* 📍 Title */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <MapPin className="h-4 w-4 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition">
                      {state.name}
                    </h3>
                  </div>

                  {/* 📊 Info Section */}
                  <div className="space-y-3 text-sm text-gray-600">

                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-gray-400" />
                      <span>

                        {count === 0 ? (
                          <span className="font-semibold text-gray-500">
                            Coming Soon...
                          </span>
                        ) : (
                          <>
                            <span className="font-semibold text-gray-800">
                              {count}
                            </span>{" "}
                            Colleges Available
                          </>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-gray-400" />
                      {/* <span>Latest 2024 & 2025 Counselling Data</span> */}
                      {/* <span>
                        {meta?.minYear && meta?.maxYear
                          ? `Latest ${meta.minYear} – ${meta.maxYear} Counselling Data`
                          : "No Data Available"}
                      </span> */}
                      <span>
                        {hasData
                          ? `Latest ${meta.minYear} – ${meta.maxYear} Counselling Data`
                          : "Coming Soon..."}
                      </span>
                    </div>

                  </div>

                  {/* ⚡ CTA */}
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-orange-500">
                      View Closing Ranks
                    </span>

                    <div className="bg-blue-50 group-hover:bg-blue-600 transition p-2 rounded-full">
                      <ArrowRight className="h-4 w-4 text-blue-600 group-hover:text-white transition" />
                    </div>
                  </div>

                </Link>)
            })}
          </div>

          {!filteredStates.length && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No states found matching your search.</p>
              <button onClick={() => setSearchQuery("")} className="mt-4 text-yellow-600 hover:text-yellow-700">
                Clear search
              </button>
            </div>
          )}

          {/* CTA */}
          {/* <div className="mt-16 border border-color-accent rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Need personalized guidance?</h3>
              <p className="text-gray-600">Connect with our counselors for tailored college recommendations.</p>
            </div>
            <Link
              href="https://wa.me/919028009835"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-6 py-3 rounded-lg shadow-md flex items-center gap-2"
            >
              <Users className="h-5 w-5" /> Book Counselling Session
            </Link>
          </div> */}
          <div className="mt-20 relative overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">

            {/* 🔵 Glow */}
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-blue-400 opacity-20 blur-3xl rounded-full"></div>
            <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-blue-500 opacity-20 blur-3xl rounded-full"></div>

            {/* 🧠 Content */}
            <div className="relative z-10 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Need Personalized Guidance?
              </h3>
              <p className="text-gray-600 text-base md:text-lg max-w-md">
                Talk to our experts and get the best college recommendations based on your rank, category, and preferences.
              </p>
            </div>

            {/* 🚀 CTA BUTTON */}
            {/* <Link
              href="https://wa.me/919028009835"
              className="relative z-10 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-7 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
            >
              <Users className="h-5 w-5" />
              Book Counselling
            </Link> */}

            <Link
              href="https://wa.me/919028009835"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-6 py-3 rounded-lg shadow-md flex items-center gap-2"
            >
              <Users className="h-5 w-5" /> Book Counselling Session
            </Link>

          </div>
        </Container>
      </section>
      <SignInPopup />
    </FELayout>
  )
}

