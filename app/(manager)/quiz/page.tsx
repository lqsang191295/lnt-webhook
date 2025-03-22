"use client";
import { getQuizs } from "@/actions/quiz";
import Timer, { TimerHandle } from "@/components/timer";
import { Button } from "@/components/ui/button";
import { TypeQuestion } from "@/store/types/question";
import { useEffect, useRef, useState } from "react";

const PageQuiz = () => {
  const [quizs, setQuizs] = useState<TypeQuestion[]>([]);
  const [idxQuiz, setIdxQuiz] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);
  const timerRef = useRef<TimerHandle>(null);

  const getQuizData = async () => {
    const data = await getQuizs();

    setQuizs(data);
  };

  const handleComplete = () => {
    console.log("Completed !");
    setCompleted(true);
  };

  const handleNext = () => {
    if (idxQuiz < quizs.length - 1) {
      setIdxQuiz(idxQuiz + 1);
    } else {
      handleComplete();
    }
  };

  useEffect(() => {
    timerRef.current?.start();
    getQuizData();
  }, []);

  if (!quizs.length) return;

  if (completed) {
    return <div>Completed</div>;
  }

  return (
    <div className="">
      <div>
        <Timer duration={20} onTimeout={handleComplete} ref={timerRef} />
      </div>
      <div>
        <div>
          <span>Câu {idxQuiz}:</span> <span>{quizs[idxQuiz].question}</span>
        </div>
        {quizs[idxQuiz].options.map((op, idx) => {
          return <div key={`quiz-${idxQuiz}-${idx}`}>{op}</div>;
        })}
        <div>Explanation: {quizs[idxQuiz].explanation}</div>
      </div>
      <div>
        <Button
          className="cursor-pointer"
          variant="outline"
          size="sm"
          onClick={handleNext}>
          {idxQuiz < quizs.length - 1 ? "Next" : "Complete"}
        </Button>
      </div>
    </div>
  );
};

export default PageQuiz;
