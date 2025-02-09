
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
        <h1>${user.name}</h1>
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
// Like button event listener
document.getElementById("like").addEventListener("click", () => {
    if (currentUserIndex < users.length) {
      const selectedUser = users[currentUserIndex];
  
      // Store the selected user's data in localStorage
      localStorage.setItem("selectedUserId", selectedUser.id);
      localStorage.setItem("selectedUserName", selectedUser.name);
  
      // Navigate to the chat page
      window.location.href = `chat.html?partnerId=${selectedUser.id}&partnerName=${selectedUser.name}`;
    }
  });


// Function to Show Popup Message
const showPopup = (message, callback = null) => {
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");

  popupMessage.innerText = message;
  popup.style.display = "block";

  // If a callback function is provided, execute it after 8 seconds
  if (callback) {
    setTimeout(callback, 8000); // 8 seconds delay
  }
};

// Close Popup Event
document.getElementById("popup-close").addEventListener("click", () => {
  document.getElementById("popup").style.display = "none";
});

// Like Button Event Listener (Accept)
document.getElementById("like").addEventListener("click", () => {
  if (currentUserIndex < users.length) {
    const selectedUser = users[currentUserIndex];

    // Store the selected user's data in localStorage
    localStorage.setItem("selectedUserId", selectedUser.id);
    localStorage.setItem("selectedUserName", selectedUser.name);

    // Show popup with an 8-second delay before redirecting
    showPopup(`You accepted ${selectedUser.name}! Starting chat in 8 seconds...`, () => {
      window.location.href = `chat.html?partnerId=${selectedUser.id}&partnerName=${selectedUser.name}`;
    });
  }
});

// Dislike Button Event Listener (Decline)
document.getElementById("dislike").addEventListener("click", () => {
  if (currentUserIndex < users.length) {
    showPopup(`You declined ${users[currentUserIndex].name}.`);
    currentUserIndex++;
    setTimeout(showUser, 1000); // Show next user after 1 second
  }
});


// Fetch users when the page loads
window.onload = fetchUsers;
