import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [numberQty, setNumberQty] = useState(5);
  const [randomNumber, setRandomNumber] = useState(1);
  const [showRandomNumber, setShowRandomNumber] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [isOrdered, setIsOrdered] = useState(false); // Estado para rastrear se os números estão em ordem
  const [isComplete, setIsComplete] = useState(false); // Estado para rastrear se todos os números foram preenchidos

  const cleanEverything = () => {
    setShowRandomNumber(false);
    setRandomNumber(1);
    setInputValues({});
    setIsOrdered(false);
    setIsComplete(false);
  }
  
  const handleNumToOrderChange = (e) => {
    setNumberQty(e.target.value);
    cleanEverything()
  }

  function generateRandomNumber() {
    return Math.floor(Math.random() * 1000) + 1;
  }
  

  const handleButtonClick = (e) => {
    setRandomNumber(generateRandomNumber());
    setShowRandomNumber(true);
    // console.log(randomNumber)
  }

  const handleInputClick = (index) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [index]: randomNumber.toString(),
    }));
  }

  const resetButton = (title) => {
    return (
      <button onClick={cleanEverything}>
        {title}
      </button>
    )
  }

  useEffect(() => {
    // Função para verificar se os números estão em ordem crescente
    const checkOrder = () => {
      const values = Object.values(inputValues);
      for (let i = 1; i < values.length; i++) {
        if (parseInt(values[i]) < parseInt(values[i - 1])) {
          setIsOrdered(false);
          return;
        }
      }
      setIsOrdered(true);
    };

    checkOrder(); // Verifique imediatamente quando inputValues mudar

    console.log(inputValues);
    console.log(isOrdered)

    // Verifica se todos os campos estão preenchidos e em ordem crescente
    const areAllFilled = Object.values(inputValues).length === parseInt(numberQty);
    setIsComplete(areAllFilled && isOrdered);

    console.log(isComplete)

    // Adicione inputValues como dependência para que a função seja chamada quando inputValues mudar
  }, [inputValues, isOrdered, isComplete, numberQty]);



  return (
    <div className="App">
      <h1>Number Challenge</h1>
      <p>Select how many numbers you want to order:</p>

      <select onChange={handleNumToOrderChange} value={numberQty}>
        <option value={5}>5 numbers</option>
        <option value={10}>10 numbers</option>
        <option value={20}>20 numbers</option>
        <option value={2}>2 numbers</option>
      </select>

      <p>Click the button below to generate your random number.</p>
      <button onClick={handleButtonClick}>
        Generate Random Number
      </button>

      {showRandomNumber && (
        <p>Your random number is: {randomNumber}</p>
      )}


      <p>Click inside a field to put your number.</p>

      {
        Array.from({ length: numberQty }, (_, index) => (
          <input  value={inputValues[index] || ''} onClick={() => handleInputClick(index)} key={index} type="text" placeholder={`Input ${index + 1}`} />
        ))
      }

      <br />
      <br />

      {resetButton('Reset')}

      {!isOrdered && (<h3>Game Over</h3>)}

      {isComplete && (<h3>You Win!</h3>)}



    </div>
  );
}

export default App;
