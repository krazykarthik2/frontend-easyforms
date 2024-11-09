import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toastPromise } from "../../../utils/toastify";
import { getEventById } from "../../../utils/api_calls/event";
import { Link } from "react-router-dom";

function NotFound() {
  return <div>Event not found</div>;
}
function NoForms() {
  const params = useParams();
  return (
    <div className="gap-3 stack">
      <h1>No forms found</h1>
      <Link to={`/events/id/${params.id}`}>Go back to event</Link>
      <Link to={`/events/id/${params.id}/forms/create`}>Create form</Link>
    </div>
  );
}
function Main({ event }) {
  return (
    <div className="h-full stack d-center justify-evenly">
      <h1>Forms</h1>
      <table>
        <thead>
          <tr>
            <th>Form ID</th>
            <th>Name</th>
            <th>Responses</th>
            <th>View</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {event?.forms?.map((form) => (
            <tr>
              <td>{form.formId}</td>
              <td>{form.name}</td>
              <td>{form.responses?.length}</td>
              <td><Link to={`/events/id/${event._id}/forms/s/${form.formId}`}>View</Link></td>
              <td><Link to={`/events/id/${event._id}/forms/edit/${form._id}`}>Edit</Link></td>
              <td><Link to={`/events/id/${event._id}/forms/delete/${form._id}`}>Delete</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/events/id/${event._id}/forms/create`}>Create form</Link>
    </div>
  );
}
function Forms({ token }) {
  const params = useParams();
  const [event, setEvent] = useState({});

  useEffect(() => {
    toastPromise(() => getEventById(params.id, token), {
      success: "Event fetched successfully",
      error: "Failed to fetch event",
      pending: "Fetching event...",
      then: (data) => setEvent(data),
    });
  }, [params.id]);

  return (
    <div className="h-full stack d-center">
      {!event ? (
        <NotFound />
      ) : !event.forms || event.forms.length === 0 ? (
        <NoForms />
      ) : (
        <Main event={event} />
      )}
    </div>
  );
}

export default Forms;
