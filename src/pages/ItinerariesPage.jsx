// src/pages/Itineraries.jsx
import { useLoaderData, redirect } from "react-router";
import Itinerary from "../components/Itinerary";

export function loader() {
    const rawData = sessionStorage.getItem("itineraries");
    const rawCities = sessionStorage.getItem("itinerary");

    if (!rawData || !rawCities) {
        return redirect(
            "/covoiturage?error=Aucun trajet trouvé. Veuillez d'abord effectuer une recherche."
        );
    }

    try {
        const list = JSON.parse(rawData);
        const itinerary = JSON.parse(rawCities);

        if (!Array.isArray(list) || list.length === 0) {
            return redirect(
                "/covoiturage?error=Aucun trajet trouvé. Veuillez d'abord effectuer une recherche."
            );
        }

        return { list, itinerary };
    } catch (err) {
        console.error("Erreur parsing sessionStorage :", err);
        return redirect(
            "/covoiturage?error=Erreur interne. Merci de relancer la recherche."
        );
    }
}

export default function Itineraries() {
    const { list, itinerary } = useLoaderData();
    const { departureCity, arrivalCity } = itinerary;

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4">
            {/* En-tête centré */}
            <header className="max-w-3xl mx-auto text-center space-y-2 mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900">
                    {departureCity} → {arrivalCity}
                </h1>
                <p className="text-lg text-gray-700">
                    Choisissez votre itinéraire parmi les options ci-dessous
                </p>
            </header>

            {/* Grille centrée */}
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
