// import crypto from "crypto"
// import { NextRequest, NextResponse } from "next/server"

// export async function POST(request: NextRequest) {
//   try {
//     const { orderId, paymentId, signature } = await request.json()

//     const generatedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
//       .update(`${orderId}|${paymentId}`)
//       .digest("hex")

//     if (generatedSignature === signature) {
//       return NextResponse.json(
//         { message: "Payment verified successfully", isOk: true },
//         { status: 200 },
//       )
//     } else {
//       return NextResponse.json(
//         { message: "Payment verification failed", isOk: false },
//         { status: 400 },
//       )
//     }
//   } catch (error) {
//     console.error("Error verifying payment:", error)
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 },
//     )
//   }
// }

// by prashant 
import crypto from "crypto"
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { orderId, paymentId, signature, phone } = await request.json()

    const formatPhone = (phone: string) => {
      const digits = phone.replace(/\D/g, "").slice(-10);
      return "91" + digits;
    };

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${orderId}|${paymentId}`)
      .digest("hex")

    if (generatedSignature === signature) {

      const cleanPhone = formatPhone;

      await supabase.from("purchase").insert({
        phone: cleanPhone,
        order_id: orderId,
        payment_id: paymentId,
        status: "success",
      });

      return NextResponse.json(
        { message: "Payment verified successfully", isOk: true },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { message: "Payment verification failed", isOk: false },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error("Error verifying payment:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}