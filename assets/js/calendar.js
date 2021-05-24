
document.addEventListener('DOMContentLoaded', function () {
 // var myEvents = [];
   var myEvents = [
    {
      "title": "Initialize Calendar Data",
      "start": "2021-01-01T05:00:00.000Z",
      "end": "2021-01-02T05:00:00.000Z",
      "allDay": true,
      "extendedProps": {
        "description": "To ensure JSON bin is not blank",
        "location": "Winter Garden, FL"
      }
    }]; 

  var putCalendarEvent = new XMLHttpRequest();
  var getCalendarEvents = new XMLHttpRequest();
  var spanClose = document.getElementsByClassName("close");
  var calendarPopup = document.getElementById('descriptionCard');
  var calendarInput = document.getElementById('inputCard');
  var deleteEventButton = document.getElementById('deleteButton');
  var addEventButton = document.getElementById('inputButton');

  new FullCalendar.Draggable(document.getElementById('external-events-list'), {
    itemSelector: '.fc-event-main'
  });

  var calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    navLinks: true, // can click day/week names to navigate views
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
      console.log(arg);
      console.log(document.getElementById('inputStart'));
      let newStartTime = arg.start.setHours(8,30);
      let newEndTime = arg.start.setHours(10,30);
      console.log(new Date(newStartTime));
      console.log(new Date(newEndTime));
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
      arg.event.setProp("id", `${arg.event.title}_${arg.event.start}_${myEvents.length + 1}`);
      myEvents.push(arg.event.toPlainObject());
     // console.log(myEvents);
      updateEventCalendarJSON();
    }
  });

  calendar.render();
  readEventCalendarJSON();






















  putCalendarEvent.onreadystatechange = () => {
    if (putCalendarEvent.readyState == XMLHttpRequest.DONE) {
      console.log(putCalendarEvent.responseText);
    }
  };

  getCalendarEvents.onreadystatechange = () => {
    if (getCalendarEvents.readyState == XMLHttpRequest.DONE) {
      myEvents = JSON.parse(getCalendarEvents.responseText);
      myEvents = myEvents.record;
      calendar.addEventSource(myEvents);
      //calendar.refetchEvents();
    }
  };


  function updateEventCalendarJSON() {
    putCalendarEvent.open("PUT", "https://api.jsonbin.io/v3/b/60a5bc0ab396ee6b13c47e56", true);
    putCalendarEvent.setRequestHeader("Content-Type", "application/json");
    putCalendarEvent.setRequestHeader("X-Master-Key", "$2b$10$KuI.8Dq8BQ/dX0oMBQ08CuSyMAg1eHQMCR2jtZV0lxASiM0nIctzK");
    console.log(myEvents);
    // putCalendarEvent.send(JSON.stringify(myEvents)); // comment to avoid API requests, be sure to switch myEvents variable to open
  }

  function readEventCalendarJSON() {
    getCalendarEvents.open("GET", "https://api.jsonbin.io/v3/b/60a5bc0ab396ee6b13c47e56/latest", true);
    getCalendarEvents.setRequestHeader("Content-Type", "application/json");
    getCalendarEvents.setRequestHeader("X-Master-Key", "$2b$10$KuI.8Dq8BQ/dX0oMBQ08CuSyMAg1eHQMCR2jtZV0lxASiM0nIctzK");
    //  getCalendarEvents.send(); // comment to avoid API requests, be sure to switch myEvents variable to open
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

});


