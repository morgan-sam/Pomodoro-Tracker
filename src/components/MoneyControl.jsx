import React, { useState, useEffect } from "react";
import { updateMoneyData } from "data/queries";
import { twoLeadingZeroes } from 'utility/parseText'

function MoneyControl(props) {
  const {date, moneyData, setMoneyData} = props;
  const todayDateString = `${date['year']}-${twoLeadingZeroes(date['month'])}-${twoLeadingZeroes(date['day'])}`;
  const todayMoneyCount = moneyData[todayDateString] || 0;
  const [inputValue, setInputValue] = useState("");
  const [changingMoneyCount, setChangingMoneyCount] = useState(false);

  const handleConfirm = () => {
    const newMoneyData = { ...moneyData, [todayDateString]: inputValue };
    setMoneyData(newMoneyData);
    updateMoneyData(todayDateString, inputValue);
    setChangingMoneyCount(false); 
  };

  const handleCancel = () => {
    setChangingMoneyCount(false); 
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleMoneyDisplayClicked = () => {
    setChangingMoneyCount(true);
    setInputValue("")
  }

  useEffect(() => {
    const moneyCountInput = document.getElementById('moneyCountInput');    
    if (changingMoneyCount) {
      moneyCountInput.focus()
    };
  }, [changingMoneyCount]);

  return (
    <div className="moneyControlContainer">
      <h2>Money: $</h2>
      {changingMoneyCount ? 
        <>
          <input id="moneyCountInput" className="moneyCountInput" type="number" value={inputValue} onChange={handleInputChange} />
          <button className="tick-button" onClick={handleConfirm}></button>
          <button className="cross-button" onClick={handleCancel}></button>
        </> : 
        <div className="moneyCountDisplay" onClick={handleMoneyDisplayClicked}>{todayMoneyCount}</div>
        }
    </div>
  );
}

export default MoneyControl;
