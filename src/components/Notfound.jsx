import { Link } from "react-router";

function Notfound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full">
                <h1 className="text-6xl font-bold text-gray-800 mb-4 rounded-lg">404</h1>
                <h2 className="text-3xl font-semibold text-gray-700 mb-6 rounded-lg">Page Introuvable</h2>
                <p className="text-gray-600 mb-8 rounded-lg">
                    Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
                </p>
                <Link
                    to="/"
                    className="inline-block bg-my-A text-white font-semibold py-3 px-6  hover:bg-blue-700 transition duration-300 ease-in-out shadow-md rounded-lg"
                >
                    Retourner à l'accueil
                </Link>


            </div>
        </div>
    );
}

export default Notfound;
