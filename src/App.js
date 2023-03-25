import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const requestURL = 'https://api.exchangerate.host/latest';
    const request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
      const response = request.response;
      setRates(response.rates);
    }
  }, []);

  const convertCurrency = () => {
    const amountNum = parseFloat(amount);
    const gbpRate = rates.GBP;
    if (isNaN(amountNum) || isNaN(gbpRate)) {
      setResult('Invalid input');
    } else {
      const resultNum = amountNum * gbpRate;
      setResult(`${amount} EUR = ${resultNum.toFixed(2)} GBP`);
    }
  }

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  }

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <div className="input-container">
        <input type="text" value={amount} onChange={handleAmountChange} placeholder="Enter amount in EUR"/>
        <button onClick={convertCurrency}>Convert</button> 
      </div>
      <div className="output-container">
        <span>{result}</span>
      </div>
    </div>
  );
}

export default App;
