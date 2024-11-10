import React, { useState, useEffect } from "react";
import { toastPromise } from "../../../utils/toastify";
import { Link, useParams } from "react-router-dom";
import { getFormById, getFormBySlug } from "../../../utils/api_calls/forms";
import { DateTimeFormat } from "../../../utils/formats/formats";
import { getFormSlugByEventId, getFormSlugByEventSlug } from "../../../utils/api_calls/forms";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
function __Admin({ admin }) {
  return (
    <div className="stack">
      <div>{admin?.name}</div>
      <div>{admin?.email}</div>
    </div>
  );
}
function Form({ token }) {
  const params = useParams();
  const [form, setForm] = useState(null);
  
  useEffect(() => {
    if (params.formId){// if we have formId no need to check for eventSlug or id
        toastPromise(() => getFormById( params.formId, token), {
          pending:`Loading Form ${params.id.slice(0,5)}/${params.formId.slice(0,5)}...`,
          success: "Form Loaded Successfully",
          error: "Failed to Load Form",
          then: (data) => {
            setForm(data);
          },
        });
    }else if(params.slug){// if we have slug we need to check for eventSlug or id
      if(params.eventSlug)
        toastPromise(() => getFormSlugByEventSlug(params.eventSlug, params.slug, token), {
          pending:`Loading Form ${params.eventSlug}/${params.slug}...`,
          success: "Form Loaded Successfully",
          error: "Failed to Load Form",
          then: (data) => {
            setForm(data);
          },
        });
      else if(params.id)
        toastPromise(() => getFormSlugByEventId(params.id, params.slug, token), {
          pending:`Loading Form ${params.id.slice(0,5)}/${params.slug.slice(0,5)}...`,
          success: "Form Loaded Successfully",
          error: "Failed to Load Form",
          then: (data) => {
            setForm(data);
          },
        });
    }
  }, [params.formId, params.slug, params.id, params.eventSlug]);
  
  return (
    <div>
      <h1>Form</h1>
      <div>
        <h2>Form ID: {form?.formId}</h2>
        <h2>Event: <Link to={`/events/id/${form?.eventId}`}><FaArrowUpRightFromSquare /></Link></h2>
        <h2>Form Name: {form?.name}</h2>
        <h2>Created At: {DateTimeFormat(form?.createdAt)}</h2>
        <h2>Updated At: {DateTimeFormat(form?.updatedAt)}</h2>
        <h2>Created By: {<__Admin admin={form?.createdBy} />}</h2>
        <h2>Attributes: {form?.attributes?.length}</h2>
      </div>
    </div>
  );
}

export default Form;
