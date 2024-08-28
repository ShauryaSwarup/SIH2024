"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = () => {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  function handleEventClick(clickInfo) {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this! Do you want to delete the event '${clickInfo.event.title}'?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        clickInfo.event.remove();
        Swal.fire({
          title: "Deleted!",
          text: "Your event has been deleted.",
          icon: "success",
        });
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

  async function handleDateSelect(selectInfo) {
    console.log(selectInfo);
    const eventDetails = await getEventDetails();
    if (!eventDetails) return;
    const { title, startTime, endTime } = eventDetails;
    console.log(title, startTime, endTime);
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr + "T" + startTime,
        end: selectInfo.endStr + "T" + endTime,
        allDay: selectInfo.allDay,
      });
      setCurrentEvents([
        ...currentEvents,
        {
          title,
          start: selectInfo.startStr + "T" + startTime,
          end: selectInfo.startStr + "T" + endTime,
        },
      ]);
    }
  }

  let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today
  const INITIAL_EVENTS = [
    {
      id: 0,
      title: "All-day event",
      start: todayStr,
    },
    {
      id: 1,
      title: "Timed event",
      start: todayStr + "T12:00:00",
    },
    {
      id: 2,
      title: "Test Event",
      start: todayStr + "T08:00:00",
      end: todayStr + "T11:00:00",
    },
  ];
  return (
    <>
      <div
        style={{
          height: "100%",
          fontFamily: "Arial, Helvetica Neue, Helvetica, sans-serif",
          fontSize: "14px",
          padding: "3em",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {" "}
          <label
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "16px",
              color: "white",
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
          initialEvents={INITIAL_EVENTS}
          select={handleDateSelect}
          // eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /*
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
        />
      </div>
    </>
  );
};

export default Calendar;
