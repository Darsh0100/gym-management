import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import GymForm from '../components/GymForm';

const EditGym = () => {
    const { id } = useParams();
    const [gym, setGym] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const fetchGym = async () => {
            try {
                const response = await api.get(`/gyms/${id}`);
                const data = response.data;
                // Transform facilities array back to string for input
                if (Array.isArray(data.facilities)) {
                    data.facilities = data.facilities.join(', ');
                }
                setGym(data);
            } catch (err) {
                setError('Failed to fetch gym details');
            } finally {
                setLoading(false);
            }
        };
        fetchGym();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this gym? This action cannot be undone.')) {
            return;
        }

        setDeleting(true);
        try {
            await api.delete(`/gyms/${id}`);
            alert('Gym deleted successfully');
            navigate('/dashboard');
        } catch (error) {
            console.error("Failed to delete gym", error);
            alert(error.response?.data?.message || 'Failed to delete gym');
            setDeleting(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="max-w-2xl mx-auto px-4 pt-28 pb-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Gym</h1>
                <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                >
                    {deleting ? 'Deleting...' : 'Delete Gym'}
                </button>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <GymForm initialData={gym} isEdit={true} gymId={id} />
            </div>
        </div>
    );
};

export default EditGym;
