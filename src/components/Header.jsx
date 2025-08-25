import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/AuthStore.js';
import { determineDashboard } from '../utils/functions.js';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { isLogged, logout, roles } = useAuthStore();
    const dashboardPath = roles.length ? determineDashboard(roles) : '/dashboard';
    const navigate = useNavigate();

    // Gestion du scroll pour l'effet de transparence
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fermer le menu mobile lors du clic sur un lien
    const handleLinkClick = () => {
        setIsOpen(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/connexion');
        setIsOpen(false);
    };

    // Style du logo avec effet hover
    const logoClass = "group flex items-center space-x-3 text-white transition-all duration-300 hover:scale-105";

    // Style de base pour les liens de navigation
    const baseLinkClass = "relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group";

    const getLinkClass = ({ isActive }) => {
        if (isActive) {
            return `${baseLinkClass} text-white bg-white/20 backdrop-blur-sm shadow-lg`;
        }
        return `${baseLinkClass} text-white/90 hover:text-white hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-md`;
    };

    const mobileLinkClass = ({ isActive }) => {
        if (isActive) {
            return "block w-full px-4 py-3 text-indigo-600 bg-indigo-50 rounded-lg font-semibold border-l-4 border-indigo-600";
        }
        return "block w-full px-4 py-3 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-all duration-200";
    };

    return (
        <>
            {/* Header principal */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200/20'
                    : 'bg-gradient-to-r from-my-A via-my-C to-my-E shadow-lg'
                    }`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">

                        {/* Logo amélioré */}
                        <NavLink to="/" className={logoClass} onClick={handleLinkClick}>
                            <div className="relative">
                                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                                    <span className="text-2xl">🚗</span>
                                </div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                            </div>
                            <div>
                                <span className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                                    Ecoride
                                </span>
                                <div className={`text-xs font-medium ${isScrolled ? 'text-gray-600' : 'text-white/80'}`}>
                                    Covoiturage éco-responsable
                                </div>
                            </div>
                        </NavLink>

                        {/* Navigation desktop */}
                        <nav className="hidden lg:flex items-center space-x-2">
                            {isLogged && roles.length > 0 && (
                                <NavLink
                                    to={dashboardPath}
                                    className={isScrolled ?
                                        ({ isActive }) => isActive ?
                                            "px-4 py-2 text-indigo-600 bg-indigo-50 rounded-lg font-semibold" :
                                            "px-4 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                                        : getLinkClass
                                    }
                                >
                                    <span className="flex items-center space-x-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                        <span>Dashboard</span>
                                    </span>
                                </NavLink>
                            )}

                            <NavLink
                                to="/covoiturage"
                                className={isScrolled ?
                                    ({ isActive }) => isActive ?
                                        "px-4 py-2 text-indigo-600 bg-indigo-50 rounded-lg font-semibold" :
                                        "px-4 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                                    : getLinkClass
                                }
                            >
                                <span className="flex items-center space-x-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span>Covoiturage</span>
                                </span>
                            </NavLink>

                            <NavLink
                                to="/contact"
                                className={isScrolled ?
                                    ({ isActive }) => isActive ?
                                        "px-4 py-2 text-indigo-600 bg-indigo-50 rounded-lg font-semibold" :
                                        "px-4 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                                    : getLinkClass
                                }
                            >
                                <span className="flex items-center space-x-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span>Contact</span>
                                </span>
                            </NavLink>

                            {/* Séparateur */}
                            <div className={`w-px h-8 mx-4 ${isScrolled ? 'bg-gray-300' : 'bg-white/30'}`}></div>

                            {/* Actions utilisateur */}
                            {!isLogged ? (
                                <div className="flex items-center space-x-3">
                                    <NavLink
                                        to="/connexion"
                                        className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${isScrolled
                                            ? 'text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl'
                                            : 'text-indigo-600 bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl'
                                            }`}
                                    >
                                        Se connecter
                                    </NavLink>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <div className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${isScrolled ? 'bg-gray-50' : 'bg-white/10 backdrop-blur-sm'
                                        }`}>
                                        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-semibold">U</span>
                                        </div>
                                        <span className={`text-sm font-medium ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
                                            Utilisateur
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span>Déconnexion</span>
                                    </button>
                                </div>
                            )}
                        </nav>

                        {/* Bouton hamburger amélioré */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`lg:hidden p-2 rounded-xl transition-all duration-300 ${isScrolled
                                ? 'text-gray-700 hover:bg-gray-100'
                                : 'text-white hover:bg-white/10 backdrop-blur-sm'
                                }`}
                            aria-label="Menu"
                        >
                            <div className="w-6 h-6 relative flex flex-col justify-center items-center">
                                <span className={`w-5 h-0.5 transition-all duration-300 ${isScrolled ? 'bg-gray-700' : 'bg-white'} ${isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
                                    }`}></span>
                                <span className={`w-5 h-0.5 transition-all duration-300 ${isScrolled ? 'bg-gray-700' : 'bg-white'} ${isOpen ? 'opacity-0' : 'opacity-100'
                                    }`}></span>
                                <span className={`w-5 h-0.5 transition-all duration-300 ${isScrolled ? 'bg-gray-700' : 'bg-white'} ${isOpen ? '-rotate-45 -translate-y-0' : 'translate-y-1.5'
                                    }`}></span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Menu mobile amélioré */}
                <div className={`lg:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}>
                    <div className="bg-white/95 backdrop-blur-md border-t border-gray-200/20 shadow-xl">
                        <nav className="container mx-auto px-4 py-6">
                            <ul className="space-y-2">
                                {isLogged && roles.length > 0 && (
                                    <li>
                                        <NavLink
                                            to={dashboardPath}
                                            className={mobileLinkClass}
                                            onClick={handleLinkClick}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                                <span>Mon Dashboard</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                )}

                                <li>
                                    <NavLink
                                        to="/covoiturage"
                                        className={mobileLinkClass}
                                        onClick={handleLinkClick}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            <span>Covoiturage</span>
                                        </div>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/contact"
                                        className={mobileLinkClass}
                                        onClick={handleLinkClick}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span>Contact</span>
                                        </div>
                                    </NavLink>
                                </li>

                                {/* Actions utilisateur mobile */}
                                {!isLogged ? (
                                    <li className="pt-4 border-t border-gray-200">
                                        <NavLink
                                            to="/connexion"
                                            className="block w-full px-4 py-3 text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition-all duration-200"
                                            onClick={handleLinkClick}
                                        >
                                            Se connecter
                                        </NavLink>
                                    </li>
                                ) : (
                                    <li className="pt-4 border-t border-gray-200 space-y-3">
                                        <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
                                            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                                                <span className="text-white font-semibold">U</span>
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">Utilisateur</div>
                                                <div className="text-sm text-gray-500">Connecté</div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className=" w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            <span>Se déconnecter</span>
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Spacer pour compenser le header fixe */}
            <div className="h-16 lg:h-20"></div>
        </>
    );
};

export default Header;