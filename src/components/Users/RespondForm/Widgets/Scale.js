import React, { useState, useEffect } from "react";
import { ReqLabel } from "./Inputs";
import { FaStar } from "react-icons/fa6";
function ScaleInput({ q, answer, onChange }) {
  const reset=()=>onChange('')
  return (
    <div className="d-center stack">
      <ReqLabel q={q} reset={reset}/>
      <div className="gap-2 d-center">
        <input type="range" required={q?.required}  min={q?.question?.scale?.min}  max={q?.question?.scale?.max} onChange={(e) => onChange(e.target.value)} value={answer} />
        <div>{answer}</div>
      </div>
    </div>
  );
}
function RatingInput({ q, answer, onChange }) {
  const [random, setRandom] = useState(Math.random().toString(36).substring(2, 15));
  const reset=()=>{
    onChange("")
  }
  return (
    <div className="d-center stack">
      <ReqLabel q={q} htmlFor={random} reset={reset}/>
      <div className="gap-2 d-center">
        {Array.from({
          length: q.question.rating.max - q.question.rating.min +1,
        }).map((_, index) => {
          return          <div className="group" key={index}>
          <input type="radio" hidden required={q?.required} id={random+index} name={random} checked={index==(answer-q.question.rating.min)} onChange={e=>e.target.checked?onChange(Number(q.question.rating.min) + index):()=>{}} />
          <label  htmlFor={random+index} className={"unbtn relative d-center m-1 " + (answer === Number(q.question.rating.min) + index ? "mb-10 text-yellow-300 " : "")}>
            <span className="absolute text-black text-xs w-full h-full d-center"> {Number(q.question.rating.min) + index}</span>
            <FaStar size={35}/>
            </label></div>;
        })}
      </div>

    </div>
  );
}
export { ScaleInput, RatingInput };
