"use client"

import CheckoutPage from "@/components/homepage/CheckoutPage"
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";


if(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined){
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined")
}


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

export default function PaymentPage(){
    const searchParams = useSearchParams();
    const amount = parseFloat(searchParams.get("amount") || "100.99");
    return (
        <div className="max-w-6xl mx-auto p-10 text-white text-center boarder m-10 rounded-md bg-gradient-to-tr from-black to-gray-600">
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold mb-2">Muhammad Sajid</h1>
                <h2 className="text-2xl">has requested
                    <span className="font-bold">${amount}</span>
                </h2>
            </div>
            <Elements
            stripe={stripePromise}
            options={{
                mode:"payment",
                amount: convertToSubcurrency(amount),

                currency: "usd",
            }}
            >
                <CheckoutPage amount={amount}/>
            </Elements>
        </div>
    )
}