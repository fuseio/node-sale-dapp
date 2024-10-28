import Hamburger from "@/components/ui/Hamburger";
import Link from "next/link";

type NavButtonProps = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

const NavButton = ({ isOpen, setOpen }: NavButtonProps) => {

  return (
    <div className="flex order-2 min-w-[150px] lg:w-[93%] justify-end items-center">
      <Link
        href="#waitlist"
        className="transition ease-in-out min-w-[14.625rem] md:w-full p-4 md:p-3 flex justify-center items-center gap-2 bg-success border border-success rounded-full text-xl md:text-lg leading-none text-black font-semibold hover:bg-transparent hover:border-black"
      >
        Join Waitlist
      </Link>
      <button
        type="button"
        className="p-2 w-10 h-8 hidden lg:inline-flex focus:outline-none"
        aria-controls="navbar-sticky"
        aria-expanded="false"
        onClick={() => setOpen(!isOpen)}
      >
        <span className="sr-only">Open main menu</span>
        <Hamburger
          isOpen={isOpen}
          height={18}
          strokeWidth={3}
        />
      </button>
    </div>
  )
}

export default NavButton;
