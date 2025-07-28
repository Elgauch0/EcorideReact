
const apiURL = import.meta.env.VITE_API_URL;

export async function searchItineraries(requestBody){
    const fullApiUrl = `${apiURL}/itinerary/search`;

    try {
        const response = await fetch(fullApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(`Backend Error (${response.status}):`, data);
            return {
                error: true,
                message: data.message || data.detail || "Le serveur a retourné une erreur.",  
            };
        }
        return { error: false, data: data  };

    } catch (err) {
       
        console.error("Erreur de connexion dans searchItineraries:", err);
        return {
            error: true,
            message: "Impossible de se connecter au serveur. Vérifie ta connexion.", 
        };
    }
}
