/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

'use client'
import { InferSelectModel } from "drizzle-orm";
import Link from "next/link";
import { useState } from "react";
import { profiles } from "~/server/db/schema";
import Button from "../ui/Button";
import { addDomainToVercel, getAllDomains, getConfigResponse, getDomainResponse, removeDomainFromVercelTeam, verifyDomain } from "~/lib/domains";
import { useToast } from "../ui/use-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { updateProfile } from "~/lib/helpers/profile";
import verifyDomainValues from "~/config/domain.vercel";

type Profile = InferSelectModel<typeof profiles>;

const FormProfile = ({
  profile
}: {
  profile: Profile 
}) => {
  
  const [userProfile, setuserProfile] = useState<Profile>(profile);

  const [about, setabout] = useState(userProfile.about ?? "")
  const [domain, setdomain] = useState(userProfile.domain ?? "")


  const [showSave, setshowSave] = useState(false)
  const [loading, setloading] = useState(false)
  const [formSubmitted, setformSubmitted] = useState(true)
  const [response, setresponse] = useState({
    status: false,
    message: ""
  })

  const { toast } = useToast();

  const onFormSubmit = async () => {
    setformSubmitted(false)
    setloading(true)
    // console.log("about", about != userProfile.about, !about);
    if(about && about != userProfile.about) {
      // update about
      await updateProfile(about)
      toast({
        title: "About updated successfully ✅",
      }) 
    }
      // check valid domain
    if(!userProfile.premiumUser) {
          setloading(false);
          setformSubmitted(true);
      return;
    }
    if (
      userProfile.premiumUser &&
      domain != userProfile.domain &&
      domain.includes(".") &&
      !domain.includes("supaclip.pro")
    ) {
      // console.log("here");
      const res = await fetch(`/api/profile/domain/${domain}`);

      const data = await res.json();

      setresponse(data);
      setloading(false);

      toast({
        title: data.message,
      });
      // console.log(res, data);
    } else {
      toast({
        title: "Please enter a valid domain",
      });
      setdomain("");
    }

    setloading(false);
    setformSubmitted(true);

    // window.location.reload()
}

  

  return (
    <form action={onFormSubmit} className="relative z-50 space-y-4 text-white">
      {/*about  */}
      {loading && <CustomLoader />}

      <div className="form-group flex flex-col gap-1">
        <label>About</label>
        <textarea
          value={about}
          name="about"
          onChange={(e) => {
            setabout(e.target.value);
            setshowSave(true);
          }}
          className="rounded-lg border bg-white/20 p-2 text-sm"
        />
      </div>
      {userProfile.premiumUser ? (
        <div className="form-group flex flex-col gap-1">
          <label>Custom Domain</label>
          <input
            type="text"
            value={domain}
            name="domain"
            onChange={(e) => {
              setshowSave(true);
              setdomain(e.target.value);
            }}
            className="rounded-lg border bg-white/20 p-2 py-3 text-sm"
          />
        </div>
      ) : (
        <div className="my-8 flex items-center justify-center">
          <Link
            passHref
            legacyBehavior
            href="https://shop.boilercode.app/buy/2cefb9ea-d2bc-4f90-affa-938cf0508432"
            className="sm:text-md w-full rounded-xl bg-white/90 p-4 text-center text-xs font-semibold text-black"
          >
            <span>Upgrade to Premium to add custom domain ⚡ ️</span>
          </Link>
        </div>
      )}

      {showSave && (
        <Button
          type="submit"
          className="w-full border-white bg-white/40 py-2 text-white"
        >
          Save
        </Button>
      )}
    </form>
  );
};


const CustomLoader = () => {
  return (
    <div className="absolute z-10 top-0 left-0 right-0 bottom-0 h-full bg-transparent backdrop-blur-sm grid place-content-center">
      <div className="bg-white flex items-center justify-center rounded-full p-2">
        <span className="w-[50px] h-[50px] animate-spin border-t-2 border-black rounded-full"></span>
      </div>
    </div>
  )
}


export default FormProfile; 