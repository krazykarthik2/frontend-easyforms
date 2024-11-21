import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getFormById } from "../../utils/api_calls/forms";
import { getResponses } from "../../utils/api_calls/responses";
import { idFormat } from "../../utils/formats/formats";
import Loading from "../utils/Loading";
function ShowRadioDropdown({ question, answer }) {
  if (!answer) return null;
  return (
    <div>
      {" "}
      {question?.radioInput?.[answer?.radioInput] ||
        question?.dropdownInput?.[answer?.dropdownInput]}
    </div>
  );
}
function ShowCheckbox({ attribute, answer }) {
  if (!answer) return null;
  return (
    <div>
      {answer?.map((answer) => attribute.checkboxInput[answer.checkboxInput])}
    </div>
  );
}
function ShowDate({ attribute, answer }) {
  if (!answer) return null;
  return <div>{JSON.stringify(answer)}</div>;
}
function ShowParagraph({ attribute, answer }) {
  if (!answer) return null;
  return <div>{JSON.stringify(answer)}</div>;
}
function ShowResponse({ attribute, answer }) {
  if (!answer) return null;
  return (
    attribute &&
    attribute.question && (
      <>
        {"radioInput" in attribute.question && (
          <ShowRadioDropdown
            question={attribute.question}
            answer={answer.radioInput}
          />
        )}
        {"dropdownInput" in attribute.question && (
          <ShowRadioDropdown
            question={attribute.question}
            answer={answer.dropdownInput}
          />
        )}
        {"checkboxInput" in attribute.question && (
          <ShowCheckbox attribute={attribute} answer={answer.checkboxInput} />
        )}
        {"dateInput" in attribute.question && (
          <ShowDate attribute={attribute} answer={answer.dateInput} />
        )}
        {"timeInput" in attribute.question && (
          <ShowDate attribute={attribute} answer={answer.timeInput} />
        )}
        {"datetimeInput" in attribute.question && (
          <ShowDate attribute={attribute} answer={answer.datetimeInput} />
        )}
        {"paragraphInput" in attribute.question && (
          <ShowParagraph attribute={attribute} answer={answer.paragraphInput} />
        )}
        {"numberInput" in attribute.question && <div>{answer.numberInput}</div>}
        {"textInput" in attribute.question && <div>{answer.textInput}</div>}
        {"emailInput" in attribute.question && <div>{answer.emailInput}</div>}
      </>
    )
  );
}
function NoResponses() {
  return (
    <div className="w-full h-full d-center">
      <h1>No responses for this form yet</h1>
    </div>
  );
}

function Responses({ token }) {
  const [responses, setResponses] = useState(null);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const tableRef = useRef(null);
  const params = useParams();
  function handleDownload() {
    const tableHTML = tableRef.current;
    var csv = [];
    const tableId = tableHTML.id;
    var rows = document.querySelectorAll("#" + tableId + " tr");
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        for (var j = 0; j < cols.length; j++) {
            row.push(cols[j].innerText);
        }
        csv.push(row.join(","));        
    }
    // how to download tableDOM to excel or csv???
    const blob = new Blob( [csv.join("\n")],{ type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "responses.csv";
    link.click();
  }
  useEffect(() => {
    getFormById(params.formId, token).then(setForm);
    getResponses(params.formId, token).then(setResponses);
  }, [token, params.formId]);
  return responses == null ? (
    <Loading text="Loading Responses..." />
  ) : responses.length == 0 ? (
    <NoResponses />
  ) : (
    <div>
      <h1>
        Responses for form {form?.name}
        <div className="stack">
          {idFormat(params.formId).map((id) => (
            <span key={id}>{id}</span>
          ))}
        </div>
      </h1>
      <table ref={tableRef} id="responses-table" className="w-full border border-collapse border-white  [&>*>*>td]:border-white [&>*>*>td]:border [&>*>*>td]:border-solid [&>*>*>th]:border-white [&>*>*>th]:border  [&>*>*>th]:border-solid">
        <thead>
          <tr>
            <th>#</th>
            {form?.attributes.map((attribute) => (
              <th key={attribute._id}>{attribute.label}</th>
            ))}
            <th>Submitted At</th>
            <th>Submitted By Name</th>
            <th>Submitted By Email</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((response, index) => (
            <tr key={response._id}>
              <td>{index + 1}</td>
              {response.answers.map((answer, index_) => (
                <td key={index_}>
                  <ShowResponse
                    attribute={form?.attributes[index_]}
                    answer={answer}
                  />
                </td>
              ))}
              <td>{response.submittedAt}</td>
              <td>{response.submittedBy?.name}</td>
              <td>{response.submittedBy?.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {tableRef.current && (
        <button type="button" onClick={handleDownload}>
          Download CSV
        </button>
      )}
    </div>
  );
}

export default Responses;
