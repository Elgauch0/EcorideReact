import { Form, redirect, useActionData, useNavigation } from "react-router";
import { cleanSimpleText } from "../utils/functions";
import { createUser } from "../utils/actions";


export async function action({ request }) {


    const formData = await request.formData();
    const email = cleanSimpleText(formData.get("email"));
    const plainPassword = cleanSimpleText(formData.get("plainPassword"));
    const firstName = cleanSimpleText(formData.get("firstName"));
    const lastName = cleanSimpleText(formData.get("lastName"));
    const adress = cleanSimpleText(formData.get("adress"));


    const requestBody = {
        email,
        plainPassword,
        firstName,
        lastName,
        adress
    };
    if (!email || !plainPassword || !firstName || !lastName || !adress) {
        return { error: true, message: "champs invalides" };
    }
    const res = await createUser(requestBody);
    if (res.error) {
        return res;
    }

    return redirect(`/connexion?message=${res.message}`)


}

const UserRegistrationForm = () => {
    const { state } = useNavigation();
    const response = useActionData();

    const isSubmitting = state === 'submitting';

    return (
        <section>
            {response?.error && <h2
                className="text-red-600 font-semibold mt-4 text-center"
                role="alert"
                aria-live="assertive"
            >{response.message} </h2>}
            <h1 className="text-center text-2xl font-semibold mb-6 p-2">Créer un compte</h1>

            <Form method="POST" className="block mx-auto bg-my-D p-6 rounded-lg shadow-md w-2/3 md:w-1/2 space-y-4">
                {/* <input type="hidden" name="roles" value="ROLE_USER" /> */}

                <div>
                    <label htmlFor="email" className="block mb-1 font-medium">Adresse email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label htmlFor="plainPassword" className="block mb-1 font-medium">Mot de passe</label>
                    <input
                        type="password"
                        name="plainPassword"
                        id="plainPassword"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label htmlFor="firstName" className="block mb-1 font-medium">Prénom</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label htmlFor="lastName" className="block mb-1 font-medium">Nom de famille</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label htmlFor="adress" className="block mb-1 font-medium">Adresse</label>
                    <input
                        type="text"
                        name="adress"
                        id="adress"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-my-A text-white py-2 rounded hover:bg-my-C  disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'creation  en cours' : 'Créer le compte'}
                </button>
            </Form>

        </section>
    );
};

export default UserRegistrationForm;
