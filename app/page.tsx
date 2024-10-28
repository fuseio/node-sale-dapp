"use client";
import Topbar from "@/components/Topbar";
import Image from "next/image";
import Link from "next/link";
import ember from "@/assets/ember.svg";
import checkmarkBg from "@/assets/checkmark-bg.svg";
import Footer from "@/components/Footer";
import List from "@/components/List";
import FAQ from "@/components/FAQ";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectUserSlice } from "@/store/userSlice";

const benefits = [
  "Fuse Foundation incentive - Get rewarded for maintaining an active node monthly for 3 years. Fuse Foundation allocates 10,000,000 FUSE to rewards.",
  "External incentive - Share of the Fuse Foundation revenue from sequencer fees, new staking DApp, etc. will be distributed across active node operators.",
  "Delegation fees from node delegators - Node operator receives 10% of the total earnings of the license delegator.",
  "Ongoing node rewards",
  "Node ownership offers potential additional airdrops",
  "Users gain governance rights, contributing to network decisions",
  "Owning a Node License NFT provides proof of ownership",
  "NFTs can be traded or sold on secondary markets",
  "NFT ownership democratizes the network, allowing for individual ownership, operation, and profit-making from nodes"
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
  "How to purchase a Node License?",
  "What is whitelist?",
  "How to get whitelisted?",
  "Does entering the whitelist guarantee that I can definitely purchase a node?",
  "How many nodes will be available in total?",
  "What is the reward for node operator?",
  "Can I buy multiple nodes?",
  "How will the node licenses be distributed?",
  "How to run a node?"
]

const answers = [
  `The process will consist of 3 stages: 
    1. Whitelist application: users can register for whitelist to get priority access. Whitelisting will start in November 2024. Leave your email to be notified.
    2. Whitelist Sale: only whitelisted users can participate in the sale. Nodes are sold on first come, first served basis. 
    3. Public Sale: the sale is open to all users.
  `,
  "This is a list of wallets that have expressed their desire to buy a node before the sale starts. These participants will receive priority access to buy the node before the public sale starts.",
  "A whitelisting form will be published on this page in November 2024. Leave your email to be notified.",
  "No. The priority sale of nodes to whitelisted participants will be on a first come, first served basis.If all nodes allocated to whitelisted users are sold out, you will be able to participate in the public sale. Leave your email to be notified.",
  "A total of 50,000 nodes will be available for purchase in the Fuse Ember network.",
  `Active node operators will receive several types of rewards:
    - Fuse Foundation node sale bootstrap reward distributed monthly for 3 years
    - Share of the Fuse Foundation revenue from sequencer fees, new staking DApp, etc.
    - Delegation fees from node delegators
  `,
  "Yes, each participant can buy any number of nodes.",
  "The node license is an NFT. NFTs will be sent to the buyer's wallet immediately after the license is paid.",
  "Running and managing nodes on the Fuse Ember network will be done through the NodeOps console."
]

export default function Home() {
  const dispatch = useAppDispatch();
  const { isJoinWaitlistLoading, joinedWaitlist } = useAppSelector(selectUserSlice);

  return (
    <div className="w-full font-mona min-h-screen">
      <Topbar />
      <main>
        <section className="mt-24 md:mt-0">
          <div className="px-10 py-24 md:px-4 md:py-12">
            <div className="w-full max-w-7xl m-auto flex flex-col items-center gap-8 text-center">
              <h1 className="text-[4.375rem] md:text-5xl leading-none font-semibold max-w-[35rem]">
                Fuse Node Sale is Now Live!
              </h1>
              <p className="text-xl md:text-lg text-ironside-gray max-w-[45rem]">
                Your ticket to earning rewards and being part of a cutting-edge decentralized payment network that’s set to change the game.
              </p>
              <Link
                href="#waitlist"
                className="transition ease-in-out min-w-[14.625rem] md:w-full p-4 md:p-3 flex justify-center items-center gap-2 bg-success border border-success rounded-full text-xl md:text-lg leading-none text-black font-semibold hover:bg-transparent hover:border-black"
              >
                Join the Waiting list
              </Link>
            </div>
          </div>
        </section>
        <section className="md:bg-dune md:my-12">
          <div className="px-10 py-24 md:px-4 md:py-0">
            <div className="w-full max-w-7xl m-auto relative bg-dune rounded-[1.25rem] flex md:flex-col md:items-center md:text-center md:gap-10 p-16 md:px-5 md:py-10">
              <div className="flex flex-col gap-16 md:gap-10 text-white">
                <h2 className="text-[2.5rem] md:text-[2rem] font-semibold leading-none text-success">
                  Fuse Node Sale
                </h2>
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
        <List id="about" title="Node ownership benefits" items={benefits} />
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
        <FAQ questions={questions} answers={answers} />
      </main>
      <Footer />
    </div>
  );
}
