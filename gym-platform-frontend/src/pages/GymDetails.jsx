import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { MapPin, CheckCircle, Dumbbell } from 'lucide-react';
import ReviewSection from '../components/ReviewSection';
import ImageCarousel from '../components/ImageCarousel';

const GymDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [gym, setGym] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchGym = async () => {
            try {
                const response = await api.get(`/gyms/${id}`);
                setGym(response.data);
            } catch (err) {
                setError('Failed to fetch gym details');
            } finally {
                setLoading(false);
            }
        };
        fetchGym();
    }, [id]);

    if (loading) return <div className="p-8 text-center">Loading gym details...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
    if (!gym) return <div className="p-8 text-center">Gym not found</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8 min-h-screen">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="h-64 sm:h-96 bg-gray-200 dark:bg-gray-700 w-full relative">
                    {gym.images && gym.images.length > 0 ? (
                        <ImageCarousel images={gym.images} />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                            <Dumbbell className="h-20 w-20" />
                        </div>
                    )}
                </div>
                <div className="p-6 sm:p-10">
                    <div className="md:flex md:justify-between md:items-start">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">{gym.name}</h1>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${gym.address}, ${gym.city}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center mt-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                            >
                                <MapPin className="h-5 w-5 mr-1 group-hover:animate-bounce" />
                                <span className="text-lg underline decoration-transparent group-hover:decoration-current transition-all">
                                    {gym.address}, {gym.city}
                                </span>
                            </a>
                        </div>
                        {user?.id === gym.ownerId && (
                            <div className="mt-4 md:mt-0">
                                <button
                                    onClick={() => navigate(`/gyms/${id}/edit`)}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Edit Gym
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">About this Gym</h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{gym.description || "No description provided."}</p>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Facilities</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {gym.facilities?.map((facility, idx) => (
                                <div key={idx} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-700">
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">{facility}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Plans section */}
                    <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Membership Plans</h2>
                            {user?.id === gym.ownerId && (
                                <button
                                    onClick={() => navigate(`/gyms/${id}/plans/create`)}
                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    + Add Plan
                                </button>
                            )}
                        </div>
                        <PlansSection gymId={id} isOwner={user?.id === gym.ownerId} />
                    </div>
                </div>
                <div className="p-6 sm:p-10 border-t border-gray-100 dark:border-gray-700">
                    <ReviewSection gymId={id} />
                </div>
            </div>
        </div>
    );
};

const PlansSection = ({ gymId, isOwner }) => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [enrolling, setEnrolling] = useState(null);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await api.get(`/gyms/${gymId}/plans`);
                setPlans(response.data);
            } catch (error) {
                console.error("Failed to fetch plans", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPlans();
    }, [gymId]);

    const handleEnroll = async (planId) => {
        if (!user) {
            navigate('/login');
            return;
        }

        setEnrolling(planId);
        try {
            // Step 1: Create Payment
            const paymentResponse = await api.post('/payments/create', { planId });
            const { paymentId } = paymentResponse.data;

            // Step 2: Redirect to Payment Page
            navigate(`/payment?paymentId=${paymentId}`);

        } catch (error) {
            console.error("Enrollment failed (init)", error);
            alert(error.response?.data?.message || 'Enrollment failed. Please try again.');
        } finally {
            setEnrolling(null);
        }
    };

    if (loading) return <div>Loading plans...</div>;
    if (plans.length === 0) return <div className="text-gray-500">No plans available for this gym yet.</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
                <div key={plan._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow flex flex-col relative">
                    {isOwner && (
                        <button
                            onClick={() => navigate(`/plans/${plan._id}/edit`)}
                            className="absolute top-4 right-4 text-xs font-medium text-blue-600 hover:text-blue-500 underline"
                        >
                            Edit
                        </button>
                    )}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white pr-8">{plan.name}</h3>
                    <div className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">${plan.price}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">per {plan.duration} days</div>

                    <ul className="mt-6 space-y-3 flex-1">
                        {plan.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                {benefit}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-8">
                        <button
                            onClick={() => handleEnroll(plan._id)}
                            disabled={enrolling === plan._id}
                            className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                                ${enrolling === plan._id ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                        >
                            {enrolling === plan._id ? 'Processing...' : 'Enroll Now'}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GymDetails;
