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
      const data = await response.json();
      return { error: true, message: data.message };
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
    return { error: false, message: "itineraire publié" };
  } catch (err) {
    console.error(err);
    return { error: true, message: "erreur dans le catch" };
  }
}

export async function handleStatusItinerary(id, method, token) {
  try {
    const response = await fetch(apiURL + `/user/setitineraries/${id}`, {
      method: method,
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      return { error: false, message: data };
    }
    return { error: true, message: data.message };
  } catch (err) {
    console.error(err);
    return { error: true, message: "Un problème de connexion est survenu." };
  }
}

export async function addPicture(picture, token) {
  try {
    const response = await fetch(apiURL + "/user/addImg", {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: picture,
    });
    const data = await response.json();

    if (response.ok) {
      return { error: false, imageUrl: data.imageUrl };
    }
    return { error: true, message: data.message };
  } catch (err) {
    console.error(err);
    return { error: true, message: "Erreur réseau ou serveur." };
  }
}

export async function addAvis(requestBody, token) {
  try {
    const response = await fetch(`${apiURL}/user/addcomment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: true,
        message: data?.message || "Erreur inconnue du serveur",
      };
    }

    return {
      error: false,
      message: "Avis envoyé avec succès",
    };
  } catch (err) {
    console.error("Erreur lors de l'envoi de l'avis :", err);
    return {
      error: true,
      message: "Une erreur est survenue. Veuillez réessayer plus tard.",
    };
  }
}
export async function editAvis(commentId, userEmail, isValid, token) {
  try {
    const response = await fetch(apiURL + "/admin/avis", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ commentId, userEmail, isValid }),
    });
    const data = await response.json();
    if (!response.ok) {
      return { error: true, message: data.message || "response erreur" };
    }
    return { error: false, message: data.message || "commentaire validé" };
  } catch (err) {
    console.error(err);
    return { error: true, message: "500 erreur dans le fetch" };
  }
}

export async function createEmploye(requestBody, token) {
  try {
    const response = await fetch(`${apiURL}/admin/adduser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
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
        "Inscription  complète ! l employé peut se connectez avec son propre compte.",
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

export async function searchUser(email, token) {
  try {
    const response = await fetch(
      apiURL + `/admin/getuser?email=${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return {
        error: true,
        message: data.message || "Erreur dans la response du serveur ",
      };
    }

    return { error: false, data };
  } catch (err) {
    console.error(err);
    return { error: true, message: "erreur 500" };
  }
}

export async function deleteUser(email, token) {
  try {
    const response = await fetch(
      apiURL + `/admin/deleteuser?email=${encodeURIComponent(email)}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const data = await response.json();

      return {
        error: true,
        message: data.message || "erreur dans la response ",
      };
    }
    return { error: false, message: "utilisateur supprimé avec succes !" };
  } catch (err) {
    console.error(err);
    return { error: true, message: "erreur 500" };
  }
}

export async function sendEmails({ email, content }) {
  try {
    const response = await fetch(apiURL + "/guest/email", {
      method: "post",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ email, content }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: true, message: data.message };
    }

    return {
      error: false,
      message: data?.message || "email envoyé avec succes ",
    };
  } catch (err) {
    console.error(err);
    return { error: true, message: "Erreur 500" };
  }
}

export async function hundleValidateAvisPublic(id, token) {
  try {
    const res = await fetch(apiURL + `/admin/avispublic/${id}`, {
      method: "PATCH",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok)
      return {
        error: true,
        message: data?.message || "erreur dans la response",
      };

    return { error: false, message: "commentaire validé" };
  } catch (err) {
    console.error(err);
    return { error: true, message: "erreur 500" };
  }
}

export async function hundleDeleteAvisPublic(id, token) {
  try {
    const res = await fetch(apiURL + `/admin/avispublic/${id}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        error: true,
        message: data?.message || "erreur dans la response",
      };
    }

    return { error: false, message: "commentaire supprimé avec succes " };
  } catch (err) {
    console.error(err);
    return { error: true, message: "erreur 500" };
  }
}

export async function hundlePublicAvis(requestBody) {
  try {
    const response = await fetch(apiURL + "/guest/avis", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      console.error(response);
      return { error: true, message: "erreur dans la response" };
    }
    return {
      error: false,
      message:
        "votre commentaire a bien été ajouté il sera publié apres la validation.",
    };
  } catch (err) {
    console.error(err);
    return { error: true, message: "erreur 500" };
  }
}
