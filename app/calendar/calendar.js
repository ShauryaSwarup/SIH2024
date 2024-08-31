"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Loading from "@/components/Chat/Loading";

const Calendar = (session) => {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [latestEvents, setLatestEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events/");
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setLatestEvents(
        data.events.map((event) => ({
          id: event._id,
          title: event.name,
          start: event.startDate.split("T")[0] + "T" + event.startTime,
          end: event.endDate.split("T")[0] + "T" + event.endTime,
        }))
      );
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  async function handleEventClick(clickInfo) {
    console.log("clickInfo" + JSON.stringify(clickInfo));
    const eventId = clickInfo.event.id;
    console.log("eventId" + eventId);

    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this! Do you want to delete the event '${clickInfo.event.title}'?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/events/`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: eventId }),
          });
          if (!response.ok) {
            throw new Error("Failed to delete event");
          }

          clickInfo.event.remove();
          Swal.fire({
            title: "Deleted!",
            text: "Your event has been deleted.",
            icon: "success",
          });
          await fetchEvents();
        } catch (error) {
          console.error("Error:", error);
          Swal.fire({
            title: "Oops...",
            text: "Failed to delete event.",
            icon: "error",
          });
        }
      }
    });
  }

  const getEventDetails = async () => {
    const { value: title } = await Swal.fire({
      title: "Enter event title",
      input: "text",
      inputLabel: "Event Title",
      inputPlaceholder: "Enter the event title",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    if (!title) return null;

    const { value: startTime } = await Swal.fire({
      title: "Enter event start time",
      input: "text",
      inputLabel: "Start Time",
      inputPlaceholder: "HH:MM:SS",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    if (!startTime) return null;

    const { value: endTime } = await Swal.fire({
      title: "Enter event end time",
      input: "text",
      inputLabel: "End Time",
      inputPlaceholder: "HH:MM:SS",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    if (!endTime) return null;

    return { title, startTime, endTime };
  };

  const handleDateSelect = async (selectInfo) => {
    const eventDetails = await getEventDetails();
    if (!eventDetails) return;
    const { title, startTime, endTime } = eventDetails;

    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    if (title) {
      const event = {
        title,
        description: "", 
        startDate: selectInfo.startStr.split("T")[0], 
        endDate: selectInfo.endStr.split("T")[0], 
        startTime,
        endTime,
      };

      // Send event to the server 
      try {
        const response = await fetch("/api/events/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        });

        if (!response.ok) {
          throw new Error("Failed to create event");
        }

        const result = await response.json();
        const createdEvent = result.data;

        Swal.fire({
          icon: "success",
          title: "Event Created",
          text: "Your event has been successfully created.",
        });

        await fetchEvents();
        // Add event to calendar
        calendarApi.addEvent({
          title,
          start: selectInfo.startStr + "T" + startTime,
          end: selectInfo.endStr + "T" + endTime,
          allDay: selectInfo.allDay,
        });
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to create event.",
        });
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div
          style={{
            height: "100%",
            fontFamily: "Arial, Helvetica Neue, Helvetica, sans-serif",
            fontSize: "14px",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "16px",
                color: "black",
              }}
            >
              <input
                style={{ marginRight: "0.5em" }}
                type="checkbox"
                checked={weekendsVisible}
                onChange={handleWeekendsToggle}
              ></input>
              view weekends
            </label>
          </div>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
            events={latestEvents} 
            select={
              session.session.user.role === "admin" ? handleDateSelect : null
            }
            eventClick={handleEventClick}
          />
        </div>
      )}
    </>
  );
};

export default Calendar;
