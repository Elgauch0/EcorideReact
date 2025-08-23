// Itineraires.jsx

import { Link, useLoaderData, redirect } from "react-router";
import { getItinerariesDriver } from "../utils/loaders";
import ItineraryComponent from "./ItineraryComponent";
import { checkAuthorization } from "../utils/functions";
import { useState } from "react";
import { handleStatusItinerary } from "../utils/actions";

export const loader = async () => {
    const response = checkAuthorization();
    if (response.error) {
        throw redirect(response.message);
    }
    const token = response.token;
    const itineraries = await getItinerariesDriver(token);
    return { ...itineraries, token };
};

export default function Itineraires() {
    const { error, result: itinerariesData = [], token } = useLoaderData();
    const [itineraries, setItineraries] = useState(itinerariesData);


    if (error) {
        return (
            <div className="p-8 max-w-4xl mx-auto text-center text-red-600 font-bold">
                Une erreur est survenue lors du chargement des itinéraires.
            </div>
        );
    }


    const handleItinerary = async (id, method) => {
        const response = await handleStatusItinerary(id, method, token);
        if (response.error) {
            console.error(response.error);
            throw new Error(response.message);
        }
        const itinerary = response.message
        setItineraries(prevItineraries => prevItineraries.map(it => it.id === itinerary.id ? itinerary : it));


    }




    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-extrabold text-gray-800">Mes itinéraires</h1>
                <Link
                    to="../additinerary"
                    className="py-2 px-4 bg-my-B hover:bg-my-C text-white text-sm font-medium rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    + Publier un itinéraire
                </Link>
            </div>

            {itineraries.length === 0 ? (
                <p className="text-center text-gray-600">Vous n’avez pas encore d’itinéraires.</p>
            ) : (
                <div className="space-y-8">
                    {itineraries.map((it) => (
                        <ItineraryComponent key={it.id} itineraire={it} handleItinerary={handleItinerary} />
                    ))}
                </div>
            )}
        </div>
    );
}
