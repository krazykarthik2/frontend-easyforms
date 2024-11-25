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
            <input type="radio" id={random+index} name={random} onChange={e=>e.target.checked && onChange(index)} checked={index==answer && typeof(answer)=='number'} 
            required={q?.required}
             />
            <label htmlFor={random+index}>{option}</label>
          </div>
        );
      })}
      <button type="button" onClick={()=>onChange(null)}>Clear</button>
    </div>
  );
}
function DropdownInput({ q, answer, onChange }) {
  
  return (
    <div>
      <ReqLabel q={q} />
      <select onChange={e=>onChange(Number(e.target.value))} value={answer} 
            required={q?.required}
        >
        <option value="">--select--</option>
        {q.question.dropdownInput.map((option,index) => {
          return (
            <option key={index} value={index}>
              {option}
            </option>
          );
        })}
      </select>
      <button type="button" onClick={()=>onChange("")}>Clear</button>
    </div>
  );
}
function CheckboxInput({ q, answer, onChange }) {
  //TODO: implement q.required for checkbox
  const [random, setRandom] = useState(Math.random().toString(36).substring(2, 15));
  const [selected, setSelected] = useState([]);
  useEffect(()=>{
    // the indices of the selected where selected[index] is true
    onChange(selected.map((s,index)=>s?index:null).filter(s=>s!==null));
  },[selected]);
  useEffect(()=>{
    setSelected(new Array(q.question.checkboxInput.length).fill(''));
  },[
    q?.question?.checkboxInput
  ])
  return (
    <div>
      <ReqLabel q={q} />
      {q.question.checkboxInput.map((option,index) => {
        return (
          <div key={index}>
            <input  id={random+index} type="checkbox" name={random} 
            onChange={e=>setSelected(s=>s.map((obj,_index)=>_index==index?e.target.checked:obj))} 
            checked={answer?.includes(index)}
            />
            <label htmlFor={random+index}>{option}</label>
          </div>
        );
      })}
      <button type="button" onClick={()=>setSelected([])}>Clear</button>
    </div>
  );
}
export { RadioInput, DropdownInput, CheckboxInput };
