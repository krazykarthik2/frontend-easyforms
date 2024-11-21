import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toastPromise } from "../../../utils/toastify";
import { createForm } from "../../../utils/api_calls/forms";
import {
  MultiOptionField,
  ScaleField,
  RatingField,
  DetailsField,
  Attribute,
} from "./CreateFormUtils";
import { FaPlus } from "react-icons/fa6";
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
        <div className="justify-between gap-5 d-center">
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
        </div>
        <div className="justify-between gap-5 d-center">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="p-2 border-white border-solid rounded-lg stack">
          <label htmlFor="attributes">Attributes</label>
          <div className="stack ms-5">
            {attributes.map((attr, index) => {
              return (
                <Attribute
                  key={index}
                  index={index}
                  onDelete={() =>
                    setAttributes(attributes.filter((_, i) => i !== index))
                  }
                  value={attr}
                  onChange={(e) =>
                    setAttributes(
                      attributes.map((a, i) =>
                        i === index ? (typeof e === "function" ? e(a) : e) : a
                      )
                    )
                  }
                />
              );
            })}
          </div>
          <div className="d-center">
            <button
              type="button"
              className="w-full gap-5 text-white bg-gray-600 rounded-md d-center unbtn"
              onClick={() =>
                setAttributes([
                  ...attributes,
                  { label: "", question: { textInput: "" }, required: false },
                ])
              }
            >
              <FaPlus />
              <span>Add Attributes</span>
            </button>
          </div>
        </div>

        <button type="submit" onClick={handleCreateForm}>
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateForm;
