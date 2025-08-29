import { Link, useLoaderData, useSearchParams, Navigate, redirect } from "react-router";
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

// Helpers de format améliorés
const formatDate = iso =>
    new Date(iso).toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

const formatShortDate = iso =>
    new Date(iso).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

const formatTime = iso =>
    new Date(iso).toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
    });

// Fonction pour obtenir le statut de la réservation
const getReservationStatus = (itinerary) => {
    if (itinerary.isCancelled) return { text: "Annulée", class: "bg-red-100 text-red-800" };
    if (itinerary.isFinished) return { text: "Terminé", class: "bg-green-100 text-green-800" };
    return { text: "À venir", class: "bg-blue-100 text-blue-800" };
};

export default function Reservations() {
    const { error, message, data: reservations, userID } = useLoaderData();
    const [searchParams] = useSearchParams();
    const responseError = searchParams.get("error");
    const responseMessage = searchParams.get("message");

    // Si l'utilisateur n'est pas authentifié, on redirige vers la page de connexion
    if (error) {
        return (
            <Navigate
                to={`/connexion?error=${encodeURIComponent(message)}`}
                replace
            />
        );
    }

    // Affichage d'une notification après soumission d'avis
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
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Mes réservations</h1>

            {hasResponse && (
                <div
                    className={`text-lg font-medium mb-6 p-4 rounded-lg ${isError
                        ? "text-red-700 bg-red-50 border border-red-200"
                        : "text-green-700 bg-green-50 border border-green-200"
                        }`}
                >
                    {responseMessage}
                </div>
            )}

            <div className="space-y-6">
                {reservations.map(reservation => {
                    const { dateReservation, itinerary, seatsReserved } = reservation;
                    const isCancelled = itinerary.isCancelled;
                    const isFinished = itinerary.isFinished;
                    const isCommented = !!itinerary.comments?.some(c => c.user?.id === userID);
                    const status = getReservationStatus(itinerary);

                    // On bloque le lien si annulé, pas terminé ou déjà commenté
                    const linkDisabled = isCancelled || !isFinished || isCommented;
                    const linkTo = linkDisabled ? "#" : "/avis";

                    // Texte en fonction de l'état
                    let actionLabel;
                    if (isCommented) actionLabel = "✓ Avis déjà donné";
                    else if (isCancelled) actionLabel = "Voyage annulé";
                    else if (!isFinished) actionLabel = "Voyage à venir";
                    else actionLabel = "Donner un avis";

                    // Classes Tailwind pour le bouton d'action
                    const linkClasses = linkDisabled
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed pointer-events-none border border-gray-200"
                        : "bg-blue-600 text-white hover:bg-blue-700 border border-blue-600";

                    return (
                        <div
                            key={itinerary.id}
                            className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                        >
                            {/* En-tête avec date de réservation */}
                            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm text-gray-600">
                                        <span className="font-medium">Réservé le :</span> {formatShortDate(dateReservation)}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.class}`}>
                                            {status.text}
                                        </span>
                                        <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                                            {seatsReserved} place{seatsReserved > 1 ? "s" : ""}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Corps principal avec détails du voyage */}
                            <div className="p-6">
                                {/* Date et heure du voyage */}
                                <div className="mb-4">
                                    <div className="text-lg font-bold text-gray-900 mb-1">
                                        📅 {formatDate(itinerary.datetime)}
                                    </div>
                                    <div className="text-md text-gray-600">
                                        🕘 Départ à {formatTime(itinerary.datetime)}
                                    </div>
                                </div>

                                {/* Itinéraire */}
                                <div className="mb-6">
                                    <div className="flex items-center justify-center text-xl font-bold text-gray-800 bg-gray-50 py-3 rounded-lg">
                                        <span className="text-blue-600">{itinerary.departureCity}</span>
                                        <span className="mx-4 text-gray-400">→</span>
                                        <span className="text-green-600">{itinerary.arrivalCity}</span>
                                    </div>
                                </div>

                                {/* Commentaires existants */}
                                {itinerary.comments?.length > 0 && (
                                    <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                        <div className="text-sm font-medium text-yellow-800 mb-1">
                                            💬 {itinerary.comments.length} commentaire{itinerary.comments.length > 1 ? "s" : ""} sur ce trajet
                                        </div>
                                    </div>
                                )}

                                {/* Bouton d'action */}
                                <div className="flex justify-end">
                                    <Link
                                        to={linkTo}
                                        state={itinerary}
                                        className={`inline-flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${linkClasses}`}
                                    >
                                        {actionLabel}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}