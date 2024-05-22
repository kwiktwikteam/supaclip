import React from 'react'
import Title from '../ui/Title'
import content from '~/config/content'
import Image from 'next/image';
import StepCard from './StepCard';

const Steps = () => {
    const { steps } = content.home;
    return (
        <div id='keysteps' className='w-responsive space-y-12' style={{
          background: `radial-gradient()`,
        }}>
            <Title className=''>
                <div className='relative text-purple inline'>
                  {steps.title[0]}
                  <Image src="/icons/hero/wigly.svg" alt="wigly" width={118} height={5} className='absolute -bottom-2 left-0 right-0 w-full' />

                </div> {steps.title[1]}
            </Title>

            <div className='flex-col-center-center gap-8 items-stretch'>
                {steps.steps.map((step) => {
                  return(
                    <StepCard key={step.id} step={step} />
                  )
                })}
            </div>
        </div>
    )
}

export default Steps
