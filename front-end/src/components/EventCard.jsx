import React from "react";
import "../css/EventCard.css";
import { useNavigate } from "react-router-dom";

function EventCard({ events }) {
  const navigate = useNavigate();

  return (
    <div className="user-event-card-lists" data-testid="test-event-card-list">
      <h1 className="user-event-card-header" data-testid="test-event-header">
        {events.length ? "Filtered Events:" : "All Events:"}
      </h1>

      {events.length === 0 ? (
        <div className="user-no-events-container">
          <p className="user-no-events-message" data-testid="test-no-event">
            No Events Found.
          </p>
        </div>
      ) : (
        <div className="user-event-cards" data-testid="test-event-cards">
          {events
            .slice()
            .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
            .map((event, index) => (
              <div
                key={index}
                className="user-event-card"
                data-testid="test-eventcardlink"
                onClick={() => navigate(`/EventDetails/${event._id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="image-date" data-testid="test-event-image-date">
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}/${event.coverImage}`}
                    alt={event.eventName}
                    loading="lazy"
                    data-testid="test-event-img"
                  />
                  <div className="date-div" data-testid="test-event-date-div">
                    <p className="user-card-date" data-testid="test-event-date">
                      Date: {new Date(event.eventDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div
                  className="user-event-card-content"
                  data-testid="test-event-content"
                >
                  <h2
                    className="user-card-title"
                    data-testid="test-event-title"
                  >
                    {event.eventName}
                  </h2>
                  <div className="user-left-content">
                    <p
                      className="user-card-location"
                      data-testid="test-event-location"
                    >
                      Location: {event.location}
                    </p>
                    <p className="user-card-desc" data-testid="test-event-desc">
                      {event.Homedescription}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default EventCard;
