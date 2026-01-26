import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import AuthCallback from './pages/AuthCallback';
import ProtectedRoute from './components/ProtectedRoute';

import GymDetails from './pages/GymDetails';
import Gyms from './pages/Gyms';
import CreateGym from './pages/CreateGym';
import EditGym from './pages/EditGym';
import CreatePlan from './pages/CreatePlan';
import EditPlan from './pages/EditPlan';
import Payment from './pages/Payment';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

// Placeholder pages
const NotFound = () => <div className="p-8 text-center text-xl">404 - Page Not Found</div>;

import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/gyms" element={<Gyms />} />
              <Route path="/gyms/:id" element={<GymDetails />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/gyms/create" element={<CreateGym />} />
                <Route path="/gyms/:id/edit" element={<EditGym />} />
                <Route path="/gyms/:gymId/plans/create" element={<CreatePlan />} />
                <Route path="/plans/:planId/edit" element={<EditPlan />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
