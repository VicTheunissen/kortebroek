import React, { useState } from 'react';
import './App.css';

function App() {
  const [temperature, setTemperature] = useState('');
  const [advice, setAdvice] = useState('');

  const handleInputChange = (e) => {
    setTemperature(e.target.value);
  };

  const handleSubmit = () => {
    const temp = parseFloat(temperature);
    if (isNaN(temp)) {
      setAdvice("Please enter a valid number.");
    } else if (temp >= 18) {
      setAdvice("It's warm! You can wear a korte broek (short pants).");
    } else {
      setAdvice("It's a bit cold! You should wear a lange broek (long pants).");
    }
  };

  return (
    <div className="App">
      <h1>Should I wear a korte broek or lange broek?</h1>
      <input 
        type="text" 
        placeholder="Enter the temperature in °C"
        value={temperature}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Check</button>
      <p>{advice}</p>
    </div>
  );
}

export default App;
