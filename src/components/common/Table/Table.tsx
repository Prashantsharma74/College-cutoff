import { cn, isEmpty, shouldRenderComponent } from "@/utils/utils"
import { useSearchParams } from "next/navigation"
import React, { ReactNode, useEffect, useState } from "react"
import { isMobile } from "react-device-detect"
import { Loader } from "../Loader"
import { Loader2Icon } from "lucide-react"

interface TableProps {
  columns: TableColumn[]
  data: any[]
  hideSLNo?: boolean
  selectable?: boolean
  itemsCountPerPage?: number
  className?: string
  loading?: boolean
  onChange?: (selectedRows: any[]) => void
  renderBelowTable?: React.ReactNode
}

export interface TableColumn {
  title: ReactNode
  tableKey: string
  width?: string
  hidden?: boolean

  overrideInternalClick?: boolean
  disableMobStaticLeft?: boolean
  renderer?: (props: {
    rowData: any
    cellData: React.ReactNode
  }) => React.ReactNode
}

const headerTHClass =
  "border-b border-color-border px-4 py-3 text-left text-white font-medium text-sm title"

export function Table({
  selectable,
  hideSLNo,
  columns,
  className,
  data,
  onChange,
  itemsCountPerPage,
  renderBelowTable,
  loading
}: TableProps) {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
  const searchParams = useSearchParams()

  useEffect(() => {
    setSelectedRows(new Set())
    onChange?.([])
  }, [data])

  const handleSelectRow = (index: number) => {
    const newSelectedRows = new Set(selectedRows)
    if (newSelectedRows.has(index)) {
      newSelectedRows.delete(index)
    } else {
      newSelectedRows.add(index)
    }
    setSelectedRows(newSelectedRows)
    onChange?.(Array.from(newSelectedRows).map((i) => data[i]))
  }

  const handleSelectAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set())
      onChange?.([])
    } else {
      const allSelected = new Set(data.map((_, index) => index))
      setSelectedRows(allSelected)
      onChange?.(data)
    }
  }

  function getRowSLNumber(rowIndex: number) {
    let pageSize = 10
    if (itemsCountPerPage) {
      pageSize = itemsCountPerPage
    }

    return (
      (parseInt(searchParams.get("page") || "1") - 1) * pageSize +
      (rowIndex + 1)
    )
  }

  function handleStaticLeft(column: TableColumn, isHeader?: boolean) {
    const bgColor = isHeader ? "bg-color-table-header" : "bg-color-white_black"

    if (column?.tableKey === "instituteName") {
      if (column?.disableMobStaticLeft && isMobile) {
        return ""
      }
      return `tableStaticLeft ${bgColor}`
    }

    return ""
  }

  function handleBold(tableKey: string) {
    if (tableKey.includes("Round") || tableKey.includes("Rank")) {
      return "!font-[500]"
    }
  }

  console.log("Columns", columns)

  return (
    // <div className={cn("relative")}>
    //   <div
    //     className={cn(
    //       "overflow-auto border rounded-lg border-color-border relative min-h-[543px] max-h-[750px]",
    //       data?.length === 10 && "min-h-0",
    //       isMobile &&
    //       "landscape:min-h-[250px] landscape:max-h-[calc(100vh-10px)]",
    //       className,
    //     )}
    //   >
    //     <table className="min-w-full table-fixed border-separate border-spacing-y-2">

    //       {/* 🔹 HEADER */}
    //       <thead className="sticky top-0 z-[11]">
    //         <tr className="bg-blue-500 text-white text-xs uppercase">

    //           {selectable && (
    //             <th
    //               className={cn(
    //                 "border-b border-color-border p-3 tableCheckboxStatic bg-color-table-header",
    //               )}
    //             >
    //               <input
    //                 className="translate-y-[2px]"
    //                 type="checkbox"
    //                 checked={
    //                   selectedRows?.size === data?.length && !isEmpty(data)
    //                 }
    //                 onChange={handleSelectAll}
    //               />
    //             </th>
    //           )}

    //           {!hideSLNo && (
    //             <th className="px-4 py-3 text-left rounded-l-lg">#</th>
    //           )}

    //           {columns?.map((column, index) => (
    //             <th
    //               key={index}
    //               className={cn(
    //                 "uppercase",
    //                 "px-4 py-3 text-left",
    //                 index === columns.length - 1 && "rounded-r-lg"
    //               )}
    //             >
    //               {column?.title}
    //             </th>
    //           ))}
    //         </tr>
    //       </thead>

    //       <tbody>
    //         {loading ? (
    //           <tr>
    //             <td
    //               colSpan={(columns?.length || 0) + (hideSLNo ? 0 : 1)}
    //               className="py-16 text-center"
    //             >
    //               <div className="flex flex-col items-center justify-center gap-3 text-gray-500">

    //                 <Loader2Icon className="animate-spin text-orage-500 w-8 h-8" />

    //                 <p className="text-sm font-medium">
    //                   Loading data...
    //                 </p>

    //               </div>
    //             </td>
    //           </tr>
    //         ) : data?.length > 0 ? (
    //           data.map((row, rowIndex) => (
    //             <tr
    //               key={rowIndex}
    //               className="bg-white shadow-sm hover:shadow-md transition rounded-lg"
    //             >
    //               {!hideSLNo && (
    //                 <td className="px-4 py-3 text-[13px] rounded-l-lg">
    //                   {getRowSLNumber(rowIndex)}
    //                 </td>
    //               )}

    //               {columns?.map((column, colIndex) => {
    //                 return (
    //                   <td
    //                     key={colIndex}
    //                     className={cn(
    //                       "px-4 py-3 text-[13px]",
    //                       colIndex === columns.length - 1 && "rounded-r-lg"
    //                     )}
    //                   >
    //                     <div className="flex items-center">
    //                       {column?.renderer
    //                         ? column?.renderer({
    //                           rowData: row,
    //                           cellData: row[column?.tableKey],
    //                         })
    //                         : shouldRenderComponent(
    //                           [
    //                             row[column?.tableKey] === "-",
    //                             !row[column?.tableKey],
    //                           ],
    //                           "OR",
    //                         )
    //                           ? "NA"
    //                           : row[column?.tableKey]}
    //                     </div>
    //                   </td>
    //                 )
    //               })}
    //             </tr>
    //           ))
    //         ) : (
    //           <tr>
    //             <td
    //               colSpan={(columns?.length || 0) + (hideSLNo ? 0 : 1)}
    //               className="py-16 text-center"
    //             >
    //               <div className="flex flex-col items-center justify-center gap-2 text-gray-500">

    //                 <span className="text-3xl">📭</span>

    //                 <p className="text-sm font-medium">
    //                   No data available
    //                 </p>

    //                 <p className="text-xs text-gray-400">
    //                   Try changing filters or search
    //                 </p>

    //               </div>
    //             </td>
    //           </tr>
    //         )}
    //       </tbody>

    //     </table>

    //     {renderBelowTable}
    //   </div>
    // </div>

    <div className="w-full">

      {/* 🔹 DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto">

        <table className="min-w-full border-separate border-spacing-y-2">

          {/* HEADER */}
          <thead className="sticky top-0 z-10">
            <tr className="bg-gradient-to-r from-orange-600 to-orange-500 text-white text-xs uppercase">

              {!hideSLNo && (
                <th className="px-4 py-3 text-left rounded-l-lg">#</th>
              )}

              {columns.map((col, i) => (
                <th key={i} className="px-4 py-3 text-left">
                  {col.title}
                </th>
              ))}

            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} className="py-16 text-center">
                  <Loader2Icon className="animate-spin mx-auto text-orange-500" />
                </td>
              </tr>
            ) : data?.length > 0 ? (
              data.map((row, i) => (
                <tr
                  key={i}
                  className="bg-white shadow-sm hover:shadow-lg transition rounded-xl"
                >

                  {!hideSLNo && (
                    <td className="px-4 py-3 rounded-l-xl">
                      {getRowSLNumber(i)}
                    </td>
                  )}

                  {columns?.map((column, colIndex) => {
                    return (
                      <td
                        key={colIndex}
                        className={cn(
                          "px-4 py-3 text-[13px]",
                          colIndex === columns.length - 1 && "rounded-r-lg"
                        )}
                      >
                        <div className="flex items-center">
                          {column?.renderer
                            ? column?.renderer({
                              rowData: row,
                              cellData: row[column?.tableKey],
                            })
                            : shouldRenderComponent(
                              [
                                row[column?.tableKey] === "-",
                                !row[column?.tableKey],
                              ],
                              "OR",
                            )
                              ? "NA"
                              : row[column?.tableKey]}
                        </div>
                      </td>
                    )
                  })}

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="py-16 text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 MOBILE CARD VIEW */}
      {/* <div className="md:hidden flex flex-col gap-3">

        {loading ? (
          <div className="text-center py-10">
            <Loader2Icon className="animate-spin mx-auto text-orange-500" />
          </div>
        ) : data?.length > 0 ? (
          data.map((row, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-4 flex flex-col gap-2"
            >

              <div className="flex justify-between text-xs text-gray-500">
                <span>#{getRowSLNumber(i)}</span>
              </div>

              {columns.map((col, j) =>
                col.tableKey !== "action" ? (
                  <div key={j} className="flex justify-between text-sm">
                    <span className="text-gray-500">{col.title}</span>
                    <span className="font-medium">
                      {row[col.tableKey] || "NA"}
                    </span>
                  </div>
                ) : null
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No data available
          </div>
        )}

      </div> */}

      <div className="md:hidden flex flex-col gap-3">

        {loading ? (
          <div className="text-center py-10">
            <Loader2Icon className="animate-spin mx-auto text-orange-500" />
          </div>
        ) : data?.length > 0 ? (
          data.map((row, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-4 flex flex-col gap-3"
            >

              {/* 🔹 SL */}
              <div className="flex justify-between text-xs text-gray-500">
                <span>#{getRowSLNumber(i)}</span>
              </div>

              {/* 🔹 DATA */}
              {/* {columns.map((col, j) =>
                col.tableKey !== "action" ? (
                  <div key={j} className="flex justify-between text-sm">
                    <span className="text-gray-500">{col.title}</span>
                    <span className="font-medium">
                      {row[col.tableKey] || "NA"}
                    </span>
                  </div>
                ) : null
              )} */}

              {columns.map((col, j) => {
                const cellData = row[col.tableKey]

                return (
                  <div key={j} className="flex justify-between text-sm items-center">

                    <span className="text-gray-500">{col.title}</span>

                    <span className="font-medium text-right">
                      {col.renderer
                        ? col.renderer({
                          rowData: row,
                          cellData: cellData,
                        })
                        : cellData || "NA"}
                    </span>

                  </div>
                )
              })}

            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No data available
          </div>
        )}

      </div>

    </div>
  )
}