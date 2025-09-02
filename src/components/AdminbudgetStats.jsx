
import { redirect, useLoaderData } from "react-router-dom";
import { checkAuthorization } from "../utils/functions"
import { getBudgetData } from "../utils/loaders";



export const loader = async () => {
    const { error, message, token } = checkAuthorization();
    if (error) {
        throw redirect(message);
    }
    return await getBudgetData(token);
}
const AdminBudgetStats = () => {
    // Déstructuration de l'objet pour récupérer 'error' et 'data'
    const { error, data } = useLoaderData();

    // 1. Gérer l'état d'erreur
    if (error) {
        return (
            <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
                <p>Ressayez ultérieurement.</p>
            </div>
        );
    }

    // 2. Gérer le cas où il n'y a pas de données
    if (!data || data.length === 0) {
        return (
            <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
                <p>Aucune donnée à afficher.</p>
            </div>
        );
    }

    // 3. Afficher le graphique si les données sont valides
    const cleanedData = data.map(item => ({
        ...item,
        totalCredits: parseInt(item.totalCredits, 10)
    }));

    const maxCredits = Math.max(...cleanedData.map(item => item.totalCredits));

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h2 style={{ textAlign: 'center' }}>Statistiques de Crédits par jour</h2>
            <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                height: '300px',
                borderLeft: '1px solid #ccc',
                borderBottom: '1px solid #ccc'
            }}>
                {cleanedData.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            flex: 1,
                            height: `${(item.totalCredits / maxCredits) * 100}%`,
                            backgroundColor: '#007bff',
                            margin: '0 5px',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '12px'
                        }}
                        title={`Date: ${item.date}, Crédits: ${item.totalCredits}`}
                    >
                        {item.totalCredits}
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', marginTop: '10px' }}>
                {cleanedData.map((item, index) => (
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

export default AdminBudgetStats;