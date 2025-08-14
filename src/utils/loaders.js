//loaders.js
const apiURL = import.meta.env.VITE_API_URL;
const userURL = apiURL + "/user";

export async function getUserData(userID, token) {
  try {
    const response = await fetch(userURL + `/getuser/${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: true,
        message: response.message || "réponse du serveur not ok ",
      };
    }

    return {
      error: false,
      data,
    };
  } catch (err) {
    return { error: true, message: response.message || "erreur 500 " };
  }
}
/**
 * Récupère la liste d’itinéraires et l’itinéraire sélectionné depuis sessionStorage.
 * Retourne un objet { error, message, list?, itinerary? }.
 */
export function getItinerariesDataFromSessionStorage() {
  const rawList = sessionStorage.getItem("itineraries");
  const rawItin = sessionStorage.getItem("itinerary");

  if (!rawList || !rawItin) {
    return {
      error: true,
      message:
        "/covoiturage?error=Aucun trajet trouvé. Veuillez d'abord effectuer une recherche.",
    };
  }

  try {
    const list = JSON.parse(rawList);
    const itinerary = JSON.parse(rawItin);

    if (!Array.isArray(list) || list.length === 0) {
      return {
        error: true,
        message:
          "/covoiturage?error=Aucun trajet trouvé. Veuillez d'abord effectuer une recherche.",
      };
    }
    return { error: false, list, itinerary };
  } catch (err) {
    console.error("Parsing sessionStorage:", err);
    return {
      error: true,
      message:
        "/covoiturage?error=Erreur interne. Merci de relancer la recherche.",
    };
  }
}
