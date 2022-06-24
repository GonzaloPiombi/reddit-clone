import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, isLoading } = useAuth();

  if (currentUser === undefined || isLoading) {
    return null;
  }

  return currentUser ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
