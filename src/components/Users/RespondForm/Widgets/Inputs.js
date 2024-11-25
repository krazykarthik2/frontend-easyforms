import React, { useState, useEffect } from "react";
import { FaRedo} from "react-icons/fa"
function ReqLabel({q,htmlFor=null,reset=null}){
  return <label htmlFor={htmlFor} className="self-start">
    <span>
    {q.label}{q.required && <span className='text-danger'>*</span>}</span>
    {reset!=null&&<button type="button" className="unbtn" onClick={reset}><FaRedo /></button>}
  </label>;
}
function TextInput({ q, answer, onChange }) {
  const [random, setRandom] = useState(Math.random().toString(36).substring(2, 15));
  return (
    <div className="d-center stack">
      <ReqLabel htmlFor={random} q={q} />
      <input name={random} type="text" required={q?.required} onChange={(e) => onChange(e.target.value)} value={answer} />
    </div>
  );
}
function SingleCheckboxInput({ q, answer, onChange }) {
  const [random, setRandom] = useState(Math.random().toString(36).substring(2, 15));
  return (
    <div className="d-center">
      <ReqLabel htmlFor={random} q={q} />
      <input name={random} type="checkbox" required={q?.required} onChange={(e) => onChange(e.target.checked)} checked={answer} />
    </div>
  );
}
function ParagraphInput({ q, answer, onChange }) {
  const [random, setRandom] = useState(Math.random().toString(36).substring(2, 15));
  return (
    <div className="d-center stack">
      <ReqLabel htmlFor={random} q={q} />
      <textarea name={random} required={q?.required} onChange={(e) => onChange(e.target.value)} value={answer} />
    </div>
  );
}
function NumberInput({ q, answer, onChange }) {
  const [random, setRandom] = useState(Math.random().toString(36).substring(2, 15));
  return (
    <div className="d-center stack">
      <ReqLabel htmlFor={random} q={q} />
      <input name={random} type="number" required={q?.required} onChange={(e) => onChange(e.target.value)} value={answer} />
    </div>
  );
}
function DateInput({ q, answer, onChange }) {
  const [random, setRandom] = useState(Math.random().toString(36).substring(2, 15));
  return (
    <div className="d-center stack">
      <ReqLabel htmlFor={random} q={q} />
      <input name={random} type="date" required={q?.required} onChange={(e) => onChange(e.target.value)} value={answer} />
    </div>
  );
}
function TimeInput({ q, answer, onChange }) {
  const [random, setRandom] = useState(Math.random().toString(36).substring(2, 15));
  return (
    <div className="d-center stack">
      <ReqLabel htmlFor={random} q={q} />
      <input name={random} type="time" required={q?.required} onChange={(e) => onChange(e.target.value)} value={answer} />
    </div>
  );
}

function EmailInput({ q, answer, onChange }) {
  const [random, setRandom] = useState(Math.random().toString(36).substring(2, 15));
  return (
    <div className="d-center stack">
      <ReqLabel htmlFor={random} q={q} />
      <input name={random} type="email" required={q?.required} onChange={(e) => onChange(e.target.value)} value={answer} />
    </div>
  );
}

export {
  TextInput,
  ParagraphInput,
  NumberInput,
  DateInput,
  TimeInput,
  EmailInput,
  ReqLabel,SingleCheckboxInput
};
