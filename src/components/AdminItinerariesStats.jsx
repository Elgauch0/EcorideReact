
import { redirect, useLoaderData } from "react-router-dom";
import { checkAuthorization } from "../utils/functions"
import { getItinerariesData } from "../utils/loaders";



export const loader = async () => {
    const { error, message, token } = checkAuthorization();
    if (error) {
        throw redirect(message);
    }
    return await getItinerariesData(token);
}


const AdminItinerariesStats = () => {
    const data = useLoaderData();

    const maxCount = Math.max(...data.data.map(item => item.count));

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h2 style={{ textAlign: 'center' }}>Statistiques des Itinéraires Par Jour</h2>
            <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                height: '300px',
                borderLeft: '1px solid #ccc',
                borderBottom: '1px solid #ccc'
            }}>
                {data.data.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            flex: 1, // Pour que les barres aient la même largeur
                            height: `${(item.count / maxCount) * 100}%`,
                            backgroundColor: '#4a90e2',
                            margin: '0 5px',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '12px'
                        }}
                        title={`Date: ${item.date}, Nombre: ${item.count}`}
                    >
                        {item.count}
                    </div>
                ))}
            </div>
            {/* Légende de l'axe X (dates) */}
            <div style={{ display: 'flex', marginTop: '10px' }}>
                {data.data.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            flex: 1,
                            textAlign: 'center',
                            fontSize: '12px',
                            color: '#555'
                        }}
                    >
                        {item.date}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminItinerariesStats;