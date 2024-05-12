import React from "react";
import Title, { SubTitle } from "../ui/Title";
import content from "~/config/content";
import Image from "next/image";
import Button from "../ui/Button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const { hero } = content.home;

  return (
    <section className="relative min-h-screen space-y-5 pt-40 text-white">
      <Image
        src={"/images/hero/bg.png"}
        alt="hero"
        fill
        className="absolute left-0 top-0 -z-10 h-full w-full"
      />

      {/* ICONS */}
      <Image
        src={"/icons/decorations/icon-1.svg"}
        alt="icon"
        width={60}
        height={60}
        className="absolute z-10 rounded-xl max-lg:hidden lg:left-24"
      />
      <Image
        src={"/icons/decorations/icon-2.svg"}
        alt="icon"
        width={60}
        height={60}
        className="absolute z-10 rounded-xl max-lg:hidden lg:right-24"
      />
      <Image
        src={"/icons/decorations/icon-3.svg"}
        alt="icon"
        width={60}
        height={60}
        className="absolute z-10 rounded-xl max-lg:hidden lg:left-80 lg:top-80"
      />
      <Image
        src={"/icons/decorations/icon-4.svg"}
        alt="icon"
        width={60}
        height={60}
        className="absolute z-10 rounded-xl max-lg:hidden lg:right-80 lg:top-80"
      />

      <Title variant="xl" className="">
        {hero.title[0]}
        <br />
        {hero.title[1]}
      </Title>

      <div className="relative bg-white/50 shadow-md w-[90%] md:w-[425px] mx-auto  py-2 text-center rounded-full">
        Enter youtube video url to get started
        <ArrowRight className="text-3xl absolute right-5 top-1/2 bottom-1/2 -translate-y-1/2" />
      </div>

      <SubTitle subTitleClass="xl:w-1/3 xl:mx-auto">{hero.subtitle}</SubTitle>

      <div className="space-y-8">
        {/* <Button variant='dark' className='mx-auto rounded-xl py-4 px-8'>
                  {hero.button}
                </Button> */}

        <div className="space-y-20">
          <div className="grid place-content-center ">
            <div className="flex-col-center-center relative gap-4">
              <Image
                src={"/icons/hero/arrow.svg"}
                alt="arrow"
                width={24}
                height={30}
                className="absolute left-2 top-0 max-lg:hidden"
              />
              <Image
                src={"/images/hero/users.png"}
                alt="users"
                width={190}
                height={20}
                className=""
              />
              <p>{hero.more}</p>
            </div>
          </div>
          <div className="w-responsive shadow-gray shadow-t-xl min-h-[50vh] rounded-xl bg-white">
            {" "}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
