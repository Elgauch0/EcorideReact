// src/pages/Itineraries.jsx
import Itinerary from '../components/Itinerary';
import { useLoaderData } from "react-router"


export function loader() {
    const raw = sessionStorage.getItem('itineraries');
    if (!raw) {
        throw new Error('no data in the sessionStorage');
    }
    let items;
    try {
        items = JSON.parse(raw);
    } catch (err) {
        console.error('Impossible de parser les itinéraires :', err);
    }
    return items;
}


export default function Itineraries() {

    const Data = useLoaderData();
    const list = Data.data;


    if (list.length === 0) {
        return <p>Aucun itinéraire disponible.</p>;
    }

    return (
        <div className="container mx-auto grid gap-4
                    sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {list.map((itin) => (
                <Itinerary key={itin.id} itinerary={itin} />
            ))}
        </div>
    );
}
