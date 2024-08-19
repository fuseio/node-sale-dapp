"use client";
import FaqQuestion from "./FaqQuestion";

type FAQProps = {
  questions: string[];
  answers: string[];
};

const FAQ = ({ questions, answers }: FAQProps) => {
  return (
    <section>
      <div className="px-10 py-24 md:px-4 md:py-12">
        <div className="w-full max-w-7xl m-auto flex md:flex-col">
          <div className="w-2/5 md:w-full">
            <p className="text-black font-semibold text-5xl md:text-3xl md:text-center">
              Frequently
              <br className="md:hidden" /> Asked
              <br className="md:hidden" /> Questions
            </p>
          </div>
          <div className="w-3/5 md:w-full md:mt-8">
            {questions.map((question, index) => (
              <FaqQuestion
                key={index}
                question={question}
                answer={answers[index]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
