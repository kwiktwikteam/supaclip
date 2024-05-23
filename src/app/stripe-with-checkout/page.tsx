import { Check, Cross } from "lucide-react";
import Image from "next/image";
import { BiCloset } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

const page = ({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) => {

  const { session_id } = searchParams
  return (
    <div className="grid h-screen w-screen place-content-center bg-black backdrop-blur-lg">
      <Image
        src={"/bg.png"}
        alt="hero"
        fill
        priority
        className="absolute z-10 h-full w-full opacity-30 "
      />

      <div className="z-20 flex w-[90%] flex-col rounded-lg bg-white p-5 py-10 text-center sm:w-3/4  md:min-w-[450px]">
        {
          session_id ? <>
          <div className="mx-auto inline-block animate-bounce rounded-full bg-green-500 p-2 shadow-xl">
            <Check className="h-20 w-20 text-white" />
          </div>
          <h2 className="text-2xl">Thank you for your support.</h2>
        </>
        :
        <>
          <div className="mx-auto inline-block animate-bounce rounded-full bg-red-500 p-2 shadow-xl">
            <CgClose className="h-20 w-20 text-white" />
          </div>
          <h2 className="text-2xl">
            Oops! Looks like something went wrong with that transaction
          </h2>
        </>
        }
      </div>
    </div>
  );
};


export default page;