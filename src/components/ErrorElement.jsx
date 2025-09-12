// src/components/ErrorElement.jsx
import { useRouteError, Link, useNavigate } from "react-router"
import Header from "./Header"
import Footer from "./Footer"

export default function ErrorElement() {
    const error = useRouteError()
    console.error(error);
    const navigate = useNavigate()

    // Récupère message et code d’erreur (status peut venir d’un Response ou d’une Error custom)
    const message =
        error?.statusText || error?.message || "Une erreur inattendue s'est produite."
    const code = error?.status || error?.statusCode

    return (
        <>
            <Header />

            <section className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4">
                <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
                    <h1 className="text-3xl font-bold text-red-600 mb-4">
                        Oups ! Quelque chose a mal tourné
                    </h1>
                    <p className="text-gray-700 mb-2">{message}</p>
                    {code && (
                        <p className="text-sm text-gray-500 mb-6">
                            Code d’erreur : <span className="font-medium">{code}</span>
                        </p>
                    )}

                    <div className="flex gap-4 justify-center">
                        <Link
                            to="/"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Accueil
                        </Link>
                        <button
                            onClick={() => navigate(-1)}
                            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                        >
                            Retour
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}
