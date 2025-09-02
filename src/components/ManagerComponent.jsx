import { checkAuthorization } from "../utils/functions";
import { redirect, useLoaderData, useNavigate, useSearchParams } from "react-router";
import { getAvisAdmin } from "../utils/loaders";
import ManageComment from "./ManageComment";
import { useState } from "react";
import { editAvis } from "../utils/actions";







export const loader = async () => {
    const { error, message, token } = checkAuthorization()
    if (error) {
        throw redirect(message)
    }
    const response = await getAvisAdmin(token);
    return { ...response, token }
}



const ManagerComponent = () => {
    const { data, error, message, token } = useLoaderData();
    const [searchParams] = useSearchParams();
    const responseError = searchParams.get('error');
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);



    const hundleClick = async (commentId, userEmail, isValid) => {
        setIsLoading(true); // Début du chargement
        const response = await editAvis(commentId, userEmail, isValid, token);
        setIsLoading(false);
        if (response.error) {
            navigate(`?error=${response.message}`)

        }
        setCommentaires(prev => prev.map(commentaire => commentaire.id === commentId ? { ...commentaire, isApproved: true } : commentaire));

    }




    const [Commentaires, setCommentaires] = useState(() => {
        if (!data) {
            return [];
        }
        return data.map(comment => {
            return {
                ...comment,
                isCommentV: false
            };
        });
    });

    const hundleValidComment = (id) => {

        setCommentaires(prev => prev.map(comment => comment.id === id ? { ...comment, isCommentV: !comment.isCommentV } : comment));
    }


    if (error) {
        return (
            <div className="text-red-600 font-bold p-4">
                Erreur lors du chargement des commentaires : {data?.message || message}
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="text-gray-500 text-center p-8">
                Aucun Action  à valider pour le moment.
            </div>
        );
    }






    return (
        <section className="container mx-auto p-4 md:p-8">
            {responseError && <h2 className="bg-red-200">{responseError}</h2>}
            {isLoading && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
                    <h1 className="text-white text-2xl">Chargement...</h1>
                </div>
            )}

            {Commentaires.map(comment => < ManageComment key={comment.id} comment={comment} hundleClick={hundleClick} hundleValidComment={hundleValidComment} />
            )}


        </section>
    );
};

export default ManagerComponent;