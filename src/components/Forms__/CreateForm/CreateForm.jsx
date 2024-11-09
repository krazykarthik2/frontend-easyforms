import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toastPromise } from "../../../utils/toastify";
import { createForm } from "../../../utils/api_calls/forms";
function Attribute({onDelete}) {
  return (
    <div className="gap-1 d-center">
      <button type="button" onClick={onDelete}>Delete</button>
    </div>
  );
}
function CreateForm({ token }) {
  const params = useParams();
  const [formId, setFormId] = useState("");
  const [name, setName] = useState("");
  const [attributes, setAttributes] = useState([]);
  const navigate = useNavigate();
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
          {attributes.map((attr,index) => {
            return <Attribute onDelete={()=>setAttributes(attributes.filter((_,i)=>i!==index))} />;
          })}
          <button
            type="button"
            onClick={() => setAttributes([...attributes, {}])}
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
