// src/pages/Itineraries.jsx
import {
    useLoaderData,
    useSearchParams,
    redirect
} from "react-router";
import Itinerary from "../components/Itinerary";
import { getItinerariesDataFromSessionStorage } from "../utils/loaders";

export async function loader() {
    const { error, message, list, itinerary } = getItinerariesDataFromSessionStorage();

    if (error) {
        return redirect(message);
    }

    return { list, itinerary };
}

export default function Itineraries() {
    const { list, itinerary } = useLoaderData();
    const [searchParams] = useSearchParams();
    const error = searchParams.get("error");
    const success = searchParams.get("success");
    const { departureCity, arrivalCity } = itinerary;

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4">
            {/* Alertes */}
            {error && (
                <div className="max-w-3xl mx-auto mb-6 bg-red-50 border-l-4 border-red-400 text-red-700 p-4">
                    <p>{error}</p>
                </div>
            )}
            {success && (
                <div className="max-w-3xl mx-auto mb-6 bg-green-50 border-l-4 border-green-400 text-green-700 p-4">
                    <p>{success}</p>
                </div>
            )}

            {/* En-tête */}
            <header className="max-w-3xl mx-auto text-center space-y-2 mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900">
                    {departureCity} → {arrivalCity}
                </h1>
                <p className="text-lg text-gray-700">
                    Choisissez votre itinéraire parmi les options ci-dessous
                </p>
            </header>

            {/* Grille d’itinéraires */}
            <section className="max-w-6xl mx-auto">
                <div className="grid justify-center gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {list.map((itin) => (
                        <Itinerary key={itin.id} itinerary={itin} />
                    ))}
                </div>
            </section>
        </main>
    );
}
