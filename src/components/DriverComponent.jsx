import { useOutletContext, Link } from "react-router";
import ImgUserComponent from "./ImgUserComponent";
import AddImgProfil from "./AddImgProfil";






const DriverComponent = () => {
    const userData = useOutletContext();

    return (
        <section className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">

            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-10 space-y-8">
                <ImgUserComponent imageUrl={userData.userImage} />
                {/* 🚗 Section de bienvenue pour le conducteur */}
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                        Bonjour, Conducteur {userData.firstName} !
                    </h1>
                    <p className="mt-4 text-xl text-gray-700">
                        Bienvenue sur votre tableau de bord.
                    </p>
                </div>

                <hr className="border-t-2 border-gray-200" />

                {/* 📋 Section d'informations du conducteur */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Vos informations personnelles :
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* 🧍 Nom complet */}
                        <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                            <p className="text-sm font-medium text-gray-500">Nom complet</p>
                            <p className="mt-1 text-lg font-semibold text-gray-900">
                                {userData.firstName} {userData.lastName}
                            </p>
                        </div>

                        {/* 📧 Email */}
                        <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                            <p className="text-sm font-medium text-gray-500">Email</p>
                            <p className="mt-1 text-lg font-semibold text-gray-900">
                                {userData.email}
                            </p>
                        </div>

                        {/* 🏠 Adresse */}
                        <div className="col-span-full bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                            <p className="text-sm font-medium text-gray-500">Adresse</p>
                            <p className="mt-1 text-lg font-semibold text-gray-900">
                                {userData.adress}
                            </p>
                        </div>
                        {/* 🏠 Adresse */}
                        <div className="col-span-full bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                            <p className="text-sm font-medium text-gray-500">Votre note :</p>
                            <p className="mt-1 text-lg font-semibold text-gray-900">
                                {userData.averageRating ? userData.averageRating + "/5" : "aucun rating pour le moment "}
                            </p>
                        </div>
                        <div className="col-span-full bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                            <p className="text-sm font-medium text-gray-500">Votre Credits :</p>
                            <p className="mt-1 text-lg font-semibold text-gray-900">
                                {userData.Credits ? userData.Credits : " pas de credit "}
                            </p>
                        </div>
                        <Link
                            to="/addVehicle"
                            className="px-6 py-3 bg-my-C text-white font-semibold rounded-lg shadow-md hover:bg-my-C-dark transition duration-300 text-center"
                        >
                            Rajouter Un vehicle
                        </Link>
                    </div>
                    <AddImgProfil token={userData.token} />
                </div>



            </div>
        </section>
    );
}

export default DriverComponent