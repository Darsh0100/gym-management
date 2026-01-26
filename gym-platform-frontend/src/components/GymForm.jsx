import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from '../api/axios';
import { Loader2 } from 'lucide-react';

const GymForm = ({ initialData, isEdit = false, gymId }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialData || {
            name: '',
            address: '',
            city: '',
            description: '',
            facilities: '',
        }
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [selectedImages, setSelectedImages] = useState([]); // New state for images

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('address', data.address);
            formData.append('city', data.city);
            formData.append('description', data.description || '');

            // Handle facilities
            const facilitiesArray = typeof data.facilities === 'string'
                ? data.facilities.split(',').map(f => f.trim()).filter(f => f)
                : (Array.isArray(data.facilities) ? data.facilities : []);

            facilitiesArray.forEach((facility, index) => {
                formData.append(`facilities[${index}]`, facility);
            });

            // Handle images
            if (selectedImages) {
                Array.from(selectedImages).forEach((file) => {
                    formData.append('images', file);
                });
            }

            if (isEdit) {
                await api.put(`/gyms/${gymId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                alert('Gym updated successfully!');
                navigate(`/gyms/${gymId}`);
            } else {
                await api.post('/gyms', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                alert('Gym created successfully!');
                navigate('/gyms');
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gym Name</label>
                <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white sm:text-sm p-2 border transition-colors"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                <input
                    {...register("address", { required: "Address is required" })}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white sm:text-sm p-2 border transition-colors"
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                <input
                    {...register("city", { required: "City is required" })}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white sm:text-sm p-2 border transition-colors"
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                    {...register("description")}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white sm:text-sm p-2 border transition-colors"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Facilities (comma separated)</label>
                <input
                    {...register("facilities")}
                    type="text"
                    placeholder="WiFi, Sauna, Pool"
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 sm:text-sm p-2 border transition-colors"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Separate multiple facilities with commas.</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Images (Max 5)</label>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setSelectedImages(e.target.files)}
                    className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900/30 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/50 transition-colors"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">First image will be the cover.</p>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : (isEdit ? 'Update Gym' : 'Create Gym')}
            </button>
        </form>
    );
};

export default GymForm;
