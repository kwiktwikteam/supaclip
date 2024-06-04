import React from 'react'
import Button from '../ui/Button'
import Image from "next/legacy/image"

interface StepCardProps {
    step: {
        id: number ,
        title: string,
        desc: string,
        button : string,
        type: number,
        boxOut: string,
        boxIn: string,
        image: string
    }
}


const StepCard = ({ step }: StepCardProps) => {
    const colors = [
        ["bg-blue", "bg-light-blue", "bg-lighter-blue"],
        ["bg-pink", "bg-light-pink", "bg-lighter-pink"],
        ["bg-darkBlue", "bg-light-darkBlue", "bg-lighter-darkBlue"]
    ]
     const colors2 = [
       ["#30C7F7", "rgba(255, 0, 0, 0.5)", "#CBEFFF"],
       ["#F7A8D0", "#AAF54B", "#FFF3FF"],
       ["#4C30F7", "#AAF54B", "#AEA1F2"],
     ];
    
    return (
      <div
        className={`relative flex flex-col items-center gap-8 p-4 py-8 lg:flex-row lg:justify-end lg:px-10 lg:py-24 xl:mx-auto xl:w-3/4 ${step.type === 1 ? "" : "lg:flex-row-reverse"} rounded-xl ${step.id == 1 ? "bg-blue" : step.id == 2 ? "bg-pink" : "bg-darkBlue"} text-white`}
        // style={{
        //   background: `radial-gradient(${colors2[0]![1]! ?? "blue"} 1%, ${colors2[step.id - 1]![0]! ?? "blue"} 50%, ${colors2[step.id - 1]![0]} 100%)`,
        // }}
      >
        <div
          className={`bottom-0 z-10 min-h-6 w-full rounded-xl lg:absolute lg:min-h-[370px] lg:w-[45%] ${step.type == 1 ? "lg:left-0 lg:pr-8" : "lg:right-0 lg:pl-8"} ${step.boxOut} lg:pt-8`}
        >
          <div
            className={`z-20 h-full max-h-[350px]  w-full overflow-hidden rounded-xl ${step.boxIn}`}
          >
            <Image
              src={step.image}
              alt={step.title}
              width={350}
              height={350}
              objectFit="cover"
              priority
              className="min-h-full w-full rounded-xl object-top opacity-70 object-fill" 
            />
          </div>
        </div>

        <div className="space-y-6 lg:w-1/2 lg:self-end">
          {/* cirle div */}
          <div className="h-[35px] w-[35px] rounded-full bg-white opacity-30"></div>
          <h3 className="text-2xl font-bold">{step.title}</h3>
          <p>{step.desc}</p>
          <Button
            variant="white"
            className={`rounded-md py-4 ${step.id == 1 ? "text-[#30C7F7]" : step.id == 2 ? "text-purple" : "text-[#4C30F7]"}`}
          >
            {step.button}
          </Button>
        </div>
      </div>
    );
}

export default StepCard
