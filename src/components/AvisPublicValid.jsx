import { useEffect, useState } from "react";
import { getAvisPublicUSers } from "../utils/loaders";
import { Link } from "react-router";

const AvisPublicValide = () => {
    const [avis, setAvis] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function useEffectAwait() {
            setLoading(true);
            const response = await getAvisPublicUSers();
            response.error ? setAvis([]) : setAvis(response.data);
            setLoading(false);
        }
        useEffectAwait();
    }, []);

    if (loading) {
        return (
            <p className="text-center text-gray-500 animate-pulse mt-6">
                Chargement des avis...
            </p>
        );
    }

    if (avis.length === 0) {
        return (
            <p className="text-center text-gray-400 italic mt-6">
                Pas de commentaire pour le moment.
            </p>
        );
    }

    return (
        <section className="max-w-2xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                Avis des utilisateurs
            </h2>
            <ul className="space-y-4">
                {avis.map((item, index) => (
                    <li
                        key={index}
                        className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                        <strong className="text-indigo-600">{item.nickname}</strong>
                        <p className="text-gray-700 mt-1">{item.review}</p>
                    </li>
                ))}
            </ul>
            <Link to="publicavis">
                laissez nous un avis
            </Link>
        </section>
    );
};

export default AvisPublicValide;

