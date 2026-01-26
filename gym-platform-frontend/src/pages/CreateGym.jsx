import GymForm from '../components/GymForm';

const CreateGym = () => {
    return (
        <div className="max-w-2xl mx-auto px-4 pt-28 pb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">List Your Gym</h1>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <GymForm isEdit={false} />
            </div>
        </div>
    );
};

export default CreateGym;
