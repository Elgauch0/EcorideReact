import { useEffect, useState } from "react";
import { useAuthStore } from "../store/AuthStore";
import { useNavigate } from "react-router";
import { addPicture } from "../utils/actions";
const VITE_API_Image = import.meta.env.VITE_API_Image;



const AddImgProfil = ({ token }) => {

    const navigate = useNavigate();
    const isLogged = useAuthStore(state => state.isLogged);
    const [responseImgProfil, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        if (!isLogged) {
            useAuthStore.getState().logout();
            navigate('/connexion?error=un probleme est survenue vous devez vous connecter');
        }

    }, [isLogged])

    const handleSubmit = async (formData) => {
        const picture = formData.get('picture');
        if (!(picture instanceof File) || picture.size === 0 || !picture.type.startsWith('image/')) {
            alert("Veuillez sélectionner une image valide.");
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/webp'];
        if (!allowedTypes.includes(picture.type)) {
            alert("Format de fichier non supporté. Veuillez choisir une image JPEG ou WebP.");
            return;
        }

        setIsLoading(true);
        const response = await addPicture(formData, token);
        console.log(response);
        setResponse(response);

        setIsLoading(false);




    }

    return (

        <section className='my-9'>
            {isLoading && (
                <p className="text-blue-600 animate-pulse font-medium">Envoi en cours...</p>
            )}
            {responseImgProfil && (
                responseImgProfil.error ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <h3 className="font-semibold">Erreur :</h3>
                        <p>{responseImgProfil.message}</p>
                    </div>
                ) : (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        <p className="font-medium">Image envoyée avec succès !</p>
                        <a
                            href={VITE_API_Image + responseImgProfil.imageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-green-800 hover:text-green-600"
                        >
                            Cliquez ici pour voir votre image
                        </a>
                    </div>
                )
            )}

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    handleSubmit(formData);
                }}
                className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md space-y-4"
            >
                <label
                    htmlFor="file-upload"
                    className="block text-gray-700 font-medium"
                >
                    Ajouter une photo de profil
                </label>

                <input
                    id="file-upload"
                    name="picture"
                    type="file"
                    accept="image/webp, image/jpeg"
                    className="hidden"
                />

                <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition"
                >
                    Choisir un fichier
                </label>



                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full px-4 py-2 rounded-md font-semibold transition ${isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-my-B hover:bg-my-C text-white'
                        }`}
                >
                    {isLoading ? 'Envoi en cours...' : 'Envoyer'}
                </button>
            </form>
        </section>

    )
}

export default AddImgProfil
