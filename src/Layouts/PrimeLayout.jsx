import { Outlet, useNavigation } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

function PrimeLayout() {
    const navigation = useNavigation();
    const isNavigating = navigation.state !== 'idle';

    return (
        <div className="prime-layout relative min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Loading Overlay */}
            {isNavigating && (
                <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300" />

                    {/* Loading Indicator */}
                    <div className="fixed top-0 left-0 right-0 z-50">
                        {/* Progress Bar */}
                        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-pulse">
                            <div className="h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-slide-right" />
                        </div>

                        {/* Loading Message */}
                        <div className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                                <div className="flex items-center justify-center space-x-3">
                                    {/* Spinner */}
                                    <div className="relative">
                                        <div className="w-5 h-5 border-2 border-blue-200 rounded-full animate-spin">
                                            <div className="absolute top-0 left-0 w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                        </div>
                                    </div>

                                    {/* Text */}
                                    <span className="text-gray-700 font-medium text-sm tracking-wide">
                                        Chargement en cours...
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Header */}
            <header className="relative z-30">
                <Header />
            </header>

            {/* Main Content */}
            <main className={`
                flex-1 relative z-10
                transition-all duration-500 ease-in-out
                ${isNavigating
                    ? 'opacity-60 scale-[0.98] blur-[1px]'
                    : 'opacity-100 scale-100 blur-0'
                }
            `}>
                <div className="min-h-full">
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-30 mt-auto">
                <Footer />
            </footer>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes slide-right {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                
                .animate-slide-right {
                    animation: slide-right 2s linear infinite;
                }
                
                /* Smooth page transitions */
                .prime-layout {
                    animation: fadeIn 0.3s ease-out;
                }
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                /* Loading state improvements */
                .prime-layout::before {
                    content: '';
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.3s ease;
                    z-index: -1;
                }
                
                /* Subtle grid pattern overlay */
                .prime-layout::after {
                    content: '';
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: 
                        radial-gradient(circle at 2px 2px, rgba(99, 102, 241, 0.03) 1px, transparent 0);
                    background-size: 40px 40px;
                    pointer-events: none;
                    z-index: 1;
                }
            `}</style>
        </div>
    );
}

export default PrimeLayout;