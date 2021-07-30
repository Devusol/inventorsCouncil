
/* document.addEventListener('DOMContentLoaded', function () { */
/*  document.onload () => { */
const GET_EVENTS_URL = "https://app.devusol.com/aproxy/iccf/api/v1/getevents";
 const PUT_EVENTS_URL = "https://app.devusol.com/aproxy/iccf/api/v1/putevents";




var myEvents = [];
var spanClose = document.getElementsByClassName("close");
var calendarPopup = document.getElementById('descriptionCard');
var calendarInput = document.getElementById('inputCard');
var deleteEventButton = document.getElementById('deleteButton');
var addEventButton = document.getElementById('inputButton');
var nextPrevButtons = document.getElementsByClassName('nextPrev');

new FullCalendar.Draggable(document.getElementById('external-events-list'), {
  itemSelector: '.draggable-event'
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
  selectMirror: true,
  editable: true,
  dayMaxEvents: true, // allow "more" link when too many events
  eventSources: [{ events: myEvents }],
  droppable: true,
  dateClick: function (info) {
    console.log('date clicked', info)
  },
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
     console.log('event clicked', arg.event); 
    const isId = (idMatch) => idMatch.id == arg.event.id;
    let delIndex = myEvents.findIndex(isId);
    showEventForm(arg);
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

readEventCalendarJSON();

/* function updateEventCalendarJSON() {
  const token = await auth0.getTokenSilently();
  console.log('auth token: ', token);

  fetch(PUT_EVENTS_URL, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    method: 'PUT',
    body: JSON.stringify(myEvents)
  })
    .then(response => response.json())
    .then(json => console.log(json))
}
 */
const updateEventCalendarJSON = async () => {

  await auth0.isAuthenticated() ? console.log('youre in') : alert('please login to continue')
  const token = await auth0.getTokenSilently();
  await fetch(PUT_EVENTS_URL, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
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
      // console.log(myEvents);
      calendar.addEventSource(myEvents);
      calendar.refetchEvents();
      calendar.render();
      getEventsOnPage();
    })
}

function showEventForm(eventDetails) {
  let description = eventDetails.event.extendedProps.description;
  let location = eventDetails.event.extendedProps.location;
  let descriptionCard = document.querySelector(".form-popup");

  console.log(description, location, eventDetails.jsEvent.pageX);

  calendarPopup.style.top = `${eventDetails.jsEvent.pageY - 150}px`;
  calendarPopup.style.left = `${eventDetails.jsEvent.pageX - 150}px`;
  calendarPopup.style.zIndex = 1;

  document.getElementById("description").innerHTML = description;
  document.getElementById("location").innerHTML = location;
  console.log(calendarPopup);
  calendarPopup.classList.remove("invisible");
  // When the user clicks on <span> (x), close the modal
  spanClose[0].onclick = function () {
    calendarPopup.classList.add("invisible");
  }
}


document.querySelector('.prev-button').addEventListener('click', async () => {
  calendar.prev();
  await getEventsOnPage();

  //onDateHover();

});

document.querySelector('.next-button').addEventListener('click', async () => {
  calendar.next();
  /*   await getEventsOnPage(); */
  //onDateHover();
});

//onDateHover();

/* }); */


/* var numbers = document.getElementsByClassName('fc-daygrid-day-number'); */
/* function onDateHover() {
  /* console.log(calendar);
  for (const elem of calendar.getEvents()) {
    /* console.log(elem);

  }

  for (const element of numbers) {
    element.addEventListener('mouseenter', function () {

      let xCoord = this.getBoundingClientRect().x;
      let yCoord = this.getBoundingClientRect().y;
      /* console.log(this.getBoundingClientRect().x, this.getBoundingClientRect().y);
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
} */

/* function getEventsOnPage() {
  let allEvents = document.getElementsByClassName('fc-event');

  for (const data of allEvents) {
    $(data).attr({
      'data-toggle': 'popover',
      'data-placement': 'top',
      'title': 'Popover title',
      'data-content': "And here's some amazing content. It's very engaging. Right?"
    });
  }
} */
