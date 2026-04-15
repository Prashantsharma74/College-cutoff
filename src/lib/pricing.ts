import { supabase } from "@/lib/supabase"

// 🔹 check new user
export async function isNewUser(phone: string) {
  const { data, error } = await supabase
    .from("purchase")
    .select("id")
    .eq("phone", phone)

  if (error) {
    console.error(error)
    return false
  }

  return data.length === 0
}

// 🔹 get original price
export async function getOriginalPrice(type: string, item: string) {
  const { data } = await supabase
    .from("price")
    .select("price")
    .eq("type", type)
    .eq("item", item)
    .single()

  return data?.price || 99
}

// 🔹 final price
export async function getFinalPrice(phone: string, type: string, item: string) {
  const newUser = await isNewUser(phone)
  const original = await getOriginalPrice(type, item)

  return {
    price: newUser ? 9 : original,
    originalPrice: original,
    isNewUser: newUser
  }
}