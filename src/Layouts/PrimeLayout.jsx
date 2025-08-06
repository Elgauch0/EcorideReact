import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function PrimeLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />

        </>
    )
}

export default PrimeLayout