
const apiURL = import.meta.env.VITE_API_URL;

export async function searchItineraries(requestBody){
   

    try {
        const response = await fetch(`${apiURL}/itinerary/search`, {
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
export async function createUser(requestBody) {
    try {
        const response = await fetch(`${apiURL}/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json(); 

        if (!response.ok) {
            console.error(`Backend Error (${response?.status}):`, data);
            return {
                error: true,
                message: data.message || `Une erreur est survenue (statut: ${response?.status}).`
            };
        }

        return { error: false,
                 message: 'Votre inscription est complète ! Connectez-vous dès maintenant pour commencer.' };

    } catch (err) {
        console.error("Erreur de connexion dans createUser:", err);
        return {
            error: true,
            message: "Impossible de se connecter au serveur. Veuillez vérifier votre connexion internet."
        };
    }
}