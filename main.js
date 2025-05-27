// main.js - JavaScript for Local Community Event Portal

// 1. JavaScript Basics & Setup
console.log("Welcome to the Community Portal");
window.onload = () => {
    alert("Page fully loaded!");
};

// 2. Syntax, Data Types, and Operators
const eventName = "Local Music Fest";
const eventDate = "2025-06-15";
let availableSeats = 50;
console.log(`Event: ${eventName}, Date: ${eventDate}, Seats: ${availableSeats}`);
availableSeats--;

// 3. Conditionals, Loops, and Error Handling
const events = [
    { name: "Music Fest", date: "2025-06-15", seats: 5 },
    { name: "Art Expo", date: "2024-12-01", seats: 0 },
    { name: "Tech Talk", date: "2025-07-01", seats: 20 }
];

events.forEach(event => {
    try {
        if (new Date(event.date) > new Date() && event.seats > 0) {
            console.log(`Upcoming: ${event.name}`);
        }
    } catch (err) {
        console.error("Event Error:", err);
    }
});

// 4. Functions and Closures
function addEvent(name, date, seats) {
    events.push({ name, date, seats });
}
function registerUser(eventName) {
    const event = events.find(e => e.name === eventName);
    if (event && event.seats > 0) event.seats--;
}
function filterEventsByCategory(events, callback) {
    return events.filter(callback);
}

const registrationTracker = (() => {
    let count = 0;
    return () => ++count;
})();
console.log("Registrations:", registrationTracker());

// 5. Objects and Prototypes
function Event(name, date, seats) {
    this.name = name;
    this.date = date;
    this.seats = seats;
}
Event.prototype.checkAvailability = function () {
    return this.seats > 0;
};
const e1 = new Event("Dance Show", "2025-08-20", 10);
console.log(Object.entries(e1));

// 6. Arrays and Methods
const eventNames = events.map(e => `Event: ${e.name}`);
console.log(eventNames);
const musicEvents = events.filter(e => e.name.includes("Music"));
events.push({ name: "Yoga Session", date: "2025-09-10", seats: 30 });

// 7. DOM Manipulation
const eventList = document.querySelector("#eventList");
events.forEach(e => {
    const div = document.createElement("div");
    div.className = "eventCard";
    div.innerHTML = `<h3>${e.name}</h3><p>Date: ${e.date}</p><p>Seats: ${e.seats}</p>`;
    eventList.appendChild(div);
});

// 8. Event Handling
document.querySelectorAll(".registerBtn").forEach(btn => {
    btn.onclick = () => alert("You have registered!");
});
document.querySelector("#categoryFilter").onchange = (e) => {
    console.log("Selected Category:", e.target.value);
};
document.querySelector("#searchInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") console.log("Search for:", e.target.value);
});

// 9. Async JS, Promises, Async/Await
async function fetchEvents() {
    const loader = document.querySelector("#loader");
    loader.style.display = "block";
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        console.log("Fetched events:", data.slice(0, 5));
    } catch (err) {
        console.error("Fetch error:", err);
    } finally {
        loader.style.display = "none";
    }
}
fetchEvents();

// 10. Modern JavaScript Features
function showEvent({ name, date, seats = 10 }) {
    console.log(`Name: ${name}, Date: ${date}, Seats: ${seats}`);
}
const [firstEvent, ...others] = events;
showEvent(firstEvent);

// 11. Working with Forms
document.querySelector("#registerForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const name = this.elements["name"].value;
    const email = this.elements["email"].value;
    if (!name || !email) {
        alert("Please fill in all fields.");
    } else {
        console.log("Form Submitted:", name, email);
    }
});

// 12. AJAX & Fetch API
function sendRegistration(data) {
    setTimeout(() => {
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })
        .then(res => res.json())
        .then(json => alert("Registration successful!"))
        .catch(() => alert("Submission failed."));
    }, 1500);
}

// 13. Debugging and Testing
console.log("Preparing to submit registration...");
const testUser = { name: "Tester", email: "test@mail.com" };
console.log("Payload:", testUser);
sendRegistration(testUser);

// 14. jQuery and JS Frameworks
$(document).ready(function() {
    $('#registerBtn').click(function() {
        alert('Registered using jQuery!');
    });
    $('.eventCard').fadeIn();
});