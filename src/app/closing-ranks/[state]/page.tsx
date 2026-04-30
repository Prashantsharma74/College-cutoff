"use client"

import { Button } from "@/components/common/Button"
import { Card } from "@/components/common/Card"
import { PageSizeSelector } from "@/components/common/PageSizeSelector"
import { Pagination } from "@/components/common/Pagination"
import SearchAndSelect from "@/components/common/SearchAndSelect"
import { Table, TableColumn } from "@/components/common/Table/Table"
import { UnlockPopover } from "@/components/common/UnblockPopover"
import { SignInPopup } from "@/components/common/popups/SignInPopup"
import { Container } from "@/components/frontend/Container"
import { FELayout } from "@/components/frontend/FELayout"
import { PaymentPopupCard } from "@/components/frontend/PaymentPopupCard"
import { PaymentRedirectPopup } from "@/components/frontend/PaymentRedirectPopup"
import { useAppState } from "@/hooks/useAppState"
import useFetch from "@/hooks/useFetch"
import { useInternalSearchParams } from "@/hooks/useInternalSearchParams"
import { IOption } from "@/types/GlobalTypes"
import { Building2 } from "lucide-react"
import { ShieldCheck } from "lucide-react"
import { Tag } from "lucide-react"
import { Sparkles } from "lucide-react"
import { CheckCircle } from "lucide-react"
import { RefreshCcw } from "lucide-react"
import { Zap } from "lucide-react"
import { Headphones } from "lucide-react"
import { Gift } from "lucide-react"
import {
  allInstituteTypes,
  paymentType,
  priceType,
  stateInstituteTypes,
  states,
} from "@/utils/static"
import {
  autoComplete,
  cn,
  getLocalStorageItem,
  isEmpty,
  onPageChange,
  saveToLocalStorage,
  shouldRenderComponent,
} from "@/utils/utils"
import {
  ArrowRight,
  ChevronLeft,
  CircleCheckBig,
  Eye,
  Users,
  X,
} from "lucide-react"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function CollegeListClosingRanksPage() {
  const {
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm()

  const [tableData, setTableData] = useState<any>(null)

  const [updateUI, setUpdateUI] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [processingPayment, setProcessingPayment] = useState<any>(false)
  const [showPaymentPopup, setShowPaymentPopup] = useState(false)
  const [rowData, setRowData] = useState<any>(null)
  const [stateAmount, setStateAmount] = useState<number>(299)
  const [statePaymentPopup, setStatePaymentPopup] = useState(false)
  const [paymentChecker, setPaymentChecker] = useState(false)
  const [statePurchaseMode, setStatePurchaseMode] = useState(false)
  const [userPurchases, setUserPurchases] = useState([])
  const isNewUser = userPurchases.length === 0

  const fetchPurchases = async () => {
    try {
      const res = await fetch("/api/purchase/all-purchase")
      const data = await res.json()

      setUserPurchases(data?.data || [])
    } catch (err) {
      console.error("Error fetching purchases", err)
    }
  }

  useEffect(() => {
    fetchPurchases()
  }, [])

  const getFinalAmount = (amount) => {
    if (!isNewUser) return amount

    if (amount === 49) return 9
    if (amount === 99) return 19

    return amount
  }

  const currentYear = new Date().getFullYear()
  const prevYear = currentYear - 1
  const [selectedInstituteType, setSelectedInstituteType] = useState<
    IOption | undefined
  >()
  const [selectedState, setSelectedState] = useState<IOption | undefined>()
  const [amount, setAmount] = useState<number>(49)

  const params = useParams()

  const searchParams = useSearchParams()

  const courseType = searchParams.get("courseType")
  const course = searchParams.get("course")
  const stateCode = decodeURIComponent(params.state as any)
  const state = searchParams.get("state")

  const [pageSize, setPageSize] = useState(
    Number(searchParams.get("size") || 20),
  )
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page") || 1),
  )

  const { fetchData } = useFetch()

  const router = useRouter()

  const { showToast, setAppState } = useAppState()
  function updateURL(newPage: number, newSize: number) {
    const params = new URLSearchParams(window.location.search)
    params.set("page", newPage.toString())
    params.set("size", newSize.toString())
    router.replace(`${window.location.pathname}?${params.toString()}`)
  }

  const [showUnlockPopover, setShowUnlockPopover] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => getData(currentPage, "new One"), 200)
    return () => clearTimeout(timeout)
  }, [updateUI, selectedInstituteType, selectedState, pageSize, currentPage])

  const finalAmount = isNewUser
    ? amount === 49
      ? 9
      : amount === 99
        ? 19
        : amount
    : amount

  async function getData(page: number, data: string) {
    function isValidPriceTypeKey(key: string): key is keyof typeof priceType {
      return key in priceType
    }
    try {
      setIsLoading(true)

      if (stateCode !== "all") {
        const priceTypeName =
          courseType && courseType.includes(" ")
            ? courseType.split(" ")[1]
            : courseType

        const fullKey = `SINGLE_COLLEGE_CLOSING_RANK_${priceTypeName?.toUpperCase()}`

        const stateFullKey = `STATE_CLOSING_RANK_${priceTypeName?.toUpperCase()}`

        const priceTypeValue = isValidPriceTypeKey(fullKey)
          ? priceType[fullKey]
          : undefined
        const statePriceTypeValue = isValidPriceTypeKey(stateFullKey)
          ? priceType[stateFullKey]
          : undefined
        const params = {
          page: page || currentPage,
          size: pageSize,
          state,
          courseType,
          course,
          stateCode,
          filterState: selectedState?.text || "",
          instituteType: selectedInstituteType?.text || "",
        }

        const [price, res, statePrice] = await Promise.all([
          fetchData({
            url: "/api/admin/configure_prices/get",
            params: {
              type: priceTypeValue,
              item: state,
            },
            noLoading: true,
            noToast: true,
          }),

          fetchData({
            url: "/api/closing_ranks/college_list",
            params,
          }),

          fetchData({
            url: "/api/admin/configure_prices/get",
            params: {
              type: statePriceTypeValue,
              item: state,
            },
            noLoading: true,
            noToast: true,
          }),
        ])
        if (price?.success) {
          setAmount(price?.payload?.data?.price)
        }

        if (statePrice?.success) {
          setStateAmount(statePrice?.payload?.data?.price)
        }

        if (res?.success) {
          // console.log("Data: ",res.payload)
          setTableData(res?.payload)
        }
      } else {
        const priceTypeName =
          courseType && courseType.includes(" ")
            ? courseType.split(" ")[1]
            : courseType

        const allIndiaFullKey = `SINGLE_COLLEGE_CLOSING_RANK_${priceTypeName?.toUpperCase()}`
        const allIndiaFull = `ALL_INDIA_CLOSING_RANK_${priceTypeName?.toUpperCase()}`

        const allIndiaPriceTypeValue = isValidPriceTypeKey(allIndiaFullKey)
          ? priceType[allIndiaFullKey]
          : undefined

        const allIndiaPriceTypeValueForAll = isValidPriceTypeKey(allIndiaFull)
          ? priceType[allIndiaFull]
          : undefined

        const [price, res, allIndiaPrice] = await Promise.all([
          fetchData({
            url: "/api/admin/configure_prices/get",
            params: {
              type: allIndiaPriceTypeValue,
              item: stateCode === "all" ? "All India" : state,
            },
            noLoading: true,
            noToast: true,
          }),

          fetchData({
            url: "/api/closing_ranks/college_list",
            params: {
              page: currentPage,
              size: pageSize,
              state,
              courseType: courseType,
              course: course,
              stateCode: stateCode,
              filterState: selectedState?.text || "",
              instituteType: selectedInstituteType?.text || "",
            },
          }),
          fetchData({
            url: "/api/admin/configure_prices/get",
            params: {
              type: allIndiaPriceTypeValueForAll,
              item: stateCode === "all" ? "All India" : state,
            },
            noLoading: true,
            noToast: true,
          }),
        ])
        if (price?.success) {
          setAmount(price?.payload?.data?.price)
        }

        if (allIndiaPrice?.success) {
          setStateAmount(allIndiaPrice?.payload?.data?.price)
        }

        if (res?.success) {
          // console.log("ResP ",res.payload)
          setTableData(res?.payload)
        }
      }

    } catch (error) {
      console.log("error", error)
    }
    finally {
      setIsLoading(false)
    }
  }

  function buttonText(rowData: any) {
    return processingPayment === rowData?.id
      ? "Processing..."
      : <>

        {isNewUser && (
          <>
            {/* Mobile */}
            <span className="font-bold text-[14px] py-3 text-[12px] font-medium">
              {/* Unlock */}
            </span>
          </>
        )}

        {/* Old price */}
        {isNewUser && (
          <span className="line-through text-[14px] text-white/70 text-[10px]">
            ₹{amount}
          </span>
        )}

        {/* Price */}
        {!isNewUser && (
          <span className="font-bold text-[14px]">
            Unlock ₹{finalAmount}
          </span>
        )}

        {isNewUser && (
          <span className="font-bold text-[14px]">
            ₹{finalAmount}
          </span>
        )}

        {/* {isNewUser && (
          <>
            <span className="hidden md:flex items-center gap-1">
              <span>→</span>
              <span className="bg-[#1a6fc2] text-white px-2 py-[2px] rounded-md text-[12px]">
                First Unlock Offer
              </span>
            </span>

            <span className="md:hidden text-[12px] text-blue-500 font-medium">

            </span>
          </>
        )} */}
      </>
  }

  function generateCols() {
    const columns: TableColumn[] = [
      {
        title: "Institute Name",
        tableKey: "instituteName",
        width: "150px",
        disableMobStaticLeft: true,
      },
      { title: "Institute Type", tableKey: "instituteType", width: "150px" },
      {
        title: "Course Type",
        tableKey: "courseType",

        width: "150px",
        renderer({ cellData }) {
          return courseType
        },
      },
      {
        title: "Unlock Cut-off",
        tableKey: "action",
        width: "120px",
        renderer({ rowData }) {
          const paymentStatus = getLocalStorageItem<any>(
            `payment-${state?.replaceAll(" ", "-").toLowerCase()}-${courseType?.replaceAll(" ", "-").toLowerCase()}-${rowData.instituteName.toLowerCase().trim().split(" ").join("-")}`,
          )
          return (
            <div className="">
              {rowData?.purchased || paymentStatus ? (
                <Link
                  href={`/closing-ranks/${stateCode}/college-details?state=${state}&college=${rowData?.instituteName}&courseType=${courseType}&course=${course || ""}&collegeCount=${tableData?.totalItems || 0}`}
                  className="text-[14px] disabled:bg-color-table-header disabled:text-white disabled:cursor-not-allowed flex items-center gap-2"
                  onClick={() => {
                    saveToLocalStorage(
                      paymentType.SINGLE_COLLEGE_CLOSING_RANK,
                      {
                        ...rowData,
                        course: course,
                        courseType: courseType,
                        state: state,
                      },
                    )
                  }}
                >
                  <Button
                    className="py-2 px-2 text-[14px] w-fit disabled:bg-color-table-header disabled:text-white disabled:cursor-not-allowed min-w-[100px] flex items-center justify-center gap-1"
                    variant="primary"
                  >
                    <Eye size={20} /> View
                  </Button>
                </Link>
              ) : (
                <Button
                  className="flex items-center gap-2 bg-[#f37a3a] hover:bg-[#ef6820] text-white px-5 py-3 rounded-lg text-xs font-medium transition w-fit"
                  // className="py-2 px-2 text-[14px] w-fit disabled:bg-color-table-header disabled:text-white disabled:cursor-not-allowed min-w-[100px] flex items-center gap-2"
                  variant="primary"
                  onClick={() => {
                    setPaymentChecker(true)

                    saveToLocalStorage(
                      paymentType.SINGLE_COLLEGE_CLOSING_RANK,
                      {
                        ...rowData,
                        course: course,
                        courseType: courseType,
                        state: state,
                      },
                    )

                    setRowData(rowData)
                    // handleBuyNow()
                    setShowUnlockPopover(true);
                  }}
                  disabled={processingPayment === rowData?.id}
                >
                  {buttonText(rowData)}
                </Button>
              )}
            </div>
          )
        },
      },
      // In your generateCols() function, update the renderer for the "Unlock Cut-off" column:
      // {
      //   title: "Unlock Cut-off",
      //   tableKey: "action",
      //   width: "120px",
      //   renderer({ rowData }) {
      //     const paymentStatus = getLocalStorageItem<any>(
      //       `payment-${state?.replaceAll(" ", "-").toLowerCase()}-${courseType?.replaceAll(" ", "-").toLowerCase()}-${rowData.instituteName.toLowerCase().trim().split(" ").join("-")}`,
      //     )

      //     return (
      //       <div className="w-[120px] md:m-3">
      //         {rowData?.purchased || paymentStatus ? (
      //           <Link
      //             href={`/closing-ranks/${stateCode}/college-details?state=${state}&college=${rowData?.instituteName}&courseType=${courseType}&course=${course || ""}&collegeCount=${tableData?.totalItems || 0}`}
      //              className="text-[14px] disabled:bg-color-table-header disabled:text-white disabled:cursor-not-allowed flex items-center gap-2"
      //             onClick={() => {
      //               saveToLocalStorage(
      //                 paymentType.SINGLE_COLLEGE_CLOSING_RANK,
      //                 {
      //                   ...rowData,
      //                   course: course,
      //                   courseType: courseType,
      //                   state: state,
      //                 },
      //               )
      //             }}
      //           >
      //             <Button
      //               className="py-2 px-2 text-[14px] w-fit disabled:bg-color-table-header disabled:text-white disabled:cursor-not-allowed min-w-[100px] flex items-center gap-2"
      //               variant="primary"
      //             >
      //               <Eye size={20} /> View
      //             </Button>
      //           </Link>
      //         ) : (
      //           <UnlockPopover
      //             amount={amount}
      //             stateAmount={stateAmount}
      //             stateName={state || ""}
      //             processingPayment={processingPayment === rowData?.id}
      //             onBuySingle={() => {
      //               setPaymentChecker(true)
      //               saveToLocalStorage(
      //                 paymentType.SINGLE_COLLEGE_CLOSING_RANK,
      //                 {
      //                   ...rowData,
      //                   course: course,
      //                   courseType: courseType,
      //                   state: state,
      //                 },
      //               )
      //               setRowData(rowData)
      //               handleBuyNow()
      //             }}
      //             onBuyState={() => {
      //               setPaymentChecker(true)
      //               saveToLocalStorage(
      //                 paymentType.SINGLE_COLLEGE_CLOSING_RANK,
      //                 {
      //                   ...rowData,
      //                   course: course,
      //                   courseType: courseType,
      //                   state: state,
      //                 },
      //               )
      //               setRowData(rowData)
      //               handleStatePurchase()
      //             }}
      //             // pitch={`Choose to unlock just ${rowData?.instituteName} or all colleges in ${state}`}
      //           />
      //         )}
      //       </div>
      //     )
      //   },
      // }
    ]
    if (stateCode === "all" || stateCode === "All") {
      columns.splice(
        columns.length - 1,
        0,
        { title: "State", tableKey: "state", width: "150px" },
      )
    }
    return columns
  }

  async function successCallback(orderId: string) {
    setShowPaymentPopup(false)

    showToast(
      "success",
      <p>
        Payment Successful
        <br />
        Thank You for purchasing!
      </p>,
    )

    const payload = {
      orderId,
      // amount,
      // amount: finalAmount,
      amount: getFinalAmount(amount),
      payment_type: paymentType?.SINGLE_COLLEGE_CLOSING_RANK,
      closing_rank_details: {
        instituteName: rowData?.instituteName,
        instituteType: rowData?.instituteType,
        courseType: courseType,
        course: course,
        state: stateCode === "all" ? "All India" : state,
        stateCode:
          stateCode?.toLowerCase() === "all" ? "all" : stateCode.toLowerCase(),
      },
    }

    const res = await fetchData({
      url: "/api/purchase",
      method: "POST",
      data: payload,
    })

    console.log("Response: ", res)
    if (res?.success) {
      // setUpdateUI((prev) => !prev)

      const priceRes = await fetchData({
        url: "/api/payment",
        method: "POST",
        data: {
          // [paymentType?.SINGLE_COLLEGE_CLOSING_RANK]: amount,
          [paymentType?.SINGLE_COLLEGE_CLOSING_RANK]: finalAmount
        },
        noToast: true,
      })
      console.log("Price Response: ", priceRes)
      if (priceRes?.success) {
        router.push(
          `/closing-ranks/${stateCode}/college-details?state=${state}&college=${rowData?.instituteName}&courseType=${courseType}&course=${course || ""}&collegeCount=${tableData?.totalItems || 0}`,
        )
      }
    }

    setProcessingPayment(false)
  }

  async function successCallbackStatePayment(orderId: string) {
    setShowPaymentPopup(false)
    await fetchPurchases()
    showToast(
      "success",
      <p>
        Payment Successful
        <br />
        Thank You for purchasing!
      </p>,
    )

    const payload = {
      orderId,
      amount: stateAmount,
      payment_type:
        stateCode === "all"
          ? paymentType?.ALL_INDIA_CLOSING_RANK
          : paymentType?.STATE_CLOSING_RANK,
      closing_rank_details: {
        instituteName: rowData?.instituteName,
        instituteType: rowData?.instituteType,
        courseType: courseType,
        course: course,
        state: stateCode === "all" ? "All India" : state,
        stateCode:
          stateCode?.toLowerCase() === "all" ? "all" : stateCode.toLowerCase(),
        // year: configYear?.text,
      },
    }
    // console.log("Payload: ",payload)
    const res = await fetchData({
      url: "/api/purchase",
      method: "POST",
      data: payload,
    })
    // console.log("Res state datas: ",res)
    if (res?.success) {
      const priceRes = await fetchData({
        url: "/api/payment",
        method: "POST",
        data: {
          [stateCode === "all"
            ? paymentType?.ALL_INDIA_CLOSING_RANK
            : paymentType?.STATE_CLOSING_RANK]: stateAmount,
        },
        noToast: true,
      })

      if (priceRes?.success) {
        setStatePaymentPopup(false)
        setUpdateUI((prev) => !prev)
      }
    }

    setProcessingPayment(false)
  }

  function backURL() {
    return `/closing-ranks?courseType=${courseType}&course=${course}`
  }
  const handleClose = () => {
    setProcessingPayment(false)
    setShowPaymentPopup(false)
  }
  const showCollege =
    courseType?.toUpperCase().includes("UG")
      ? course === "MBBS"
        ? "Medical"
        : course === "BDS"
          ? "Dental"
          : course === "BAMS"
            ? "Ayurveda"
            : course === "BHMS"
              ? "Homeopathy"
              : "Medical"
      : "";

  const totalCost = amount * (tableData?.totalItems || 0)
  // const savingsPercent = ((totalCost - stateAmount) * 100) / stateAmount
  // const savingsMultiplier = (totalCost / stateAmount).toFixed(0)
  return (
    <FELayout>
      <div>
        <section className="w-full py-12 md:py-16 bg-gradient-to-r from-yellow-50 to-emerald-50 relative overflow-hidden">
          <Container className="container px-4 md:px-6">

            <div className="md:text-right">
              <Breadcrumbs />
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-3">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 capitalize text-color-table-header">
                  {state} {showCollege} Colleges
                </h1>
                <p className="text-gray-600">
                  {courseType}{" "}
                  {courseType?.includes("PG") ? prevYear : currentYear}
                  <span className="capitalize"> {state} </span> {showCollege} Colleges
                  List
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Main Content */}
        <section className="w-full">
          <Container className="container px-4 md:px-6">
            <div
              className={cn(
                "bg-sky-50 border border-sky-200 p-4 rounded-md text-color-text flex gap-2 pc:hidden overflow-hidden my-3",
              )}
            >
              <p className="animated-new text-center">
                Rotate your Phone to Landscape or Horizontal For Better view.
              </p>
            </div>
            <div className="flex flex-col-reverse md:flex-row md:items-end">
              {/* PageSize + Table */}
              <div className="flex justify-between items-center mb-4">
                <PageSizeSelector
                  pageSize={pageSize}
                  onChange={(size) => {
                    setPageSize(size)
                    setCurrentPage(1)
                    updateURL(1, size)
                    // getData(); 
                  }}
                />
              </div>
              {/* <div className="flex relative items-start md:justify-end flex-col md:flex-row w-full mb-4 mt-2 gap-2 md:gap-8"> */}
              <div className="flex relative flex-col-reverse md:flex-row md:justify-end md:items-end w-full w-full mb-4 mt-2 gap-2">
                <SearchAndSelect
                  name="instituteType"
                  labelNode={
                    <div className="md:text-lg text-sm font-bold text-nowrap">
                      Select Institute Type
                    </div>
                  }
                  // boxWrapperclassName="border-color-accent"
                  placeholder="Institute Type"
                  value={selectedInstituteType}
                  onChange={({ selectedValue }) => {
                    setSelectedInstituteType(selectedValue)
                    setCurrentPage(1) // reset page
                    updateURL(1, pageSize) // update URL
                    clearErrors("instituteType")
                  }}
                  control={control}
                  defaultOption={{
                    id: "",
                    text: "",
                  }}
                  setValue={setValue}
                  options={
                    stateCode?.toLowerCase() === "all"
                      ? allInstituteTypes(courseType)
                      : stateInstituteTypes
                  }
                  debounceDelay={0}
                  searchAPI={(text, setOptions) =>
                    autoComplete(
                      text,
                      stateCode?.toLowerCase() === "all"
                        ? allInstituteTypes(courseType)
                        : stateInstituteTypes,
                      setOptions,
                    )
                  }
                  wrapperclassName="w-full md:max-w-[200px]"
                  errors={errors}
                />
                {stateCode?.toLowerCase() === "all" && (
                  <SearchAndSelect
                    name="state"
                    labelNode={
                      <div className="md:text-lg text-sm font-bold text-nowrap">
                        Select State
                      </div>
                    }
                    placeholder="Select state"
                    value={selectedState}
                    // boxWrapperclassName="border-color-accent"
                    onChange={({ selectedValue }) => {
                      setSelectedState(selectedValue)
                      setCurrentPage(1) // reset page
                      updateURL(1, pageSize) // update URL
                      clearErrors("state")
                    }}
                    control={control}
                    setValue={setValue}
                    defaultOption={{
                      id: "",
                      text: "",
                    }}
                    required
                    errorclassName="absolute"
                    options={states}
                    debounceDelay={0}
                    wrapperclassName="w-full md:max-w-[200px]"
                    searchAPI={(text, setOptions) =>
                      autoComplete(text, states, setOptions)
                    }
                    disabled={isEmpty(states)}
                    errors={errors}
                  />
                )}
                {(selectedInstituteType?.text || selectedState?.text) && (
                  <Button
                    className="flex items-center gap-2 text-white p-3 relative text-sm bg-color-table-header hover:bg-color-table-header"
                    onClick={() => {
                      setSelectedInstituteType(undefined)
                      setSelectedState(undefined)
                    }}
                  >
                    <X size={18} />
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>

            <div className="offer-design">
              <div className="offer-banner">
                <span className="emoji" style={{ fontSize: "28px" }}>🎉</span>
                <span className="emoji2" style={{ fontSize: "18px" }}>🎁</span>
                <span className="text">
                  <span className="text-black first-unlock" >First Unlock @</span>
                  <span className="price text-orange-500" > ₹{amount === 99 ? 19 : 9}</span>
                  <span className="dot"> • </span>
                  <span className="first-unlock">Then</span>
                  <span className="price highlight text-orange-500" > ₹{amount} </span>
                  <span className="sub first-unlock">per college</span>
                  <span className="emoji1" style={{ fontSize: "18px" }}>🎁</span>
                </span>
              </div>
            </div>

            {/* <div className="offer-design-mobile">
              <div className="offer-banner-mobile">
                <span className="text-mobile">
                  <span className="text-black first-unlock" >First Unlock @</span>
                  <span className="price-mobile text-orange-500"> ₹{amount === 99 ? 19 : 9}</span>
                  <span> Then</span>
                  <span className="price-mobile highlight text-orange-500" > ₹{amount} </span>
                  <span className="sub-mobile">per college</span>
                  <span className="emoji1-mobile" style={{ fontSize: "18px" }}>🎁</span>
                </span>
              </div>
            </div> */}

            <div className="offer-design-mobile">
              <div className="offer-banner-mobile">
                <span className="text-mobile">
                  <span className="text-black first-unlock">First Unlock @</span>
                  <span className="price-mobile text-orange-500"> ₹{amount === 99 ? 19 : 9}</span>
                  <span> Then</span>
                  <span className="price-mobile highlight text-orange-500"> ₹{amount} </span>
                  <span className="sub-mobile">per college</span>
                  <span className="inline-flex items-center whitespace-nowrap ml-1">
                    🎁
                  </span>
                </span>
              </div>
            </div>


            <Table
              columns={generateCols()}
              data={tableData?.data}
              itemsCountPerPage={pageSize}
              loading={isLoading}
            />

            <Pagination
              currentPage={currentPage}
              totalItems={tableData?.totalItems}
              itemsCountPerPage={pageSize}
              wrapperclassName="pb-[20px]"
              onPageChange={(page) => {
                setCurrentPage(page)
              }}
            />
          </Container>
        </section>

        {/* {tableData?.data?.length > 0 &&
          !tableData?.data?.[0]?.statePurchased && (
            <section className="w-full py-12 px-3 flex justify-center">
              <div className="max-w-5xl w-full grid md:grid-cols-2 gap-6 items-stretch">

                <div className="bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xl">

                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold leading-snug">
                      Unlock Complete {state} Closing Ranks
                    </h2>

                    <p className="mt-3 text-blue-100 text-sm">
                      Get access to <strong>{tableData?.total_table_count || 0}</strong>{" "}
                      colleges across <br className="md:hidden" />
                      <strong>{state}</strong> round-wise closing ranks in one
                      place.
                    </p>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm text-blue-200">
                      Worth ₹{totalCost} If unlocked One by one, now just
                    </p>
                    <p className="text-3xl font-bold mt-1">
                      ₹{stateAmount}
                    </p>
                  </div>

                </div>

                <div className="bg-white border border-blue-100 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between">

                  <div className="space-y-4">

                    <div className="flex justify-between items-center border rounded-xl p-4 hover:border-blue-400 transition">
                      <div>
                        <p className="font-medium text-gray-900">Single College</p>
                        <p className="text-xs text-gray-500">Pay per college</p>
                      </div>
                      <p className="font-bold text-gray-900">₹{finalAmount}</p>
                    </div>

                    <div className="flex justify-between items-center border-2 border-blue-500 rounded-xl p-4 bg-blue-50 relative">

                      <span className="absolute -top-2.5 right-2 text-xs bg-color-accent text-white px-2 py-0.5 rounded">
                        Most Popular
                      </span>

                      <div>
                        <p className="font-medium text-blue-900">{state} Pack</p>
                        <p className="text-xs text-blue-600">Best value for all colleges</p>
                      </div>

                      <p className="font-bold text-blue-900 text-lg">₹{stateAmount}</p>
                    </div>

                  </div>

                  <button
                    className="mt-6 w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                    onClick={() => {
                      fetchData({
                        url: "/api/user",
                        method: "GET",
                        noToast: true,
                      }).then((user) => {
                        if (user?.success) {
                          setStatePurchaseMode(true)
                          setStatePaymentPopup(true)
                          setPaymentChecker(true)
                        } else {
                          setAppState({ signInModalOpen: true })
                        }
                      })
                    }}
                  >
                    Unlock Now
                    <ArrowRight size={18} />
                  </button>

                  <p className="text-xs text-gray-400 text-center mt-3">
                    🔒 Secure • Instant Access
                  </p>

                </div>

              </div>
            </section>
          )} */}

        <section className="hidden md:block w-full py-5 px-3 flex justify-center" style={{ display: "flex" }}>

          {/* Desktop View */}
          <div className="hidden md:block max-w-6xl w-full bg-white rounded-2xl shadow-md p-4 md:p-8">

            <div className="grid md:grid-cols-2 gap-6 items-center">

              <div>

                <span>
                  <h2 className="text-[22px] md:text-[45px] font-bold leading-snug">

                    <span className="text-blue-900">Unlock </span>

                    <span className="text-orange-500">All {state}’s</span>

                    <br className="hidden md:block" />

                  </h2>

                  <h2 className="text-2xl md:text-[45px] font-bold text-blue-900 leading-snug">
                    NEET PG Closing Ranks
                  </h2>
                </span>


                {/* 🔹 ACCESS TEXT */}
                <div className="mt-5 flex items-start gap-3">

                  {/* Icon Box */}


                  <div className="bg-blue-50 p-3 rounded-xl text-blue-600 flex items-center justify-center">
                    <Building2 size={40} />
                  </div>

                  {/* Text */}
                  <p className="text-gray-700 text-[14px] md:text-[18px] leading-relaxed">
                    Get access to{" "}
                    <span className="font-semibold text-blue-600">
                      {tableData?.total_table_count || 0} colleges
                    </span>{" "}
                    across {state} round-wise closing ranks in one place.
                  </p>
                </div>

                {/* Divider */}
                <div className="border-t border-dashed my-5"></div>

                {/* 🔹 PRICE INFO */}
                <div className="flex items-start gap-3">

                  {/* Gift Icon */}
                  <div className="bg-orange-50 p-3 rounded-xl text-orange-500 flex items-center justify-center">
                    <Gift size={40} />
                  </div>

                  {/* Text */}
                  <p className="text-gray-700 text-[14px] md:text-[18px] leading-relaxed">
                    Worth{" "}
                    <span className="line-through text-gray-400">
                      ₹{totalCost}
                    </span>{" "}
                    if unlocked one by one, now just{" "}
                    <span className="text-orange-500 font-bold text-lg">
                      ₹{stateAmount}
                    </span>
                  </p>
                </div>

                {/* 🔹 FEATURES */}
                <div className="mt-6 flex items-center justify-between border-t pt-4">

                  {/* Item 1 */}
                  <div className="flex items-center gap-3 flex-1">

                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                      <ShieldCheck size={25} />
                    </div>

                    <div>
                      <p className="text-[13px] font-medium text-gray-800">
                        No AI Data
                      </p>
                      <p className="text-[10px] text-gray-400">
                        100% Real Data
                      </p>
                    </div>

                  </div>

                  {/* Divider */}
                  <div className="h-8 w-px bg-gray-200"></div>

                  {/* Item 2 */}
                  <div className="flex items-center gap-3 flex-1 justify-center">

                    <div className="bg-orange-100 p-2 rounded-lg text-orange-500">
                      <Zap size={25} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-800">
                        Instant Access
                      </p>
                      <p className="text-[10px] text-gray-400">
                        Get access instantly
                      </p>
                    </div>

                  </div>

                  {/* Divider */}
                  <div className="h-8 w-px bg-gray-200"></div>

                  {/* Item 3 */}
                  <div className="flex items-center gap-3 flex-1 justify-end">

                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                      <Headphones size={25} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-800">
                        24/7 Support
                      </p>
                      <p className="text-[10px] text-gray-400">
                        We’re here to help
                      </p>
                    </div>

                  </div>

                </div>
              </div>

              {/* 💎 RIGHT PANEL */}
              <div className="flex flex-col gap-4">

                <div className="grid grid-cols-2 gap-4" style={{ height: "290px" }}>

                  {/* SINGLE */}
                  <div className="border border-gray-200 rounded-2xl text-center shadow-sm bg-white" style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>

                    <p className="text-[24px] font-semibold font-medium text-gray-700">
                      Single College
                    </p>

                    <p className="text-[14px] text-gray-400 mt-1">
                      Pay per college
                    </p>

                    {/* Divider */}
                    <div className="border-t border-dashed my-1"></div>

                    <p className="text-[32px] font-bold text-blue-900">
                      ₹{finalAmount}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      each
                    </p>

                    <div className="mt-4 inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-[16px] text-gray-600">
                      <CheckCircle size={16} className="text-blue-600" />
                      <span>Pay as you go</span>
                    </div>

                  </div>

                  {/* PACK */}
                  <div className="relative border-2 border-blue-600 rounded-2xl p-5 text-center bg-blue-50 shadow-sm" style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>

                    {/* Badge */}
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[16px] bg-orange-500 text-white px-3 py-1 rounded-md shadow">
                      Most Popular
                    </span>

                    <p className="text-[26px] font-semibold text-blue-900">
                      All {state} Pack
                    </p>

                    <p className="text-[14px] text-blue-600 mt-1">
                      Best value for all colleges
                    </p>

                    {/* Divider */}
                    <div className="border-t border-dashed my-1 border-blue-200"></div>

                    <p className="text-[32px] font-bold text-orange-500">
                      ₹{stateAmount}
                    </p>

                    <div className="mt-4 inline-flex items-center gap-1 bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-[16px] font-semibold">
                      <Tag size={16} className="text-blue-700" />
                      <span className="font-bold">
                        Save ₹{totalCost - stateAmount}+
                      </span>
                    </div>

                  </div>

                </div>

                {/* CTA BUTTON */}
                <button
                  className="mt-2 w-full py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition"
                  onClick={() => {
                    fetchData({
                      url: "/api/user",
                      method: "GET",
                      noToast: true,
                    }).then((user) => {
                      if (user?.success) {
                        setStatePurchaseMode(true)
                        setStatePaymentPopup(true)
                        setPaymentChecker(true)
                      } else {
                        setAppState({ signInModalOpen: true })
                      }
                    })
                  }}
                >
                  <span className="text-[16px] md:text-[18px] font-medium">
                    Unlock All Colleges @
                  </span>

                  <span className="text-[18px] md:text-[20px] font-bold">
                    ₹{stateAmount}
                  </span>

                  <ArrowRight size={25} />
                </button>

                <p className="text-[14px] text-gray-400 text-center flex justify-center gap-5 flex-wrap">
                  <span>🔒 One-time payment</span>
                  <span><span>• </span>Secure Payment</span>
                  <span><span>• </span> Valid for all rounds</span>
                </p>

              </div>
            </div>

            {/* BOTTOM STRIP */}
            <div className="mt-6 bg-white border rounded-2xl shadow-sm px-4 py-3 flex items-center justify-between">

              {/* Item 1 */}
              <div className="flex items-center gap-2 flex-1 justify-center">
                <div className="p-2 rounded-lg text-blue-600">
                  <ShieldCheck size={20} />
                </div>
                <p className="text-[9px] md:text-[12px] text-gray-700">
                  Trusted by <br />
                  <span className="font-semibold text-blue-600">
                    50,000+ Students
                  </span>
                </p>
              </div>

              {/* Divider */}
              <div className="h-8 w-px bg-gray-200"></div>

              {/* Item 2 */}
              <div className="flex items-center gap-2 flex-1 justify-center">
                <div className=" p-2 rounded-lg text-blue-600">
                  <Users size={20} />
                </div>
                <p className="text-[9px] md:text-[12px] text-gray-700">
                  {tableData?.total_table_count || 0} Colleges <br />
                  Across All India
                </p>
              </div>

              {/* Divider */}
              <div className="h-8 w-px bg-gray-200"></div>

              {/* Item 3 */}
              <div className="flex items-center gap-2 flex-1 justify-center">
                <div className=" p-2 rounded-lg text-blue-600">
                  <RefreshCcw size={20} />
                </div>
                <p className="text-[9px] md:text-[12px] text-gray-700">
                  Round-wise <br />
                  Closing Ranks
                </p>
              </div>

              {/* Divider */}
              <div className="h-8 w-px bg-gray-200"></div>

              {/* Item 4 */}
              <div className="flex items-center gap-2 flex-1 justify-center">
                <div className="p-2 rounded-lg text-blue-600">
                  <CheckCircle size={20} />
                </div>
                <p className="text-[9px] md:text-[12px] text-gray-700">
                  Accurate & Updated <br />
                  Real-time Data
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* Mobile View */}
        <section className="md:hidden w-full py-3 px-3">
          {/* <div className="px-2 py-2 bg-white rounded-2xl shadow-md p-4 space-y-4"> */}
          <div className="px-2 py-2 bg-white rounded-2xl p-4 space-y-4 
shadow-[0_-2px_10px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.12)]">
            {/* 🔵 HEADER */}
            <div className="flex justify-between items-start">

              <h2 className="text-[25px] font-bold leading-snug">
                <span className="text-blue-900">Unlock </span>
                <span className="text-orange-500">All India’s</span>
                <br />
                <span className="text-blue-900">
                  NEET PG Closing Ranks
                </span>
              </h2>

              {/* Trusted Box */}
              <div className="bg-blue-50 px-2 py-2 rounded-xl text-center text-[10px] text-blue-700" style={{ width: "70px", display: "flex", alignItems: "center", flexDirection: "column" }}>
                <ShieldCheck size={25} />
                Trusted by
                <span className="font-semibold">50,000+</span>
                Students
              </div>

            </div>

            {/* 🔹 ACCESS */}
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <Building2 size={16} />
              </div>
              <p className="text-sm text-gray-600">
                Get access to{" "}
                <span className="text-blue-600 font-semibold">
                  {tableData?.total_table_count || 0} colleges
                </span>{" "}
                across {state} round-wise closing ranks in one place.
              </p>
            </div>

            {/* 🔹 PRICE INFO */}
            <div className="flex items-center gap-3 border-t pt-3">
              <div className="bg-orange-100 p-2 rounded-lg text-orange-500">
                <Gift size={16} />
              </div>
              <p className="text-sm text-gray-600">
                If unlocked one by one, now just{" "}
                <span className="line-through text-gray-400">
                  ₹{totalCost}
                </span>{" "}
                now just{" "}
                <span className="text-orange-500 font-bold">
                  ₹{stateAmount}
                </span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">

              {/* SINGLE */}
              <div className="border rounded-xl p-3 text-center shadow-sm">
                <p className="text-[15px] text-gray-500">Single College</p>
                <p className="text-[12px] text-gray-400">Pay per college</p>

                <p className="text-[25px] font-bold mt-2 text-blue-900">
                  ₹{finalAmount}
                </p>
                <p className="text-[12px] text-gray-400">each</p>
              </div>

              {/* PACK */}
              <div className="border-2 border-blue-600 rounded-xl p-3 text-center bg-blue-50 relative">

                <span className="absolute -top-2 right-2 text-[12px] bg-orange-500 text-white px-2 py-0.5 rounded">
                  Most Popular
                </span>

                <p className="text-[15px] text-blue-900 font-semibold">
                  All India Pack
                </p>
                <p className="text-[12px] text-blue-600">Best value</p>

                <p className="text-[25px] font-bold mt-2 text-orange-500">
                  ₹{stateAmount}
                </p>

                <div className="mt-2 inline-flex items-center gap-1 bg-blue-200 text-blue-700 px-2 py-0.5 rounded-full text-[14px] font-bold">
                  <Tag size={12} />
                  Save ₹{totalCost - stateAmount}+
                </div>
              </div>

            </div>

            {/* 🔵 CTA */}
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold flex items-center justify-center gap-2 shadow-md">
              Unlock All Colleges @ ₹{stateAmount}
              <ArrowRight size={18} />
            </button>

            {/* 🔹 FEATURES */}

            <div className="mt-4 flex items-center justify-between">

              {/* Item 1 */}
              <div className="flex items-center gap-2 flex-1 justify-center">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <p className="text-[12px] font-medium text-gray-800">
                    No AI Data
                  </p>
                  <p className="text-[8px] text-gray-400">
                    100% Real Data
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-6 w-px bg-gray-200"></div>

              {/* Item 2 */}
              <div className="flex items-center gap-2 flex-1 justify-center">
                <div className="bg-orange-100 p-2 rounded-lg text-orange-500">
                  <Zap size={16} />
                </div>
                <div>
                  <p className="text-[12px] font-medium text-gray-800">
                    Instant Access
                  </p>
                  <p className="text-[8px] text-gray-400">
                    Get access instantly
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-6 w-px bg-gray-200"></div>

              {/* Item 3 */}
              <div className="flex items-center gap-2 flex-1 justify-center">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                  <Headphones size={16} />
                </div>
                <div>
                  <p className="text-[12px] font-medium text-gray-800">
                    24/7 Support
                  </p>
                  <p className="text-[8px] text-gray-400">
                    We’re here to help
                  </p>
                </div>
              </div>

            </div>

            {/* 🔹 FOOTER */}
            <p className="text-[11px] text-gray-400 text-center">
              One-time payment • Secure Payment • Valid for all rounds
            </p>

          </div>
        </section>

        <section className="w-full my-10">
          <Container className="container px-4 md:px-6">
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

              <Link
                href="https://wa.me/919028009835"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-6 py-3 rounded-lg shadow-md flex items-center gap-2"
              >
                <Users className="h-5 w-5" /> Book Counselling Session
              </Link>

            </div>
          </Container>
        </section>
      </div>
      <SignInPopup
        successCallback={() => {
          setUpdateUI((prev) => !prev)
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
      />



      <PaymentPopupCard
        isOpen={statePaymentPopup}
        onClose={() => setStatePaymentPopup(false)}
        onConfirm={() => setStatePaymentPopup(false)}
        paymentDescription="CollegeCutOff.net Payment for State Closing Ranks"
        title={
          <p className="p-0 uppercase poppinsFont">
            {`Please make payment to Unlock: All ${state}'s NEET ${course} Closing Ranks`}
          </p>
        }
        btnText={
          <>
            <span className="uppercase">UNLOCK NOW @ ₹{stateAmount}</span>
          </>
        }
        whatWillYouGet={
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li className="flex font-poppins gap-2">
              <CircleCheckBig className="w-5 h-5 text-primary text-green-600 flex-shrink-0" />

              <h3>
                {courseType?.toUpperCase().includes("UG")
                  ? `Access All Rounds of ${course} Cut-off (Rank/Marks) details (NEET UG 2025) for every college in ${stateCode?.toLowerCase() === "all" ? "MCC All India" : state}, covering all categories and quotas across ${stateCode?.toLowerCase() === "all" ? "Government & Deemed" : "Government & Private"} institutions.`
                  : courseType?.toUpperCase().includes("PG")
                    ? `Access All Round's of MD/MS/Diploma Cut-off Rank / Marks / Percentile Details (NEET PG ${["all", "br", "ka"].includes(stateCode?.toLowerCase() ?? "")
                      ? " 2025 & 2024"
                      //: "2024"
                      : "2025 & 2024"
                    }) for every college in ${state}, covering all specialization, category, and quota across Government & Private institutions.`
                    : courseType?.toUpperCase().includes("SS")
                      ? `Access All Round's Specialization Wise DM/MCH/DNBSS Cut-off Rank/Marks Details (NEET SS 2024) for Your Selected College or Hospital.`
                      : courseType?.toUpperCase().includes("MDS")
                        ? `Access All Round's MDS Cut-off Rank/Marks Details (NEET MDS 2025) – Specialization, Category and Quota Wise for Your Selected College.`
                        : courseType?.toUpperCase().includes("AIAPGET")
                          ? `Access All Round's Ayurveda PG Cut-off Rank/Marks Details (AIAPGET 2025) – Specialization, Category and Quota Wise for Your Selected College.`
                          : courseType?.toUpperCase().includes("DNB")
                            ? `Access All Round's of DNB/ DNB-Diploma Cut-off Rank/ Marks Details (NEET PG 2025) for every College and Hospital in All India, covering all specialization, category, and quota across Government & Private institutions.`
                            : "Access All Round's MD/MS/Diploma Cut-off Rank / Percentile Details (NEET PG 2024) – Specialization, Category & Quota Wise for Your Selected College."}
              </h3>
            </li>
            <li className="flex font-poppins gap-2">
              <CircleCheckBig className="w-5 h-5 text-primary text-green-600 flex-shrink-0" />
              <h3 className="text-[15px]">
                Data sourced from official counselling authorities
              </h3>
            </li>
            <li className="flex font-poppins gap-2">
              <CircleCheckBig className="w-5 h-5 text-primary text-green-600 flex-shrink-0" />

              <h3 className="text-[15px]">Instant Access after Payment!</h3>
            </li>
          </ul>
        }
        amount={stateAmount}
      />

      <UnlockPopover
        isOpen={showUnlockPopover}
        onClose={() => {
          setShowUnlockPopover(false);
          setProcessingPayment(false);
          setStatePurchaseMode(false);
        }}
        titleSingle={<p className="p-0 uppercase poppinsFont">Please make payment to Unlock: {rowData?.instituteName}</p>}
        titleState={<p className="p-0 uppercase poppinsFont">Please make payment to Unlock: All {state?.toUpperCase()} Colleges</p>}
        amount={finalAmount}
        stateAmount={stateAmount}
        stateName={state || ""}
        collegeCount={tableData?.total_table_count || 0}
        paymentDescription="CollegeCutOff.net Payment for Closing Ranks"
        courseType={courseType}
        course={course}
        initialTab="single"
        onBuySingle={() => {
          setProcessingPayment(rowData?.id);
          setPaymentChecker(true);
        }}
        onBuyState={() => {
          setProcessingPayment(rowData?.id);
          setStatePurchaseMode(true);
          setPaymentChecker(true);
        }}
        onConfirm={(verifyData) => {
          setShowUnlockPopover(false);
        }}
        stateCode={stateCode}
      />
      {
        paymentChecker && (
          <PaymentRedirectPopup
            successCallback={
              statePurchaseMode ? successCallbackStatePayment : successCallback
            }
          />
        )
      }
    </FELayout >
  )
}

