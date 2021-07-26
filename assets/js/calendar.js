
document.addEventListener('DOMContentLoaded', function () {
  var myEvents = [];
  /* var myEvents = [
    {
      "title": "Initialize Calendar Data",
      "start": "2021-01-01T05:00:00.000Z",
      "end": "2021-01-02T05:00:00.000Z",
      "allDay": true,
      "extendedProps": {
        "description": "To ensure JSON bin is not blank",
        "location": "Winter Garden, FL"
      }
    },
    {
      "title": "An Event to mess with",
      "start": "2021-06-20T05:00:00.000Z",
      "end": "2021-06-21T05:00:00.000Z",
      "allDay": true,
      "extendedProps": {
        "description": "A different Event",
        "location": "Winter Garden, FL"
      }
    },
    {
      "title": "Another Event to mess with",
      "start": "2021-06-12T05:00:00.000Z",
      "end": "2021-06-13T05:00:00.000Z",
      "allDay": true,
      "extendedProps": {
        "description": "A different Event",
        "location": "Winter Garden, FL"
      }
    },
    {
      "title": "Yet another event to mess with",
      "start": "2021-06-18T05:00:00.000Z",
      "end": "2021-06-19T05:00:00.000Z",
      "allDay": true,
      "extendedProps": {
        "description": "A different Event",
        "location": "Winter Garden, FL"
      }
    }]; */

  const GET_EVENTS_URL = "https://app.devusol.com/aproxy/iccf/api/v1/getevents";
  const PUT_EVENTS_URL = "https://app.devusol.com/aproxy/iccf/api/v1/putevents";



  var spanClose = document.getElementsByClassName("close");
  var calendarPopup = document.getElementById('descriptionCard');
  var calendarInput = document.getElementById('inputCard');
  var deleteEventButton = document.getElementById('deleteButton');
  var addEventButton = document.getElementById('inputButton');
  var nextPrevButtons = document.getElementsByClassName('nextPrev');

  new FullCalendar.Draggable(document.getElementById('external-events-list'), {
    itemSelector: '.fc-event-main'
  });

  var calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
    headerToolbar: {
      start: 'title',
      center: '',
      end: 'today'
    },
    eventColor: "black",
    navLinks: false, // can click day/week names to navigate views
    selectable: true,
    //selectMirror: true,
    //editable: true,
    dayMaxEvents: true, // allow "more" link when too many events
    eventSources: [{ events: myEvents }],
    droppable: true,
    select: function (arg) {
      calendarInput.style.display = "block";
      spanClose[1].onclick = function () {
        calendarInput.style.display = "none";
      }
      /*   console.log(arg); */
      /* console.log(document.getElementById('inputStart')); */
      let newStartTime = arg.start.setHours(8, 30);
      let newEndTime = arg.start.setHours(10, 30);
      /*   console.log(new Date(newStartTime));
        console.log(new Date(newEndTime)); */
      addEventButton.addEventListener('click', function () {
        let title = document.getElementById('inputTitle').value;
        let eventInput = {
          title: title,
          start: arg.start,
          end: arg.end,
          allDay: arg.allDay,
          extendedProps: {
            description: document.getElementById('inputDescription').value,
            location: document.getElementById('inputLocation').value
          },
          id: `${title}_${arg.start}_${myEvents.length + 1}`
        }
        calendar.addEvent(eventInput);
        myEvents.push(eventInput);
        console.log("added event");
        calendarInput.style.display = "none";
        document.getElementById('inputForm').reset();
        updateEventCalendarJSON();
        calendar.unselect();
      });
    },
    eventClick: function (arg) {
      const isId = (idMatch) => idMatch.id == arg.event.id;
      let delIndex = myEvents.findIndex(isId);
      showEventForm(arg.event);
      deleteEventButton.addEventListener("click", function () {
        myEvents.splice(delIndex, 1); //see above note about id's and deletion
        arg.event.remove();
        //  console.log(myEvents);
        calendarPopup.style.display = "none";
        updateEventCalendarJSON();
      })
    },
    eventDrop: function (arg) {
      console.log("event Dropped: ", arg.event.toPlainObject());
      // myEvents.push(eventInput);
      // console.log(myEvents);
    },
    eventReceive: function (arg) {
      console.log(myEvents);
      arg.event.setProp("id", `${arg.event.title}_${arg.event.start}_${myEvents.length + 1}`);
      myEvents.push(arg.event.toPlainObject());

      updateEventCalendarJSON();
    }
  });

  calendar.render();
  readEventCalendarJSON();
  //console.log(myEvents);
  //updateEventCalendarJSON();


  function updateEventCalendarJSON() {
    console.log('updateEvent: ', myEvents);
    fetch(PUT_EVENTS_URL, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify(myEvents)
    })
      .then(response => response.json())
      .then(json => console.log(json))
  }


  function readEventCalendarJSON() {
    fetch(GET_EVENTS_URL)
      .then(response => response.json())
      .then(json => {
        myEvents = json[0].record;
        console.log(myEvents);
        calendar.addEventSource(myEvents);
        calendar.refetchEvents();
      })
  }

  function showEventForm(eventDetails) {
    let description = eventDetails.extendedProps.description;
    let location = eventDetails.extendedProps.location;
    document.getElementById("description").innerHTML = description;
    document.getElementById("location").innerHTML = location;
    calendarPopup.style.display = "block";
    // When the user clicks on <span> (x), close the modal
    spanClose[0].onclick = function () {
      calendarPopup.style.display = "none";
    }
  }

  var numbers = document.getElementsByClassName('fc-daygrid-day-number');
  function onDateHover() {
    /* console.log(calendar); */
    for (const elem of calendar.getEvents()) {
      /* console.log(elem); */

    }

    for (const element of numbers) {
      element.addEventListener('mouseenter', function () {

        let xCoord = this.getBoundingClientRect().x;
        let yCoord = this.getBoundingClientRect().y;
        /* console.log(this.getBoundingClientRect().x, this.getBoundingClientRect().y); */
        calendarPopup.style.position = "absolute";
        calendarPopup.style.top = `${yCoord + 250}px`;
        calendarPopup.style.left = `${xCoord - 100}px`;
        calendarPopup.style.display = "block";
        //console.log(myEvents[0].start);
      });
      element.addEventListener('mouseleave', function () {
        calendarPopup.style.display = "none";
      });
    }
  }

  document.querySelector('.prev-button').addEventListener('click', function () {
    calendar.prev();
    //onDateHover();
    //console.log(numbers);
  });

  document.querySelector('.next-button').addEventListener('click', function () {
    calendar.next();
    onDateHover();
  });

  //onDateHover();

});


