import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

function PrimeLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            {/* Le main prend tout l’espace restant */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Le footer reste collé en bas */}
            <Footer />
        </div>
    );
}

export default PrimeLayout;
