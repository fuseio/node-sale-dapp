import PublicSaleForm from "@/components/PublicSaleForm";
import Topbar from "@/components/Topbar";
import { Tier, TierStatus } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import ember from "@/assets/ember.svg";
import checkmarkBg from "@/assets/checkmark-bg.svg";

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
        <section className="mt-24">
          <div className="px-10 py-24">
            <div className="w-full max-w-7xl m-auto flex flex-col items-center gap-8">
              <h1 className="text-[4.375rem] leading-none font-semibold">
                Fuse L2 Node Sale
              </h1>
              <p className="text-xl leading-none text-ironside-gray">
                Buy a Fuse Network Node License NFT and Earn FUSE
              </p>
              <Link
                href="#public-sale"
                className="transition ease-in-out min-w-[14.625rem] p-4 flex justify-center items-center gap-2 bg-success border border-success rounded-full text-xl leading-none text-black font-semibold hover:bg-transparent hover:border-black"
              >
                Buy Node
              </Link>
            </div>
          </div>
        </section>
        <section>
          <div className="px-10 py-24">
            <div className="w-full max-w-7xl m-auto relative bg-dune rounded-[1.25rem] flex p-16">
              <div className="flex flex-col gap-16 text-white">
                <h2 className="text-5xl font-semibold leading-none text-success">
                  Sale in Progress
                </h2>
                <div className="flex gap-40">
                  <div className="flex flex-col">
                    <p>
                      Sold licenses
                    </p>
                    <p className="text-6xl leading-none font-semibold">
                      35
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p>
                      Current license price
                    </p>
                    <p className="text-6xl leading-none font-semibold">
                      {new Intl.NumberFormat().format(sellingTier.price)} FUSE
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-24 right-24">
                <Image
                  src={ember}
                  alt="ember"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="about">
          <div className="px-10 py-24">
            <div className="w-full max-w-7xl m-auto flex justify-between gap-14">
              <h2 className="text-5xl font-semibold max-w-80">
                Why a Node Sale?
              </h2>
              <div className="flex flex-col gap-6">
                {whys.map((why, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Image
                      src={checkmarkBg}
                      alt="checkmark background"
                    />
                    <p className="text-2xl max-w-[45rem]">
                      {why}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="px-10 py-24">
            <div className="w-full max-w-7xl m-auto flex justify-between gap-14">
              <h2 className="text-5xl font-semibold max-w-80">
                Advantages of Owning Fuse Network Nodes
              </h2>
              <div className="flex flex-col gap-6">
                {advantages.map((advantage, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Image
                      src={checkmarkBg}
                      alt="checkmark background"
                    />
                    <p className="text-2xl max-w-[45rem]">
                      {advantage}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section id="public-sale">
          <div className="px-10 py-24">
            <div className="w-full max-w-7xl m-auto flex flex-col gap-10">
              <h2 className="text-5xl font-semibold text-center">
                Become a Fuse Network Node Operator
              </h2>
              <div className="flex justify-between gap-10 mt-10">
                <div className="flex flex-col gap-7 w-full bg-tertiary rounded-[1.25rem] p-10">
                  <p className="text-2xl font-semibold">
                    Tiers
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {tiers.map((tier) => (
                      <div
                        key={tier.id}
                        className="flex flex-col gap-8 bg-white rounded-[0.625rem] px-4 py-5"
                      >
                        <div className="flex justify-between gap-2">
                          <div className="flex gap-4">
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
                          <div className="flex justify-between items-center gap-5">
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
              <div className="flex flex-col gap-10 w-full bg-tertiary rounded-[1.25rem] p-10">
                <p className="text-2xl font-semibold">
                  My licenses
                </p>
                <p className="text-lg">
                  Congratulations! You have 2 licenses, and can launch 2 Data Availability nodes when Ember L2 goes live. Stay tuned!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
