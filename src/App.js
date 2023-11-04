import React, { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);




 const questions = [
    {
      text: "Which mammal has no vocal chords",
      options: [
        { id: 0, text: "Bat", isCorrect: false },
        { id: 1, text: "Koala", isCorrect: false },
        { id: 2, text: "Blue whale", isCorrect: false },
        { id: 3, text: "Giraffe", isCorrect: true },
      ],
    },
    {
      text: "What is the most visited tourist attraction in the world?",
      options: [
        { id: 0, text: "Eiffel Tower", isCorrect: true },
        { id: 1, text: "Taj Mahal", isCorrect: false },
        { id: 2, text: "Colosseum", isCorrect: false },
        { id: 3, text: "Great Wall of China", isCorrect: false },
      ],
    },
    {
      text: "Which country’s national animal is a unicorn?",
      options: [
        { id: 0, text: "Scotland", isCorrect: true },
        { id: 1, text: "Denmark", isCorrect: false },
        { id: 2, text: "New Zealand", isCorrect: false },
        { id: 3, text: "France", isCorrect: false },
      ],
    },
    {
      text: "What is the largest state in the US?",
      options: [
        { id: 0, text: "California", isCorrect: false },
        { id: 1, text: "Alaska", isCorrect: true },
        { id: 2, text: "Texas", isCorrect: false },
        { id: 3, text: "Montana", isCorrect: false },
      ],
    },
    {
      text: "Which sea creature has three hearts?",
      options: [
        { id: 0, text: "Shark", isCorrect: false },
        { id: 1, text: "Octopus", isCorrect: true },
        { id: 2, text: "Stingray", isCorrect: false },
        { id: 3, text: "Jellyfish", isCorrect: false },
      ],
    },
  ];



  const optionClicked = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  };

  return (
    <div className="App">

      {<h1>{message}</h1>}
      <h1>TRIVIA QUIZ</h1>

      <h2>Score: {score}</h2>

      {showResults ? (
        <div className="final-results">
          <h1>Final Results</h1>
          <h2>
            {score} out of {questions.length} correct - (
            {(score / questions.length) * 100}%)
            
              
          </h2>
          <button onClick={() => restartGame()}>Restart game</button>
        </div>
      ) : (
        <div className="question-card">
        
          <h2>
            Question: {currentQuestion + 1} out of {questions.length}
          </h2>
          <h3 className="question-text">{questions[currentQuestion].text}</h3>

          
          <ul>
            {questions[currentQuestion].options.map((option) => {
              return (
                <li
                  key={option.id}
                  onClick={() => optionClicked(option.isCorrect)}
                >
                  {option.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );

}



export default App;
