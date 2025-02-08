import { initializeApp } from "./firebase/app";
import { getFirestore } from "./firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC1y78P5Fxxxxxxxxxxxxxx",
    authDomain: "project.firebaseapp.com",
    projectId: "project id",
    storageBucket: "name.appspot.com",
    messagingSenderId: "107238745226",
    appId: "1:107238745226:web:3dd6331c633ebd7b5af973",
    measurementId: "G-XSYWCPWR0F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

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
