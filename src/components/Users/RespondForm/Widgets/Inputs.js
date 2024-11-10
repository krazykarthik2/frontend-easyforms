import React, { useState, useEffect } from "react";
function ReqLabel({q}){
  return <label>{q.label}{q.required && <span className='text-danger'>*</span>}</label>;
}
function TextInput({ q, answer, onChange }) {
  return (
    <div>
      <ReqLabel q={q} />
      <input type="text" onChange={(e) => onChange(e.target.value)} value={answer} />
    </div>
  );
}
function ParagraphInput({ q, answer, onChange }) {
  return (
    <div>
      <ReqLabel q={q} />
      <textarea onChange={(e) => onChange(e.target.value)} value={answer} />
    </div>
  );
}
function NumberInput({ q, answer, onChange }) {
  return (
    <div>
      <ReqLabel q={q} />
      <input type="number" onChange={(e) => onChange(e.target.value)} value={answer} />
    </div>
  );
}
function DateInput({ q, answer, onChange }) {
  return (
    <div>
      <ReqLabel q={q} />
      <input type="date" onChange={(e) => onChange(e.target.value)} value={answer} />
    </div>
  );
}
function TimeInput({ q, answer, onChange }) {
  return (
    <div>
      <ReqLabel q={q} />
      <input type="time" onChange={(e) => onChange(e.target.value)} value={answer} />
    </div>
  );
}

function EmailInput({ q, answer, onChange }) {
  return (
    <div>
      <ReqLabel q={q} />
      <input type="email" onChange={(e) => onChange(e.target.value)} value={answer} />
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
  ReqLabel,
};
