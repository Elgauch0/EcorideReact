import {
    Form,
    useActionData,
    useNavigation,
    redirect,
    useSearchParams,
} from "react-router";
import { useEffect } from "react";
import { ValidateDate, cleanSimpleText } from "../utils/functions";
import { searchItineraries } from "../utils/actions";

export async function action({ request }) {
    const formData = await request.formData();
    const depart = cleanSimpleText(formData.get("depart"));
    const destination = cleanSimpleText(formData.get("destination"));
    const date = ValidateDate(formData.get("date"));

    if (!depart || !destination || !date) {
        return { error: true, message: "Champs invalides ou date non disponible" };
    }

    const res = await searchItineraries({ depart, destination, date });

    if (res.error) {
        return { error: true, message: res.message };
    }

    if (res.data.length === 0) {
        return {
            error: true,
            message:
                "Désolé, aucun itinéraire trouvé pour ces critères. Essayez d'autres options.",
        };
    }

    sessionStorage.setItem("itineraries", JSON.stringify(res.data));
    sessionStorage.setItem('itinerary', JSON.stringify({ departureCity: depart, arrivalCity: destination }));
    return redirect("/itineraries");
}

const CarpoolingForm = () => {
    const result = useActionData();
    const { state } = useNavigation();
    const isSubmitting = state === "submitting";
    const [searchParams] = useSearchParams();
    const urlError = searchParams.get("error");

    useEffect(() => {
        sessionStorage.removeItem("itineraries");
        sessionStorage.removeItem("itinerary");
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-6">
                {/* Titres principaux */}
                <h1 className="text-3xl font-extrabold text-gray-800 text-center">
                    Voyagez avec EcoRide
                </h1>
                <h1 className="text-2xl font-bold text-gray-700 text-center">
                    Trouver un itinéraire
                </h1>
                <h2 className="text-sm text-gray-600 text-center">
                    Pour prendre soin de l&apos;environnement
                </h2>

                {/* Erreur centrée */}
                {(urlError || result?.error) && (
                    <div
                        role="alert"
                        className="p-4 bg-red-100 border border-red-400 text-red-700 rounded text-center"
                    >
                        {urlError || result.message}
                    </div>
                )}

                <Form method="post" className="space-y-4" aria-labelledby="form-title">
                    <div>
                        <label
                            htmlFor="depart"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Lieu de Départ
                        </label>
                        <input
                            type="text"
                            id="depart"
                            name="depart"
                            placeholder="Ex : Paris"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="destination"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Destination
                        </label>
                        <input
                            type="text"
                            id="destination"
                            name="destination"
                            placeholder="Ex : Lyon"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="date"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Date du Trajet
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center py-2 px-4 bg-my-B hover:bg-my-D
                       text-white font-semibold rounded-md shadow-sm transition ease-in-out duration-150
                       disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Recherche en cours..." : "Chercher un trajet"}
                    </button>
                </Form>
            </div>
        </div>
    );
};

export default CarpoolingForm;
