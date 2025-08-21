import { Link, redirect, useLoaderData, } from "react-router";
import { getUserData } from "../utils/loaders";
import { checkAuthorization } from "../utils/functions.js";



// 🔐 Loader pour vérifier l'autorisation et récupérer les données utilisateur
export const loader = async ({ request }) => {
    const response = checkAuthorization(request.url);
    if (response.error) {
        throw redirect(`${response?.message}`);
    }

    const res = await getUserData(response.token);
    if (res.error) {
        throw redirect(`/connexion?error=${res?.message}`);
    }

    return res.data;
};





// 👤 Composant principal affichant les infos utilisateur
const UserComponent = () => {
    const userData = useLoaderData();



    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-10 space-y-8">

                {/* 👋 Section de bienvenue */}
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                        Bonjour {userData.firstName} ! 👋
                    </h1>
                    <p className="mt-4 text-xl text-gray-700">
                        Prêt à explorer de nouveaux horizons ?
                        <br />
                        Vous pouvez dès maintenant <strong>réserver un itinéraire</strong> en quelques clics.
                    </p>
                </div>

                <hr className="border-t-2 border-gray-200" />

                {/* 📋 Section d'informations utilisateur */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">Vos informations :</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 🧍 Nom complet */}
                        <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                            <p className="text-sm font-medium text-gray-500">Nom complet</p>
                            <p className="mt-1 text-lg font-semibold text-gray-900">
                                {userData.firstName} {userData.lastName}
                            </p>
                        </div>

                        {/* 📧 Email */}
                        <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                            <p className="text-sm font-medium text-gray-500">Email</p>
                            <p className="mt-1 text-lg font-semibold text-gray-900">
                                {userData.email}
                            </p>
                        </div>

                        {/* 🏠 Adresse */}
                        <div className="col-span-full bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                            <p className="text-sm font-medium text-gray-500">Adresse</p>
                            <p className="mt-1 text-lg font-semibold text-gray-900">
                                {userData.adress}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 🚗 Boutons d'action */}
                <div className="flex flex-col md:flex-row md:justify-center md:space-x-6 space-y-4 md:space-y-0 mt-6">
                    <Link
                        to="/covoiturage"
                        className="px-6 py-3 bg-my-C text-white font-semibold rounded-lg shadow-md hover:bg-my-C-dark transition duration-300 text-center"
                    >
                        Réserver un itinéraire
                    </Link>

                    <Link
                        to="/addVehicle"
                        className="px-6 py-3 bg-my-C text-white font-semibold rounded-lg shadow-md hover:bg-my-C-dark transition duration-300 text-center"
                    >
                        Devenir Driver
                    </Link>
                </div>




                <hr className="border-t-2 border-my-E" />

                {/* 🌿 Section écologique */}
                <div className="space-y-4 text-center">
                    <h2 className="text-2xl font-bold text-my-C">
                        Ensemble pour une planète plus verte 🌿
                    </h2>
                    <p className="text-lg text-gray-600">
                        En choisissant Ecoride, vous contribuez activement à <strong>diminuer les émissions de carbone</strong>. Merci pour votre engagement !
                    </p>
                </div>
            </div>
        </div >
    );
};

export default UserComponent;
