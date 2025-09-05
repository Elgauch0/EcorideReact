import { Form, useActionData } from "react-router-dom";
import { hundlePublicAvis } from "../utils/actions";
import { cleanSimpleText } from "../utils/functions";

export const action = async ({ request }) => {
    const formData = await request.formData();
    const nickname = cleanSimpleText(formData.get("nickname"));
    const review = cleanSimpleText(formData.get("review"));

    if (!nickname || !review) {
        return {
            error: true,
            message: "Tous les champs sont obligatoires / validation échouée",
        };
    }

    return await hundlePublicAvis({ nickname, review });
};

const PublicAvis = () => {
    const actionData = useActionData();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 ">
            <div className="max-w-lg w-full p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Laisser un avis</h2>

                {actionData && (
                    <div
                        className={`mb-4 p-3 rounded ${actionData.error
                            ? "bg-red-100 text-red-700 border border-red-300"
                            : "bg-green-100 text-green-700 border border-green-300"
                            }`}
                    >
                        {actionData.message}
                    </div>
                )}

                <Form method="post" className="space-y-4">
                    <div>
                        <label
                            htmlFor="nickname"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Pseudo
                        </label>
                        <input
                            type="text"
                            name="nickname"
                            id="nickname"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Votre pseudo"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="review"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Commentaire
                        </label>
                        <textarea
                            name="review"
                            id="review"
                            rows="4"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Votre avis..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-my-B text-white py-2 px-4 rounded hover:bg-my-D transition"
                    >
                        Envoyer
                    </button>
                </Form>
            </div>
        </div>
    );
};
export default PublicAvis;