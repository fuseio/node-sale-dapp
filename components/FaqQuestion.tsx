import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PlusToMinus from "./ui/PlusToMinus";

type FaqQuestionProps = {
  question: string;
  answer: string | (() => JSX.Element);
};

const FaqQuestion = ({
  question,
  answer,
}: FaqQuestionProps) => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  return (
    <div className="flex justify-start border-t-[0.5px] px-4 py-7 items-start cursor-pointer">
      <div
        className="w-[5%] md:w-1/10"
        onClick={() => {
          setIsAnswerVisible(!isAnswerVisible);
        }}
      >
        <PlusToMinus isAnswerVisible={isAnswerVisible} />
      </div>
      <span className="flex flex-col w-[95%] md:w-9/10">
        <span
          className="text-lg/[18px] font-bold md:text-base/[18px]"
          onClick={() => {
            setIsAnswerVisible(!isAnswerVisible);
          }}
        >
          {question}
        </span>
        <AnimatePresence>
          {isAnswerVisible && (
            <motion.span
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: {
                  height: {
                    duration: 0.4,
                  },
                  opacity: {
                    duration: 0.25,
                    delay: 0.15,
                  },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: {
                    duration: 0.4,
                  },
                  opacity: {
                    duration: 0.25,
                  },
                },
              }}
            >
              <div className="text-text-dark-gray font-normal text-base mt-3.5 md:text-sm">
                {typeof answer === 'function' ?
                  answer() :
                  <p>{answer}</p>
                }
              </div>
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </div>
  );
};

export default FaqQuestion;
