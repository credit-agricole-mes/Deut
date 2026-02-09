import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Components
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import FeatureCards from './components/FeatureCards';
import HeroSection from './components/HeroSection';
import AjoutBeneficiare from './components/AjoutBeneficiare';
import CartesPage from './components/CartesPage';
import HistoriquePage from './components/HistoriquePage';
import InscriptionPage from './components/InscriptionPage';
import LoginPage from './components/LoginPage';
import RecuPage from './components/RecuPage';
import RibPage from './components/RibPage';
import SoldePage from './components/SoldePage';
import VirementPage from './components/VirementPage';

// Services
import UserService from './services/UserService';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  const handleNavigateToInscription = () => {
    navigate('/inscription');
  };

  // Afficher le Header seulement sur la page d'accueil
  const showHeader = location.pathname === '/';

  return (
    <div className="App">
      {showHeader && (
        <Header 
          onNavigateToLogin={handleNavigateToLogin}
          onNavigateToInscription={handleNavigateToInscription}
        />
      )}
      
      <Routes>
        {/* Page d'accueil */}
        <Route path="/" element={
          <>
            <HeroSection onNavigateToLogin={handleNavigateToLogin} />
            <FeatureCards onNavigateToLogin={handleNavigateToLogin} />
          </>
        } />
        
        {/* Pages d'authentification */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/inscription" element={<InscriptionPage />} />
        
        {/* Pages de l'application */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cartes" element={<CartesPage />} />
        <Route path="/virement" element={<VirementPage />} />
        <Route path="/solde" element={<SoldePage />} />
        <Route path="/historique" element={<HistoriquePage />} />
        <Route path="/recu" element={<RecuPage />} />
        <Route path="/rib" element={<RibPage />} />
        <Route path="/beneficiaire/ajouter" element={<AjoutBeneficiare />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;