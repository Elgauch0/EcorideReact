import {
    Form,
    Link,
    redirect,
    useActionData,
    useNavigate,
    useSearchParams,
} from "react-router";
import { checkAuthorization, cleanSimpleText } from "../utils/functions";
import { deleteUser, searchUser } from "../utils/actions";
import { useState } from "react";

export const action = async ({ request }) => {
    const response = checkAuthorization(request.url);
    if (response.error) throw redirect(response.message);

    const form = await request.formData();
    const email = cleanSimpleText(form.get("email"));
    if (!email) return { error: true, message: "Email obligatoire" };

    const token = response.token;
    const responseSearch = await searchUser(email, token);
    return { ...responseSearch, token };
};

const AdminSearchUser = () => {
    const data = useActionData();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();


    const errorParam = searchParams.get("error");
    const messageParam = searchParams.get("message");

    const isError = errorParam === "true";
    const hasMessage = Boolean(messageParam);

    const handleDelete = async (email, token) => {
        setLoading(true);
        const response = await deleteUser(email, token);
        setLoading(false);


        navigate(`?error=${response.error}&message=${encodeURIComponent(response.message)}`, {
            replace: true,
        });
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                🔍 Rechercher un utilisateur
            </h2>

            {hasMessage && (
                <h3
                    className={`mb-4 p-3 rounded ${isError ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"
                        }`}
                >
                    {messageParam}
                </h3>
            )}

            <Form method="post" className="space-y-4">
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email du user :
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-my-B text-white py-2 px-4 rounded-md hover:bg-my-D transition"
                >
                    Envoyer
                </button>
            </Form>


            {data && (
                <div className="mt-6">
                    {data.error ? (
                        <p className="text-red-600 font-semibold bg-red-100 p-3 rounded-md shadow-sm">
                            {data.message}
                        </p>
                    ) : (
                        <section className="bg-gray-50 p-5 rounded-md shadow-md border border-gray-200">
                            <h2 className="text-lg font-bold text-gray-800 mb-2">
                                👤 Utilisateur trouvé :
                            </h2>
                            <div className="space-y-2 text-gray-700">
                                <h3 className="text-md font-medium">
                                    📧 <span className="font-semibold">{data.data.email}</span>
                                </h3>
                                <p>
                                    🧑‍💼 Nom complet :{" "}
                                    <span className="font-semibold">
                                        {data.data.firstName} {data.data.lastName}
                                    </span>
                                </p>
                                <p>
                                    🏷️ Fonction :{" "}
                                    <span className="font-semibold">
                                        {data.data.roles.includes("ROLE_MANAGER")
                                            ? "Manager"
                                            : "User"}
                                    </span>
                                </p>
                            </div>

                            <button
                                onClick={() => handleDelete(data.data.email, data.token)}
                                className={`mt-4 text-white font-semibold py-2 px-4 rounded shadow transition duration-200 ease-in-out
                                       ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}
                                disabled={loading}
                            >
                                {loading ? "Suppression en cours…" : "Supprimer cet Utilisateur"}
                            </button>
                        </section>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminSearchUser;
