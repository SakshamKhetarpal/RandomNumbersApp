import React, { useState, useEffect } from "react";

const App = () => {
  const ranges = [
    { min: 10, max: 20 },
    { min: -10, max: 10 },
    { min: -100, max: 0 },
    { min: 0, max: 20 },
    { min: -40, max: 40 },
    { min: 100, max: 200 }
  ];

  const timeIntervals = [10000, 20000, 8000, 12000, 16000, 14000]; // milliseconds

  const [randomNumbers, setRandomNumbers] = useState<number[]>([]); // Specify type as number[] for randomNumbers
  const intervalIds: NodeJS.Timeout[] = []; // Specify type as NodeJS.Timeout[] for intervalIds

  useEffect(() => {
    // Set up intervals to display random numbers
    ranges.forEach((range, index) => {
      const intervalId = setInterval(() => {
        const randomNumber = Math.floor(
          Math.random() * (range.max - range.min + 1) + range.min
        );
        setRandomNumbers(prevNumbers => {
          const newNumbers = [...prevNumbers];
          newNumbers[index] = randomNumber;
          return newNumbers;
        });
      }, timeIntervals[index]);
      intervalIds.push(intervalId);
    });

    // Clear intervals on component unmount
    return () => {
      intervalIds.forEach(intervalId => clearInterval(intervalId));
    };
  }, []);

  return (
    <div style={{ margin: "auto", width: "80%", textAlign: "center" }}>
      <h1 style={{ marginBottom: "1rem" }}>Random Numbers (Multithreading)</h1>
      {randomNumbers.map((number, index) => (
        <p
          key={index}
          style={{
            fontSize: "1.2rem",
            margin: "0.5rem",
            padding: "0.5rem",
            backgroundColor: "#D6EAF8",
            borderRadius: "4px",
          }}
        >
          Refresh time:{" "}
          <strong>
            {timeIntervals[index] / 1000}
          </strong>{" "}seconds
          | Random number from range 
            <strong>[{ranges[index].min}, {ranges[index].max}]</strong>:{" "}<strong> {number}</strong>
        </p>
        
      ))}
    </div>
  );
};

export default App;
