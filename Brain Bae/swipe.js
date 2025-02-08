import { fetchUsersFromFirebase } from "./firebase.js";
document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.getElementById("card-container");
    const likeBtn = document.getElementById("like");
    const dislikeBtn = document.getElementById("dislike");

    let currentIndex = 0;
    let users = [];

    function loadUsers(fetchedUsers) {
        users = fetchedUsers;
        console.log("Users loaded:", users); // Debugging
        if (users.length > 0) {
            showUser();
        } else {
            cardContainer.innerHTML = "<p>No users found!</p>";
        }
    }

    function showUser() {
        if (currentIndex < users.length) {
            const user = users[currentIndex];
            console.log("Displaying User:", user); // Debugging
            cardContainer.innerHTML = `
                <div class="user-card">
                    <p><strong>Name:</strong> ${user.Name}</p>
                    <p><strong>Age:</strong> ${user.Age}</p>
                    <p><strong>Skills:</strong> ${user.Skills ? user.Skills.join(", ") : "None"}</p>
                    <p><strong>Expertise:</strong> ${user.Expertise || "None"}</p>
                </div>
            `;
        } else {
            cardContainer.innerHTML = "<p>No more users!</p>";
        }
    }

    likeBtn.addEventListener("click", () => {
        if (currentIndex < users.length) {
            console.log(`Matched with: ${users[currentIndex].Name}`);
        }
        currentIndex++;
        showUser();
    });

    dislikeBtn.addEventListener("click", () => {
        currentIndex++;
        showUser();
    });

    fetchUsersFromFirebase(loadUsers);
});
