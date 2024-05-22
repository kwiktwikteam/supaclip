"use client";

import { Check } from 'lucide-react'
import React from 'react'
import { useToast } from '../ui/use-toast'

const Pricing = () => {
    const { toast } = useToast()
    // const plans = []
    const features = [
        "Video Summary", 
        "Transcript",
        "Time Stamps",
        "AI chat assistant"
    ]
    
    return (
      <div id="pricing" className="w-responsive flex flex-col justify-between gap-8 rounded-lg border px-8 py-6 md:flex-row md:items-center">
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold md:text-5xl">Pricing Plan</h2>
            <p className="text-[#536174]">For Individuals and Small Teams</p>
          </div>
          <div className="flex items-center">
            <span className="text-4xl font-bold md:text-6xl">$0</span>
            <span className="text-sm text-[#98A2B2]"> per month</span>
          </div>
        </div>

        {/* features */}
        <div className="flex w-full flex-col gap-8 md:h-full md:w-1/2">
          <div className="flex-1 space-y-4">
            <div className='space-y-1'>
              <h3 className="text-xl font-medium">Features</h3>
              <p className="text-[#536174]">Everything you get in this plan</p>
            </div>
            <ul className="space-y-4 *:text-[#536174]">
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
          <button onClick={() => {
            toast({
              title: "Congratulations 🎉",
              description: "You have sucessfully claimed this plan.",
            });}} 
          className="w-full rounded-full bg-black py-3 font-semibold text-white">
            Claim this for $0
          </button>
        </div>
      </div>
    );
}

export default Pricing
