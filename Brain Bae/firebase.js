import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// ✅ Ensure Firebase SDK is Loaded
if (typeof firebase === "undefined") {
    console.error("Firebase SDK not loaded! Check your <script> order in index.html.");
}
const firebaseConfig = {
    apiKey: "AIzaSyCb92Q_Kv2OPSsEbYBxe8otpf8PAngQ9uw",
    authDomain: "brainbae-f3c56.firebaseapp.com",
    projectId: "brainbae-f3c56",
    storageBucket: "brainbae-f3c56.firebasestorage.app",
    messagingSenderId: "548435921667",
    appId: "1:548435921667:web:fc85376745bd8dd4c37736",
    measurementId: "G-060KZWZ23R"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
// ✅ Initialize Firebase

let db;
// ✅ Initialize Firestore
db = firebase.firestore();

// ✅ Function to Fetch Users from Firestore
function fetchUsersFromFirebase(callback) {
    if (!db) {
        console.error("Firestore is not initialized!");
        return;
    }

    db.collection("users").get()
        .then((querySnapshot) => {
            let users = [];
            querySnapshot.forEach((doc) => {
                users.push(doc.data());  // Store user data
            });

            console.log("Fetched Users:", users);  // Debugging
            callback(users);
        })
        .catch(error => console.error("Error fetching users:", error));
}

// ✅ Ensure Firestore is Ready Before Calling Any Functions
document.addEventListener("DOMContentLoaded", () => {
    fetchUsersFromFirebase((users) => {
        console.log("Users loaded:", users);
    });
});
