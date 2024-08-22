import { useState } from "react";
import fuseLogo from "@/assets/fuse-logo.svg";
import NavMenu from "./NavMenu";
import NavButton from "./NavButton";
import Image from "next/image";
import { MenuItems } from "@/lib/types";

const menu: MenuItems = [
  {
    title: "About",
    link: "#about",
  },
  {
    title: "Public Sale",
    link: "#public-sale",
  },
  {
    title: "FAQs",
    link: "#faq",
  },
  {
    title: "Docs",
    link: "https://docs.fuse.io/",
    isNewTab: true,
  },
]

const Topbar = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <nav className="w-full h-20 top-0 flex justify-center py-7 md:h-[32px] md:mt-2 z-[60]">
      <div className="flex justify-between h-full items-center w-[100%] px-8 relative">
        <span>
          <a href="/">
            <Image
              src={fuseLogo}
              alt="Fuse logo"
              width={86}
              height={24}
              className="z-50"
            />
          </a>
        </span>
        <NavMenu menuItems={menu} isOpen={isOpen} liClassName="w-fit whitespace-nowrap px-4 py-2.5" />
        <NavButton isOpen={isOpen} setOpen={setOpen} />
      </div>
    </nav>
  );
};

export default Topbar;
