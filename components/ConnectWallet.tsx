import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import copy from "@/assets/copy-black.svg";
import Image, { StaticImageData } from "next/image";
import { motion, Variants } from "framer-motion";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";
import down from "@/assets/down-arrow.svg";
import {
  useAccount,
  useBalance,
  useBlockNumber,
  useConfig,
  useDisconnect,
  useSwitchChain,
} from "wagmi";
import { setIsWalletModalOpen } from "@/store/navbarSlice";
import { eclipseAddress, evmDecimals } from "@/lib/helpers";
import fuseIcon from "@/assets/fuse-icon.svg";
import qr from "@/assets/qr.svg";
import disconnectIcon from "@/assets/disconnect.svg";
import { fetchUsdPrice, selectBalanceSlice } from "@/store/balanceSlice";
import leftArrow from "@/assets/left-arrow.svg";
import QRCode from "react-qr-code";
import Copy from "./ui/Copy";
import { formatUnits } from "viem";
import Spinner from "./ui/Spinner";
import { resetConnection } from "@/lib/web3Auth";
import { CONFIG } from "@/lib/config";

const menu: Variants = {
  closed: () => ({
    opacity: 0,
    transition: {
      delay: 0.15,
      duration: 0.3,
    },
    y: -50,
    x: 0,
    transitionEnd: {
      display: "none",
    },
  }),
  open: () => ({
    opacity: 1,
    display: "block",
    transition: {
      type: "spring",
      duration: 0.5,
    },
    y: 0,
    x: 0,
  }),
};

type Icons = {
  [key: string]: string | StaticImageData;
};

const icons: Icons = {
  [CONFIG.chain.id]: fuseIcon,
};

type UsdTokens = {
  [key: string]: string;
};

const usdTokens: UsdTokens = {
  [CONFIG.chain.id]: "fuse-network-token",
};

