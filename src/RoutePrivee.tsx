import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Navigate } from 'react-router'

interface RoutePriveeProps {
  children: React.ReactNode;
}
export const RoutePrivee: React.FC<RoutePriveeProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  console.log("isLoading:", isLoading);
  console.log("isAuthenticated:", isAuthenticated);

  if (isLoading) {
    return <div>Chargement...</div>
  }
  if (!isAuthenticated) {
    return <Navigate to="/connexion-requise" />;
  }

  return <>{children}</>;
};
