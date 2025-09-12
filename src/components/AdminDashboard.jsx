
import { checkAuthorization, cleanSimpleText } from "../utils/functions";
import { createEmploye } from "../utils/actions";
import { useActionData, redirect, Link } from "react-router";
import UserRegistrationForm from "./UserRegistrationForm";





export async function action({ request }) {

    const response = checkAuthorization(request.url);
    if (response.error) {
        throw redirect(response.message);
    }

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
    return await createEmploye(requestBody, response.token);



}



const AdminDashboard = () => {
    const res = useActionData();



    return (
        <section>
            {res && (
                <h3
                    className={`p-2 rounded-md ${res.error ? 'bg-red-100 text-red-700' : 'bg-green-200 text-green-800'
                        }`}
                >
                    {res.message}
                </h3>
            )}


            <UserRegistrationForm />
            <Link
                to="../users"
                className="block mx-auto text-my-A hover:underline mt-4 text-center"
            >chercher un user
            </Link>
        </section>
    )
}

export default AdminDashboard
