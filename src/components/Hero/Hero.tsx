import React from "react";
import Title, { SubTitle } from "../ui/Title";
import content from "~/config/content";
import Image from "next/legacy/image";
import Button from "../ui/Button";
import { ArrowRight } from "lucide-react";
import SearchButton from "./SearchButton";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

const Hero = async () => {
  const { hero } = content.home;
  const userImages = await db.select({
    image: users.image,
    name: users.name
  }).from(users).limit(6).orderBy(desc(users.id));


  return (
    <section className="relative min-h-screen space-y-5 pt-40 text-white">
      <Image
        src={"/images/hero/bg.png"}
        alt="hero"
        layout="fill" 
        className="absolute left-0 top-0 -z-10 h-full w-full"
      />

      {/* ICONS */}
      {/* <Image
        src={"/icons/decorations/icon-1.svg"}
        alt="icon"
        width={60}
        height={60}
        className="block absolute z-10 rounded-xl max-xl:hidden lg:left-24"
      />
      <Image
        src={"/icons/decorations/icon-2.svg"}
        alt="icon"
        width={60}
        height={60}
        className="absolute z-10 rounded-xl max-xl:hidden lg:right-24"
      />
      <Image
        src={"/icons/decorations/icon-3.svg"}
        alt="icon"
        width={60}
        height={60}
        className="absolute z-10 rounded-xl max-xl:hidden lg:left-80 lg:top-80"
      />
      <Image
        src={"/icons/decorations/icon-4.svg"}
        alt="icon"
        width={60}
        height={60}
        className="2xl:opacity-1 absolute z-10 rounded-xl max-xl:hidden lg:right-80 lg:top-80 lg:opacity-50"
      /> */}

      <Title variant="xl" className="z-20">
        {hero.title[0]}
        <br />
        {hero.title[1]}
      </Title>

      <SearchButton />

      <SubTitle subTitleClass="xl:w-1/3 xl:mx-auto">{hero.subtitle}</SubTitle>

      <div className="space-y-8">
        {/* <Button variant='dark' className='mx-auto rounded-xl py-4 px-8'>
                  {hero.button}
                </Button> */}

        <div className="space-y-20">
          <div className="grid place-content-center ">
            <div className="flex-col-center-center relative gap-4">
              {/* <Image
                src={"/icons/hero/arrow.svg"}
                alt="arrow"
                width={24}
                height={30}
                className="absolute left-2 top-0 max-lg:hidden"
              /> */}
              {/* <Image
                src={"/images/hero/users.png"}
                alt="users"
                width={190}
                height={20}
                className=""
              /> */}
              <UserCards userImages={userImages} />

              <p>{hero.more}</p>
            </div>
          </div>
          <div className="w-responsive shadow-gray shadow-t-xl min-h-[70vh] rounded-xl bg-white">
            <iframe
              width="420"
              height="515"
              className="h-full min-h-[70vh] w-full rounded-lg"
              src={`https://www.youtube.com/embed/fBqrn4nXFlc`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};



const UserCards =  ({
  userImages,
}: {
  userImages: {
    name: string | null;
    image: string | null;
  }[];
}) => {
  return (
    <div className="flex items-center">
      {userImages.length > 0 &&
        userImages.map((user, index) => {
          return (
            <div
              key={index}
              className="-ml-2 flex items-center gap-2 rounded-full bg-white p-[2px]"
            >
             {
              user.image &&  <Image
                src={user.image}
                alt={user?.name ?? ""}
                width={30}
                height={30}
                className="rounded-full"
              />
             } 
          </div>
          )
        })}
    </div>
  );
};




export default Hero;
