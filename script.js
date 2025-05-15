// Sélectionne l'élément où la citation sera affichée
const quoteElement = document.getElementById('quote');
// Sélectionne le bouton pour obtenir une nouvelle citation
const newQuoteButton = document.getElementById('btn');

// URL de l'API de citations (ZenQuotes)
const api_url = "https://zenquotes.io/api/random";

// Fonction asynchrone pour récupérer une citation aléatoire depuis l'API
async function fetchRandomQuote(url) {
    try {
        // Récupère les données de l'API
        const response = await fetch(url);

        // Vérifie si la requête a réussi (statut HTTP 200-299)
        if (!response.ok) {
            // Lance une erreur si la réponse n'est pas OK
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        // Parse la réponse JSON
        const data = await response.json();

        // L'API ZenQuotes renvoie un tableau, on prend le premier élément
        const quoteData = data[0];

        // Affiche la citation et l'auteur dans l'élément HTML
        quoteElement.innerHTML = `<p>${quoteData.q}</p><span>- ${quoteData.a}</span>`;

    } catch (error) {
        // Capture et gère les erreurs (ex: réseau, API inaccessible, CORS)
        console.error('Erreur lors de la récupération de la citation:', error);
        // Affiche un message d'erreur convivial à l'utilisateur
        quoteElement.innerHTML = `<p>Impossible de charger la citation pour le moment.</p><p>Détails de l'erreur : ${error.message}</p>`;
    }
}

// Charge une citation dès que la page est chargée
fetchRandomQuote(api_url);

// Ajoute un écouteur d'événement au bouton pour charger une nouvelle citation lors du clic
newQuoteButton.addEventListener('click', () => {
    // Affiche un message de chargement pendant la requête
    quoteElement.innerHTML = "<p>Chargement de la citation...</p>";
    // Appelle la fonction pour récupérer une nouvelle citation
    fetchRandomQuote(api_url);
});
