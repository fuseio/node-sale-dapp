import { useState } from "react";
import { useAccount } from "wagmi";
import ConnectWallet from "./ConnectWallet";
import { useAppSelector } from "@/lib/hooks";
import { selectUserSlice } from "@/store/userSlice";
import { mint } from "@/lib/contractInteract";

type PublicSaleInputProps = {
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
}

export default function PublicSaleForm() {
  const [amount, setAmount] = useState(1);
  const { currentTierDetail } = useAppSelector(selectUserSlice);

  return (
    <form
      className="flex flex-col gap-9 md:gap-5 w-full bg-tertiary rounded-[1.25rem] md:rounded-xl p-10 md:px-4 md:py-5"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formEntries = Object.fromEntries(formData.entries());
        const amount = formEntries["public-sale-amount"] as string;
        mint(currentTierDetail.price, parseInt(amount));
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
          <p className="text-xl md:text-sm leading-none font-semibold">
            Tier {currentTierDetail.tier}
          </p>
        </div>
        <div className="flex justify-between items-center gap-2">
          <p className="md:text-xs text-dove-gray">
            Price per license
          </p>
          <p className="text-xl md:text-sm leading-none font-semibold">
            {new Intl.NumberFormat().format(currentTierDetail.price)} FUSE
          </p>
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
          <p className="text-xl md:text-sm leading-none font-semibold">
            {new Intl.NumberFormat().format(currentTierDetail.price * Math.min(amount, currentTierDetail.availableSupply))} FUSE
          </p>
        </div>
      </div>
      <PublicSaleButton />
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

const PublicSaleButton = () => {
  const { isConnected } = useAccount();

  return (
    <div className="mt-auto md:mt-16">
      {isConnected ?
        <button
          type="submit"
          className="transition ease-in-out w-full p-4 md:py-2.5 flex justify-center items-center gap-2 bg-black rounded-full text-xl md:text-sm leading-none text-white font-semibold hover:bg-success hover:text-black"
        >
          Buy
        </button> :
        <ConnectWallet className="transition ease-in-out hover:bg-success hover:text-black hover:border-success w-full text-xl md:text-sm leading-none py-4 md:py-2.5" />
      }
    </div>
  )
}
