import { jwtDecode } from "jwt-decode";

export const cleanSimpleText = (str) => {
  if (typeof str !== "string") {
    return "";
  }

  let cleanedStr = str.replace(/<[^>]*>?/g, "");
  cleanedStr = cleanedStr.replace(/[^a-zA-Z0-9\s.,-àâäéèêëïîöôùûüÿçœæ]/gi, "");
  return cleanedStr.trim().toLowerCase();
};

export const ValidateDate = (dateEntree) => {
  const maintenant = new Date();
  const dateUtilisateur = new Date(dateEntree);

  if (isNaN(dateUtilisateur.getTime())) {
    return "";
  }
  dateUtilisateur.setHours(0, 0, 0, 0);
  maintenant.setHours(0, 0, 0, 0);

  if (dateUtilisateur < maintenant) {
    return "";
  }

  return dateEntree;
};

export const handleToken = (token) => {
  if (!token) {
    throw new Error("Token manquant");
  }
  if (typeof token !== "string") {
    throw new Error("Token doit être une chaîne de caractères");
  }

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (err) {
    throw new Error("Échec du décodage du token JWT");
  }
  console.log(decoded);

  const { roles, username, exp, userID } = decoded;

  if (!roles || !username) {
    throw new Error("Le token ne contient pas les informations nécessaires");
  }

  localStorage.setItem("token", token);
  localStorage.setItem("username", username);
  localStorage.setItem("roles", JSON.stringify(roles));
  localStorage.setItem("token_exp", exp);
  localStorage.setItem("isLogged", true);
  localStorage.setItem("userID", userID);

  // Détermination du dashboard
  let dashboard = "";

  if (roles.includes("ROLE_ADMIN")) {
    dashboard = "/admin";
  } else if (roles.includes("ROLE_MANAGER")) {
    dashboard = "/manager";
  } else if (roles.includes("ROLE_DRIVER")) {
    dashboard = "/driver";
  } else if (roles.includes("ROLE_USER")) {
    dashboard = "/user";
  } else {
    throw new Error("role introuvable");
  }

  return dashboard;
};
