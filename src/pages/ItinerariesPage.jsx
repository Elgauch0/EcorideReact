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

    const [itineraries, setItineraries] = useState(list);
    const [inputFilter, setInputFilter] = useState({ prixMax: "", dureeMax: "", noteMin: "" });


    const filteredList = itineraries
        .filter(itinerary =>
            inputFilter.prixMax === "" || itinerary.price <= Number(inputFilter.prixMax)
        )
        .filter(itinerary =>
            inputFilter.dureeMax === "" || itinerary.duration <= Number(inputFilter.dureeMax)
        )
        .filter(itinerary =>
            inputFilter.noteMin === "" ||
            (
                itinerary.vehicule.driver.averageRating !== null &&
                itinerary.vehicule.driver.averageRating >= Number(inputFilter.noteMin)
            )
        );

    function hundleInput(e) {
        const { name, value } = e.target;
        setInputFilter(prev => ({
            ...prev,
            [name]: value
        }))
    }



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
                        name="prixMax"
                        value={inputFilter.prixMax}
                        onChange={hundleInput}
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
                        name="dureeMax"
                        value={inputFilter.dureeMax}
                        onChange={hundleInput}
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
                        name="noteMin"
                        value={inputFilter.noteMin}
                        onChange={hundleInput}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        placeholder="ex: 4.5"
                        min="0"
                        max="5"
                        step="0.1"
                    />
                </div>

                <button onClick={() => setItineraries(prev => prev.filter(itinerary => itinerary.vehicule.isGreen))}>
                    Véhicule Vert</button>
                <button onClick={() => setItineraries(list)}>
                    Clear</button>
            </section>

            {/* Grille d’itinéraires */}
            <section className="max-w-6xl mx-auto">
                {itineraries.length === 0 ? (
                    <p className="text-center text-gray-500">
                        Aucun itinéraire ne correspond à vos filtres.
                    </p>
                ) : (
                    <>
                        <h1>{filteredList.length} trajet{filteredList.length > 1 ? "s" : ""} trouvé{filteredList.length > 1 ? "s" : ""}</h1>
                        <div className="grid justify-center gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {filteredList.map((itin) => (
                                <Itinerary key={itin.id} itinerary={itin} />
                            ))}
                        </div>
                    </>
                )}
            </section>
        </main>
    );
}
