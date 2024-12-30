// Helper function to get the username from the user card
function getUserNameFromSevenTVCard() {
    const usernameElement = document.querySelector('.seventv-user-card-usertag-container span');
    return usernameElement ? usernameElement.textContent.trim() : '';
}

// Flag to ensure the button is added only once per user card
let buttonAdded = false;

// Function to create and add the custom button to the user card
function addButtonToUserCard() {
    const targetDiv = document.querySelector('.seventv-user-card-menuactions');

    // Check if the button isn't already added
    if (targetDiv && !targetDiv.querySelector('.custom-button') && !buttonAdded) {



        // Create the SVG element
        const newButton = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        newButton.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        newButton.setAttribute("viewBox", "0 -960 960 960");
        newButton.setAttribute("fill", "#0e0e10");

        // Set the inner SVG content (path)
        const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathElement.setAttribute("d", "M440-560q33 0 56.5-23.5T520-640q0-33-23.5-56.5T440-720q-33 0-56.5 23.5T360-640q0 33 23.5 56.5T440-560Zm0 160q45 0 84.5-19t68.5-54q-35-23-73.5-35T440-520q-41 0-79.5 12T287-473q29 35 68.5 54t84.5 19Zm384 280L636-308q-41 32-90.5 50T440-240q-134 0-227-93t-93-227q0-134 93-227t227-93q134 0 227 93t93 227q0 56-18 105.5T692-364l188 188-56 56ZM440-320q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70Zm0-240Z");
        newButton.appendChild(pathElement);

        // Add the click event to open a new tab with the username's link
        newButton.addEventListener('click', () => {
            const username = getUserNameFromSevenTVCard();
            if (username) {
                window.open('https://artemiano.top/twitch/' + username, '_blank');
            }
        });

        newButton.setAttribute('title', 'Open user in Artemiano site');

        // Add a class for hover effect
        newButton.classList.add('artemiano-button');

        // Append the button to the user card menu
        targetDiv.insertBefore(newButton, targetDiv.firstChild);
        // Set the flag to true so the button is not added again
        buttonAdded = true;
        console.log('Custom button added to user card menu.');
    }
}

// Function to check if the user card is closed and reset the flag
function detectUserCardClose() {
    const userCardMenuActions = document.querySelector('.seventv-user-card-menuactions');
    if (!userCardMenuActions && buttonAdded) {
        // Reset the buttonAdded flag when the user card is closed
        buttonAdded = false;
    }
}

// MutationObserver to watch for the user card being opened or closed
const observer = new MutationObserver(() => {
    const userCardMenuActions = document.querySelector('.seventv-user-card-menuactions');

    // If the user card is open and button is not yet added, add it
    if (userCardMenuActions && !buttonAdded) {
        addButtonToUserCard();
    }

    // Detect if the user card is closed and reset the flag
    detectUserCardClose();
});

// Start observing the body for changes in the DOM
observer.observe(document.body, {
    childList: true,
    subtree: true,
});
