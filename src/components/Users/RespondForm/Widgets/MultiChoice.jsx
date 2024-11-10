import React, { useState, useEffect } from "react";
import {ReqLabel} from "./Inputs";
function RadioInput({ q, answer, onChange }) {
  const [random, setRandom] = useState(Math.random().toString(36).substring(2, 15));
  return (
    <div>
      <ReqLabel q={q} />
      {q.question.radioInput.map((option,index) => {
        return (
          <div key={index}>
            <input type="radio" name={random} onChange={e=>e.target.checked && onChange(index)} value={index} />
            <label>{option}</label>
          </div>
        );
      })}
      <button onClick={()=>onChange(null)}>Clear</button>
    </div>
  );
}
function DropdownInput({ q, answer, onChange }) {
  
  return (
    <div>
      <ReqLabel q={q} />
      <select onChange={e=>onChange(Number(e.target.value))} value={answer}>
        {q.question.dropdownInput.map((option,index) => {
          return (
            <option key={index} value={index}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}
function CheckboxInput({ q, answer, onChange }) {
  const [random, setRandom] = useState(Math.random().toString(36).substring(2, 15));
  const [selected, setSelected] = useState([]);
  useEffect(()=>{
    // the indices of the selected where selected[index] is true
    onChange(selected.map((s,index)=>s?index:null).filter(s=>s!==null));
  },[selected]);
  return (
    <div>
      <ReqLabel q={q} />
      {q.question.checkboxInput.map((option,index) => {
        return (
          <div key={index}>
            <input type="checkbox" name={random} onChange={e=>setSelected(s=>{s[index]=e.target.checked;return s;})} value={answer} />
            <label>{option}</label>
          </div>
        );
      })}
    </div>
  );
}
export { RadioInput, DropdownInput, CheckboxInput };
