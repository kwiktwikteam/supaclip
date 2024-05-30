import EarlyAdopters from "~/components/EarlyAdopters/EarlyAdopters";
import Footer from "~/components/Footer/Footer";
import Header from "~/components/Header/Header";
import Hero from "~/components/Hero/Hero";
import KeyFeatures from "~/components/KeyFeatures/KeyFeatures";
import Pricing from "~/components/Pricing/Pricing";
import Steps from "~/components/Steps/Steps";
import Subscribe from "~/components/Subscribe/Subscribe";

export const dynamic = 'force-dynamic'
export const maxDuration = 300;

export default function HomePage({
  searchParams
}: {
  searchParams: Record<string, string | undefined>;
}) {
  // const { session_id } = searchParams;

  // if(session_id) {
  //   // continue;
  // }

  console.log(searchParams)
  return (
      <main className="space-y-18 relative min-h-screen">
        <Header />
        <div className="space-y-32">
          <Hero />
          <EarlyAdopters />
          <div className="space-y-44">
            <Steps />
            {/* <KeyFeatures /> */}
          </div>
          <Pricing />
          <Subscribe />
          <Footer />
        </div>
      </main>
  );
}
