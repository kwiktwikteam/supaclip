import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import content from '~/config/content';
import Button from '../ui/Button';

const Footer = () => {
    const { header } = content.home;
    
    return (
      <footer className="absolute-h-center md:md-5 w-responsive flex-center-between z-10 mt-3 rounded-full bg-white p-2 pb-14 lg:mt-8">
        <div className="flex-center gap-4 text-lg font-semibold">
          <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
          {header.title}
        </div>
        <ul className="flex-center gap-8 max-md:hidden">
          <Link
            className={`font-semibold text-black/40 hover:cursor-pointer`}
            href={"https://www.kwiktwik.com/"}
            target='_blank'
            rel="noreferrer"
          >
            KwikTwik Technologies Pvt Ltd
          </Link>
        </ul>
      </footer>
    );
}

export default Footer
