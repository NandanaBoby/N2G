import { db } from "./firebase.js";

let users = [];
let currentUserIndex = 0;

const fetchUsers = async () => {
  const snapshot = await db.collection("users").get();
  users = snapshot.docs.map((doc) => doc.data());
  showUser();
};

const showUser = () => {
  const cardContainer = document.getElementById("card-container");
  if (currentUserIndex < users.length) {
    const user = users[currentUserIndex];
    cardContainer.innerHTML = `
      <div class="card">
        <h2>${user.name}</h2>
        <p><strong>Skills:</strong> ${user.skills}</p>
        <p><strong>Age:</strong> ${user.age}</p>
        <p><strong>Expertise:</strong> ${user.expertise}</p>
      </div>
    `;
  } else {
    cardContainer.innerHTML = "<p>No more users to show.</p>";
  }
};

document.getElementById("like").addEventListener("click", () => {
  if (currentUserIndex < users.length) {
    alert(`You liked ${users[currentUserIndex].name}`);
    currentUserIndex++;
    showUser();
  }
});

document.getElementById("dislike").addEventListener("click", () => {
  if (currentUserIndex < users.length) {
    alert(`You disliked ${users[currentUserIndex].name}`);
    currentUserIndex++;
    showUser();
  }
});

window.onload = fetchUsers;