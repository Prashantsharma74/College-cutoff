"use client"

import { BELayout } from "@/components/admin-panel/BELayout"
import { Heading } from "@/components/admin-panel/Heading"
import { Button } from "@/components/common/Button"
import { Card } from "@/components/common/Card"
import { Input } from "@/components/common/Input"
import SearchAndSelect from "@/components/common/SearchAndSelect"
import { TableAddButton } from "@/components/common/Table/TableAddButton"
import { ConfirmationPopup } from "@/components/common/popups/ConfirmationPopup"
import { useAppState } from "@/hooks/useAppState"
import useFetch from "@/hooks/useFetch"
import { IOption } from "@/types/GlobalTypes"
import { PGCourseSubTypeList } from "@/utils/static"
import {
  autoComplete,
  cn,
  isEmpty,
  onOptionSelected,
  shouldRenderComponent,
} from "@/utils/utils"
import { X } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { Tooltip } from "react-tooltip"

const courseType: IOption[] = [
  { id: "ug", text: "UG" },
  { id: "pg", text: "PG" },
]

export default function ConfigureCoursesPage() {
  const [configList, setConfigList] = useState<any[]>([])
  const [initialConfigList, setInitialConfigList] = useState<any[]>([])
  const [popupOpen, setPopupOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [buttonText, setButtonText] = useState("Save Changes")
  const [newCourse, setNewCourse] = useState("")
  const [renderTable, setRenderTable] = useState(false)

  const [formData, setFormData] = useState<any>({})
  const [coursesList, setCoursesList] = useState<IOption[]>([])

  const [courseTypeList, setCourseTypeList] = useState<IOption[]>([])
  const [searchText, setSearchText] = useState("");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ shouldFocusError: true })
  const { fetchData } = useFetch()
  const { showToast } = useAppState()

  const [updateMode, setUpdateMode] = useState<string>("")
  const { appState } = useAppState()
  const listRef = useRef<HTMLUListElement>(null)

  async function getCourses() {
    try {
      const res = await fetch("/api/get-courses-types")
      const json = await res.json()
      if (!json?.data || !Array.isArray(json.data)) {
        console.error(
          "Invalid data structure from /api/get-courses-types",
          json,
        )
        return []
      }

      const data = json.data.map((q: IOption) => ({
        id: q.id,
        text: q.type,
        type: q.type,
      }))
      return data
    } catch (error) {
      console.error("getCourses error:", error)
      return [] // Always return fallback
    }
  }

  async function getCoursesBasedOnCourseType(type: string) {
    setRenderTable(true)
    try {
      const res = await fetch(
        `/api/get-courses?type=${encodeURIComponent(type)}`,
      )
      const { data } = await res.json()

      if (Array.isArray(data)) {
        const mapped = data.map((item) => ({
          id: item.id,
          text: item.text, // <-- mapping `type` to `text` key
          type: item.type,
        }))
        setCoursesList(mapped)

        setConfigList(mapped)
        setInitialConfigList(mapped)
      } else {
        setCoursesList([])
      }

      // console.log("Mapped Course List data: ", data, type)
    } catch (error) {
      console.log("Error in course list fetch", error)
    } finally {
      // setRenderTable(false)
    }
  }
  const courseType = async () => {
    try {
      const data = await getCourses()
      setCourseTypeList(data)
      // console.log("Course Data: ", data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    courseType()
  }, [])

  const filteredList = configList.filter((item) =>
    item.text.toLowerCase().includes(searchText.toLowerCase())
  );

  async function getData(type: string) {
    const res = await fetchData({
      url: "/api/admin/configure/courses/get",
      params: { type },
    })
    if (res?.success) {
      setConfigList(res?.payload?.data || [])
      setInitialConfigList(res?.payload?.data || [])
    }
  }

  // function addNewRow() {
  //   setConfigList((prev) => [{ id: null, text: "" }, ...prev])
  //   listRef.current?.scrollTo({ top: 0, behavior: "smooth" })
  // }

  function addNewRow() {
    setConfigList((prev) => [{ id: null, text: "", editing: true }, ...prev])
    listRef.current?.scrollTo({ top: 0, behavior: "smooth" })
  }


  //   add
  async function addNewCourse() {
    if (!newCourse) return


    const res = await fetchData({
      url: "/api/admin/configure/courses/add",
      method: "POST",
      data: {
        courseType: formData?.courseType?.type,
        course: newCourse,
      },
    })

    if (res?.success) {
      // console.log("Data added ",res?.payload)
      showToast("success", res?.payload?.msg)
      getData(res?.payload?.data.type)
    } else {
      showToast("error", "Failed to add options")
    }
  }

  async function updateData(id: number, newText: string) {
    if (!newCourse) return

    const res = await fetchData({
      url: "/api/admin/configure/courses/update",
      method: "POST",
      data: {
        id,
        text: newCourse.trim(),
      },
    })

    if (res?.success) {
      //  getData()
      showToast("success", "Updated successfully")
      getData(res?.payload?.data.type)
    }
  }

  function removeNewRow(index: number) {
    setConfigList((prev) => prev.filter((_, i) => i !== index))
  }

  async function deleteData() {
    if (!deleteId) return

    const res = await fetchData({
      url: "/api/admin/configure/courses/delete",
      method: "POST",
      data: { id: deleteId },
    })

    if (res?.success) {
      showToast("success", res?.payload?.msg)
      getData(formData?.courseType?.type)
      setPopupOpen(false)
    } else {
      showToast("error", "Failed to delete")
    }
  }

  const isSaveDisabled =
    configList?.length === 0 ||
    configList?.some((item) => item.text.trim() === "") ||
    JSON.stringify(configList) === JSON.stringify(initialConfigList)
  return (
    <BELayout className="mb-10 tab:mb-0">
      <Heading>Configure Courses</Heading>

      <Card className="mt-4 p-6 min-h-80">
        <div className="w-full flex max-w-[500px] items-center gap-4">
          <SearchAndSelect
            name="courseType"
            label="Course Type"
            placeholder="Select"
            value={formData?.courseType}
            onChange={({ name, selectedValue }) => {
              onOptionSelected(name, selectedValue, setFormData)
              // if (selectedValue?.id === "ug") {
              //   setRenderTable(true)
              //   getData("ug")
              // } else {
              //   setRenderTable(false)
              // }
              getCoursesBasedOnCourseType(selectedValue?.text)
              // setFormData((prev) => ({
              //   ...prev,
              //   courseType: selectedValue,
              //   counsellingType: undefined,
              // }))
            }}
            control={control}
            setValue={setValue}
            required
            options={courseTypeList}
            debounceDelay={0}
            wrapperClass="max-w-[150px] w-full"
            searchAPI={(text, setOptions) =>
              autoComplete(text, courseTypeList, setOptions)
            }
            errors={errors}
          />

          {/* {formData?.courseType?.id === "pg" && (
            <SearchAndSelect
              name="subType"
              label="Sub Type"
              placeholder="Select"
              value={formData?.subType}
              onChange={({ name, selectedValue }) => {
                onOptionSelected(name, selectedValue, setFormData)
                setRenderTable(true)
                getData("pg", selectedValue.text)
              }}
              control={control}
              setValue={setValue}
              required
              options={PGCourseSubTypeList}
              debounceDelay={0}
              wrapperClass="max-w-full w-full"
              searchAPI={(text, setOptions) =>
                autoComplete(text, PGCourseSubTypeList, setOptions)
              }
              errors={errors}
            />
          )} */}
        </div>

        {renderTable && (
          <div
            className="w-full "
          // onSubmit={handleSubmit(addNewCourse)}
          >
            <div className="text-xl text-color-text mt-8 mb-4 flex items-center justify-between">
              Courses Options
              <TableAddButton title="Add More" onClick={addNewRow} />

              {/* Added Search feature  */}
              {/* <div className="flex items-center gap-3">

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-[200px]"
                  />

                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
                    🔍
                  </span>
                </div>

                <TableAddButton title="Add More" onClick={addNewRow} />

              </div> */}
            </div>

            {shouldRenderComponent(
              [isEmpty(configList), !appState.isLoading],
              "AND",
            ) && (
                <div className="text-color-subtext text-center mt-10 mb-2 w-full border border-color-border py-10">
                  No options to show <br /> Please add some...
                </div>
              )}

            <ul
              ref={listRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-gray-200 rounded-xl overflow-hidden"
            >
              {configList?.map((item, index) => (
                <li
                  key={index}
                  className="border-b border-r border-gray-200 p-3 flex flex-col gap-3"
                >

                  {/* TEXT / INPUT */}
                  {item.editing ? (
                    <Input
                      name={String(index)}
                      placeholder="Enter course name"
                      value={item.text}
                      setValue={setValue}
                      onChange={(e) => setNewCourse(e.target.value)}
                      control={control}
                      errors={errors}
                      wrapperClass="w-full"
                    />
                  ) : (
                    <div className="text-gray-800 font-medium text-sm">
                      {item.text}
                    </div>
                  )}

                  {/* ACTIONS */}
                  <div className="flex gap-2 flex-wrap">

                    {item.id ? (
                      item.editing ? (
                        <>
                          <Button
                            size="sm"
                            className="bg-blue-600 text-white px-3 py-1.5"
                            onClick={() => updateData(item.id, newCourse)}
                          >
                            Save
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500"
                            onClick={() => {
                              const updated = [...configList]
                              updated[index] = {
                                ...initialConfigList[index],
                                editing: false,
                              }
                              setConfigList(updated)
                            }}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              const updated = [...configList]
                              updated[index].editing = true
                              setConfigList(updated)
                            }}
                          >
                            Edit
                          </Button>

                          <Button
                            size="sm"
                            variant="destructive"
                            disabled={initialConfigList?.length === 1}
                            onClick={() => {
                              setDeleteId(item.id)
                              setPopupOpen(true)
                            }}
                          >
                            Delete
                          </Button>
                        </>
                      )
                    ) : (
                      <>
                        <Button
                          size="sm"
                          className="bg-blue-600 text-white"
                          onClick={addNewCourse}
                        >
                          Add
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeNewRow(index)}
                        >
                          Cancel
                        </Button>
                      </>
                    )}

                  </div>

                </li>
              ))}
            </ul>

            {/* <ul
              ref={listRef}
              className="flex flex-col gap-3 max-h-[calc(100vh-100px)] overflow-y-auto"
            >
              {configList?.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between gap-2 text-color-subtext py-2 mr-4 text-sm max-w-[450px]"
                >
                  {item.editing ? (
                    <Input
                      name={String(index)}
                      placeholder="Enter here"
                      value={item.text}
                      setValue={setValue}
                      onChange={(e) => setNewCourse(e.target.value)}
                      control={control}
                      errors={errors}
                      wrapperClass={cn(
                        "w-full",
                        String(index) === updateMode && "z-[1001]",
                      )}
                    />
                  ) : (
                    <div className="w-full px-3 py-3 border border-color-border rounded-md">
                      {item.text}
                    </div>
                  )}

                  <div className="flex gap-2">
                    {item.id ? (
                      <>
                        {item.editing ? (
                          <>
                            <Button
                              size="sm"
                              className="p-3.5"
                              onClick={() => {
                                // const updated = [...configList]
                                // updated[index].editing = false
                                // setConfigList(updated)
                                // updateData(item.id, item.text)
                                updateData(item.id, newCourse)
                              }}
                            >
                              Update
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-500 p-3"
                              onClick={() => {
                                const updated = [...configList]
                                updated[index] = {
                                  ...initialConfigList[index],
                                  editing: false,
                                }
                                setConfigList(updated)
                              }}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="p-3"
                              onClick={() => {
                                const updated = [...configList]
                                updated[index].editing = true
                                setConfigList(updated)
                              }}
                            >
                              Edit
                            </Button>

                            <Button
                              size="sm"
                              variant="destructive"
                              className="p-3"
                              disabled={initialConfigList?.length === 1}
                              onClick={() => {
                                if (initialConfigList?.length === 1) return
                                setDeleteId(item.id)
                                setPopupOpen(true)
                              }}
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          className="p-3"
                          onClick={() => {
                         
                            // if (item.text.trim()) {
                            // const updated = [...configList]
                            // updated[index].editing = false
                            // setConfigList(updated)
                            addNewCourse()
                            // }
                          }}
                        >
                          Add
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 p-3.5"
                          onClick={() => removeNewRow(index)}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul> */}
            {/* 
            <div className="flex mt-8 items-center justify-end mb-8">
              <Button className="py-2" type="submit" disabled={isSaveDisabled}>
                {buttonText}
              </Button>
            </div> */}
          </div>
        )}
      </Card>

      {updateMode && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.4)] z-[1000]"></div>
      )}

      <ConfirmationPopup
        isOpen={popupOpen}
        title="Are You Sure You Want To Delete?"
        text="This action cannot be undone."
        onClose={() => setPopupOpen(false)}
        onConfirm={deleteData}
      />

      <Tooltip id="tooltip" place="top" className="z-[1100]" />
    </BELayout>
  )
}

