import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import PlanForm from '../components/PlanForm';

const EditPlan = () => {
    const { planId } = useParams();
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const [deleting, setDeleting] = useState(false);

    // We need to fetch plan details. Note: The backend API `GET /plans/:id` doesn't exist explicitly in the provided routes list 
    // (only getPlansByGym exists). However, updatePlan (`PUT /plans/:id`) exists.
    // We might need to fetch all plans for the gym or hope there's a get plan endpoint.
    // Looking at `plan.routes.js`, there is NO `GET /plans/:id`. 
    // Workaround: We can't easily fetch a single plan. 
    // OPTION 1: Add `GET /plans/:id` to backend (Best).
    // OPTION 2: Pass plan data via router state (Fragile on refresh).
    // OPTION 3: Fetch all plans for the gym (Need gymId, which we don't have from just planId URL).

    // Let's assume we should add the endpoint to the backend for correctness.
    // Or, since I can see the backend code, I can check if I can add it quickly.
    // For now, I'll write this component assuming I will add the endpoint.

    useEffect(() => {
        const fetchPlan = async () => {
            try {
                const response = await api.get(`/plans/${planId}`);
                const data = response.data;
                if (Array.isArray(data.benefits)) {
                    data.benefits = data.benefits.join(', ');
                }
                setPlan(data);
            } catch (err) {
                setError('Failed to fetch plan details. The endpoint might be missing.');
            } finally {
                setLoading(false);
            }
        };
        fetchPlan();
    }, [planId]);

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this plan?')) {
            return;
        }

        setDeleting(true);
        try {
            // Need to get gymId to redirect back to gym details properly
            const gymId = plan?.gymId;
            await api.delete(`/plans/${planId}`);
            alert('Plan deleted successfully');
            if (gymId) {
                navigate(`/gyms/${gymId}`);
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error("Failed to delete plan", error);
            alert(error.response?.data?.message || 'Failed to delete plan');
            setDeleting(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="max-w-2xl mx-auto px-4 pt-28 pb-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Membership Plan</h1>
                <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                >
                    {deleting ? 'Deleting...' : 'Delete Plan'}
                </button>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <PlanForm initialData={plan} isEdit={true} planId={planId} />
            </div>
        </div>
    );
};

export default EditPlan;
