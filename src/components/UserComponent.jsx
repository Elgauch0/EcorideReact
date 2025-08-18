import { Link, redirect, useLoaderData, Form, useActionData, useNavigation } from "react-router";
import { getUserData } from "../utils/loaders";
import { checkAuthorization, cleanSimpleText, ValidateDate } from "../utils/functions.js";
import { useState } from "react";
import { addVehicle } from "../utils/actions.js";
import { useAuthStore } from "../store/AuthStore.js";

// 🔐 Loader pour vérifier l'autorisation et récupérer les données utilisateur
export const loader = async ({ request }) => {
    const response = checkAuthorization(request.url);
    if (response.error) {
        throw redirect(`${response?.message}`);
    }

    const res = await getUserData(response.userID, response.token);
    if (res.error) {
        throw redirect(`/connexion?error=${res?.message}`);
    }

    return res.data;
};


export const action = async ({ request }) => {
    const formData = await request.formData();

    const licencePlate = cleanSimpleText(formData.get('licencePlate')).toUpperCase();
    const registrationDate = ValidateDate(formData.get('registrationDate'));
    const seatsAvailable = parseInt(formData.get('seatsAvailable'));
    const model = cleanSimpleText(formData.get('model'));
    const isSmockingAlowed = formData.get('isSmockingAlowed') === 'on';
    const isPetsAlowed = formData.get('isPetsAlowed') === 'on';
    const isGreen = formData.get('isGreen') === 'on';


    // ✅ Validation des champs obligatoires
    if (!licencePlate || !registrationDate || !seatsAvailable || !model) {
        console.log(licencePlate, registrationDate, seatsAvailable, model)
        return {
            error: true,
            message: "Toutes les cases doivent être renseignées.",
        };
    }

    const requestdata = {
        licencePlate,
        registrationDate,
        seatsAvailable,
        model,
        isSmockingAlowed,
        isPetsAlowed,
        isGreen,
    };
    const response = await addVehicle(requestdata);
    if (response.error) {
        return response.message

    }
    const { setRole } = useAuthStore.getState();
    setRole("ROLE_DRIVER");
    throw redirect('/driver');
};



// 👤 Composant principal affichant les infos utilisateur
const UserComponent = () => {
    const userData = useLoaderData();
    const [isOpen, setOpen] = useState(false);
    const hundleDriverForm = () => setOpen(prev => !prev);
    const actionData = useActionData();
    const message = actionData?.message;

    const navigation = useNavigation();
    const disabled = navigation.state === "submitting";

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

                    <button
                        onClick={hundleDriverForm}
                        className="px-6 py-3 bg-my-C text-white font-semibold rounded-lg shadow-md hover:bg-my-C-dark transition duration-300 text-center"
                    >
                        Devenir Driver
                    </button>
                </div>
                { }
                {isOpen && (
                    <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Vous devez avoir une voiture pour devenir chauffeur
                        </h2>
                        {message && (
                            <p
                                className='mt-4 text-center font-medium  text-red-600'
                            >
                                {message}
                            </p>
                        )}

                        <Form method="POST" className="space-y-5">
                            {/* Plaque d'immatriculation */}
                            <div>
                                <label
                                    htmlFor="licencePlate"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Plaque d'immatriculation
                                </label>
                                <input
                                    type="text"
                                    name="licencePlate"
                                    id="licencePlate"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2
                     bg-gray-50 focus:outline-none focus:ring-my-C focus:border-my-C"
                                />
                            </div>

                            {/* Date d'enregistrement */}
                            <div>
                                <label
                                    htmlFor="registrationDate"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Date d'enregistrement
                                </label>
                                <input
                                    type="date"
                                    name="registrationDate"
                                    id="registrationDate"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2
                     bg-gray-50 focus:outline-none focus:ring-my-C focus:border-my-C"
                                />
                            </div>

                            {/* Nombre de places disponibles */}
                            <div>
                                <label
                                    htmlFor="seatsAvailable"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Nombre de places disponibles
                                </label>
                                <input
                                    type="number"
                                    name="seatsAvailable"
                                    id="seatsAvailable"
                                    min="1"
                                    max="50"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2
                     bg-gray-50 focus:outline-none focus:ring-my-C focus:border-my-C"
                                />
                            </div>

                            {/* Modèle */}
                            <div>
                                <label
                                    htmlFor="model"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Modèle
                                </label>
                                <input
                                    type="text"
                                    name="model"
                                    id="model"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2
                     bg-gray-50 focus:outline-none focus:ring-my-C focus:border-my-C"
                                />
                            </div>

                            {/* Options (checkboxes) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center">
                                    <input
                                        id="isSmockingAlowed"
                                        name="isSmockingAlowed"
                                        type="checkbox"
                                        className="h-4 w-4 text-my-C border-gray-300 rounded focus:ring-my-C"
                                    />
                                    <label
                                        htmlFor="isSmockingAlowed"
                                        className="ml-2 block text-sm text-gray-700"
                                    >
                                        Fumeur autorisé
                                    </label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="isPetsAlowed"
                                        name="isPetsAlowed"
                                        type="checkbox"
                                        className="h-4 w-4 text-my-C border-gray-300 rounded focus:ring-my-C"
                                    />
                                    <label
                                        htmlFor="isPetsAlowed"
                                        className="ml-2 block text-sm text-gray-700"
                                    >
                                        Animaux autorisés
                                    </label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="isGreen"
                                        name="isGreen"
                                        type="checkbox"
                                        className="h-4 w-4 text-my-C border-gray-300 rounded focus:ring-my-C"
                                    />
                                    <label
                                        htmlFor="isGreen"
                                        className="ml-2 block text-sm text-gray-700"
                                    >
                                        Véhicule écologique
                                    </label>
                                </div>
                            </div>

                            {/* Bouton de soumission */}
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-my-C text-white font-semibold rounded-md disabled:bg-my-D disabled:cursor-not-allowed
                   shadow hover:bg-my-C-dark focus:outline-none focus:ring-2
                   focus:ring-offset-2 focus:ring-my-C"
                                disabled={disabled}
                            >
                                Enregistrer
                            </button>
                        </Form>
                    </div>
                )}


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
