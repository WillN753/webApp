document.addEventListener("DOMContentLoaded", function() {
    const dateInput = document.getElementById("Test_DatetimeLocal");
    const daysLeftElement = document.getElementById("days_left");

    // Function to update the countdown
    function updateCountdown() {
        const storedDate = localStorage.getItem("countdownDate");

        if (!storedDate) {
            daysLeftElement.textContent = "Select a Date!";
            return;
        }

        const targetDate = new Date(storedDate);
        const now = new Date();
        
        // Calculate the difference in time (in milliseconds)
        const timeDiff = targetDate - now;

        // If the target date has passed, display "Expired"
        if (timeDiff <= 0) {
            daysLeftElement.textContent = "Countdown Complete!";
            return;
        }

        // Calculate the total duration and the key points (half and quarter durations)
        const totalDuration = targetDate - new Date(localStorage.getItem("countdownDateSet"));
        const halfDuration = Math.ceil(totalDuration / 2);
        const quarterDuration = Math.ceil(totalDuration / 4);

        // Calculate days, hours, minutes, and seconds remaining
        const daysRemaining = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // full days
        const hoursRemaining = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // remaining hours
        const minutesRemaining = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)); // remaining minutes
        const secondsRemaining = Math.floor((timeDiff % (1000 * 60)) / 1000); // remaining seconds

        // Display the remaining time
        daysLeftElement.textContent = `${daysRemaining}d ${hoursRemaining}h ${minutesRemaining}m ${secondsRemaining}s`;

        // Change the background color of the body when the countdown reaches half
        if (timeDiff <= halfDuration) {
            document.body.style.backgroundColor = "#FFD966"; // Gold color (or any color you prefer)
        }

        // Change the background color of the body when the countdown reaches a quarter
        if (timeDiff <= quarterDuration) {
            document.body.style.backgroundColor = "#E06666"; // Tomato color (or any other color)
        }
    }

    // Function to save the selected date to localStorage
    function saveDateToLocalStorage(date) {
        const currentDate = new Date();
        localStorage.setItem("countdownDate", date);
        localStorage.setItem("countdownDateSet", currentDate);  // Save the time when the date was set
        
        // Change the body color immediately after the countdown is set
        document.body.style.backgroundColor = "#93C47D"; // LightBlue color when the countdown is initially set

        updateCountdown();
    }

    // Event listener for the date picker
    dateInput.addEventListener("change", function(event) {
        const selectedDate = event.target.value;

        // Save the selected date to localStorage
        saveDateToLocalStorage(selectedDate);
    });

    // Load the stored date when the page loads
    const storedDate = localStorage.getItem("countdownDate");
    if (storedDate) {
        // Update the input field with the saved date
        dateInput.value = storedDate;
    }

    // Update the countdown initially
    updateCountdown();

    // Update the countdown every second to keep it accurate
    setInterval(updateCountdown, 1000);
});
