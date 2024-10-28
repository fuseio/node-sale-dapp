"use client";

import Image from "next/image";
import Link from "next/link";

import Topbar from "@/components/Topbar";
import { useFormState } from 'react-dom'
import { joinWaitlist } from '@/app/actions'

import Footer from "@/components/Footer";
import List from "@/components/List";
import FAQ from "@/components/FAQ";
import JoinWaitlistButton from "@/components/JoinWaitlistButton";

import ember from "@/assets/ember.svg";
import checkmarkBg from "@/assets/checkmark-bg.svg";

const why = [
  {
    description: "Imagine being part of a network where you can earn just by holding a node. Here's what's in it for you:"
  },
  {
    description: "15 000 000 FUSE tokens reward reserved exclusively for node operators like you.",
    isCheckmark: true
  },
  {
    description: "40% Revenue Share: Every time a transaction happens on the network, you'll get a slice of the revenue—40% of it, to be exact!",
    isCheckmark: true
  },
  {
    description: "External revenue: Node operators help govern the network and get extra yield. Every user that stakes any RWA or LST asset for yield. Node operators get a slice!",
    isCheckmark: true
  },
  {
    description: "With 50,000 nodes available in 20 different tiers, the sooner you get in, the better the deal. Prices will go up as each tier fills, so don't wait too long to make your move!"
  }
]

const conditions = [
  {
    title: "Join whitelist to get early access at the best price"
  },
  {
    title: "Get 10% discount when paying with FUSE token"
  },
  {
    title: "Earn Node Sale bootstrap reward monthly for 3 years"
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
  () => (
    <div>
      The process will consist of 3 stages:
      <ol className="list-decimal list-inside">
        <li>
          Whitelist application: users can register for whitelist to get priority access. Whitelisting will start in November 2024. Leave your email to be notified.
        </li>
        <li>
          Whitelist Sale: only whitelisted users can participate in the sale. Nodes are sold on first come, first served basis.
        </li>
        <li>
          Public Sale: the sale is open to all users.
        </li>
      </ol>
    </div>
  ),
  "This is a list of wallets that have expressed their desire to buy a node before the sale starts. These participants will receive priority access to buy the node before the public sale starts.",
  "A whitelisting form will be published on this page in November 2024. Leave your email to be notified.",
  "No. The priority sale of nodes to whitelisted participants will be on a first come, first served basis.If all nodes allocated to whitelisted users are sold out, you will be able to participate in the public sale. Leave your email to be notified.",
  "A total of 50,000 nodes will be available for purchase in the Fuse Ember network.",
  () => (
    <div>
      Active node operators will receive several types of rewards:
      <ol className="list-disc list-inside">
        <li>
          Fuse Foundation node sale bootstrap reward distributed monthly for 3 years
        </li>
        <li>
          Share of the Fuse Foundation revenue from sequencer fees, new staking DApp, etc.
        </li>
        <li>
          Delegation fees from node delegators
        </li>
        <li>
          Node ownership offers potential additional airdrops
        </li>
      </ol>
    </div>
  ),
  "Yes, each participant can buy any number of nodes.",
  "The node license is an NFT. NFTs will be sent to the buyer's wallet immediately after the license is paid.",
  "Running and managing nodes on the Fuse Ember network will be done through the NodeOps console."
]

export default function Home() {
  const initialState = { type: 'idle' }
  const [state, formAction] = useFormState(joinWaitlist, initialState)

  return (
    <div className="w-full font-mona min-h-screen">
      <Topbar />
      <main>
        <section className="mt-24 md:mt-0">
          <div className="px-10 py-24 md:px-4 md:py-12">
            <div className="w-full max-w-7xl m-auto flex flex-col items-center gap-8 text-center">
              <h1 className="text-[4.375rem] md:text-5xl leading-none font-semibold max-w-[45rem]">
                Join the Fuse Ember Node Sale
              </h1>
              <p className="text-xl md:text-lg text-ironside-gray max-w-[45rem]">
                {"Your ticket to earning rewards and being part of a cutting-edge decentralized payment network that's set to change the game."}
              </p>
          </div>
          </div>
        </section>
        <List id="about" title="Why Should You Get a Fuse Node?" items={why} />
        <section className="md:my-12" id="waitlist">
          <div className="px-10 py-24 md:px-4 md:py-0">
            <div className="w-full max-w-7xl m-auto flex flex-col items-center text-center gap-10">
              <h2 className="text-[2.5rem] md:text-[2rem] font-semibold leading-none">
                See if you qualify to be a Node Operator
              </h2>
              {state.type === 'success' ? (
                <p className="text-xl md:text-lg text-fresh-green">Thanks for joining the waitlist!</p>
              ) : (
                <form
                  action={formAction}
                  className="flex md:flex-col gap-4"
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="px-4 py-3 bg-transparent border border-light-gray rounded-full text-xl md:text-lg leading-none text-black font-semibold"
                    required
                  />
                  <JoinWaitlistButton />
                </form>
              )}
            </div>
          </div>
        </section>
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
                  </div>
                ))}
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
