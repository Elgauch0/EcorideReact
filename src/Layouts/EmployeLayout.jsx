import { NavLink, Outlet } from "react-router"

const EmployeLayout = () => {

    return (
        <>
            <NavLink
                to="."
                end
                className={({ isActive }) =>
                    `relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-blue-600 ${isActive
                        ? 'text-my-D after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600'
                        : 'text-gray-700 hover:text-gray-900'
                    }`
                }


            > Dashboard



            </NavLink>
            <NavLink
                to="utilisateurs"
                className={({ isActive }) =>
                    `relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-blue-600 ${isActive
                        ? 'text-my-D after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600'
                        : 'text-gray-700 hover:text-gray-900'
                    }`
                }



            >Utilisateurs


            </NavLink>
            <NavLink
                to="public"
                className={({ isActive }) =>
                    `relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-blue-600 ${isActive
                        ? 'text-my-D after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600'
                        : 'text-gray-700 hover:text-gray-900'
                    }`
                }



            >public


            </NavLink>



            <Outlet />
        </>

    )
}

export default EmployeLayout