import { useFormStatus } from "react-dom";
import Spinner from "./ui/Spinner";

export default function JoinWaitlistButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className="transition ease-in-out flex items-center gap-2 px-4 py-3 bg-success border border-success rounded-full text-xl md:text-lg leading-none text-black font-semibold hover:bg-transparent hover:border-black"
    >
      Request Access to Whitelist
      {pending && <Spinner />}
    </button>
  )
}
