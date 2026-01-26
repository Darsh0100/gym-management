import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Calendar, User } from 'lucide-react';

const Dashboard = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const response = await api.get('/my-enrollments');
                setEnrollments(response.data);
            } catch (error) {
                console.error("Failed to fetch enrollments", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEnrollments();
    }, []);

    if (loading) return <div className="p-8">Loading dashboard...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8 min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Dashboard</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-300">Manage your gym memberships and subscriptions.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md border border-gray-200 dark:border-gray-700">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Active Enrollments</h3>
                </div>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {enrollments.length === 0 ? (
                        <li className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                            No active enrollments found. <a href="/gyms" className="text-blue-600 hover:underline">Explore Gyms</a>
                        </li>
                    ) : (
                        enrollments.map((enrollment) => (
                            <li key={enrollment._id}>
                                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 truncate">{enrollment.gymId?.name || "Unknown Gym"}</p>
                                        <div className="ml-2 flex-shrink-0 flex">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${new Date(enrollment.endDate) > new Date() ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                                }`}>
                                                {new Date(enrollment.endDate) > new Date() ? 'Active' : 'Expired'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                        <div className="sm:flex">
                                            <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                <User className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                                {enrollment.planId?.name || "Unknown Plan"}
                                            </p>
                                        </div>
                                        <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                                            <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                            <p>
                                                Expires on <time dateTime={enrollment.endDate}>{new Date(enrollment.endDate).toLocaleDateString()}</time>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