const ConnectWallet = ({
  className = "",
  containerClassName = "",
}: {
  className?: string;
  containerClassName?: string;
}) => {
  const dispatch = useAppDispatch();
  const [isChainOpen, setIsChainOpen] = React.useState(false);
  const [isAccountsOpen, setIsAccountsOpen] = React.useState(false);
  const [isWrongNetwoksOpen, setIsWrongNetwoksOpen] = React.useState(false);
  const [isQrCodeOpen, setIsQrCodeOpen] = React.useState(false);
  const { address, isConnected, chain } = useAccount();
  const { chains } = useConfig();
  const { switchChain } = useSwitchChain();
  const { disconnect, isPending } = useDisconnect({
    mutation: {
      onSuccess() {
        resetConnection();
      }
    }
  });
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { data: balance, refetch } = useBalance({
    address,
  });
  const balanceSlice = useAppSelector(selectBalanceSlice);

  const chainRef = useOutsideClick(() => {
    if (isChainOpen) {
      setIsChainOpen(false);
    }
  });
  const accountsRef = useOutsideClick(() => {
    if (isAccountsOpen) {
      setIsAccountsOpen(false);
    }
  });
  const wrongNetworkRef = useOutsideClick(() => {
    if (isWrongNetwoksOpen) {
      setIsWrongNetwoksOpen(false);
    }
  });

  const checkCorrectNetwork = () => {
    const network = chains.find((c) => c.id === chain?.id);
    if (!network) return false;
    return true;
  };

  useEffect(() => {
    const controller = new AbortController();
    dispatch(
      fetchUsdPrice({
        tokenId: usdTokens[chain?.id ?? CONFIG.chain.id],
        controller,
      })
    );

    return () => {
      controller.abort();
    };
  }, [isConnected, chain, dispatch]);

  useEffect(() => {
    refetch();
  }, [blockNumber, refetch])

  return !isConnected ? (
    <div className={"flex justify-end " + containerClassName}>
      <button
        className={
          "bg-black text-white px-4 py-2 rounded-full font-medium " +
          className
        }
        onClick={() => dispatch(setIsWalletModalOpen(true))}
        type="button"
      >
        Connect Wallet
      </button>
    </div>
  ) : checkCorrectNetwork() && isChainOpen ? (
    <div
      className="flex relative justify-end md:me-3 text-base/4 h-9"
      ref={chainRef}
    >
      <div
        className="flex bg-tertiary px-4 py-3 md:py-3.5 rounded-full cursor-pointer items-center relative text-base/4 font-normal ml-2"
        onClick={() => setIsChainOpen(!isChainOpen)}
      >
        <Image
          src={icons[chain?.id ?? 0]}
          alt={chain?.name ?? CONFIG.chain.name}
          width={25}
          height={25}
        />
        <p className="ms-[8.52px] text-white">
          {eclipseAddress(String(address))}
        </p>
        <Image
          src={down}
          alt="down"
          className={`ms-[15px] ${isChainOpen && "rotate-180"}`}
          width={10}
          height={10}
        />
      </div>
      <motion.div
        animate={isChainOpen ? "open" : "closed"}
        initial="closed"
        exit="closed"
        variants={menu}
        className="absolute top-[120%] bg-white rounded-[20px] shadow-xl z-[80] font-medium w-[268.22px] py-6"
      >
        <div className="flex flex-col gap-3.5 px-[22px]">
          <p className="font-bold">Switch Network</p>
        </div>
        <hr className="border-border-dark-gray mt-[13.57px] mb-[19.51px]" />
        <div className="flex flex-col gap-5 px-[22px]">
          {chains.map((c) => (
            <div
              className={
                "flex items-center " +
                (chain?.id === c.id
                  ? "cursor-auto"
                  : "cursor-pointer hover:opacity-70")
              }
              onClick={() => {
                switchChain({ chainId: c.id });
              }}
              key={c.id}
            >
              <Image
                src={icons[c.id]}
                alt={c.name}
                className="h-8 me-2 md:h-7"
                width={32}
                height={32}
              />
              <p>{c.name}</p>
              {chain?.id === c.id && (
                <div className="h-2.5 w-2.5 rounded-full bg-[#66E070] ml-auto" />
              )}
            </div>
          ))}
        </div>
        <hr className="border-border-dark-gray mt-[19.99px] mb-[18.53px]" />
        <div
          className="flex items-center gap-[17.7px] cursor-pointer px-[22px]"
          onClick={() => disconnect()}
        >
          {isPending ?
            <div className="h-5 flex justify-center items-center">
              <Spinner />
            </div> :
            <Image
              src={disconnectIcon.src}
              alt="disconnect wallet"
              width={17.68}
              height={20}
            />
          }
          <p>Disconnect</p>
        </div>
      </motion.div>
    </div>
  ) : checkCorrectNetwork() ? (
    <div className="flex justify-end md:justify-center relative md:me-3 h-9">
      <div
        className="flex bg-tertiary px-4 py-3 md:py-3.5 rounded-full cursor-pointer items-center relative text-base/4 font-normal ml-2"
        ref={accountsRef}
      >
        <div
          className="flex w-full justify-between items-center"
          onClick={() => setIsAccountsOpen(!isAccountsOpen)}
        >
          <Image
            src={icons[chain?.id ?? 0]}
            alt={chain?.name ?? CONFIG.chain.name}
            width={25}
            height={25}
          />
          <p className="ms-[8.52px] text-black">
            {eclipseAddress(String(address))}
          </p>
          <Image
            src={down}
            alt="down"
            className={`ms-[15px] ${isAccountsOpen && "rotate-180"}`}
            width={10}
            height={10}
          />
        </div>
        <motion.div
          animate={isQrCodeOpen ? "closed" : isAccountsOpen ? "open" : "closed"}
          initial="closed"
          exit="closed"
          variants={menu}
          className="absolute top-[120%] right-0 bg-white rounded-[20px] cursor-auto shadow-xl py-[25.5px] z-[80] w-[268.22px]"
        >
          <div className="flex flex-col gap-[8.35px] px-[22px]">
            <p className="text-xs/[11.6px] text-text-dark-gray font-medium">
              Connected account
            </p>
            <div className="flex justify-between">
              <p className="font-bold">{eclipseAddress(String(address))}</p>
              <div className="flex gap-[19.02px]">
                <Copy
                  src={copy}
                  text={String(address)}
                  width={18.97}
                  height={18.81}
                />
                <Image
                  src={qr}
                  alt="open qr code of address"
                  width={16.22}
                  height={16.65}
                  className="cursor-pointer"
                  onClick={() => setIsQrCodeOpen(!isQrCodeOpen)}
                />
              </div>
            </div>
          </div>
          <hr className="border-border-dark-gray mt-[25.62px] mb-[18.5px]" />
          <div className="flex flex-col gap-[8.35px] pl-[22.2px] pr-[17.42px] font-medium">
            <p className="text-xs/[11.6px] text-text-dark-gray">
              Wallet
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Image
                  src={icons[chain?.id ?? 0]}
                  alt={chain?.name ?? CONFIG.chain.name}
                  width={40}
                  height={40}
                  className="border border-[0.5px] border-gray-alpha-40 rounded-full"
                />
                <div className="flex flex-col justify-between gap-[3.68px]">
                  <p>{chain?.name} Token</p>
                  <p className="text-xs text-text-dark-gray">
                    {balance?.symbol}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-between gap-[3.68px] h-10">
                <p>{parseFloat(formatUnits(balance?.value ?? BigInt(0), balance?.decimals ?? evmDecimals) || "0").toFixed(4)}</p>
                {balanceSlice.isUsdPriceLoading ? (
                  <span className="px-10 py-2 ml-2 rounded-md animate-pulse bg-white/80"></span>
                ) : (
                  <p className="text-xs text-text-dark-gray">
                    $
                    {chain && chain.id === (CONFIG.chain.id)
                      ? new Intl.NumberFormat().format(
                        parseFloat(
                          (
                            parseFloat(formatUnits(balance?.value ?? BigInt(0), balance?.decimals ?? evmDecimals) ?? "0") *
                            balanceSlice.price
                          ).toString()
                        )
                      )
                      : 0}
                  </p>
                )}
              </div>
            </div>
          </div>
          <hr className="border-border-dark-gray mt-[22.6px] mb-[18.5px]" />
          <div
            className="flex items-center gap-[17.7px] cursor-pointer px-[22px]"
            onClick={() => disconnect()}
          >
            {isPending ?
              <div className="h-5 flex justify-center items-center">
                <Spinner />
              </div> :
              <Image
                src={disconnectIcon.src}
                alt="disconnect wallet"
                width={17.68}
                height={20}
              />
            }
            <p>Disconnect</p>
          </div>
        </motion.div>
        <motion.div
          animate={isAccountsOpen && isQrCodeOpen ? "open" : "closed"}
          initial="closed"
          exit="closed"
          variants={menu}
          className="absolute top-[120%] right-0 bg-white rounded-[20px] cursor-auto shadow-xl py-[25.5px] z-[80] w-[268.22px]"
        >
          <div className="flex flex-col gap-6 px-[22px]">
            <button
              className="flex items-center gap-3 w-fit"
              onClick={() => setIsQrCodeOpen(!isQrCodeOpen)}
            >
              <Image
                src={leftArrow.src}
                alt="back arrow icon"
                width={11.39}
                height={5.7}
              />
              Back
            </button>
            <div className="flex justify-center">
              <QRCode
                size={150}
                value={String(address)}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  ) : (
    <div
      className="flex relative justify-end md:me-3 text-base/4"
      ref={wrongNetworkRef}
    >
      <div
        className="flex bg-[#FACBCB] px-[18.3px] py-3 rounded-full cursor-pointer items-center relative justify-center"
        onClick={() => setIsWrongNetwoksOpen(!isWrongNetwoksOpen)}
      >
        <p>Wrong Network</p>
        <Image
          src={down.src}
          alt="down"
          className={`ml-[15px] ${isWrongNetwoksOpen && "rotate-180"}`}
          width={10}
          height={10}
        />
      </div>
      <motion.div
        animate={isWrongNetwoksOpen ? "open" : "closed"}
        initial="closed"
        exit="closed"
        variants={menu}
        className="absolute top-[120%] bg-white rounded-[20px] shadow-xl z-[80] font-medium w-[268.22px] py-6"
      >
        <div className="flex flex-col gap-3.5 px-[22px]">
          <p className="font-bold">Switch Network</p>
          <p className="text-xs/[11.6px] text-text-dark-gray">
            Wrong network detected, switch or disconnect to continue
          </p>
        </div>
        <hr className="border-border-dark-gray mt-[13.57px] mb-[19.51px]" />
        <div className="flex flex-col gap-5 px-[22px]">
          {chains.map((c) => (
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => {
                switchChain({ chainId: c.id });
              }}
              key={c.id}
            >
              <Image
                src={icons[c.id]}
                alt={c.name}
                className="h-8 md:h-7"
                width={32}
                height={32}
              />
              <p>{c.name}</p>
            </div>
          ))}
        </div>
        <hr className="border-border-dark-gray mt-[19.99px] mb-[18.53px]" />
        <div
          className="flex items-center gap-[17.7px] cursor-pointer px-[22px]"
          onClick={() => disconnect()}
        >
          {isPending ?
            <div className="h-5 flex justify-center items-center">
              <Spinner />
            </div> :
            <Image
              src={disconnectIcon.src}
              alt="disconnect wallet"
              width={17.68}
              height={20}
            />
          }
          <p>Disconnect</p>
        </div>
      </motion.div>
    </div>
  )
};

export default ConnectWallet;
