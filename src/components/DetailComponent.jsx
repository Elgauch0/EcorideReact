// src/components/DetailComponent.jsx
import {
    Form,
    useLoaderData,
    useNavigate,
    redirect,
    useNavigation

} from 'react-router';
import { getItinerariesDataFromSessionStorage } from '../utils/loaders';
import { checkAuthorization } from '../utils/functions';
import { reserveItinerary } from '../utils/actions';



export async function loader() {
    const { error, message, list, itinerary } =
        getItinerariesDataFromSessionStorage()

    if (error) {
        return redirect(message)
    }

    return { list, itinerary }
}


export async function action({ request }) {
    const { error, userID, token } = checkAuthorization();
    if (error) {
        return redirect(
            `/connexion?error=${encodeURIComponent(
                "Vous devez être connecté pour réserver ce trajet"
            )}`
        );
    }
    const formData = await request.formData();
    const seatsRaw = formData.get('seats');
    const itineraryIdRaw = formData.get('itineraryID');

    const seats = seatsRaw && !isNaN(seatsRaw) ? Number(seatsRaw) : null;
    const itineraryId = itineraryIdRaw && !isNaN(itineraryIdRaw) ? Number(itineraryIdRaw) : null;


    const response = await reserveItinerary(itineraryId, userID, seats, token);
    if (response.error) {
        return redirect(`/covoiturage?error=${response.message}`);
    }

    return redirect(`/covoiturage?success=${response.message}`);
}

export default function DetailComponent() {
    const navigate = useNavigate()
    const { list, itinerary } = useLoaderData();
    const { state } = useNavigation();
    const isDisabled = state === "submitting";



    // On prend le premier élément du tableau list
    const trip = list[0]
    const { id, datetime, price, places, duration, vehicule } = trip
    const { departureCity, arrivalCity } = itinerary

    const dateStr = new Date(datetime).toLocaleString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })

    return (
        <div className="max-w-2xl mx-auto my-12 p-6 bg-white rounded-lg shadow-lg">
            {/* Bouton retour */}
            <button
                onClick={() => navigate(-1)}
                className="mb-6 text-sm text-gray-600 hover:text-gray-800"
            >
                ← Retour
            </button>

            {/* Titre avec villes */}
            <h1 className="text-3xl font-bold text-center mb-8">
                {departureCity} → {arrivalCity}
            </h1>
            {/* Feedback après submit
            {actionData && (
                <div className={`p-4 mb-6 rounded ${actionData.error
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}>
                    {actionData.message}
                </div>
            )} */}

            {/* Détails du trajet */}
            <div className="space-y-4 text-gray-700">

                <p>
                    <span className="font-medium">Date & heure :</span> {dateStr}
                </p>
                <p>
                    <span className="font-medium">Prix :</span> {price} €
                </p>
                <p>
                    <span className="font-medium">Places dispo :</span> {places}
                </p>
                {duration != null && (
                    <p>
                        <span className="font-medium">Durée :</span> {duration} min
                    </p>
                )}
                {vehicule && (
                    <>
                        <p>
                            <span className="font-medium">Véhicule écologique :</span>{' '}
                            {vehicule.isGreen ? 'Oui' : 'Non'}
                        </p>
                        {vehicule.driver && (
                            <>
                                <p>
                                    <span className="font-medium">Conducteur :</span>{' '}
                                    {vehicule.driver.firstName} {vehicule.driver.lastName}
                                </p>
                                <p>note : {vehicule.averageRating ? vehicule.averageRating : "aucune note donné encore"}</p>
                            </>
                        )}
                    </>
                )}
            </div>

            {/* Formulaire de réservation */}
            <Form method="post" className="mt-8 flex items-center space-x-4">
                <label htmlFor="seats" className="font-medium text-gray-700">
                    Réserver pour :
                </label>
                <input
                    id="seats"
                    name="seats"
                    type="number"
                    min="1"
                    max={places}
                    defaultValue="1"
                    required
                    className="w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input type="hidden" name="itineraryID" value={id} />
                <button
                    type="submit"
                    className="px-4 py-2 bg-my-B text-white rounded hover:bg-my-D transitiondisabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
                    disabled={isDisabled}
                >
                    {isDisabled ? "reservation en cours..." : "reserver"}
                </button>
            </Form>
        </div>
    )
}
