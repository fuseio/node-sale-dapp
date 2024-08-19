import Image from "next/image";
import checkmarkBg from "@/assets/checkmark-bg.svg";

type ListProps = {
  id: string;
  title: string;
  items: string[];
}

const List = ({ id, title, items }: ListProps) => {
  return (
    <section id={id}>
      <div className="px-10 py-24 md:px-4 md:py-12">
        <div className="w-full max-w-7xl m-auto flex md:flex-col justify-between gap-14 md:gap-10">
          <h2 className="text-[2.5rem] md:text-[2rem] font-semibold max-w-80">
            {title}
          </h2>
          <div className="flex flex-col gap-6 md:gap-4">
            {items.map((item, i) => (
              <div key={i} className="flex items-start gap-3 md:gap-2.5">
                <Image
                  src={checkmarkBg}
                  alt="checkmark background"
                />
                <p className="text-2xl md:text-base max-w-[45rem]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default List;
