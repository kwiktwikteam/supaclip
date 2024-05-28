'use client'
import { InferSelectModel } from "drizzle-orm";
import Link from "next/link";
import { useState } from "react";
import { profiles } from "~/server/db/schema";

type Profile = InferSelectModel<typeof profiles>;

const FormProfile = ({
  profile
}: {
  profile: Profile 
}) => {
  
  const [userProfile, setuserProfile] = useState<Profile>(profile);

  const [about, setabout] = useState(userProfile.about ?? "")
  const [domain, setdomain] = useState(userProfile.domain ?? "")

  return (
    <div className="z-50 space-y-4 text-white">
      {/*about  */}
      <form className="form-group flex flex-col gap-1">
        <label>About</label>
        <textarea
          value={about}
          name="about"
          onChange={(e) => setabout(e.target.value)}
          className="rounded-lg border bg-white/20 p-2 text-sm"
        />
      </form>
      {!userProfile.premiumUser ? (
        <form className="form-group flex flex-col gap-1">
          <label>Custom Domain</label>
          <input
            type="text"
            value={domain}
            name="domain"
            onChange={(e) => setdomain(e.target.value)}
            className="rounded-lg border bg-white/20 p-2 text-sm py-3"
          />
        </form>
      ) : (
        <div className="my-8 flex items-center justify-center">
          <Link
            href="/"
            className="sm:text-md w-full rounded-xl bg-white/90 p-4 text-center text-xs font-semibold text-black"
          >
            <span>Upgrade to Premium to add custom domain ⚡ ️</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FormProfile; 