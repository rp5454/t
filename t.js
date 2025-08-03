const form = document.getElementById("testimonial-form");
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const testimonialList = document.getElementById("testimonial-list");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addTestimonial(nameInput.value, messageInput.value);
  form.reset();
});

function addTestimonial(name, message) {
  const card = document.createElement("div");
  card.className = "testimonial-card";

  const nameElem = document.createElement("h6");
  nameElem.textContent = name;

  const messageElem = document.createElement("p");
  messageElem.textContent = message;

  const actionsDiv = document.createElement("div");
  actionsDiv.className = "testimonial-actions";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "btn btn-sm btn-warning me-2";
  editBtn.onclick = () => editTestimonial(card, nameElem, messageElem);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "btn btn-sm btn-danger";
  deleteBtn.onclick = () => testimonialList.removeChild(card);

  actionsDiv.appendChild(editBtn);
  actionsDiv.appendChild(deleteBtn);

  card.appendChild(nameElem);
  card.appendChild(messageElem);
  card.appendChild(actionsDiv);

  testimonialList.appendChild(card);
}

function editTestimonial(card, nameElem, messageElem) {
  const newName = prompt("Edit Name:", nameElem.textContent);
  const newMsg = prompt("Edit Message:", messageElem.textContent);

  if (newName !== null) nameElem.textContent = newName;
  if (newMsg !== null) messageElem.textContent = newMsg;
}
