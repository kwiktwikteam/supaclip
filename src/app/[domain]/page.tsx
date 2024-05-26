import Link from "next/link";

const page = ({
  searchParams,
}: {
  searchParams: {
    creatorId: string;
  };
}) => {
  return (
    <div>
      <Link href={`/c/${searchParams.creatorId}`}>Go to creator page</Link>
    </div>
  );
};

export default page;