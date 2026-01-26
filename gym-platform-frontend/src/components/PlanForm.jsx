import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from '../api/axios';
import { Loader2 } from 'lucide-react';

const PlanForm = ({ initialData, isEdit = false, gymId, planId }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialData || {
            name: '',
            price: '',
            duration: '',
            benefits: '',
        }
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            // Convert benefits string to array
            const benefitsArray = typeof data.benefits === 'string'
                ? data.benefits.split(',').map(b => b.trim()).filter(b => b)
                : data.benefits;

            const payload = {
                ...data,
                benefits: benefitsArray,
                price: Number(data.price),
                duration: Number(data.duration),
                gymId: gymId // Required for creating a plan
            };

            if (isEdit) {
                await api.put(`/plans/${planId}`, payload);
                alert('Plan updated successfully!');
                // We assume navigation back to the gym details is desired, but we need the gymID. 
                // If we don't have it in props for edit, we might need to rely on the backend response or separate fetch.
                // For now, let's assume the user navigates back manually or we go back one step.
                navigate(-1);
            } else {
                await api.post('/plans', payload);
                alert('Plan created successfully!');
                navigate(`/gyms/${gymId}`);
            }
        } catch (error) {
            console.error("Form submission failed", error);
            alert(error.response?.data?.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Plan Name</label>
                <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    placeholder="e.g. Monthly Gold"
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 sm:text-sm p-2 border transition-colors"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price ($)</label>
                <input
                    {...register("price", { required: "Price is required", min: 0 })}
                    type="number"
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white sm:text-sm p-2 border transition-colors"
                />
                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Duration (Days)</label>
                <input
                    {...register("duration", { required: "Duration is required", min: 1 })}
                    type="number"
                    placeholder="e.g. 30"
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 sm:text-sm p-2 border transition-colors"
                />
                {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Benefits (comma separated)</label>
                <input
                    {...register("benefits")}
                    type="text"
                    placeholder="Gym Access, Personal Trainer, Sauna"
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 sm:text-sm p-2 border transition-colors"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Separate multiple benefits with commas.</p>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : (isEdit ? 'Update Plan' : 'Create Plan')}
            </button>
        </form>
    );
};

export default PlanForm;
