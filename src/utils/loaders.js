const apiURL = import.meta.env.VITE_API_URL;
const userURL = apiURL + "/user";

export async function getUserData(userID) {
  try {
    const response = await fetch(userURL + `/getuser/${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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
