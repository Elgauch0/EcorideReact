import { Form, redirect, useActionData, useNavigation } from "react-router";
import { ValidateDate, cleanSimpleText } from "../utils/functions";
import { searchItineraries } from "../utils/actions";
import { useEffect } from "react";



export async function action({ request }) {
    const formData = await request.formData();
    const depart = cleanSimpleText(formData.get('depart'));
    const destination = cleanSimpleText(formData.get('destination'));
    const date = ValidateDate(formData.get('date'));
    if (!depart || !destination || !date) {
        return { error: true, message: "champs invalides / date non disponible " };
    }
    const requestBody = {
        depart: depart,
        destination: destination,
        date: date
    };
    const res = await searchItineraries(requestBody);
    if (res.error) {
        return res;
    }
    if (res.data.length === 0) {
        return {
            error: true,
            message: "Désolé, aucun itinéraire trouvé pour ces critères de recherche. Essayez d'autres options."
        };
    }
    console.log('action', res);
    sessionStorage.setItem('itineraries', JSON.stringify(res));

    // return redirect('/itineraries');


}

const CarpoolingForm = () => {
    const res = useActionData();
    const { state } = useNavigation();
    const isSubmitting = state === 'submitting';

    useEffect(() => {
        sessionStorage.removeItem("itineraries");
    }, []);






    return (
        <div className="flex justify-center items-center py-8 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
            <Form
                method="post"

                className="bg-my-D p-8 rounded-lg shadow-lg max-w-md w-full space-y-6"
                aria-labelledby="form-title"
            >
                <h2 id="form-title" className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Trouver un Trajet
                </h2>
                {res?.error && <h3
                    className="text-red-600 font-semibold mt-4 text-center"
                    role="alert"
                    aria-live="assertive"
                >{res.message} </h3>}

                {/* Champ Départ */}
                <div>
                    <label htmlFor="depart" className="block text-sm font-medium text-gray-700 mb-1">
                        Lieu de Départ :
                    </label>
                    <input
                        type="text"
                        id="depart"
                        name="depart"
                        placeholder="Ex: Paris"
                        aria-required="true"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                {/* Champ Destination */}
                <div>
                    <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                        Destination :
                    </label>
                    <input
                        type="text"
                        id="destination"
                        name="destination"
                        placeholder="Ex: Lyon"
                        aria-required="true"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                {/* Champ Date */}
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                        Date du Trajet :
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        aria-required="true"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                {/* Bouton de Soumission */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-my-B hover:bg-my-A focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
                >
                    {isSubmitting ? 'Recherche en cours...' : 'Chercher un trajet'}
                </button>
            </Form>


        </div>
    );
}

export default CarpoolingForm