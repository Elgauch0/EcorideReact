import { useState } from "react";
import { useLocation, Form, redirect } from "react-router";
import { useAuthStore } from "../store/AuthStore";
import { addAvis } from "../utils/actions";
import { cleanSimpleText } from "../utils/functions";






export const action = async ({ request }) => {
    const { isLogged, token } = useAuthStore.getState();
    if (!isLogged) {
        throw redirect('/connexion?error= vous devez etre connecté pour laissez un avis')
    }


    const formData = await request.formData();
    const id_itinerary = Number(formData.get("id_itinerary"));
    const content = cleanSimpleText(formData.get('content'));
    const isArrived = formData.get('isArrived') === "on";
    const isApproved = formData.get('isApproved') === "on";
    const note = Number(formData.get('note'));

    const response = await addAvis({ id_itinerary, content, isArrived, note, isApproved }, token);

    throw redirect(`/reservations?error=${response.error}&message=${response.message}`)
}



const AvisComponent = () => {
    const { state } = useLocation();
    const {
        departureCity,
        arrivalCity,
        datetime,
        id: itineraryId
    } = state;

    // Formatage FR pour date et heure
    const dateObj = new Date(datetime);
    const formattedDate = dateObj.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
    const formattedTime = dateObj.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit"
    });


    const [note, setNote] = useState(3);

    return (
        <section className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Donne ton avis sur le trajet
            </h2>

            <div className="mb-6 text-gray-600">
                <p>
                    Itinéraire :{" "}
                    <span className="font-medium">
                        {departureCity} → {arrivalCity}
                    </span>
                </p>
                <p>
                    Date & heure :{" "}
                    <span className="font-medium">
                        {formattedDate} à {formattedTime}
                    </span>
                </p>
            </div>

            <Form method="post" className="space-y-6">
                {/* Avis texte */}
                <div>
                    <label
                        htmlFor="content"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Ton avis
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        maxLength={255}
                        rows={4}
                        placeholder="Laisse ton avis ici..."
                        className="block w-full p-3 border border-gray-300 rounded-md resize-none placeholder-gray-400
                       focus:outline-none focus:border-my-B focus:ring-2 focus:ring-my-B"
                    />
                </div>

                {/* Note slider */}
                <div>
                    <label
                        htmlFor="note"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Note : <span className="font-semibold">{note}</span>/5
                    </label>
                    <input
                        type="range"
                        id="note"
                        name="note"
                        min="1"
                        max="5"
                        step="1"
                        value={note}
                        onChange={(e) => setNote(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                       accent-my-B focus:outline-none focus:ring-2 focus:ring-my-B"
                    />
                </div>

                {/* Checkbox d’approbation */}
                {/* Checkbox d’approbation */}
                <div className="space-y-4">
                    {/* Checkbox arrivé */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="isArrived"
                            name="isArrived"
                            defaultChecked
                            className="h-4 w-4 text-my-B border-gray-300 rounded focus:ring-my-B focus:ring-2"
                        />
                        <label
                            htmlFor="isArrived"
                            className="ml-2 text-sm font-medium text-gray-700"
                        >
                            arrivé :D
                        </label>
                    </div>

                    {/* Checkbox tout s'est bien passé */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="isApproved"
                            name="isApproved"
                            defaultChecked
                            className="h-4 w-4 text-my-B border-gray-300 rounded focus:ring-my-B focus:ring-2"
                        />
                        <label
                            htmlFor="isApproved"
                            className="ml-2 text-sm font-medium text-gray-700"
                        >
                            tout s'est bien passé ?
                        </label>
                    </div>
                </div>


                {/* Champ caché */}
                <input type="hidden" name="id_itinerary" value={itineraryId} />

                {/* Bouton d’envoi */}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-my-B text-white font-semibold rounded-md
                     hover:bg-my-B-dark focus:outline-none focus:ring-2 focus:ring-my-B"
                >
                    Envoyer mon avis
                </button>
            </Form>
        </section>
    );
};

export default AvisComponent;
