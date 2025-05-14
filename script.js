// Function to fetch and display a random quote
async function fetchRandomQuote() {
    try {
        // Show loading state
        document.getElementById("quote").innerText = "Chargement...";
        console.log("Tentative de connexion à l'API ZenQuotes...");
        
        // Test de connexion avec mode CORS
        const response = await fetch("https://zenquotes.io/api/random", {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json'
            }
        });
        console.log("Statut de la réponse:", response.status);

        if (!response.ok) {
            throw new Error(`Erreur de connexion: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Données reçues:", data);

        // Vérification des données
        if (!data || !data[0] || !data[0].q) {
            throw new Error("Données invalides reçues de l'API");
        }

        // Affichage de la citation
        const quoteText = `"${data[0].q}"`;
        const authorText = data[0].a ? ` — ${data[0].a}` : "";
        document.getElementById("quote").innerText = quoteText + authorText;
        console.log("Citation affichée avec succès");

    } catch (error) {
        console.error("Erreur complète:", error);
        // Message d'erreur plus détaillé
        const errorMessage = error.message.includes('CORS') 
            ? "Erreur CORS: L'API n'est pas accessible depuis ce domaine. Veuillez réessayer plus tard."
            : "Erreur de connexion à l'API. Veuillez réessayer.";
        document.getElementById("quote").innerText = errorMessage;
    }
}

// Add click event listener to the button
document.getElementById("btn").addEventListener("click", fetchRandomQuote);

// Call the function when the page loads
fetchRandomQuote();
