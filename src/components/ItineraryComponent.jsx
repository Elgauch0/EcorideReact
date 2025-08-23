// ItineraryComponent.jsx


export default function ItineraryComponent({ itineraire, handleItinerary, deleteItinerary }) {

    return (
        <div className="bg-white rounded-lg shadow-md p-8 max-w-xl mx-auto space-y-6">
            <h1 className="text-2xl font-extrabold text-gray-800">
                {itineraire.departureCity} &rarr; {itineraire.arrivalCity}
            </h1>

            <p className="text-gray-600">
                Date & heure :{" "}
                {new Date(itineraire.datetime).toLocaleString("fr-FR", {
                    dateStyle: "full",
                    timeStyle: "short",
                })}
            </p>

            <p className="text-gray-700 font-medium">
                Réservations : {itineraire.reservations.length}
            </p>

            <div className="flex gap-4">
                <button
                    className="flex-1 py-2 px-4 bg-my-B hover:bg-my-C text-white font-semibold rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={itineraire.isFinished || itineraire.isCancelled}
                    onClick={() => handleItinerary(itineraire.id, 'PATCH')}
                >
                    {itineraire.isFinished
                        ? "trajet terminé"
                        : itineraire.isStarted
                            ? "trajet en cours"
                            : "démarrer le trajet"}
                </button>

                <button
                    className="flex-1 py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={itineraire.isFinished || itineraire.isCancelled}
                    onClick={() => handleItinerary(itineraire.id, 'DELETE')}
                >
                    {itineraire.isCancelled ? "trajet annulé" : "annuler le trajet"}
                </button>
            </div>
        </div>
    );
}
