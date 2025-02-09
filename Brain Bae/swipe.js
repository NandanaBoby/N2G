let users = [];
let currentUserIndex = 0;

// Fetch users from Firestore
const fetchUsers = async () => {
  try {
    const usersCollection = collection(db, "users");
    const snapshot = await getDocs(usersCollection);
    users = snapshot.docs.map((doc) => doc.data());
    showUser();
  } catch (error) {
    console.error("Error fetching users:", error);
    alert("Failed to fetch users. Please try again later.");
  }
};

// Display the current user
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
    document.getElementById("like").disabled = true;
    document.getElementById("dislike").disabled = true;
  }
};

// Like button event listener
document.getElementById("like").addEventListener("click", () => {
  if (currentUserIndex < users.length) {
    alert(`You liked ${users[currentUserIndex].name}`);
    currentUserIndex++;
    showUser();
  }
});

// Dislike button event listener
document.getElementById("dislike").addEventListener("click", () => {
  if (currentUserIndex < users.length) {
    alert(`You disliked ${users[currentUserIndex].name}`);
    currentUserIndex++;
    showUser();
  }
});

// Fetch users when the page loads
window.onload = fetchUsers;