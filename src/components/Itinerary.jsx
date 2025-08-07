// src/components/Itinerary.jsx


export default function Itinerary({ itinerary, onReserve }) {
    const { datetime, price, places, duration, vehicule, id } = itinerary;
    const dateStr = new Date(datetime).toLocaleString("fr-FR", {
        weekday: "short",
        day: "numeric",
        month: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="flex flex-col justify-between bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 max-w-sm">
            {/* Date / Heure */}
            <div className="mb-4">
                <span className="inline-block text-gray-500 text-sm">{dateStr}</span>
            </div>

            {/* Détails principaux */}
            <div className="space-y-3 text-gray-700 text-sm">
                <div className="flex items-center">
                    <span className="mr-2">💶</span>
                    <span className="font-medium">{price} €</span>
                </div>
                <div className="flex items-center">
                    <span className="mr-2">🪑</span>
                    <span className="font-medium">{places} places</span>
                </div>
                {duration && (
                    <div className="flex items-center">
                        <span className="mr-2">⏱️</span>
                        <span className="font-medium">{duration} min</span>
                    </div>
                )}
            </div>

            {/* Véhicule */}
            {vehicule && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-6 text-gray-700 text-sm">
                    <h4 className="font-semibold mb-2">🚗 Véhicule</h4>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Écologique : {vehicule.isGreen ? "Oui" : "Non"}</li>
                        {vehicule.driver && (
                            <li>
                                Conducteur : {vehicule.driver.firstName}
                                {vehicule.driver.lastName}
                            </li>
                        )}
                    </ul>
                </div>
            )}

            {/* Bouton de réservation */}
            {onReserve && (
                <button
                    onClick={() => onReserve(id)}
                    className="mt-6 w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                >
                    Réserver
                </button>
            )}
        </div>
    );
}
