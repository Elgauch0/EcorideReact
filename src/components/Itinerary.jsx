// src/components/Itinerary.jsx
import { Link } from 'react-router'

export default function Itinerary({ itinerary }) {
    const { id, datetime, price, places, duration, vehicule } = itinerary






    const dateStr = new Date(datetime).toLocaleString('fr-FR', {
        weekday: 'short',
        day: 'numeric',
        month: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })



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
                        <li>Écologique : {vehicule.isGreen ? 'Oui' : 'Non'}</li>
                        {vehicule.driver && (
                            <>
                                <li>
                                    Conducteur : {vehicule.driver.firstName}{' '}
                                    {vehicule.driver.lastName}
                                </li>
                                <li>
                                    note  : {vehicule.driver.averageRating ? vehicule.driver.averageRating + '/5' : 'pas disponible'}
                                </li>
                            </>

                        )}
                    </ul>
                </div>
            )}

            {/* Actions */}
            <div className="mt-6 flex flex-col md:flex-row gap-3">

                {/* N'affiche Détails que quand on n'est PAS en mode réservation */}

                <Link
                    to="/detail"
                    state={{ datetime, price, places, duration, vehicule, id }}
                    className="flex-1 text-center py-2 bg-my-B text-white font-semibold rounded-lg hover:bg-my-D transition"
                >
                    Voir en Detail et reserver
                </Link>



            </div>
        </div >
    )
}
