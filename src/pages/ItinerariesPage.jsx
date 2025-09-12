// src/pages/Itineraries.jsx
import {
    useLoaderData,
    useSearchParams,
    redirect
} from "react-router";
import { useState } from "react";
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

    // Filtres
    const [prixMax, setPrixMax] = useState("");
    const [dureeMax, setDureeMax] = useState("");
    const [noteMin, setNoteMin] = useState("");
    const [greenOnly, setGreenOnly] = useState(false);

    const filteredList = list.filter(itin => {
        // Prix
        const prixOk =
            prixMax === "" || Number(itin.price) <= Number(prixMax);

        // Durée
        const dureeOk =
            dureeMax === "" || Number(itin.duration) <= Number(dureeMax);

        // Note min : parse la saisie et exclut les notes null/undefined
        const parsedNoteMin =
            noteMin === ""
                ? -Infinity
                : Number(String(noteMin).replace(",", "."));

        const noteValue = itin.vehicule?.driver?.averageRating;
        const noteOk =
            noteMin === "" ||
            (noteValue != null && Number(noteValue) >= parsedNoteMin);

        // Véhicule vert
        const greenOk =
            !greenOnly || itin.vehicule?.isGreen === true;

        // On garde seulement si TOUT est OK
        return prixOk && dureeOk && noteOk && greenOk;
    });





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
            <header className="max-w-3xl mx-auto text-center space-y-2 mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900">
                    {departureCity} → {arrivalCity}
                </h1>
                <p className="text-lg text-gray-700">
                    Choisissez votre itinéraire parmi les options ci-dessous
                </p>
            </header>

            {/* Filtres */}
            <section className="max-w-3xl mx-auto mb-10 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Prix max (€)
                    </label>
                    <input
                        type="number"
                        value={prixMax}
                        onChange={e => setPrixMax(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        placeholder="ex: 30"
                        min="0"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Durée max (min)
                    </label>
                    <input
                        type="number"
                        value={dureeMax}
                        onChange={e => setDureeMax(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        placeholder="ex: 120"
                        min="0"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Note min
                    </label>
                    <input
                        type="number"
                        value={noteMin}
                        onChange={e => {
                            // autoriser la saisie vide et les décimales avec virgule
                            const raw = e.target.value;
                            setNoteMin(raw);
                        }}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        placeholder="ex: 4.5"
                        min="0"
                        max="5"
                        step="0.1"
                        inputMode="decimal"
                    />
                </div>

                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                    <input
                        type="checkbox"
                        checked={greenOnly}
                        onChange={e => setGreenOnly(e.target.checked)}
                        className="h-4 w-4"
                    />
                    Véhicule vert uniquement
                </label>
            </section>

            {/* Grille d’itinéraires */}
            <section className="max-w-6xl mx-auto">
                {filteredList.length === 0 ? (
                    <p className="text-center text-gray-500">
                        Aucun itinéraire ne correspond à vos filtres.
                    </p>
                ) : (
                    <div className="grid justify-center gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {filteredList.map((itin) => (
                            <Itinerary key={itin.id} itinerary={itin} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
