"use client"

import { useState } from 'react'
import Title, { SubTitle } from '../ui/Title'
import content from '~/config/content'
import Image from "next/legacy/image"
import { joinWaitlist } from '~/lib/helpers/waitlist'
import { useToast } from '../ui/use-toast'


const Subscribe = () => {
    const { subscribe } = content.home;

    const [email, setemail] = useState("")
    const { toast } = useToast()
    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        if(!email.toString().includes("@")){ 
            toast({
                title: "Please Enter a Valid Email"
            })
            setemail("")
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const res: {
            success: boolean;
            id: string;
        } = await joinWaitlist(email);
        if(res?.success) {
            toast({
              title: "Subscribed",
              description:
                "You have been successfully subscribed to our waitlist. We will notify you when we launch.",
            });
            setemail("");
            return;
        } else {
            toast({
                title: "Error Occured!",
                description: "Please try again."
            })
            setemail("");
            return;
        }
    }
    
    return (
      <div className="w-responsive relative space-y-5 rounded-xl bg-[#F7F1FF] px-5 py-12 text-center">
        {/* ICONS */}
        <Image
          src={"/icons/decorations/icon-1.svg"}
          alt="icon"
          width={60}
          height={60}
          className="absolute z-10 rounded-xl max-lg:hidden lg:left-10"
        />
        <Image
          src={"/icons/decorations/icon-2.svg"}
          alt="icon"
          width={60}
          height={60}
          className="absolute z-10 rounded-xl max-lg:hidden lg:right-10"
        />
        <Image
          src={"/icons/decorations/icon-3.svg"}
          alt="icon"
          width={60}
          height={60}
          className="absolute z-10 rounded-xl max-lg:hidden lg:bottom-10 lg:left-40"
        />
        <Image
          src={"/icons/decorations/icon-4.svg"}
          alt="icon"
          width={60}
          height={60}
          className="absolute z-10 rounded-xl max-lg:hidden lg:bottom-10 lg:right-40"
        />

        <h3 className="text-2xl font-bold ">
          {subscribe.title[0]}
          <br className="max-md:hidden" />
          {subscribe.title[1]}
        </h3>
        <SubTitle subTitleClass="lg:w-1/2">{subscribe.subtitle}</SubTitle>

        {/* form */}
        <form
          onSubmit={handleSubmit}
          className="form-group lg:flex-center mx-auto gap-4 max-lg:space-y-3 lg:w-1/2"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="rounded-xl border border-[#dcdcdc] p-3 px-5 max-lg:mx-auto max-lg:w-3/4 lg:w-[285px]"
          />
          <button
            type="submit"
            className="bg-purple rounded-xl  px-6 py-3 font-semibold text-white shadow-xl duration-200 hover:scale-105 max-lg:mx-auto max-lg:w-3/4"
          >
            {subscribe.button}
          </button>
        </form>
      </div>
    );
}

export default Subscribe
