import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const style = "font-bold text-my-D underline"
    const isLogged = localStorage.getItem('isLogged')
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear(); // ou localStorage.removeItem('isLogged')
        navigate('/connexion'); // redirection après déconnexion
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