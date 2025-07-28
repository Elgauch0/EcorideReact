// src/components/Itinerary.jsx
import React from 'react';

export default function Itinerary({ itinerary }) {
    return (
        <div
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl
                 transition-shadow duration-300 transform hover:-translate-y-1"
        >
            {/* Villes */}
            <h3 className="text-xl font-bold text-gray-900 mb-3">
                {itinerary.departureCity} &rarr; {itinerary.arrivalCity}
            </h3>

            {/* Détails principaux */}
            <div className="space-y-2 text-gray-700">
                <p>
                    <span className="font-semibold text-blue-700">Date:</span>{' '}
                    {itinerary.datetime}
                </p>
                <p>
                    <span className="font-semibold text-blue-700">Prix:</span>{' '}
                    {itinerary.price}€
                </p>
                <p>
                    <span className="font-semibold text-blue-700">
                        Places disponibles:
                    </span>{' '}
                    {itinerary.places}
                </p>
                {itinerary.duration && (
                    <p>
                        <span className="font-semibold text-blue-700">Durée:</span>{' '}
                        {itinerary.duration} min
                    </p>
                )}
            </div>

            {/* Détails véhicule */}
            {itinerary.vehicule && (
                <div className="text-sm text-gray-600 border-t pt-3 mt-4">
                    <p className="font-semibold mb-1">Détails du véhicule:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>ID: {itinerary.vehicule.id}</li>
                        <li>
                            Fumeur autorisé:{' '}
                            {itinerary.vehicule.isSmocking_alowed ? 'Oui' : 'Non'}
                        </li>
                        <li>
                            Animaux autorisés:{' '}
                            {itinerary.vehicule.isPets_alowed ? 'Oui' : 'Non'}
                        </li>
                        <li>
                            Écologique (vert): {itinerary.vehicule.isGreen ? 'Oui' : 'Non'}
                        </li>
                        {itinerary.vehicule.driver && (
                            <li>
                                Conducteur:{' '}
                                {itinerary.vehicule.driver.firstName}{' '}
                                {itinerary.vehicule.driver.lastName}
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
