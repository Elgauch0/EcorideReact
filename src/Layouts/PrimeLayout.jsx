import { Outlet, useNavigation } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

function PrimeLayout() {
    const navigation = useNavigation();
    const isNavigating = navigation.state !== 'idle';

    return (
        <section className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Loading Message */}
            {isNavigating && (
                <aside className="fixed top-16 left-0 right-0 z-50 bg-my-E text-white text-center py-3 shadow-lg">
                    <span className="text-sm font-medium">
                        Chargement en cours...
                    </span>
                </aside>
            )}

            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${isNavigating ? 'opacity-60 blur-sm' : 'opacity-100 blur-0'
                }`}>
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />
        </section>
    );
}

export default PrimeLayout;