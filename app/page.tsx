"use client";
import PublicSaleForm from "@/components/PublicSaleForm";
import Topbar from "@/components/Topbar";
import Image from "next/image";
import Link from "next/link";
import ember from "@/assets/ember.svg";
import checkmarkBg from "@/assets/checkmark-bg.svg";
import Footer from "@/components/Footer";
import List from "@/components/List";
import FAQ from "@/components/FAQ";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { tokenBought, retrieveCurrentTierDetail, retrieveTierDetails, retrieveTotalSupply, selectUserSlice, setIsClient } from "@/store/userSlice";
import { useEffect } from "react";
import { useAccount } from "wagmi";

const whys = [
  "A step in the evolution of Fuse Network towards launching the new Ember mainnet"
]

const advantages = [
  "Node Rewards - 20% of token supply Rewards is distributed over the frst 24 months after mainnet launch",
  "Node owners get access to the Data Availability Committee",
  "Participate in governance",
  "Node ownership ofers potential additional airdrops"
]

const conditions = [
  {
    title: "Early birds get the best price",
    points: [
      "5 tiers",
      "Star price - 120,00 FUSE"
    ]
  },
  {
    title: "Nodes for sale at 500—exclusive to licensed operators."
  },
  {
    title: "FUSE tokens from sale will be burned"
  }
]

const questions = [
  "What are Fuse Nodes?",
  "What are Fuse Nodes?",
  "What are Fuse Nodes?",
  "What are Fuse Nodes?",
  "What are Fuse Nodes?",
  "What are Fuse Nodes?",
  "What are Fuse Nodes?",
]

const answers = [
  "Fuse Nodes are devices (computers or servers) that run the Fuse blockchain's protocol software and connect to its network. They participate  in the Fuse Network by maintaining a copy of the blockchain ledger, validating transactions, and supporting consensus.",
  "Fuse Nodes are devices (computers or servers) that run the Fuse blockchain's protocol software and connect to its network. They participate  in the Fuse Network by maintaining a copy of the blockchain ledger, validating transactions, and supporting consensus.",
  "Fuse Nodes are devices (computers or servers) that run the Fuse blockchain's protocol software and connect to its network. They participate  in the Fuse Network by maintaining a copy of the blockchain ledger, validating transactions, and supporting consensus.",
  "Fuse Nodes are devices (computers or servers) that run the Fuse blockchain's protocol software and connect to its network. They participate  in the Fuse Network by maintaining a copy of the blockchain ledger, validating transactions, and supporting consensus.",
  "Fuse Nodes are devices (computers or servers) that run the Fuse blockchain's protocol software and connect to its network. They participate  in the Fuse Network by maintaining a copy of the blockchain ledger, validating transactions, and supporting consensus.",
  "Fuse Nodes are devices (computers or servers) that run the Fuse blockchain's protocol software and connect to its network. They participate  in the Fuse Network by maintaining a copy of the blockchain ledger, validating transactions, and supporting consensus.",
  "Fuse Nodes are devices (computers or servers) that run the Fuse blockchain's protocol software and connect to its network. They participate  in the Fuse Network by maintaining a copy of the blockchain ledger, validating transactions, and supporting consensus.",
]

