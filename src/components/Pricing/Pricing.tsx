"use client";
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { Check, Coffee, CoffeeIcon, Cross } from 'lucide-react'
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
import Button from '../ui/Button';
import { CgClose } from 'react-icons/cg';
import Link from 'next/link';


const Pricing = () => {
    const { toast } = useToast()
    const [money, setmoney] = useState(0)

    // const plans = []
    const features = [
      "Video Summary",
      "Transcript",
      "Time Stamps",
      "AI chat assistant",
      "Custom Domain",
    ];

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
        className="w-responsive flex flex-col items-center justify-center  gap-8 rounded-xl *:w-1/2 *:rounded-lg *:border-2 *:px-6 *:py-8 md:flex-row *:md:flex-row *:md:items-center "
      >
        {/* features */}
        <div className="flex flex-nowrap items-center  justify-center">
          <div className="flex w-full flex-col gap-8 md:h-full">
            <div className="flex-1 space-y-4">
              <div className="space-y-1">
                <h3 className="text-2xl font-medium">Free Plan</h3>
                <p className="text-[#536174]">
                  Everything you get in this plan
                </p>
              </div>
              <ul className="space-y-6 *:text-[#536174]">
                {features.map((feature, index) => {
                  return (
                    <>
                      {features.length - 1 === index ? (
                        <li key={index} className="flex items-center gap-4">
                          <CgClose className="text-red-500" />
                          <p>{feature}</p>
                        </li>
                      ) : (
                        <li key={index} className="flex items-center gap-4">
                          <Check className="text-green-500" />
                          <p>{feature}</p>
                        </li>
                      )}
                    </>
                  );
                })}
              </ul>
            </div>

            <Button
              className="w-full cursor-auto"
              disabled
              onClick={() => {
                toast({
                  title: "Free Plan Active ✅",
                });
              }}
            >
              FREE
            </Button>
          </div>
        </div>
        <div className="">
          <div className="flex w-full flex-col gap-8 md:h-full ">
            <div className="flex-1 space-y-4">
              <div className="space-y-1">
                <h3 className="text-2xl font-medium">For Creators</h3>
                <p className="text-[#536174]">
                  Everything you get in this plan
                </p>
              </div>
              <ul className="space-y-6 *:text-[#536174]">
                {features.map((feature, index) => {
                  return (
                    <li key={index} className="flex items-center gap-4">
                      <Check className="text-green-500" />
                      <p>{feature}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
            <Link
              passHref
              legacyBehavior
              href="https://shop.boilercode.app/buy/2cefb9ea-d2bc-4f90-affa-938cf0508432"
            >
              <Button variant="dark" className="w-full">
                PREMIUM $20
              </Button>
            </Link>

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
      </div>
    );
}

export default Pricing




