import { Link } from "react-router";

function Footer() {
    return (
        <footer className="bg-gradient-to-r from-my-A via-my-C to-my-E shadow-lg text-white px-4 py-6 mt-8">
            <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row justify-between items-center gap-4 text-center md:text-left">
                <div>
                    <h2 className="font-semibold text-lg">Ecoride</h2>
                    <p className="text-sm opacity-80">© {new Date().getFullYear()} Tous droits réservés</p>
                </div>

                <nav aria-label="Liens du pied de page">
                    <ul className="flex flex-row gap-6">
                        <li>
                            <Link to="covoiturage" className="font-medium hover:underline transition-all duration-200">
                                Covoiturage
                            </Link>
                        </li>
                        <li>
                            <Link to="connexion" className="font-medium hover:underline transition-all duration-200">
                                Connexion
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="font-medium hover:underline transition-all duration-200">
                                Mentions légales
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;
