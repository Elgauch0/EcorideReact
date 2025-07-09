import { NavLink } from 'react-router'
import { useState } from 'react'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const style = "font-bold text-my-D underline"


    return (

        <header className='flex  justify-between items-center mx-0 w-full bg-my-A text-xl text-my-E p-1'>
            <NavLink to="/" className="font-bold mx-1" > Ecoride</NavLink>
            <button
                className="md:hidden text-2xl"
                onClick={() => setIsOpen(prev => !prev)}
            >
                ☰
            </button>
            <nav className={`${isOpen ? 'block' : 'hidden'} md:block`}>
                <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0   md:space-x-6 p-2">
                    <li><NavLink to="/covoiturage"
                        className={({ isActive }) => isActive ? style : null}
                    >
                        Covoiturage</NavLink></li>
                    <li><NavLink to="/contact"
                        className={({ isActive }) => isActive ? style : null}
                    >
                        Contact</NavLink></li>
                    <li><NavLink to="/connexion"
                        className={({ isActive }) => isActive ? style : null}
                    >
                        Connexion</NavLink></li>
                </ul>
            </nav>

        </header>
    )
}

export default Header