// Function to fetch and display a random quote
async function fetchRandomQuote() {
    try {
        // Show loading state
        document.getElementById("quote").innerText = "Chargement...";
        
        const response = await fetch("https://api.quotable.io/random", {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        document.getElementById("quote").innerText = `"${data.content}" — ${data.author}`;
    } catch (error) {
        console.error("Erreur lors du chargement de la citation:", error);
        document.getElementById("quote").innerText = "Impossible de charger la citation. Veuillez réessayer.";
    }
}

// Add click event listener to the button
document.getElementById("btn").addEventListener("click", fetchRandomQuote);

// Call the function when the page loads
fetchRandomQuote();
