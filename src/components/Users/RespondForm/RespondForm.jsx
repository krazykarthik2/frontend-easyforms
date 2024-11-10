import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getFormById,
  getFormSlugByEventId,
  getFormSlugByEventSlug,
} from "../../../utils/api_calls/forms";
import { respondToForm } from "../../../utils/api_calls/respond";
import { DateTimeFormat } from "../../../utils/formats/formats";
import { toastPromise } from "../../../utils/toastify";
import { arrWithIndex } from "../../../utils/react";
import {
  DateInput,
  EmailInput,
  NumberInput,
  ParagraphInput,
  TextInput,
  TimeInput,
} from "./Widgets/Inputs";
import {
  CheckboxInput,
  DropdownInput,
  RadioInput,
} from "./Widgets/MultiChoice";
import { RatingInput, ScaleInput } from "./Widgets/Scale";
function __Admin({ admin }) {
  return (
    <div className="stack">
      <div>{admin?.name}</div>
      <div>{admin?.email}</div>
    </div>
  );
}

function FormView({ form, response, setResponse }) {
  return (
    <div>
      {form?.attributes?.map((attribute, index) => {
        return (
          attribute &&
          attribute.question && (
            <div key={index}>
              {"textInput" in attribute.question && (
                <TextInput
                  q={attribute}
                  answer={response[index]}
                  onChange={(e) =>
                    setResponse(arrWithIndex(response, index, e))
                  }
                />
              )}
              {"paragraphInput" in attribute.question && (
                <ParagraphInput
                  q={attribute}
                  answer={response[index]}
                  onChange={(e) =>
                    setResponse(arrWithIndex(response, index, e))
                  }
                />
              )}
              {"numberInput" in attribute.question && (
                <NumberInput
                  q={attribute}
                  answer={response[index]}
                  onChange={(e) =>
                    setResponse(arrWithIndex(response, index, e))
                  }
                />
              )}
              {"dateInput" in attribute.question && (
                <DateInput
                  q={attribute}
                  answer={response[index]}
                  onChange={(e) =>
                    setResponse(arrWithIndex(response, index, e))
                  }
                />
              )}
              {"timeInput" in attribute.question && (
                <TimeInput
                  q={attribute}
                  answer={response[index]}
                  onChange={(e) =>
                    setResponse(arrWithIndex(response, index, e))
                  }
                />
              )}
              {"emailInput" in attribute.question && (
                <EmailInput
                  q={attribute}
                  answer={response[index]}
                  onChange={(e) =>
                    setResponse(arrWithIndex(response, index, e))
                  }
                />
              )}
              {"radioInput" in attribute.question && (
                <RadioInput
                  q={attribute}
                  answer={response[index]}
                  onChange={(e) =>
                    setResponse(arrWithIndex(response, index, e))
                  }
                />
              )}
              {"dropdownInput" in attribute.question && (
                <DropdownInput
                  q={attribute}
                  answer={response[index]}
                  onChange={(e) =>
                    setResponse(arrWithIndex(response, index, e))
                  }
                />
              )}
              {"checkboxInput" in attribute.question && (
                <CheckboxInput
                  q={attribute}
                  answer={response[index]}
                  onChange={(e) =>
                    setResponse(arrWithIndex(response, index, e))
                  }
                />
              )}
              {"scale" in attribute.question && (
                <ScaleInput
                  q={attribute}
                  answer={response[index]}
                  onChange={(e) =>
                    setResponse(arrWithIndex(response, index, e))
                  }
                />
              )}
              {"rating" in attribute.question && (
                <RatingInput
                  q={attribute}
                  answer={response[index]}
                  onChange={(e) =>
                    setResponse(arrWithIndex(response, index, e))
                  }
                />
              )}
            </div>
          )
        );
      })}
    </div>
  );
}
function RespondForm({ token }) {
  const params = useParams();
  const [form, setForm] = useState(null);
  const [response, setResponse] = useState([]);
  window.response = response;
  window.form = form;
  useEffect(() => {
    setResponse(Array(form?.attributes?.length).fill(""));
  }, [form]);
  useEffect(() => {
    if (params.formId) {
      // if we have formId no need to check for eventSlug or id
      toastPromise(() => getFormById(params.formId, token), {
        pending: `Loading Form ${params.formId.slice(0, 5)}...`,
        success: "Form Loaded Successfully",
        error: "Failed to Load Form",
        then: (data) => {
          setForm(data);
        },
      });
    } else if (params.slug) {
      // if we have slug we need to check for eventSlug or id
      if (params.eventSlug)
        toastPromise(
          () => getFormSlugByEventSlug(params.eventSlug, params.slug, token),
          {
            pending: `Loading Form ${params.eventSlug}/${params.slug}...`,
            success: "Form Loaded Successfully",
            error: "Failed to Load Form",
            then: (data) => {
              setForm(data);
            },
          }
        );
      else if (params.id)
        toastPromise(
          () => getFormSlugByEventId(params.id, params.slug, token),
          {
            pending: `Loading Form ${params.id.slice(0, 5)}/${params.slug.slice(
              0,
              5
            )}...`,
            success: "Form Loaded Successfully",
            error: "Failed to Load Form",
            then: (data) => {
              setForm(data);
            },
          }
        );
    }
  }, [params.formId, params.slug, params.id, params.eventSlug]);
  const navigate = useNavigate();
  function handleRespond() {
    const calcResponse = response.map((answer, index) => {
      return {
        [Object.keys(form.attributes[index].question)[0]]: answer, // get the key of the question
      };
    });
    window.calcResponse = calcResponse;

    toastPromise(() => respondToForm(form._id, calcResponse, token), {
      pending: "Responding to form...",
      success: "Form Responded Successfully",
      error: "Failed to Respond to Form",
      then: (data) => {
        navigate("/");
      },
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(response);
    handleRespond();
  }
  return (
    <div>
      <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        {form && (
          <FormView form={form} response={response} setResponse={setResponse} />
        )}
        <button type="submit">Submit</button>
      </form>
      <div id="details">
        <h2>Form ID: {form?.formId}</h2>
        <h2>Form Name: {form?.name}</h2>
        <h2>Created At: {DateTimeFormat(form?.createdAt)}</h2>
        <h2>Updated At: {DateTimeFormat(form?.updatedAt)}</h2>
        <h2>Created By: {<__Admin admin={form?.createdBy} />}</h2>
      </div>
    </div>
  );
}

export default RespondForm;
