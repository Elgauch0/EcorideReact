const apiURL = import.meta.env.VITE_API_URL;
import { checkAuthorization, handleToken } from "./functions";

export async function searchItineraries(requestBody) {
  try {
    const response = await fetch(`${apiURL}/guest/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`Backend Error (${response.status}):`, data);
      return {
        error: true,
        message: err.message || "server not responding",
      };
    }
    return { error: false, data: data };
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
    const response = await fetch(`${apiURL}/guest/adduser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`Backend Error (${response?.status}):`, data);
      return {
        error: true,
        message:
          data.message ||
          `Une erreur est survenue (statut: ${response?.status}).`,
      };
    }

    return {
      error: false,
      message:
        "Votre inscription est complète ! Connectez-vous dès maintenant pour commencer.",
    };
  } catch (err) {
    console.error("Erreur de connexion dans createUser:", err);
    return {
      error: true,
      message:
        "Impossible de se connecter au serveur. Veuillez vérifier votre connexion internet.",
    };
  }
}
export async function loginUser(requestBody) {
  try {
    const response = await fetch(`${apiURL}/login_check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erreur API :", data);
      return {
        error: true,
        message: data?.message || "Réponse du serveur non valide",
      };
    }

    let dashboardPath;
    try {
      dashboardPath = handleToken(data.token); // handleToken doit retourner le chemin du dashboard
    } catch (tokenError) {
      console.error("Erreur dans handleToken :", tokenError.message);
      return {
        error: true,
        message: tokenError.message || "Erreur lors du traitement du token",
      };
    }

    return {
      error: false,
      dashboard: dashboardPath,
    };
  } catch (err) {
    console.error("Erreur réseau ou serveur :", err);
    return {
      error: true,
      message: err?.message || "Le serveur ne répond pas",
    };
  }
}

export async function reserveItinerary(
  itineraryId,
  userID,
  seatsReserved,
  token
) {
  try {
    const response = await fetch(apiURL + "/user/addreservation", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        clientId: userID,
        itineraryId,
        seatsReserved,
      }),
    });

    if (!response.ok) {
      console.log(response);
      return { error: true, message: "response not OK" };
    }
    return {
      error: false,
      message: "reservation effectuée avec succes",
    };
  } catch (err) {
    console.error(err);
    return { error: true, message: `${err?.message}` };
  }
}

export async function addVehicle(requestBody) {
  const { token } = checkAuthorization();
  try {
    const response = await fetch(apiURL + "/user/addvehicle", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      return { error: true, message: "serveur renvoie une mauvaise response " };
    }
    return { error: false, message: "voiture bien  ajouté " };

    //const data = await response.json();
  } catch (err) {
    console.error(err);
    return { error: true, message: "erreur dans le catch" };
  }
}

export async function addItinerary(requestBody) {
  const { token } = checkAuthorization();
  try {
    const response = await fetch(apiURL + "/user/additinerary", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();

    if (!response.ok) {
      console.error(response);
      return { error: true, message: data.message || "Erreur inconnue" };
    }
    console.log(data);
    return { error: false, message: "itineraire publié" };
  } catch (err) {
    console.error(err);
    return { error: true, message: "erreur dans le catch" };
  }
}
