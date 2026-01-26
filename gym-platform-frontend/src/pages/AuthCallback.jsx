import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            login(token);
            // Small delay to ensure state updates or just standard navigation
            navigate('/dashboard', { replace: true });

        } else {
            navigate('/login');
        }
    }, [searchParams, login, navigate]);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-xl">Logging you in...</div>
        </div>
    );
};

export default AuthCallback;
