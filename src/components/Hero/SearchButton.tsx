"use client"
import { ArrowRight, Search } from "lucide-react";
import { useState, useCallback } from "react";
import Button from "../ui/Button";
import { fetchVideoId } from "~/lib/helpers/transcript";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
 

const SearchButton = () => {
  const [url, seturl] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className="flex flex-col items-center justify-center duration-300 sm:gap-8 md:flex-row">
      <input
        type="text"
        value={url}
        onChange={(e) => seturl(e.target.value)}
        placeholder="Enter Video URL or ID "
        className="rounded-full bg-white/50 px-4 py-2 text-center text-white shadow-md placeholder:text-white/70  focus:outline-none active:outline-none md:w-[425px]"
      ></input>

      <Search
        className={`${!url && "hidden"} cursor-pointer`}
        onClick={async () => {
          const id = url;
          if (url.length >= 11) {
            const res = await fetchVideoId(url);
            if (res) {
              router.push("/generate/" + res);
            }
          } else if (url.length == 11) {
            router.push("/generate/" + id);
          } else {
            router.push("/generate" + '?' + createQueryString('q', id))
          }
        }}
      />
    </div>
  );
}

export default SearchButton;