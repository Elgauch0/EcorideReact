import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "../store/AuthStore.js";

export const cleanSimpleText = (str) => {
  if (typeof str !== "string") {
    return "";
  }

  let cleanedStr = str.replace(/<[^>]*>?/g, "");
  cleanedStr = cleanedStr.replace(/[^a-zA-Z0-9\s.,-àâäéèêëïîöôùûüÿçœæ]/gi, "");
  return cleanedStr.trim().toLowerCase();
};

export const ValidateDate = (dateEntree, past = false) => {
  const maintenant = new Date();
  const dateUtilisateur = new Date(dateEntree);

  if (isNaN(dateUtilisateur.getTime())) {
    return "";
  }

  // Comparer uniquement les dates (sans heure)
  dateUtilisateur.setHours(0, 0, 0, 0);
  maintenant.setHours(0, 0, 0, 0);

  if (past === true) {
    // On accepte uniquement les dates passées ou égales
    if (dateUtilisateur > maintenant) {
      return "";
    }
  } else {
    // On accepte uniquement les dates futures ou égales
    if (dateUtilisateur < maintenant) {
      return "";
    }
  }

  return dateEntree;
};

export const ValidateDateHour = (dateEntree) => {
  const d = new Date(dateEntree);
  if (isNaN(d.getTime())) {
    return null;
  }
  const maintenant = new Date();

  if (d < maintenant) {
    return "";
  }

  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const seconds = d.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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

  const { roles, exp, userID } = decoded;
  try {
    useAuthStore.getState().login(token, roles, exp, userID);
  } catch (error) {
    console.error("Error updating auth store:", error);
    throw new Error(
      "Erreur lors de la mise à jour de l'état d'authentification"
    );
  }

  return determineDashboard(roles);
};

export const determineDashboard = (roles) => {
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

////////////////////////////////////////////////////////////-----Authentication -----///////////////////////////////////////////////////////////////

export const roleRequis = (pathname) => {
  if (pathname.startsWith("/admin")) return "ROLE_ADMIN";
  if (pathname.startsWith("/manager")) return "ROLE_MANAGER";
  if (pathname.startsWith("/driver")) return "ROLE_DRIVER";
  if (pathname.startsWith("/user")) return "ROLE_USER";
  return null;
};

export const checkAuthorization = (url) => {
  const { isLogged, token_exp, roles, logout, userID, token } =
    useAuthStore.getState();
  let pathname = "/user";
  if (typeof url === "string") {
    try {
      pathname = new URL(url).pathname;
    } catch (e) {
      console.error("URL invalide dans checkAuthorization:", url);
      pathname = "/user"; // fallback
    }
  }

  // 1. L’utilisateur est-il connecté ?
  if (!isLogged) {
    return {
      error: true,
      message: `/connexion?error=${encodeURIComponent(
        "Vous devez être connecté pour accéder à cette page"
      )}`,
    };
  }

  const now = Date.now() / 1000;
  if (token_exp && now > token_exp) {
    logout();
    return {
      error: true,
      message: `/connexion?error=${encodeURIComponent(
        "Votre session a expiré, veuillez vous reconnecter"
      )}`,
    };
  }

  // 3. L’utilisateur a-t-il le rôle requis pour cette route ?
  const requiredRole = roleRequis(pathname);
  if (
    requiredRole &&
    (!Array.isArray(roles) || !roles.includes(requiredRole))
  ) {
    return {
      error: true,
      message: `/connexion?error=${encodeURIComponent(
        "Vous n'avez pas la permission d'accéder à cette page"
      )}`,
    };
  }

  return { error: false, userID, token };
};
