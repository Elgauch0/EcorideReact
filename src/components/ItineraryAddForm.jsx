import { useState } from "react";
import { Form, useLoaderData, useActionData, useNavigation } from "react-router";
import { getVehicle } from "../utils/loaders";
import { ValidateDateHour, cleanSimpleText } from "../utils/functions";
import { addItinerary } from "../utils/actions";

export const loader = async () => {
    return await getVehicle();
};

export const action = async ({ request }) => {
    const formData = await request.formData();
    const itineraryData = {
        vehiculeId: Number(formData.get("vehiculeId")),
        duration: Number(formData.get("duration")),
        price: Number(formData.get("price")),
        datetime: ValidateDateHour(formData.get("datetime")),
        places: Number(formData.get("places")),
        departureCity: cleanSimpleText(formData.get("departureCity")),
        arrivalCity: cleanSimpleText(formData.get("arrivalCity")),
    };
    const hasEmpty =
        !itineraryData.vehiculeId ||
        !itineraryData.duration ||
        !itineraryData.price ||
        !itineraryData.datetime ||
        !itineraryData.places ||
        !itineraryData.departureCity ||
        !itineraryData.arrivalCity ||
        isNaN(itineraryData.vehiculeId) ||
        isNaN(itineraryData.duration) ||
        isNaN(itineraryData.price) ||
        isNaN(itineraryData.places);

    if (hasEmpty) {
        return {
            error: true,
            message: "Veuillez bien remplir le formulaire",
        };
    }
    console.log(itineraryData);
    return await addItinerary(itineraryData);


};

export default function ItineraryAddForm() {

    const { error, result: vehicles = [], message } = useLoaderData();
    const [selectedVehicle, setSelectedVehicle] = useState({
        id: "",
        seats_available: 1,
    });
    const actionData = useActionData();
    const { state } = useNavigation();
    const disabled = state === "submitting";



    if (error) {
        return (
            <div className="p-8 text-center text-red-600 font-bold">
                Erreur : {message ?? "Une erreur est survenue"}
            </div>
        );
    }

    const handleVehicleChange = (e) => {
        const veh = vehicles.find((v) => v.id === Number(e.target.value));
        setSelectedVehicle(veh || { id: "", seats_available: 1 });
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Ajouter un Itinéraire
            </h1>
            {actionData && (
                <div
                    className={`mb-4 p-3 rounded ${actionData.error
                        ? "text-red-600 bg-red-100"
                        : "text-green-400 bg-green-100"
                        }`}
                >
                    {actionData.message}
                </div>
            )
            }

            <Form
                method="post"
                className="space-y-6 max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"
            >
                {/* Sélection du véhicule */}
                <div>

                    <label
                        htmlFor="vehiculeId"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Vehicule utilisé
                    </label>
                    <select
                        id="vehiculeId"
                        name="vehiculeId"
                        required
                        value={selectedVehicle.id}
                        onChange={handleVehicleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="" disabled>
                            -- Sélectionnez une plaque --
                        </option>
                        {vehicles.map((v) => (
                            <option key={v.id} value={v.id}>
                                {v.licence_plate}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Durée (minutes) */}
                <div>
                    <label
                        htmlFor="duration"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Durée (minutes)
                    </label>
                    <input
                        type="number"
                        id="duration"
                        name="duration"
                        required
                        min={1}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                {/* Prix avec signe euro */}
                <div className="relative">
                    <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Prix
                    </label>
                    <div className="mt-1">
                        <input
                            type="number"
                            id="price"
                            name="price"
                            required
                            step="0.01"
                            min="0"
                            className="block w-full pr-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                            €
                        </span>
                    </div>
                </div>

                {/* Date et heure */}
                <div>
                    <label
                        htmlFor="datetime"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Date et Heure
                    </label>
                    <input
                        type="datetime-local"
                        id="datetime"
                        name="datetime"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                {/* Nombre de places proposées */}
                <div>
                    <label
                        htmlFor="places"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Nombre de places proposées
                    </label>
                    <input
                        type="number"
                        id="places"
                        name="places"
                        required
                        min={1}
                        max={selectedVehicle.seats_available}
                        defaultValue={1}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Maximum possible : {selectedVehicle.seats_available} place
                        {selectedVehicle.seats_available > 1 ? "s" : ""}
                    </p>
                </div>

                {/* Ville de Départ */}
                <div>
                    <label
                        htmlFor="departureCity"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Ville de Départ
                    </label>
                    <input
                        type="text"
                        id="departureCity"
                        name="departureCity"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                {/* Ville d'Arrivée */}
                <div>
                    <label
                        htmlFor="arrivalCity"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Ville d'Arrivée
                    </label>
                    <input
                        type="text"
                        id="arrivalCity"
                        name="arrivalCity"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-my-B hover:bg-my-D focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:opacity-70"
                    disabled={disabled}
                >
                    {disabled ? 'patientez...' : 'Ajouter l’itinéraire'}
                </button>
            </Form>
        </div >
    );
}
