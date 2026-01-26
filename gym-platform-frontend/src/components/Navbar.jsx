import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, Dumbbell, User, LogOut, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass shadow-sm py-2' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-shrink-0 flex items-center"
                    >
                        <Link to="/" className="flex items-center gap-3 group focus:outline-none">
                            <div className="bg-blue-600 p-2 rounded-lg shadow-md group-hover:bg-blue-700 transition-colors flex items-center justify-center">
                                <Dumbbell className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Gym<span className="text-blue-600 dark:text-blue-500">Fit</span>
                            </span>
                        </Link>
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex sm:items-center sm:space-x-8">
                        {['/', '/gyms'].map((path) => (
                            <Link
                                key={path}
                                to={path}
                                className={`relative px-1 py-2 text-sm font-medium transition-colors ${isActive(path) ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                                    }`}
                            >
                                {path === '/' ? 'Home' : 'Gyms'}
                                {isActive(path) && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                                    />
                                )}
                            </Link>
                        ))}

                        {user && (
                            <Link
                                to="/dashboard"
                                className={`relative px-1 py-2 text-sm font-medium transition-colors ${isActive('/dashboard') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                                    }`}
                            >
                                Dashboard
                            </Link>
                        )}

                        {user?.role === 'owner' && (
                            <Link
                                to="/gyms/create"
                                className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors"
                            >
                                Add Gym
                            </Link>
                        )}

                        <div className="border-l border-gray-200 h-6 mx-2"></div>

                        {user ? (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/profile"
                                    className="flex items-center space-x-2 hover:bg-gray-50 p-1.5 rounded-lg transition-colors group"
                                    title="View Profile"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-md group-hover:shadow-lg transition-shadow">
                                        {user.name ? user.name.charAt(0).toUpperCase() : <User size={14} />}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden lg:block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{user.name || 'User'}</span>
                                </Link>
                                <button
                                    onClick={logout}
                                    className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                    title="Sign Out"
                                >
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:-translate-y-0.5"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                        >
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="sm:hidden glass border-t border-gray-100"
                    >
                        <div className="pt-2 pb-3 space-y-1 px-4">
                            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">Home</Link>
                            <Link to="/gyms" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">Gyms</Link>
                            {user && <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">Dashboard</Link>}
                            {user?.role === 'owner' && <Link to="/gyms/create" className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 bg-blue-50">Add Gym</Link>}

                            <div className="border-t border-gray-200 my-2"></div>

                            {!user ? (
                                <Link to="/login" className="block w-full text-center px-4 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700">Sign In</Link>
                            ) : (
                                <button onClick={logout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">Sign Out</button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
