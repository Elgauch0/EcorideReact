import { useLoaderData, redirect } from "react-router-dom";
import { useState } from "react";
import { checkAuthorization } from "../utils/functions";
import { getAvisPublicAdmin } from "../utils/loaders";
import { hundleDeleteAvisPublic, hundleValidateAvisPublic } from "../utils/actions";

export const loader = async () => {
    const { error, message, token } = checkAuthorization();
    if (error) {
        throw redirect(message);
    }
    const response = await getAvisPublicAdmin(token);
    return { ...response, token };
};

const EmployepublicAvis = () => {
    const { data: initialData, token, error } = useLoaderData();
    const [avisList, setAvisList] = useState(initialData || []);
    const [feedback, setFeedback] = useState(null);
    const [loadingId, setLoadingId] = useState(null);

    const handleValidate = async (id) => {
        setLoadingId(id);
        const response = await hundleValidateAvisPublic(id, token);
        setFeedback({ error: response.error, message: response.message });

        if (!response.error) {
            setAvisList((prev) =>
                prev.map((avis) => (avis.id === id ? { ...avis, isValid: true } : avis))
            );
        }
        setLoadingId(null);
    };

    const handleDelete = async (id) => {
        setLoadingId(id);
        const response = await hundleDeleteAvisPublic(id, token);
        setFeedback({ error: response.error, message: response.message });

        if (!response.error) {
            setAvisList((prev) => prev.filter((avis) => avis.id !== id));
        }
        setLoadingId(null);
    };

    if (error) {
        return (
            <div className="max-w-3xl mx-auto p-6 text-center text-red-600 font-semibold">
                Erreur inconnue
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Liste des avis publics</h2>

            {/* Message d'erreur ou succès */}
            {feedback && (
                <div
                    className={`mb-4 p-3 rounded ${feedback.error
                        ? "bg-red-100 text-red-700 border border-red-300"
                        : "bg-green-100 text-green-700 border border-green-300"
                        }`}
                >
                    {feedback.message}
                </div>
            )}

            {avisList.length === 0 && (
                <p className="text-gray-500">Aucun avis trouvé.</p>
            )}

            {avisList.map((avis) => (
                <div
                    key={avis.id}
                    className="bg-white shadow rounded-lg p-4 mb-4 border border-gray-200"
                >
                    <p className="font-semibold text-lg">{avis.nickname}</p>
                    <p className="text-gray-700">{avis.review}</p>
                    <p
                        className={`mt-2 text-sm font-medium ${avis.isValid ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        {avis.isValid ? "Validé" : "Non validé"}
                    </p>

                    <div className="mt-4 flex gap-3">
                        <button
                            onClick={() => handleValidate(avis.id)}
                            disabled={avis.isValid || loadingId === avis.id}
                            className={`px-4 py-2 rounded text-white ${avis.isValid
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-600"
                                }`}
                        >
                            {loadingId === avis.id && !avis.isValid ? "En cours..." : "Valider"}
                        </button>
                        <button
                            onClick={() => handleDelete(avis.id)}
                            disabled={loadingId === avis.id}
                            className="px-4 py-2 rounded text-white bg-red-500 hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loadingId === avis.id ? "En cours..." : "Supprimer"}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EmployepublicAvis;