export default function Home() {
  const dispatch = useAppDispatch();
  const { isClient, isTotalSupplyLoading, totalSupply, isCurrentTierDetailLoading, currentTierDetail, isTierDetailsLoading, tierDetails, isBoughtLoading, bought, isMinted } = useAppSelector(selectUserSlice);
  const { address } = useAccount();

  useEffect(() => {
    dispatch(setIsClient(true));
  }, [dispatch])

  useEffect(() => {
    dispatch(retrieveTotalSupply());
    dispatch(retrieveCurrentTierDetail());
    dispatch(retrieveTierDetails());
  }, [isMinted, dispatch])

  useEffect(() => {
    if (address) {
      dispatch(tokenBought({ address }));
    }
  }, [address, isMinted, dispatch])

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
                  <div className="flex flex-col md:items-center">
                    <p>
                      Sold licenses
                    </p>
                    {!isClient || isTotalSupplyLoading ?
                      <span className="w-20 h-16 md:h-12 rounded-md animate-pulse bg-white/20"></span> :
                      <p className="text-6xl md:text-[2.813rem] leading-none font-semibold">
                        {totalSupply}
                      </p>
                    }
                  </div>
                  <div className="flex flex-col md:items-center">
                    <p>
                      Current license price
                    </p>
                    {!isClient || isCurrentTierDetailLoading ?
                      <span className="w-40 h-16 md:h-12 rounded-md animate-pulse bg-white/20"></span> :
                      <p className="text-6xl md:text-[2.813rem] leading-none font-semibold">
                        {new Intl.NumberFormat().format(currentTierDetail.price)} FUSE
                      </p>
                    }
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
        <section className="bg-tertiary">
          <div className="px-10 py-24 md:px-4 md:py-12">
            <div className="w-full max-w-7xl m-auto flex flex-col justify-between gap-16 md:gap-10">
              <h2 className="text-[2.5rem] md:text-[2rem] font-semibold text-center">
                What are the Node Sale Conditions?
              </h2>
              <div className="grid grid-cols-3 md:grid-cols-2 gap-10 md:gap-4">
                {conditions.map((condition, i) => (
                  <div key={i} className="bg-white rounded-[1.25rem] md:rounded-xl flex flex-col gap-4 px-9 py-6 md:px-4 md:py-5 min-h-64 md:min-h-40">
                    <Image
                      src={checkmarkBg}
                      alt="checkmark background"
                      className="md:w-4 md:h-4"
                    />
                    <p className="text-2xl md:text-sm">
                      {condition.title}
                    </p>
                    <ul className="list-disc list-inside text-ironside-gray md:text-xs">
                      {condition.points?.map((point, i) => (
                        <li key={i}>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
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
                    {!isClient || isTierDetailsLoading ?
                      new Array(5).fill(0).map((_, i) => (
                        <span key={i} className={`w-full ${i === 0 ? "h-32 md:h-32" : "h-16 md:h-12"} rounded-[0.625rem] animate-pulse bg-white`}></span>
                      )) :
                      tierDetails.map((tierDetail) => (
                        <div
                          key={tierDetail.tier}
                          className="flex flex-col gap-8 bg-white rounded-[0.625rem] px-4 py-5 md:px-3 md:py-4"
                        >
                          <div className="flex justify-between gap-2">
                            <div className="flex gap-4 md:gap-3">
                              <p className="font-semibold">
                                Tier {tierDetail.tier}
                              </p>
                              <p className={`${tierDetail.tier === currentTierDetail.tier ? "text-fresh-green" : "text-black"}`}>
                                {tierDetail.tier === currentTierDetail.tier ? "Selling" : "Sold out"}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <p>
                                Price per license
                              </p>
                              <p className="font-semibold">
                                {new Intl.NumberFormat().format(tierDetail.price)} FUSE
                              </p>
                            </div>
                          </div>
                          {tierDetail.tier === currentTierDetail.tier && (
                            <div className="flex justify-between items-center gap-5 md:gap-3">
                              <div className="bg-tertiary rounded-[0.625rem] w-full h-2">
                                <div
                                  className="bg-light-teal rounded-[0.625rem] h-full"
                                  style={{
                                    width: `${((tierDetail.maxSupply - tierDetail.availableSupply) / tierDetail.maxSupply) * 100}%`
                                  }}
                                ></div>
                              </div>
                              <p>
                                <span className="text-fresh-green">
                                  {tierDetail.maxSupply - tierDetail.availableSupply}
                                </span>
                                /{tierDetail.maxSupply}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
                <PublicSaleForm />
              </div>
              <div className="flex flex-col gap-10 md:gap-5 w-full bg-tertiary rounded-[1.25rem] p-10 md:p-6">
                <p className="text-2xl md:text-lg font-semibold">
                  My licenses
                </p>
                {!isClient || isBoughtLoading ?
                  <span className="w-full h-7 md:h-12 rounded-md animate-pulse bg-white"></span> :
                  <p className="text-lg text-dove-gray md:text-sm">
                    {bought ?
                      `Congratulations! You have ${bought} licenses, and can launch 2 Data Availability nodes when Ember L2 goes live. Stay tuned!` :
                      "You have not purchased a license."
                    }
                  </p>
                }
              </div>
            </div>
          </div>
        </section>
        <FAQ questions={questions} answers={answers} />
      </main>
      <Footer />
    </div>
  );
}
