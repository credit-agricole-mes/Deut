import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SoldePage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Rediriger immédiatement vers le dashboard
    navigate('/dashboard');
  }, [navigate]);

  // Afficher un loader pendant la redirection
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Lädt...</p>
      </div>
    </div>
  );
}