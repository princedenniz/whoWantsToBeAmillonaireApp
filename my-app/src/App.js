import { useState, useEffect } from "react";
import useSound from "use-sound";

import "./App.css";
import Travis from "./Components/Travis";
import Timer from "./Components/Timer";
import delay from "./utils/delay";

import playAudio from "./assets/src_sounds_play.mp3";
import waitAudio from "./assets/src_sounds_wait.mp3";

function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [startGame, setStartGame] = useState({
    start: false,
    loading: false,
  });
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const [handlePlaySfx, { stop: handleStopPlaySfx }] = useSound(playAudio);
  const [handleWaitSfx, { stop: handleStopWaitSfx }] = useSound(waitAudio);

  const handleStartBtnOnClick = () => {
    setStartGame({ loading: true, start: false });

    delay(3000, () => setStartGame({ loading: false, start: true }));
  };

  useEffect(() => {
    if (!startGame.loading && startGame.start) {
      handlePlaySfx();
      setStartGame({ loading: false, start: true });

      delay(5000, handleStopPlaySfx);
      delay(6000, handleWaitSfx);
    }
  }, [startGame.loading, startGame.start]);

  const handleRestart = () => {
    delay(100, handleStopWaitSfx);

    setQuestionNumber(1);
    setStop(false);
    setEarned(0);
    setIsWon(false);

    delay(1000, handleWaitSfx);
  };

  const hanldeWon = (value) => setIsWon(value === undefined ? true : value);

  const data = [
    {
      id: 1,
      amount: "$ 100",
      question: "Rolex is a company that specializes in what type of product?",
      answers: [
        {
          text: "phone",
          correct: false,
        },
        {
          text: "Watches",
          correct: true,
        },
        {
          text: "food",
          correct: false,
        },
        {
          text: "Cosmetic",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      amount: "$ 200",
      question: "who played the character harry potter ?",
      answers: [
        {
          text: "Dennis king",
          correct: false,
        },
        {
          text: "leonardo Di Caprio",
          correct: false,
        },
        {
          text: "Daniel washinton",
          correct: false,
        },
        {
          text: "Daniel Red cliff",
          correct: true,
        },
      ],
    },
    {
      id: 3,
      amount: "$ 300",
      question: "when did the website facebook launched ?",
      answers: [
        {
          text: "2004",
          correct: true,
        },
        {
          text: "2005",
          correct: false,
        },
        {
          text: "2001",
          correct: false,
        },
        {
          text: "2006",
          correct: false,
        },
      ],
    },
  ];

  const moneyPyramid = data
    .map((item) => ({
      id: item.id,
      amount: item.amount,
    }))
    .reverse();

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);

  const mainContent = (() => {
    console.log(startGame.start, startGame.loading);

    if (!startGame.start && !startGame.loading)
      return <button onClick={handleStartBtnOnClick}>Start</button>;

    if (startGame.loading) return <h2>Loading please wait...</h2>;

    if (stop) {
      delay(7000, () => handleRestart());

      return (
        <>
          <h3>you earned : {earned}</h3>
          <h1>You timed out!</h1>
        </>
      );
    }

    if (isWon) {
      delay(7000, () => handleRestart());

      return (
        <>
          <h3>you earned : {earned}</h3>
          <h1>You Won!</h1>
        </>
      );
    }

    return (
      <>
        <div className="timer-cont">
          <Timer setStop={setStop} questionNumber={questionNumber} />
        </div>
        <div className="answer-box">
          <Travis
            data={data}
            onWon={hanldeWon}
            questionNumber={questionNumber}
            setQuestionNumber={setQuestionNumber}
            setStop={setStop}
          />
        </div>
      </>
    );
  })(); // IIFE

  return (
    <div className="app">
      <div className="main">{mainContent}</div>

      <div className="pyramid">
        <ul className="money-list">
          {moneyPyramid.map((m) => (
            <li
              className={
                questionNumber === m.id ? "moneyList active" : "moneyList"
              }
            >
              <span className="moneyListNumber">{m.id}</span>
              <span className="moneyListAmount">{m.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
