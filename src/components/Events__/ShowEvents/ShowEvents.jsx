import React, { useEffect, useState } from "react";
import {
  FaArrowUpRightFromSquare,
  FaEye,
  FaImage,
  FaImagePortrait,
  FaPlus,
} from "react-icons/fa6";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { getEvents } from "../../../utils/api_calls/event";
import { DateFormat, idFormat } from "../../../utils/formats/formats";
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
        <div className="items-center justify-between w-full h-full stack">
          <h1>Events {events.length}</h1>
          <table className="w-full table-border">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Event Slug</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Forms</th>
                <th>Images</th>
                <th>View</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index}>
                  <td>
                    <div className="gap-0 text-xs stack d-center">
                      {idFormat(event._id).map((e, i) => (
                        <span key={i}>{e}</span>
                      ))}
                    </div>
                  </td>
                  <td>{event.name}</td>
                  <td>{event.eventSlug}</td>
                  <td>{DateFormat(event.startDate)}</td>
                  <td>{DateFormat(event.endDate)}</td>
                  <td>
                    <Link
                      to={`/events/id/${event._id}/forms`}
                      className="gap-3 d-center unlink"
                    >
                      <span>{event.forms.length}</span>
                      <FaArrowUpRightFromSquare />
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/events/id/${event._id}/images`}
                      className="gap-3 d-center unlink"
                    >
                      <FaImage />
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/events/id/${event._id}`}
                      className="d-center unlink"
                    >
                      <FaEye />
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/events/edit/${event._id}`}
                      className="d-center unlink"
                    >
                      <FiEdit />
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/events/delete/${event._id}`}
                      className="d-center unlink"
                    >
                      <FiTrash2 />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/events/create" className=" unlink d-center stack">
            <div className="p-5 rounded-lg bg-slightly-green d-center">
              <FaPlus size={37} />
            </div>
            <span>Create Event</span>
          </Link>
        </div>
      ) : (
        <NoEvents />
      )}
    </div>
  );
}

export default ShowEvents;
