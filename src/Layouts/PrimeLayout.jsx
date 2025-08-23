import { Outlet, useNavigation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function PrimeLayout() {
    const navigation = useNavigation();
    const isNavigating = navigation.state !== 'idle';

    return (
        <div className="flex flex-col min-h-screen relative">
            <Header />

            {/* L'indicateur de chargement en haut */}
            {isNavigating && (
                <div className="absolute top-0 left-0 right-0 z-50 p-4 bg-gray-100 bg-opacity-75 text-center">
                    <p className="font-bold text-lg text-gray-800">Chargement...</p>
                </div>
            )}

            {/* Le contenu principal devient semi-transparent */}
            <main className={`flex-grow transition-opacity duration-300 ${isNavigating ? 'opacity-50' : 'opacity-100'}`}>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default PrimeLayout;