
import { addVehicle } from "../utils/actions.js";
import { useAuthStore } from "../store/AuthStore.js";
import { cleanSimpleText, ValidateDate } from "../utils/functions.js"
import { useActionData, useNavigation, Form, redirect } from "react-router";

export const action = async ({ request }) => {
    const formData = await request.formData();

    const licencePlate = cleanSimpleText(formData.get('licencePlate')).toUpperCase();
    const registrationDate = ValidateDate(formData.get('registrationDate'), true);
    const seatsAvailable = parseInt(formData.get('seatsAvailable'));
    const model = cleanSimpleText(formData.get('model'));
    const isSmockingAlowed = formData.get('isSmockingAlowed') === 'on';
    const isPetsAlowed = formData.get('isPetsAlowed') === 'on';
    const isGreen = formData.get('isGreen') === 'on';


    // ✅ Validation des champs obligatoires
    if (!licencePlate || !registrationDate || !seatsAvailable || !model) {
        console.log(licencePlate, registrationDate, seatsAvailable, model)
        return {
            error: true,
            message: "Toutes les cases doivent être renseignées.",
        };
    }

    const requestdata = {
        licencePlate,
        registrationDate,
        seatsAvailable,
        model,
        isSmockingAlowed,
        isPetsAlowed,
        isGreen,
    };
    const response = await addVehicle(requestdata);
    if (response.error) {
        return response.message

    }
    const { setRole } = useAuthStore.getState();
    setRole("ROLE_DRIVER");
    throw redirect('/driver');
};


const AddVehicle = () => {
    const actionData = useActionData();
    const message = actionData?.message;
    const navigation = useNavigation();
    const disabled = navigation.state === "submitting";
    return (

        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Ajoutez une Voiture
            </h2>
            {message && (
                <p
                    className='mt-4 text-center font-medium  text-red-600'
                >
                    {message}
                </p>
            )}

            <Form method="POST" className="space-y-5">
                {/* Plaque d'immatriculation */}
                <div>
                    <label
                        htmlFor="licencePlate"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Plaque d'immatriculation
                    </label>
                    <input
                        type="text"
                        name="licencePlate"
                        id="licencePlate"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2
                     bg-gray-50 focus:outline-none focus:ring-my-C focus:border-my-C"
                    />
                </div>

                {/* Date d'enregistrement */}
                <div>
                    <label
                        htmlFor="registrationDate"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Date d'enregistrement
                    </label>
                    <input
                        type="date"
                        name="registrationDate"
                        id="registrationDate"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2
                     bg-gray-50 focus:outline-none focus:ring-my-C focus:border-my-C"
                    />
                </div>

                {/* Nombre de places disponibles */}
                <div>
                    <label
                        htmlFor="seatsAvailable"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Nombre de places disponibles
                    </label>
                    <input
                        type="number"
                        name="seatsAvailable"
                        id="seatsAvailable"
                        min="1"
                        max="50"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2
                     bg-gray-50 focus:outline-none focus:ring-my-C focus:border-my-C"
                    />
                </div>

                {/* Modèle */}
                <div>
                    <label
                        htmlFor="model"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Modèle
                    </label>
                    <input
                        type="text"
                        name="model"
                        id="model"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2
                     bg-gray-50 focus:outline-none focus:ring-my-C focus:border-my-C"
                    />
                </div>

                {/* Options (checkboxes) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center">
                        <input
                            id="isSmockingAlowed"
                            name="isSmockingAlowed"
                            type="checkbox"
                            className="h-4 w-4 text-my-C border-gray-300 rounded focus:ring-my-C"
                        />
                        <label
                            htmlFor="isSmockingAlowed"
                            className="ml-2 block text-sm text-gray-700"
                        >
                            Fumeur autorisé
                        </label>
                    </div>

                    <div className="flex items-center">
                        <input
                            id="isPetsAlowed"
                            name="isPetsAlowed"
                            type="checkbox"
                            className="h-4 w-4 text-my-C border-gray-300 rounded focus:ring-my-C"
                        />
                        <label
                            htmlFor="isPetsAlowed"
                            className="ml-2 block text-sm text-gray-700"
                        >
                            Animaux autorisés
                        </label>
                    </div>

                    <div className="flex items-center">
                        <input
                            id="isGreen"
                            name="isGreen"
                            type="checkbox"
                            className="h-4 w-4 text-my-C border-gray-300 rounded focus:ring-my-C"
                        />
                        <label
                            htmlFor="isGreen"
                            className="ml-2 block text-sm text-gray-700"
                        >
                            Véhicule écologique
                        </label>
                    </div>
                </div>

                {/* Bouton de soumission */}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-my-C text-white font-semibold rounded-md disabled:bg-my-D disabled:cursor-not-allowed
                   shadow hover:bg-my-C-dark focus:outline-none focus:ring-2
                   focus:ring-offset-2 focus:ring-my-C"
                    disabled={disabled}
                >
                    Enregistrer
                </button>
            </Form>
        </div>

    )
}

export default AddVehicle