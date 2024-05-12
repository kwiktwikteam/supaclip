import React from 'react'

interface EarlyAdopterCardProps {
    testimonial: {
        id: number;
        name: string;
        role: string;
        message: string;
        height: number;
    };
}


const EarlyAdopterCard = ({ testimonial }: EarlyAdopterCardProps) => {
    return (
        <div className={` space-y-16 bg-white p-8 rounded-xl shadow-lg flex flex-col items-stretch`} style={{ height: testimonial.height }}>
              <h3 className='font-medium text-2xl flex-1'>
                {testimonial.message}
              </h3>

              <div className='space-y-2'>
                 <p>{testimonial.name}</p>
                 <p className='text-gray-500'>{testimonial.role}</p>
              </div>
        </div>
    )
}

export default EarlyAdopterCard
