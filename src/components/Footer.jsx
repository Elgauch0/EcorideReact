import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-my-A  text-my-E px-4 py-6 mt-8">

            <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row justify-between items-center gap-4 text-center md:text-left">


                <div>
                    <h2 className="font-semibold text-lg">Ecoride</h2>
                    <p className="text-sm">© {new Date().getFullYear()} Tous droits réservés</p>
                </div>

                <div className="flex  md:flex-row md:gap-6">

                    <Link to="covoiturage" className=" mx-1 hover:underline">covoiturage</Link>
                    <Link to="connexion" className=" mx-1 hover:underline">connection</Link>
                    <Link to="#" className=" mx-1 hover:underline">mentions légales</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
