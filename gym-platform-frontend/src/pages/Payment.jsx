import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Lock, CreditCard, ShieldCheck } from 'lucide-react';

const Payment = () => {
    const [searchParams] = useSearchParams();
    const paymentId = searchParams.get('paymentId');
    const navigate = useNavigate();

    // We don't have an endpoint to get payment details by ID yet, 
    // but we can assume we might add one or just show the confirmation knowing the ID exists.
    // Ideally, we fetch payment details to show amount. 
    // For now, we will assume standard flow or maybe pass state. 
    // Actually, let's just show a generic "Complete Payment" with mock card details.

    // IF we want to show details, we need GET /payments/:id.
    // Let's rely on the user having just clicked enroll.

    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false);

    const handleConfirm = async () => {
        setProcessing(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); // Mock network delay
            const response = await api.post('/payments/confirm', { paymentId });
            alert(response.data.message || 'Payment Successful!');
            navigate('/dashboard');
        } catch (error) {
            console.error("Payment failed", error);
            alert(error.response?.data?.message || 'Payment failed');
            setProcessing(false);
        }
    };

    if (!paymentId) return <div className="p-8 text-center text-red-500">Invalid Payment Session</div>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center pt-28 pb-12 sm:px-6 lg:px-8 transition-colors">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">Secure Checkout</h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
                    Complete your enrollment securely.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200 dark:border-gray-700">
                    <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Payment Method</h3>
                        <div className="border rounded-md p-4 flex items-center bg-gray-50 dark:bg-gray-700/50 border-blue-200 dark:border-blue-900/50">
                            <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Mock Credit Card</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">**** **** **** 4242</p>
                            </div>
                            <ShieldCheck className="h-5 w-5 text-green-500 ml-auto" />
                        </div>
                    </div>

                    <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                        <button
                            onClick={handleConfirm}
                            disabled={processing}
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                                ${processing ? 'bg-blue-400 dark:bg-blue-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
                        >
                            {processing ? 'Processing Payment...' : 'Pay & Confirm'}
                        </button>
                    </div>

                    <div className="mt-4 text-center">
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                            This is a secure 256-bit SSL encrypted payment.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
