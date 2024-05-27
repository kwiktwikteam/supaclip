import Image from "next/legacy/image";
import Link from "next/link";
import Hero from "~/components/Hero/Hero";
import Button from "~/components/ui/Button";

const page = ({
  searchParams,
}: {
  searchParams: {
    creatorId: string;
  };
}) => {
  return (
    <div className="grid h-screen w-screen">
      <Header creatorId={searchParams.creatorId} />
      <Hero />
    </div>
  );
};

const Header = ({ creatorId } : { creatorId : string}) => {
    return (
      <nav className="absolute left-0 right-0 top-4 items-center justify-center">
        <div className="w-responsive flex items-center justify-between rounded-full bg-white p-3">
          <div className="flex-center gap-4 text-lg font-semibold">
            <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
            Supaclip
          </div>
          <Link className="" href={`/c/${creatorId}`}>
            <Button>Creator Page</Button>
          </Link>
        </div>
      </nav>
    );
}
export default page;