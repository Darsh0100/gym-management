import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Users, HeartPulse, Dumbbell } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { fadeInUp, staggerContainer, float, pulseBlob } from '../utils/animations';
import CountUpStats from '../components/CountUpStats';

const Home = () => {
    const { user } = useAuth();
    return (
        <div className="bg-white dark:bg-gray-900 transition-colors duration-300 scroll-smooth relative overflow-hidden min-h-screen">
            {/* Animated Background Blobs */}
            <motion.div
                variants={pulseBlob}
                animate="animate"
                className="absolute -top-40 -left-20 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full blur-3xl opacity-30 -z-10"
            />
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-0 w-[30rem] h-[30rem] bg-indigo-200 dark:bg-indigo-900/30 rounded-full blur-3xl opacity-30 -z-10"
            />

            {/* Floating Elements */}
            <motion.div variants={float} animate="animate" className="absolute top-40 left-[10%] opacity-20 hidden md:block z-0">
                <Dumbbell className="w-16 h-16 text-blue-400 dark:text-blue-500" />
            </motion.div>
            <motion.div
                animate={{
                    y: [0, 30, 0],
                    rotate: [0, -10, 10, 0],
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-60 right-[15%] opacity-20 hidden md:block z-0"
            >
                <HeartPulse className="w-20 h-20 text-indigo-400 dark:text-indigo-500" />
            </motion.div>

            {/* Hero Section */}
            <div className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold text-sm tracking-wide border border-blue-100 dark:border-blue-800/50"
                    >
                        🚀 The #1 Gym Booking Platform
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6"
                    >
                        Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Body</span> <br className="hidden md:block" />
                        Type Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">Life</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300"
                    >
                        Access premium gyms, studios, and fitness centers near you. No contracts, just fitness freedom.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0"
                    >
                        <Link to="/gyms" className="w-full sm:w-auto px-8 py-4 border border-transparent text-lg font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center">
                            Find a Gym Near You <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        {!user ? (
                            <Link to="/login" className="w-full sm:w-auto px-8 py-4 border border-gray-300 dark:border-gray-600 text-lg font-medium rounded-full text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 md:py-4 md:text-lg transition-all transform hover:-translate-y-1 flex items-center justify-center">
                                Member Login
                            </Link>
                        ) : (
                            <Link to="/dashboard" className="w-full sm:w-auto px-8 py-4 border border-blue-200 dark:border-blue-900 text-lg font-medium rounded-full text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 md:py-4 md:text-lg transition-all transform hover:-translate-y-1 flex items-center justify-center">
                                Go to Dashboard
                            </Link>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Stats / Social Proof */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="mt-8 mb-20 sm:mt-16 border-t border-gray-100 dark:border-gray-800 pt-10 px-4"
            >
                <dl className="grid grid-cols-1 gap-x-8 gap-y-12 text-center lg:grid-cols-3 max-w-7xl mx-auto">
                    {[
                        { id: 1, name: 'Active Users', value: 10000, icon: Users },
                        { id: 2, name: 'Partner Gyms', value: 500, icon: Dumbbell },
                        { id: 3, name: 'Success Stories', value: 98, suffix: '%', icon: Trophy },
                    ].map((stat) => (
                        <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-3">
                            <div className="mx-auto p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl">
                                <stat.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <dt className="text-base leading-7 text-gray-600 dark:text-gray-400">{stat.name}</dt>
                            <dd className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                <CountUpStats value={stat.value} suffix={stat.suffix} />
                            </dd>
                        </div>
                    ))}
                </dl>
            </motion.div>
        </div>

    );
};

// Simple Icon wrapper for the grid above
const DumbbellIcon = (props) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M6.5 6.5h11" />
        <path d="M6.5 17.5h11" />
        <path d="M6 20v-2a6 6 0 1 1 12 0v2" />
        <path d="M5 4v2a6 6 0 1 0 12 0V4" />
    </svg>
);

export default Home;
