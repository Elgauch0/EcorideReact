

const ManageComment = ({ comment, hundleClick, hundleValidComment }) => {
    // Formatage de la date/heure
    const dateObject = new Date(comment.itinerary.datetime);
    const formattedDate = dateObject.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
    const formattedTime = dateObject.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
    });


    const commentaireTexte = comment.isCommentV
        ? comment.content || "Aucun contenu"
        : "Commentaire non validé par l'administration";

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            {/* En-tête */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    Commentaire de :{" "}
                    <span className="font-normal text-gray-600">{comment.user.email}</span>
                </h2>
                <span
                    className={`px-2 py-1 text-sm font-medium rounded-full ${comment.isApproved
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                        }`}
                >
                    {comment.isApproved ? "Approuvé" : "En cours"}
                </span>
            </div>

            {/* Contenu du commentaire */}
            <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Contenu :</h3>
                <p className="text-gray-600">{commentaireTexte}</p>
            </div>

            {/* Itinéraire */}
            <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Itinéraire :</h3>
                <p className="text-gray-600 mb-1">
                    {comment.itinerary.departureCity} &rarr;{" "}
                    {comment.itinerary.arrivalCity}
                </p>
                <p className="text-gray-500 text-sm">
                    Le {formattedDate} à {formattedTime}
                </p>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
                <button
                    onClick={() => hundleValidComment(comment.id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${comment.isCommentV
                        ? "bg-green-200 text-green-800 hover:bg-green-300"
                        : "bg-red-200 text-red-800 hover:bg-red-300"
                        }`}
                >
                    {comment.isCommentV ? "Validé ✔" : "Valider"}
                </button>

                <button
                    onClick={() =>
                        hundleClick(comment.id, comment.user.email, comment.isCommentV)
                    }
                    className="px-4 py-2 rounded-md bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 transition-colors"
                >
                    Approuver
                </button>
            </div>
        </div>
    );
};

export default ManageComment;
