import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFormById } from "../../utils/api_calls/forms";
import { getResponses } from "../../utils/api_calls/responses";
import { idFormat } from "../../utils/formats/formats";
function ShowRadioDropdown({question,answer}){
  return <div> {question?.radioInput?.[answer?.radioInput] || question?.dropdownInput?.[answer?.dropdownInput]}</div>
}
function ShowCheckbox({attribute,answer}){
  return <div>{answer.map((answer)=>attribute.checkboxInput[answer])}</div>
}
function ShowDate({attribute,answer}){
  return <div>{JSON.stringify(answer)}</div>
}
function ShowParagraph({attribute,answer}){
  return <div>{JSON.stringify(answer)}</div>
} 
function ShowResponse({attribute,answer}){
  return attribute&&attribute.question && <>
  {"radioInput" in attribute.question || "dropdownInput" in attribute.question ? <ShowRadioDropdown question={attribute.question} answer={answer}/> : null}
  {"checkboxInput" in attribute.question ? <ShowCheckbox attribute={attribute} answer={answer}/> : null}
  {"dateInput" in attribute.question||"timeInput" in attribute.question||"datetimeInput" in attribute.question ? <ShowDate attribute={attribute} answer={answer}/> : null}
  {"paragraphInput" in attribute.question ? <ShowParagraph attribute={attribute} answer={answer} /> : null}
  {"numberInput" in attribute.question||"textInput" in attribute.question||"emailInput" in attribute.question ? <div>{answer.textInput || answer.numberInput || answer.emailInput }</div>:null}
    </>
}
function Responses({ token }) {
  const [responses, setResponses] = useState([]);
  const [form, setForm] = useState(null);
  const params = useParams();
  useEffect(() => {
    getFormById(params.formId, token).then(setForm);
    getResponses(params.formId, token).then(setResponses);
  
  }, [token, params.formId]);
  return (
    <div>
      <h1>
        Responses for form {form?.name}
        <div className="stack">
          {idFormat(params.formId).map((id) => (
            <span key={id}>{id}</span>
          ))}
        </div>
      </h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            {form?.attributes.map((attribute) => (
              <th key={attribute._id}>{attribute.label}</th>
            ))}
            <th>Submitted At</th>
            <th>Submitted By</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((response, index) => (
            <tr key={response._id}>
              <td>{index + 1}</td>
              {response.answers.map((answer,index_) => (
                <td key={index_}><ShowResponse attribute={form?.attributes[index_]} answer={answer}/></td>
              ))}
              <td>{response.submittedAt}</td>
              <td>{response.submittedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Responses;
