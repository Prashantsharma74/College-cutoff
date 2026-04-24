// import { NextRequest, NextResponse } from "next/server"
// import Razorpay from "razorpay"
// import { v4 } from "uuid"

// const razorpay = new Razorpay({
//   key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
//   key_secret: process.env.RAZORPAY_KEY_SECRET!,
// })

// export async function POST(request: NextRequest) {
//   try {
//     const { amount, currency = "INR" } = await request.json()

//     // Generate a UUID and truncate it to fit within 40 characters with prefix
//     const uuid = v4() // e.g., "550e8400-e29b-41d4-a716-446655440000" (36 chars)
//     const shortReceipt = `rcpt_${uuid}`.substring(0, 40) // "rcpt_" (5 chars) + truncated UUID

//     const options = {
//       amount: amount * 100, // Razorpay expects amount in paisa
//       currency,
//       receipt: shortReceipt, // Ensure this is 40 characters or less
//     }

//     const order = await razorpay.orders.create(options)

//     return NextResponse.json(
//       {
//         orderId: order.id,
//         amount: order.amount,
//         currency: order.currency,
//       },
//       { status: 200 },
//     )
//   } catch (error) {
//     console.error("Error creating order:", error)
//     return NextResponse.json(
//       { message: "Failed to create order" },
//       { status: 500 },
//     )
//   }
// }


import { NextRequest, NextResponse } from "next/server"
import Razorpay from "razorpay"
import { v4 } from "uuid"
import { createClient } from "@supabase/supabase-js"

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)


export async function POST(request: NextRequest) {
  try {
    const { phone, currency = "INR" } = await request.json()
    
    const formatPhone = (phone: string) => {
      const digits = phone.replace(/\D/g, "").slice(-10);
      return "91" + digits;
    };
    
    const cleanPhone = formatPhone(phone);

    const { data: orders } = await supabase
      .from("purchase")
      .select("*")
      .eq("phone", cleanPhone);

    const isEligible = !orders || orders.length === 0;

    const finalAmount = isEligible ? 9 : 49;

    const uuid = v4()
    const shortReceipt = `rcpt_${uuid}`.substring(0, 40)

    const order = await razorpay.orders.create({
      amount: finalAmount * 100,
      currency,
      receipt: shortReceipt,
      notes: { phone },
    })

    console.log("PHONE:", phone)
    console.log("ORDERS:", orders)

    return NextResponse.json(
      {
        orderId: order.id,
        amount: finalAmount,
        currency: order.currency,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json(
      { message: "Failed to create order" },
      { status: 500 }
    )
  }
}