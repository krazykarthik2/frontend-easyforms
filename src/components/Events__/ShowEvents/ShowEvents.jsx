import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEvents } from "../../../utils/api_calls/event";
import { DateFormat, idFormat } from "../../../utils/formats/formats";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
function NoEvents() {
  return (
    <div className="d-center stack">
      <div className="text-3xl">No Events</div>
      <Link to="/events/create" className="unlink">
        Create
      </Link>
    </div>
  );
}
function ShowEvents({ token }) {
  const [events, setEvents] = useState([]);
  const params = useParams();
  useEffect(() => {
    let query = {};
    if (params.query) {
      query = JSON.parse(params.query);
    }
    getEvents(query, token).then((data) => {
      setEvents(data);
    });
  }, [params.query, token]);

  return (
    <div className="w-full h-full d-center stack ">
      {events.length > 0 ? (
        <>
          <h1>Events {events.length}</h1>
          <table className="w-full ">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Event Slug</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Forms</th>
                <th>View</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            {events.map((event) => (
              <tr>
                <td>
                  <div className="gap-0 text-xs stack d-center">
                    {idFormat(event._id).map((e) => (
                      <span>{e}</span>
                    ))}
                  </div>
                </td>
                <td>{event.name}</td>
                <td>{event.eventSlug}</td>
                <td>{DateFormat(event.startDate)}</td>
                <td>{DateFormat(event.endDate)}</td>
                <td>
                  <Link to={`/events/id/${event._id}/forms`} className="gap-3 d-center">
                    <span>{event.forms.length}</span>
                    <FaArrowUpRightFromSquare />
                  </Link>
                </td>
                <td>
                  <Link to={`/events/id/${event._id}`}>View</Link>
                </td>
                <td>
                  <Link to={`/events/edit/${event._id}`}>Edit</Link>
                </td>
                <td>
                  <Link to={`/events/delete/${event._id}`}>Delete</Link>
                </td>
              </tr>
            ))}
          </table>
        </>
      ) : (
        <NoEvents />
      )}
    </div>
  );
}

export default ShowEvents;
