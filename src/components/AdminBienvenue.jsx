

const AdminBienvenue = () => {
    const today = new Date().toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const proverbes = [
        "Petit à petit, l’oiseau fait son nid.",
        "Après la pluie, le beau temps.",
        "Qui ne tente rien n’a rien.",
        "L’habit ne fait pas le moine.",
        "Il n’y a pas de fumée sans feu.",
        "Mieux vaut prévenir que guérir.",
        "À cœur vaillant, rien d’impossible.",
        "Un tiens vaut mieux que deux tu l’auras.",
        "Ce qui ne te tue pas te rend plus fort.",
        "Les voyages forment la jeunesse."
    ];

    const proverbeDuJour = proverbes[Math.floor(Math.random() * proverbes.length)];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-6 bg-white rounded shadow text-center">
                <h1 className="text-3xl font-bold text-blue-700 mb-4">Bienvenue sur le Dashboard 🚀</h1>
                <p className="text-gray-600 text-lg mb-2">Nous sommes le {today}</p>
                <p className="italic text-gray-500">📜 Proverbe du jour : "{proverbeDuJour}"</p>
            </div>
        </div>
    );

};

export default AdminBienvenue;
