import React, { useEffect, useState } from "react";
import useSound from "use-sound";

import correctAudio from "../assets/src_sounds_correct.mp3";
import wrongAudio from "../assets/src_sounds_wrong.mp3";
import waitAudio from "../assets/src_sounds_wait.mp3";
import delay from "../utils/delay";

function Travis({
  data,
  setStop,
  questionNumber,
  setQuestionNumber,
  onWon,
  onStopWaitSfx,
}) {
  const [question, setQuestion] = useState(null);
  const [selectAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");

  const [handleCorrectSfx] = useSound(correctAudio);
  const [handleWrongSfx] = useSound(wrongAudio);
  // const [handleWaitSfx, { stop: onStopWaitSfx }] = useSound(waitAudio);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  // useEffect(() => {
  //   delay(2000, handleWaitSfx);
  // }, [question?.id]);

  const handleClick = (answer) => {
    setSelectedAnswer(answer);
    setClassName("answer active");

    delay(2000, () =>
      setClassName(answer.correct ? "answer correct" : "answer wrong")
    );

    delay(4000, () => {
      // onStopWaitSfx();

      if (answer.correct) {
        handleCorrectSfx();

        setSelectedAnswer(null);
        setQuestionNumber((prev) => prev + 1);

        if (data.length === questionNumber) {
          onWon();
          // setQuestionNumber(null);
        }
      } else {
        handleWrongSfx();
        setStop(true);
      }
    });
  };

  return (
    <div className="travis">
      <div className="question-box">{question?.question}</div>
      <div className="answer-box">
        {question?.answers.map((answer) => (
          <div
            className={selectAnswer === answer ? className : "answer"}
            onClick={() => {
              handleClick(answer);
            }}
          >
            {answer.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Travis;
