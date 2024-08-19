import PublicSaleForm from "@/components/PublicSaleForm";
import Topbar from "@/components/Topbar";
import { Tier, TierStatus } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import ember from "@/assets/ember.svg";
import Footer from "@/components/Footer";
import List from "@/components/List";

const tiers: Tier[] = [
  {
    id: 1,
    status: TierStatus.SoldOut,
    price: 250000,
  },
  {
    id: 2,
    status: TierStatus.Selling,
    price: 250000,
    total: 50,
    available: 5
  },
  {
    id: 3,
    status: TierStatus.SoldOut,
    price: 250000
  },
  {
    id: 4,
    status: TierStatus.SoldOut,
    price: 250000
  },
  {
    id: 5,
    status: TierStatus.SoldOut,
    price: 250000
  },
]

const sellingTier = tiers.filter((tier) => tier.status === TierStatus.Selling)[0];

const whys = [
  "A step in the evolution of Fuse Network towards launching the new Ember mainnet"
]

const advantages = [
  "Node Rewards - 20% of token supply Rewards is distributed over the frst 24 months after mainnet launch",
  "Node owners get access to the Data Availability Committee",
  "Participate in governance",
  "Node ownership ofers potential additional airdrops"
]

export default function Home() {
  return (
    <div className="w-full font-mona min-h-screen">
      <Topbar />
      <main>
        <section className="mt-24 md:mt-0">
          <div className="px-10 py-24 md:px-4 md:py-12">
            <div className="w-full max-w-7xl m-auto flex flex-col items-center gap-8 text-center">
              <h1 className="text-[4.375rem] md:text-5xl leading-none font-semibold">
                Fuse L2 Node Sale
              </h1>
              <p className="text-xl md:text-lg leading-none text-ironside-gray">
                Buy a Fuse Network Node License NFT and Earn FUSE
              </p>
              <Link
                href="#public-sale"
                className="transition ease-in-out min-w-[14.625rem] md:w-full p-4 md:p-3 flex justify-center items-center gap-2 bg-success border border-success rounded-full text-xl md:text-lg leading-none text-black font-semibold hover:bg-transparent hover:border-black"
              >
                Buy Node
              </Link>
            </div>
          </div>
        </section>
        <section className="md:bg-dune md:my-12">
          <div className="px-10 py-24 md:px-4 md:py-0">
            <div className="w-full max-w-7xl m-auto relative bg-dune rounded-[1.25rem] flex md:flex-col md:items-center md:text-center md:gap-10 p-16 md:px-5 md:py-10">
              <div className="flex flex-col gap-16 md:gap-10 text-white">
                <h2 className="text-[2.5rem] md:text-[2rem] font-semibold leading-none text-success">
                  Sale in Progress
                </h2>
                <div className="flex md:flex-col gap-40 md:gap-6">
                  <div className="flex flex-col">
                    <p>
                      Sold licenses
                    </p>
                    <p className="text-6xl md:text-[2.813rem] leading-none font-semibold">
                      35
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p>
                      Current license price
                    </p>
                    <p className="text-6xl md:text-[2.813rem] leading-none font-semibold">
                      {new Intl.NumberFormat().format(sellingTier.price)} FUSE
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute md:static -top-24 right-24">
                <Image
                  src={ember}
                  alt="ember"
                  className="md:w-[13.375rem] md:h-[15.625rem]"
                />
              </div>
            </div>
          </div>
        </section>
        <List id="about" title="What is Node Sale?" items={whys} />
        <List id="advantages" title="Advantages of Owning Fuse Network Nodes" items={advantages} />
        <section id="public-sale">
          <div className="px-10 py-24 md:px-4 md:py-12">
            <div className="w-full max-w-7xl m-auto flex flex-col gap-10">
              <h2 className="text-[2.5rem] md:text-[2rem] font-semibold text-center">
                Become a Fuse Network Node Operator
              </h2>
              <div className="flex md:flex-col md:flex-col-reverse justify-between gap-10 mt-10">
                <div className="flex flex-col gap-7 md:gap-4 w-full bg-tertiary rounded-[1.25rem] md:rounded-xl p-10 md:px-4 md:py-5">
                  <p className="text-2xl md:text-lg font-semibold">
                    Tiers
                  </p>
                  <div className="flex flex-col gap-2.5 md:gap-1.5 md:text-xs">
                    {tiers.map((tier) => (
                      <div
                        key={tier.id}
                        className="flex flex-col gap-8 bg-white rounded-[0.625rem] px-4 py-5 md:px-3 md:py-4"
                      >
                        <div className="flex justify-between gap-2">
                          <div className="flex gap-4 md:gap-3">
                            <p className="font-semibold">
                              Tier {tier.id}
                            </p>
                            <p className={`${tier.status === "Selling" ? "text-fresh-green" : "text-black"}`}>
                              {tier.status}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <p>
                              Price per license
                            </p>
                            <p className="font-semibold">
                              {new Intl.NumberFormat().format(tier.price)} FUSE
                            </p>
                          </div>
                        </div>
                        {tier.status === "Selling" && (
                          <div className="flex justify-between items-center gap-5 md:gap-3">
                            <div className="bg-tertiary rounded-[0.625rem] w-full h-2">
                              <div
                                className="bg-light-teal rounded-[0.625rem] h-full"
                                style={{
                                  width: `${((tier.total - tier.available) / tier.total) * 100}%`
                                }}
                              ></div>
                            </div>
                            <p>
                              <span className="text-fresh-green">
                                {tier.total - tier.available}
                              </span>
                              /{tier.total}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <PublicSaleForm sellingTier={sellingTier} />
              </div>
              <div className="flex flex-col gap-10 md:gap-5 w-full bg-tertiary rounded-[1.25rem] p-10 md:p-6">
                <p className="text-2xl md:text-lg font-semibold">
                  My licenses
                </p>
                <p className="text-lg text-dove-gray md:text-sm">
                  Congratulations! You have 2 licenses, and can launch 2 Data Availability nodes when Ember L2 goes live. Stay tuned!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
