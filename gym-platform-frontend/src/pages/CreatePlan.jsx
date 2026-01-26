import { useParams } from 'react-router-dom';
import PlanForm from '../components/PlanForm';

const CreatePlan = () => {
    const { gymId } = useParams();

    return (
        <div className="max-w-2xl mx-auto px-4 pt-28 pb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add Membership Plan</h1>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <PlanForm isEdit={false} gymId={gymId} />
            </div>
        </div>
    );
};

export default CreatePlan;
