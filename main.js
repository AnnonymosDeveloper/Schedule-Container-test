// Dropdown functionality
document.querySelectorAll(".dropdown").forEach((dropdown) => {
  const toggle = dropdown.querySelector(".dropdown-toggle");
  const menu = dropdown.querySelector(".dropdown-menu");
  const items = dropdown.querySelectorAll(".dropdown-item");

  toggle.onclick = function () {
    menu.classList.toggle("show");
  };

  items.forEach((item) => {
    item.onclick = function () {
      toggle.textContent = item.textContent; // Update displayed text
      toggle.dataset.value = item.dataset.value; // Update data-value
      menu.classList.remove("show");
    };
  });
});

// Close dropdowns when clicking outside
window.onclick = function (e) {
  if (!e.target.closest(".dropdown")) {
    document.querySelectorAll(".dropdown-menu").forEach((menu) => {
      menu.classList.remove("show");
    });
  }
};

// Function to add a session to the session list
function addSession(trainer, day, time, color) {
  const sessionList = document.getElementById("session-list");

  let session = document.createElement("div");
  session.classList.add("session");
  let sessionHolder = document.createElement("div");
  sessionHolder.classList.add("session-holder");
  sessionHolder.innerHTML = `
        <p style="margin: 10px 0;">Trainer: ${trainer}</p>
        <p style="margin: 10px 0;">Time: ${time}</p>
        <p style="margin: 10px 0;">Day: ${day}</p>
        <p style="margin: 10px 0;">Color: <span style="background-color: ${color}; padding: 2px 5px; border-radius: 3px; color: white;">${color}</span></p>
      `;

  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = "<strong>X</strong>";
  deleteButton.classList.add("delete-button");
  deleteButton.onclick = function () {
    session.remove();
    deleteSession(trainer, day, time);
  };

  sessionHolder.appendChild(deleteButton);
  session.appendChild(sessionHolder);
  sessionList.appendChild(session);
}

// Function to save a session
function saveSession() {
  const trainerToggle = document.querySelector(
    "#trainer-select .dropdown-toggle"
  );
  const dayToggle = document.querySelector("#day-select .dropdown-toggle");
  const timeToggle = document.querySelector("#time-select .dropdown-toggle");
  const colorToggle = document.querySelector(
    "#bg-color-select .dropdown-toggle"
  );

  const trainer = trainerToggle.textContent; // Get displayed text
  const day = dayToggle.textContent; // Get displayed text
  const time = timeToggle.textContent; // Get displayed text
  const color = colorToggle.dataset.value; // Get selected color

  const trainerValue = trainerToggle.dataset.value; // Get data-value
  const dayValue = dayToggle.dataset.value; // Get data-value
  const timeValue = timeToggle.dataset.value; // Get data-value

  // Default dropdown texts
  const defaultTrainerText = "Select a trainer";
  const defaultDayText = "Day";
  const defaultTimeText = "Time";
  const defaultColorText = "Select a color";

  // Check if any field is not selected
  if (
    trainer === defaultTrainerText ||
    day === defaultDayText ||
    time === defaultTimeText ||
    colorToggle.textContent === defaultColorText
  ) {
    alert("Please select all fields!");
    return;
  }

  let sessions = JSON.parse(localStorage.getItem("sessions")) || [];

  // Check if the session already exists
  if (
    sessions.some(
      (s) => s.trainer === trainer && s.day === day && s.time === time
    )
  ) {
    alert("This session already exists!");
    return;
  }

  addSession(trainer, day, time, color);

  sessions.push({
    trainer,
    day,
    time,
    color,
    trainerValue,
    dayValue,
    timeValue,
  });
  localStorage.setItem("sessions", JSON.stringify(sessions));
}

// Function to load saved sessions
function loadSessions() {
  let sessions = JSON.parse(localStorage.getItem("sessions")) || [];
  sessions.forEach((session) => {
    addSession(session.trainer, session.day, session.time, session.color);
  });
}

// Function to delete a session
function deleteSession(trainer, day, time) {
  let sessions = JSON.parse(localStorage.getItem("sessions")) || [];
  sessions = sessions.filter(
    (s) => !(s.trainer === trainer && s.day === day && s.time === time)
  );
  localStorage.setItem("sessions", JSON.stringify(sessions));
}

// Event listener for the save button
const saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", saveSession);

// Load sessions when the page loads
window.onload = loadSessions;
