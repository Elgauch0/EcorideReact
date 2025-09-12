import { Link } from "react-router";

function Notfound() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
            <article className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full">
                <header>
                    <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                    <h2 className="text-3xl font-semibold text-gray-700 mb-6">Page introuvable</h2>
                </header>

                <p className="text-gray-600 mb-8">
                    Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
                </p>

                <nav aria-label="Retour à l'accueil">
                    <Link
                        to="/"
                        className="inline-block bg-my-A text-white font-semibold py-3 px-6 hover:bg-blue-700 transition duration-300 ease-in-out shadow-md rounded-lg"
                    >
                        Retourner à l'accueil
                    </Link>
                </nav>
            </article>
        </main>
    );
}

export default Notfound;
