import { useEffect, useState } from "react";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import ConnectWallet from "./ConnectWallet";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { retrieveCurrentTierDetail, retrieveTierDetails, retrieveTotalSupply, selectUserSlice, setIsMinted, tokenBought } from "@/store/userSlice";
import Spinner from "./ui/Spinner";
import { CONFIG } from "@/lib/config";
import { NodeSaleAbi } from "@/lib/abi/NodeSale";
import { Address, parseEther } from "viem";
import { hex } from "@/lib/helpers";

type PublicSaleInputProps = {
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
}

type PublicSaleButtonProps = {
  isPending: boolean;
  hash: Address | undefined;
}

export default function PublicSaleForm() {
  const [amount, setAmount] = useState(1);
  const { isClient, isCurrentTierDetailLoading, currentTierDetail, isMinted } = useAppSelector(selectUserSlice);
  const { address } = useAccount();
  const {
    data: hash,
    isPending,
    writeContract
  } = useWriteContract();

  return (
    <form
      className="flex flex-col gap-9 md:gap-5 w-full bg-tertiary rounded-[1.25rem] md:rounded-xl p-10 md:px-4 md:py-5"
      onSubmit={(e) => {
        e.preventDefault();
        if (!address) {
          console.warn("Address not found to mint");
          return;
        }
        const formData = new FormData(e.target as HTMLFormElement);
        const amount = formData.get('public-sale-amount') as string;
        writeContract({
          address: CONFIG.nodeSaleAddress,
          abi: NodeSaleAbi,
          functionName: "mint",
          value: parseEther((currentTierDetail.price * parseInt(amount)).toString()),
          args: [address, BigInt(amount), hex],
        });
      }}
    >
      <p className="text-2xl md:text-lg font-semibold">
        Purchase
      </p>
      <div className="flex flex-col gap-8 md:gap-4">
        <div className="flex justify-between items-center gap-2">
          <p className="md:text-xs text-dove-gray">
            Current tier
          </p>
          {!isMinted && (!isClient || isCurrentTierDetailLoading) ?
            <span className="w-20 h-6 md:h-5 rounded-md animate-pulse bg-white"></span> :
            <p className="text-xl md:text-sm leading-none font-semibold">
              Tier {currentTierDetail.tier}
            </p>
          }
        </div>
        <div className="flex justify-between items-center gap-2">
          <p className="md:text-xs text-dove-gray">
            Price per license
          </p>
          {!isMinted && (!isClient || isCurrentTierDetailLoading) ?
            <span className="w-20 h-6 md:h-5 rounded-md animate-pulse bg-white"></span> :
            <p className="text-xl md:text-sm leading-none font-semibold">
              {new Intl.NumberFormat().format(currentTierDetail.price)} FUSE
            </p>
          }
        </div>
        <div className="flex justify-between items-center gap-2">
          <p className="md:text-xs text-dove-gray">
            Amount
          </p>
          <PublicSaleInput amount={amount} setAmount={setAmount} />
        </div>
        <div className="flex justify-between items-center gap-2">
          <p className="md:text-xs text-dove-gray">
            Pay
          </p>
          {!isMinted && (!isClient || isCurrentTierDetailLoading) ?
            <span className="w-20 h-6 md:h-5 rounded-md animate-pulse bg-white"></span> :
            <p className="text-xl md:text-sm leading-none font-semibold">
              {new Intl.NumberFormat().format(currentTierDetail.price * Math.min(amount, currentTierDetail.availableSupply))} FUSE
            </p>
          }
        </div>
      </div>
      <PublicSaleButton isPending={isPending} hash={hash} />
    </form>
  )
}

const PublicSaleInput = ({ amount, setAmount }: PublicSaleInputProps) => {
  const { currentTierDetail } = useAppSelector(selectUserSlice);

  return (
    <div className="flex justify-between items-center gap-4 bg-white rounded-[0.625rem] px-3 py-2 text-xl leading-none font-semibold">
      <button
        type="button"
        onClick={() => setAmount((amount: number) => amount > 1 ? amount - 1 : amount)}
      >
        -
      </button>
      <input
        type="number"
        name="public-sale-amount"
        id="public-sale-amount"
        min={1}
        max={currentTierDetail.availableSupply}
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
        className="public-sale-amount outline-none flex items-center text-xl md:text-sm leading-none"
      />
      <button
        type="button"
        onClick={() => setAmount((amount: number) => amount < currentTierDetail.availableSupply ? amount + 1 : amount)}
      >
        +
      </button>
    </div>
  )
}

const PublicSaleButton = ({ isPending, hash }: PublicSaleButtonProps) => {
  const { isConnected, address } = useAccount();
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash })

  useEffect(() => {
    if (address && isSuccess) {
      dispatch(setIsMinted(true));
      dispatch(retrieveTotalSupply());
      dispatch(retrieveCurrentTierDetail());
      dispatch(retrieveTierDetails());
      dispatch(tokenBought({ address }));
    }
  }, [dispatch, address, isSuccess])

  return (
    <div className="mt-auto md:mt-16">
      {isConnected ?
        <button
          type="submit"
          className="transition ease-in-out w-full p-4 md:py-2.5 flex justify-center items-center gap-2 bg-black rounded-full text-xl md:text-sm leading-none text-white font-semibold hover:bg-success hover:text-black"
        >
          Buy
          {(isPending || isLoading) &&
            <Spinner />
          }
        </button> :
        <ConnectWallet className="transition ease-in-out hover:bg-success hover:text-black hover:border-success w-full text-xl md:text-sm leading-none py-4 md:py-2.5" />
      }
    </div>
  )
}
