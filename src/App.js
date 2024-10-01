import './App.css';
import { useRef, useState, useEffect } from "react";

function App() {
  const euroRef = useRef();
  const resultRef = useRef();
  const [valueChange, setValueChange] = useState(null);

  useEffect(
    () => {
      const callApiChange = async () => {
        try {
          const response = await fetch("https://v6.exchangerate-api.com/v6/b91aeff2a690c886be6a2960/latest/EUR");
          const data = await response.json();          
          setValueChange(data.conversion_rates.USD);
        } catch(error) {
          console.log("Error toaccess to API",error);
        }
      };
      callApiChange();
    },[]
  );

  const calculate = () => {
    const euroValue = parseFloat(euroRef.current.value);
    const dolar = euroValue * valueChange;

    resultRef.current.innerHTML = "$ " + dolar.toFixed(2);
  }

  return (
    <div>
      <h1>Conversor Euro-Dolar</h1>
      <input className='centerElement' type='text' ref={euroRef}></input><br></br>
      <button className='centerElement' onClick={calculate}>Convert</button><br></br>
      <div className='centerElement result' ref={resultRef}></div>
    </div>
  );
}

export default App;