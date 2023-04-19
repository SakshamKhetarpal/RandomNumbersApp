import React, { useState, useEffect } from "react";

const App = () => {
  const ranges = [
    { min: 1, max: 10 },
    { min: 20, max: 30 },
    { min: 40, max: 50 },
    { min: 60, max: 70 },
    { min: 80, max: 90 }
  ];

  const timeIntervals = [1000, 2000, 3000, 4000, 5000]; // milliseconds

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
    <div>
      {randomNumbers.map((number, index) => (
        <p key={index}>
          Random number from range {ranges[index].min} to {ranges[index].max}:{" "}
          {number}
        </p>
      ))}
    </div>
  );
};

export default App;
