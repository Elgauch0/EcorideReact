import { NavLink, useNavigate } from 'react-router'
import { useState } from 'react'
import { useAuthStore } from "../store/AuthStore.js";
import { determineDashboard } from '../utils/functions.js';
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const style = "font-bold text-my-D underline";
    const { isLogged, logout, roles } = useAuthStore();
    const dashboard = roles.length > 0 ? determineDashboard(roles) : "/dashboard";
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/connexion');
    }

    return (
        <header className='flex justify-between items-center mx-0 w-full bg-my-A text-xl text-my-E p-1'>
            <NavLink to="/" className="font-bold mx-1 text-my-C">Ecoride</NavLink>

            <button
                className="md:hidden text-2xl order-last mx-2"
                onClick={() => setIsOpen(prev => !prev)} >
                {isOpen ? "✖" : "☰"}
            </button>

            <nav className={`${isOpen ? 'block' : 'hidden'} md:block`}>
                <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 p-2">
                    {isLogged && roles.length > 0 && (
                        <li><NavLink to={dashboard} className={({ isActive }) => isActive ? style : ""}>Mon dashboard</NavLink></li>
                    )}
                    <li><NavLink to="/covoiturage" className={({ isActive }) => isActive ? style : null}>Covoiturage</NavLink></li>
                    <li><NavLink to="/contact" className={({ isActive }) => isActive ? style : null}>Contact</NavLink></li>
                    {!isLogged ? (
                        <li><NavLink to="/connexion" className={({ isActive }) => isActive ? style : null}>Connexion</NavLink></li>
                    ) : (
                        <li>
                            <button onClick={handleLogout} className="text-my-C font-bold hover:underline">
                                Déconnexion
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}




export default Header