"use client";
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { Check, Coffee, CoffeeIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useToast } from '../ui/use-toast'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import getStripe from "~/lib/stripe/client";
import { formatAmountForDisplay } from "~/app/_utils";
import { createCheckoutSession } from "~/app/_actions/stripe";
import values from "~/config";


const Pricing = () => {
    const { toast } = useToast()
    const [money, setmoney] = useState(0)

    // const plans = []
    const features = [
        "Video Summary", 
        "Transcript",
        "Time Stamps",
        "AI chat assistant"
    ]
      const { CURRENCY, AMOUNT_STEP, MAX_AMOUNT, MIN_AMOUNT } = values;
      const [loading] = useState(false);
      const [input, setInput] = useState({
        template_price: Math.round(MAX_AMOUNT / AMOUNT_STEP / 3),
      });
      const [clientSecret, setClientSecret] = useState(null);
      const handleInputChange = (e) =>
        setInput({
          ...input,
          [e.currentTarget.name]: e.currentTarget.value,
        });

      const formAction = async (data) => {
        const uiMode = data.get("uiMode");
        const { client_secret, url } = await createCheckoutSession(data);

        if (uiMode === "embedded") return setClientSecret(client_secret);
        window.location.assign(url);
      };

    
    return (
      <div
        id="pricing"
        className="w-responsive flex flex-col justify-between gap-8 rounded-lg border px-8 py-6 md:flex-row md:items-center"
      >
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold md:text-5xl">
              <CoffeeIcon className="h-14 w-14" />
              <span>Buy me coffee</span>
            </h2>
            {/* <p className="text-[#536174]">For Individuals and Small Teams</p> */}
          </div>
          <div className="flex items-center">
            <span className="text-3xl font-bold md:text-5xl">
              ${input.template_price}
            </span>
            {/* <span className="text-sm text-[#98A2B2]"> per month</span> */}
          </div>
          <div>
            <>
              <form action={formAction} className='space-y-4'>
                <input type="hidden" name="uiMode" value={"hosted"} />
                {/* <input type="hidden" name="template_id" value={props.templateId} /> */}
                <label className="my-2 flex flex-col items-center justify-center">
                  <input
                    type="range"
                    className="range w-full bg-black accent-gray-900"
                    name="template_price"
                    min={MIN_AMOUNT}
                    max={MAX_AMOUNT}
                    step={AMOUNT_STEP}
                    currency={CURRENCY}
                    onChange={handleInputChange}
                    value={input.template_price}
                  ></input>
                  {/* <span>
                  {formatAmountForDisplay(MIN_AMOUNT, CURRENCY)}-
                  {formatAmountForDisplay(MAX_AMOUNT, CURRENCY)}
                </span> */}
                </label>
                <button
                  className="w-full rounded-full bg-black py-3 font-semibold text-white"
                  type="submit"
                  disabled={loading}
                >
                  Support with {formatAmountForDisplay(input.template_price, CURRENCY)}
                </button>
              </form>
              {clientSecret ? (
                <EmbeddedCheckoutProvider
                  stripe={getStripe()}
                  options={{ clientSecret }}
                >
                  <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
              ) : null}
            </>
          </div>
        </div>

        {/* features */}
        <div className="flex w-full flex-col gap-8 md:h-full md:w-1/2">
          <div className="flex-1 space-y-4">
            <div className="space-y-1">
              <h3 className="text-2xl font-medium">Features</h3>
              <p className="text-[#536174]">Everything you get in this plan</p>
            </div>
            <ul className="space-y-6 *:text-[#536174]">
              {features.map((feature, index) => {
                return (
                  <li key={index} className="flex items-center gap-4">
                    <Check />
                    <p>{feature}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* button claim */}
          {/* <button onClick={() => {
            toast({
              title: "Congratulations 🎉",
              description: "You have sucessfully claimed this plan.",
            });}} 
          className="w-full rounded-full bg-black py-3 font-semibold text-white">
            Support with ${input.template_price}
          </button> */}
        </div>
      </div>
    );
}

export default Pricing




