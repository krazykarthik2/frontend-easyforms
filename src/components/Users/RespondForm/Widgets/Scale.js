import React, { useState, useEffect } from "react";
import { ReqLabel } from "./Inputs";
function ScaleInput({ q, answer, onChange }) {
  return (
    <div>
      <ReqLabel q={q} />
      <div className="gap-2 d-center">
        <input type="range" onChange={(e) => onChange(e.target.value)} value={answer} />
        <div>{answer}</div>
      </div>
    </div>
  );
}
function RatingInput({ q, answer, onChange }) {
  return (
    <div>
      <ReqLabel q={q} />
      
      <div className="gap-2 d-center">
        {Array.from({
          length: q.question.rating.max - q.question.rating.min + 1,
        }).map((_, index) => {
          return <button onClick={() => onChange(Number(q.question.rating.min) + index)} key={index} className={"bg-white text-dark rounded-circle p-2" + (answer === Number(q.question.rating.min) + index ? "bg-dark text-white" : "")}>{Number(q.question.rating.min) + index}</button>;
        })}
      </div>
    </div>
  );
}
export { ScaleInput, RatingInput };
