import { useState } from "react";
import {
    Form,
    useLoaderData,
    useActionData,
    useNavigation,
    Link,
} from "react-router-dom";
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
            message: "Veuillez bien remplir tous les champs du formulaire",
        };
    }

    return await addItinerary(itineraryData);
};

export default function ItineraryAddForm() {
    const { error, result: vehicles = [], message } = useLoaderData();
    const actionData = useActionData();
    const { state } = useNavigation();
    const submitting = state === "submitting";

    const [selectedVehicle, setSelectedVehicle] = useState({
        id: "",
        seats_available: 1,
    });

    const handleVehicleChange = (e) => {
        const veh = vehicles.find((v) => v.id === Number(e.target.value));
        setSelectedVehicle(veh || { id: "", seats_available: 1 });
    };

    if (error) {
        return (
            <div className="p-8 text-center text-red-600 font-bold">
                Erreur : {message ?? "Une erreur est survenue"}
            </div>
        );
    }

    return (
        <section className="p-8 max-w-xl mx-auto">
            {/* Lien de retour */}
            <Link
                to="../itineraires"
                className="inline-flex items-center text-my-A font-medium mb-4 hover:underline"
            >
                <span className="mr-2 text-2xl leading-none">←</span>
                Revenir à mes itinéraires
            </Link>

            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Ajouter un itinéraire
            </h1>

            {actionData && (
                <div
                    className={`mb-6 p-4 rounded ${actionData.error
                        ? "text-red-700 bg-red-100"
                        : "text-green-700 bg-green-100"
                        }`}
                >
                    {actionData.message}
                </div>
            )}

            <Form
                method="post"
                className="space-y-6 bg-white p-6 rounded-lg shadow"
            >
                {/* Sélection du véhicule */}
                <div>
                    <label
                        htmlFor="vehiculeId"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Véhicule utilisé
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

                {/* Durée */}
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

                {/* Prix */}
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
                        Date et heure
                    </label>
                    <input
                        type="datetime-local"
                        id="datetime"
                        name="datetime"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                {/* Places disponibles */}
                <div>
                    <label
                        htmlFor="places"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Places proposées
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
                    <p className="mt-1 text-xs text-gray-500">
                        Maximum possible : {selectedVehicle.seats_available} place
                        {selectedVehicle.seats_available > 1 ? "s" : ""}
                    </p>
                </div>

                {/* Ville de départ */}
                <div>
                    <label
                        htmlFor="departureCity"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Ville de départ
                    </label>
                    <input
                        type="text"
                        id="departureCity"
                        name="departureCity"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                {/* Ville d’arrivée */}
                <div>
                    <label
                        htmlFor="arrivalCity"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Ville d'arrivée
                    </label>
                    <input
                        type="text"
                        id="arrivalCity"
                        name="arrivalCity"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                {/* Bouton d’envoi */}
                <div className="text-right">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center px-5 py-2 bg-my-B text-white rounded-md shadow hover:bg-my-D focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        {submitting ? "Patientez..." : "Ajouter l’itinéraire"}
                    </button>
                </div>
            </Form>
        </section>
    );
}
