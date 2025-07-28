import { NavLink } from "react-router-dom";
import { useRouteError } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const ErrorElement = () => {
    const error = useRouteError();
    console.error("Erreur capturée :", error);

    return (
        <>
            <Header />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
                <h1 className="text-4xl font-bold text-red-600 mb-4">Oups ! Une erreur est survenue</h1>

                <p className="text-lg text-gray-700 mb-2">
                    {error?.message || "Une erreur inattendue s'est produite."}
                </p>

                {error?.status && (
                    <p className="text-sm text-gray-500 mb-4">
                        Code d’erreur : {error.status}
                    </p>
                )}

                <NavLink
                    to="/"
                    className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Retourner à l’accueil
                </NavLink>
            </div>
            <Footer />
        </>
    );
};

export default ErrorElement;
