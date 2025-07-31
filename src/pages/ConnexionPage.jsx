import { Form, useNavigation, useSearchParams, Link } from "react-router";



export async function action({ request }) {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    console.log(email, password);
}


const Connexion = () => {
    const [searchParams] = useSearchParams();
    const message = searchParams.get('message');
    const { state } = useNavigation();
    const isSubmitting = state === 'submitting';

    return (
        <>
            {message && (
                <h2
                    className="text-green-600 font-semibold mt-4 text-center"
                    role="status"
                    aria-live="polite"
                >
                    {message}
                </h2>
            )}

            <h1 className="text-center text-2xl font-semibold mb-6 p-2">Connexion</h1>

            <Form method="post" className="block mx-auto bg-my-D p-6 rounded-lg shadow-md w-2/3 md:w-1/2 space-y-4">
                <div>
                    <label htmlFor="email" className="block mb-1 font-medium">Adresse email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="plainPassword" className="block mb-1 font-medium">Mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        id="plainPassword"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-my-A text-white py-2 rounded hover:bg-my-C disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
                </button>
            </Form>

            <div className="text-center mt-4">
                <Link
                    to="/register"
                    className="text-my-A hover:underline"
                >
                    Créer un compte
                </Link>
            </div>
        </>
    );
};

export default Connexion;
