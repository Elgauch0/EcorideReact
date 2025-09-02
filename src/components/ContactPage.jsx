import { Form, useActionData } from "react-router";
import { cleanSimpleText } from "../utils/functions";
import { sendEmails } from "../utils/actions";

export const action = async ({ request }) => {
    const formData = await request.formData();
    const email = cleanSimpleText(formData.get("email"));
    const content = cleanSimpleText(formData.get("message"));

    if (!email || !content) {
        return { error: true, message: "email/message obligé" };
    }

    return await sendEmails({ email, content });
};

const ContactPage = () => {
    const actionData = useActionData();
    const { error, message } = actionData || {};

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Contactez-nous</h2>

            {message && (
                <div
                    className={`mb-4 p-4 rounded text-white ${error ? "bg-red-500" : "bg-green-500"
                        }`}
                >
                    {message}
                </div>
            )}

            <Form method="post" className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Message
                    </label>
                    <textarea
                        name="message"
                        id="message"
                        placeholder="Votre message ici"
                        rows="5"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-my-C text-white py-2 px-4 rounded hover:bg-my-E transition"
                >
                    Envoyer
                </button>
            </Form>
        </div>
    );
};

export default ContactPage;
