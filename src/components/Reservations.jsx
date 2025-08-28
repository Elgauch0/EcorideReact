
import { Link, useLoaderData, useSearchParams, Navigate } from "react-router";
import { useAuthStore } from "../store/AuthStore";
import { getReservations } from "../utils/loaders";







export const loader = async () => {
    const { isLogged, token, userID } = useAuthStore.getState();

    if (!isLogged || !token) {
        throw redirect('/connexion?error=vous devez vous connecter')
    }

    const response = await getReservations(token);
    return { ...response, userID }
}
// Helpers de format
const formatDate = iso =>
    new Date(iso).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

const formatTime = iso =>
    new Date(iso).toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
    });

export default function Reservations() {
    const { error, message, data: reservations, userID } = useLoaderData();
    const [searchParams] = useSearchParams();
    const responseError = searchParams.get("error");
    const responseMessage = searchParams.get("message");

    // Si l’utilisateur n’est pas authentifié, on redirige vers la page de connexion
    if (error) {
        return (
            <Navigate
                to={`/connexion?error=${encodeURIComponent(message)}`}
                replace
            />
        );
    }

    // Affichage d’une notification après soumission d’avis
    const hasResponse = responseError !== null;
    const isError = responseError === "true";

    // Pas de réservations
    if (!reservations?.length) {
        return (
            <section className="max-w-xl mx-auto p-6 text-center">
                <h2 className="text-xl font-semibold text-gray-700">
                    Aucune réservation trouvée.
                </h2>
            </section>
        );
    }

    return (
        <section className="max-w-4xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Mes réservations</h1>

            {hasResponse && (
                <h2
                    className={`text-lg font-medium mb-4 p-3 rounded ${isError
                        ? "text-red-600 bg-red-100 border border-red-300"
                        : "text-green-600 bg-green-100 border border-green-300"
                        }`}
                >
                    {responseMessage}
                </h2>
            )}

            <ul className="space-y-4">
                {reservations.map(res => {
                    const { dateReservation, itinerary, seatsReserved } = res;
                    const isCancelled = itinerary.isCancelled;
                    const isFinished = itinerary.isFinished;
                    const isCommented = !!itinerary.comments?.some(c => c.user?.id === userID);

                    // On bloque le lien si annulé, pas terminé ou déjà commenté
                    const linkDisabled = isCancelled || !isFinished || isCommented;
                    const linkTo = linkDisabled ? "#" : "/avis";

                    // Texte en fonction de l’état
                    let label;
                    if (isCommented) label = "Déjà commenté";
                    else if (isCancelled || !isFinished)
                        label = "Annulé ou pas encore terminé";
                    else label = "Valider / laisser une note";

                    // Classes Tailwind pour actif vs désactivé
                    const linkClasses = linkDisabled
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed pointer-events-none"
                        : "bg-my-B text-white hover:bg-my-D";

                    return (
                        <li
                            key={itinerary.id}
                            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <time
                                    dateTime={dateReservation}
                                    className="text-sm text-gray-500"
                                >
                                    {formatDate(dateReservation)}
                                </time>
                                <span className="text-sm font-medium text-indigo-600">
                                    {seatsReserved} place
                                    {seatsReserved > 1 ? "s" : ""}
                                </span>
                            </div>

                            <div className="text-lg font-semibold text-gray-800 mb-1">
                                {itinerary.departureCity} → {itinerary.arrivalCity}
                            </div>

                            <div className="text-sm text-gray-600 mb-4">
                                Départ à {formatTime(itinerary.datetime)}
                            </div>

                            <Link
                                to={linkTo}
                                state={itinerary}
                                className={`inline-block px-4 py-2 rounded font-semibold ${linkClasses}`}
                            >
                                {label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
