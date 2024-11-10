import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toastPromise } from "../../../utils/toastify";
import { createForm } from "../../../utils/api_calls/forms";
function MultiOptionField({  options, setOptions }) {
  return (
    <div className="gap-1 stack">
      {options.map((option, index) => {
        return (
          <div key={index}>
            <label htmlFor={`option-${index}`}>Option {index + 1}</label>
            <input
              type="text"
              id={`option-${index}`}
              value={option}
              onChange={(e) =>
                setOptions(
                  options.map((o, i) => (i === index ? e.target.value : o))
                )
              }
            />
            <button
              type="button"
              onClick={() => setOptions(options.filter((_, i) => i !== index))}
            >
              Delete
            </button>
          </div>
        );
      })}
      <button type="button" onClick={() => setOptions([...options, ""])}>
        Add option
      </button>
    </div>
  );
}
function ScaleField({  min, max, onChange }) {
  return (
    <div className="gap-1 d-center">
      <div className="gap-1 stack">
        <label htmlFor="scale_min">Min</label>
        <input
          type="number"
          id="scale_min"
          value={min}
          onChange={(e) => onChange({ min: e.target.value, max: max })}
        />
      </div>
      <div className="gap-1 stack">
        <label htmlFor="scale_max">Max</label>
        <input
          type="number"
          id="scale_max"
          value={max}
          onChange={(e) => onChange({ min: min, max: e.target.value })}
        />
      </div>
    </div>
  );
}
function RatingField({  value, onChange }) {
  return (
    <div className="gap-1 stack">
      <label htmlFor="rating">Rating</label>
      <select
        id="rating"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="0-5">0-5</option>
        <option value="0-10">0-10</option>
        <option value="0-100">0-100</option>
      </select>
    </div>
  );
}
function DetailsField({ questionType, value, onChange }) {
  const [options, setOptions] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(5);
  const [rating, setRating] = useState("");

  useEffect(() => {
    if (questionType === "rating") {
      setRating(value.min + "-" + value.max);
    }
    if (questionType === "scale") {
      setMin(value.min);
      setMax(value.max);
    }
    if (
      questionType === "radioInput" ||
      questionType === "dropdownInput" ||
      questionType === "checkboxInput"
    ) {
      setOptions(value);
    }
  }, [value]);
  useEffect(() => {
    if (questionType === "rating") {
      onChange({ min: rating.split("-")[0], max: rating.split("-")[1] });
    }
    if (questionType === "scale") {
      onChange({ min: min, max: max });
    }
    if (questionType === "radioInput" || questionType === "dropdownInput" || questionType === "checkboxInput") {
      onChange(options);
    }
  }, [rating, min, max, options]);
  return (
    <div className="gap-1 stack">
      {questionType === "radioInput" ||
      questionType === "dropdownInput" ||
      questionType === "checkboxInput" ? (
        <MultiOptionField
          questionType={questionType}
          options={options}
          setOptions={setOptions}
        />
      ) : null}
      {questionType === "rating" ? (
        <RatingField
          questionType={questionType}
          value={rating}
          onChange={setRating}
        />
      ) : null}
      {questionType === "scale" ? (
        <ScaleField
          questionType={questionType}
          min={min}
          max={max}
          onChange={(e) => {
            setMin(e.min);
            setMax(e.max);
          }}
        />
      ) : null}
    </div>
  );
}
function Attribute({ onDelete, value, onChange }) {
  const { label, question, required } = value;
  if (!question) {
    return null;
  }
  const questionType = Object.keys(question)[0];
  const details = question[questionType];
  function setLabel(e) {
    onChange((x) => ({ ...x, label: e }));
  }
  function setQuestionType(e) {
    onChange((x) => ({ ...x, question: { [e]: details } }));
  }
  function setDetails(e) {
    onChange((x) => ({ ...x, question: { [questionType]: e } }));
  }
  function setRequired(e) {
    onChange((x) => ({ ...x, required: e }));
  }
  return (
    <div className="gap-1 d-center">
      <div className="gap-1 d-center stack">
        <div className="gap-1 stack">
          <label htmlFor="label">Label</label>
          <input type="text" id="label" value={label} onChange={e => setLabel(e.target.value)}/>
        </div>
        <div className="gap-1 d-center stack">
          <div className="gap-1 stack">
            <div className="gap-1 stack">
              <label htmlFor="questionType">Type</label>
              <select
                id="questionType"
                value={questionType}
                onChange={e => setQuestionType(e.target.value)}
              >
                <option value="emailInput">Email</option>
                <option value="textInput">Text</option>
                <option value="numberInput">Number</option>
                <option value="dateInput">Date</option>
                <option value="timeInput">Time</option>
                <option value="paragraphInput">Paragraph</option>
                <option value="radioInput">Radio</option>
                <option value="dropdownInput">Dropdown</option>
                <option value="checkboxInput">Checkbox</option>
                <option value="rating">Rating</option>
                <option value="scale">Scale</option>
              </select>
            </div>
            <DetailsField
              questionType={questionType}
              value={details}
              onChange={setDetails}
            />
          </div>
          <div className="gap-1 stack">
            <label htmlFor="required">Required</label>
            <input type="checkbox" id="required" value={required} onChange={e => setRequired(e.target.checked)}/>
          </div>
        </div>
      </div>
      <button type="button" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
}
function CreateForm({ token }) {
  const params = useParams();
  const [formId, setFormId] = useState("");
  const [name, setName] = useState("");
  const [attributes, setAttributes] = useState([]);
  const navigate = useNavigate();
  window.attributes = attributes;
  function handleCreateForm() {
    toastPromise(() => createForm(params.id, formId, name, attributes, token), {
      pending: "Creating form...",
      success: "Form created",
      error: "Failed to create form",
      then: () => {
        navigate(`/events/id/${params.id}/forms/s/${formId}`);
      },
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="w-full h-full stack d-center">
      <h1>Create form</h1>
      <form className="gap-3 stack" onSubmit={handleSubmit}>
        <label htmlFor="formId">Form ID</label>
        <input
          type="text"
          id="formId"
          value={formId}
          onChange={(e) =>
            setFormId(
              e.target.value.replace(" ", "_").replace(/[^a-zA-Z0-9_]/g, "")
            )
          }
        />
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="attributes">Attributes</label>
        <div className="stack">
          {attributes.map((attr, index) => {
            return (
              <Attribute
                onDelete={() =>
                  setAttributes(attributes.filter((_, i) => i !== index))
                }
                value={attr}
                onChange={e => setAttributes(attributes.map((a, i) => i === index ? (typeof e === "function" ? e(a) : e) : a))}
              />
            );
          })}
          <button
            type="button"
            onClick={() => setAttributes([...attributes, { label: "", question: { textInput: "" }, required: false }])}
          >
            Add attribute
          </button>
        </div>

        <button type="submit" onClick={handleCreateForm}>
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateForm;
