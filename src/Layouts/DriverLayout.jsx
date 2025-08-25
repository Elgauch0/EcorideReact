import { Outlet, useLoaderData, NavLink } from "react-router";

const DriverLayout = () => {
    const userData = useLoaderData();

    const navigationItems = [
        {
            to: ".",
            label: "Mes Infos",
            end: true
        },
        {
            to: "itineraires",
            label: "Mes Itinéraires"
        }
        // {
        //     to: "additinerary",
        //     label: "Publier un itinéraire"
        // }
    ];

    return (
        <div className="driver-layout">
            {/* Navigation Header */}
            <nav className="bg-white shadow-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex space-x-8">
                            {navigationItems.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    end={item.end}
                                    className={({ isActive }) =>
                                        `relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-blue-600 ${isActive
                                            ? 'text-my-D after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600'
                                            : 'text-gray-700 hover:text-gray-900'
                                        }`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>

                        {/* User Info Section */}
                        {userData && (
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-my-C font-semibold text-sm">
                                        {userData.name?.charAt(0) || 'U'}
                                    </span>
                                </div>
                                <span className="text-sm text-gray-700 font-medium">
                                    {userData.name || 'Utilisateur'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Outlet context={userData} />
                </div>
            </main>
        </div>
    );
};

export default DriverLayout;