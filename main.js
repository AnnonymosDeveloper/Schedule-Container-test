function addSession() {
  const trainerSelect = document.getElementById("trainer-select");
  const daySelect = document.getElementById("day-select");
  const timeSelect = document.getElementById("time-select");
  const container = document.getElementById("container");

  const trainer = trainerSelect.value;
  const day = daySelect.value;
  const time = timeSelect.value;

  if (trainer && day && time) {
    let session = document.createElement("div");
    session.classList.add("session");
    let sessionHolder = document.createElement("div");
    sessionHolder.classList.add("session-holder");
    sessionHolder.innerHTML = `
        <p>Trainer: ${
          trainerSelect.options[trainerSelect.selectedIndex].text
        }</p>
        <p>Day: ${daySelect.options[daySelect.selectedIndex].text}</p>
        <p>Time: ${timeSelect.options[timeSelect.selectedIndex].text}</p>
      `;
    session.appendChild(sessionHolder);
    container.appendChild(session);
  }
}
