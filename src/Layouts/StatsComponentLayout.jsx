import { Outlet, NavLink } from "react-router-dom";

const StatsComponentLayout = () => {
    return (
        <div className="relative min-h-screen bg-gray-50 p-6">
            {/* Contenu principal */}
            <div className="mb-20">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Stats Dashboard</h2>
                <div className="bg-white p-4 ">
                    <Outlet />
                </div>
            </div>

            {/* Navigation en bas et centrée */}
            <nav className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
                <NavLink
                    to="."
                    end
                    className={({ isActive }) =>
                        `px-4 py-2 rounded-md font-medium ${isActive
                            ? "bg-blue-600 text-white"
                            : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
                        }`
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="itineraries"
                    className={({ isActive }) =>
                        `px-4 py-2 rounded-md font-medium ${isActive
                            ? "bg-green-600 text-white"
                            : "bg-white text-green-600 border border-green-600 hover:bg-green-50"
                        }`
                    }
                >
                    Itineraries Stats
                </NavLink>

                <NavLink
                    to="budget"
                    className={({ isActive }) =>
                        `px-4 py-2 rounded-md font-medium ${isActive
                            ? "bg-purple-600 text-white"
                            : "bg-white text-purple-600 border border-purple-600 hover:bg-purple-50"
                        }`
                    }
                >
                    Budget
                </NavLink>
            </nav>
        </div>
    );
};

export default StatsComponentLayout;