// components/DashboardPage.jsx - VERSION CORRIGÉE

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserService from '../services/UserService';
import { 
  Wallet, Clock, ArrowLeftRight, CreditCard, FileText,
  LogOut, MapPin, PiggyBank, TrendingUp, ChevronRight
} from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('solde');

  // ⚡ Synchroniser activeTab avec l'URL actuelle
  useEffect(() => {
    const path = location.pathname.replace('/', '');
    if (path && ['solde', 'historique', 'virement', 'cartes', 'rib'].includes(path)) {
      setActiveTab(path);
    } else if (path === 'dashboard' || path === '') {
      setActiveTab('solde');
    }
  }, [location.pathname]);

  // ⚡ Rafraîchir l'utilisateur au montage du composant
  useEffect(() => {
    console.log('📊 DashboardPage monté');
    console.log('👤 User actuel:', user);
    
    // Recharger les données utilisateur depuis le service
    if (user?.id) {
      console.log('🔍 Tentative de chargement user ID:', user.id);
      UserService.getUserById(user.id)
        .then(freshUser => {
          console.log('✅ Utilisateur rafraîchi:', freshUser?.name, 'Solde:', freshUser?.balance);
          if (JSON.stringify(freshUser) !== JSON.stringify(user)) {
            updateUser(freshUser);
          }
        })
        .catch(error => {
          console.error('❌ Erreur rafraîchissement:', error);
          console.warn('🚪 Déconnexion forcée - utilisateur introuvable');
          // Déconnecter l'utilisateur si introuvable
          logout();
          navigate('/login');
        });
    } else if (!user) {
      console.warn('⚠️ Pas d\'utilisateur, redirection vers login');
      navigate('/login');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ⚡ Surveiller les changements de user pour détecter les déconnexions
  useEffect(() => {
    console.log('👤 User dans Dashboard:', user?.name, 'Solde:', user?.balance);
    
    if (!user) {
      console.warn('⚠️ Pas d\'utilisateur dans Dashboard, redirection...');
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    console.log('🚪 Déconnexion depuis Dashboard');
    logout();
    navigate('/');
  };

  const handleTabClick = (tabId) => {
    console.log('📍 Clic sur tab:', tabId);
    setActiveTab(tabId);
    
    // Navigation vers les différentes pages
    if (tabId === 'solde') {
      navigate('/solde');
    } else if (tabId === 'historique') {
      navigate('/historique');
    } else if (tabId === 'virement') {
      navigate('/virement');
    } else if (tabId === 'cartes') {
      navigate('/cartes');
    } else if (tabId === 'rib') {
      navigate('/rib');
    }
  };

  // ⚡ PROTECTION : Si pas de user, afficher un loader
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Ihr Konto wird geladen...</p>
        </div>
      </div>
    );
  }

  const balance = user?.balance || 0;
  const lastConnection = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }) + ' ' + new Date().toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const menuItems = [
    { id: 'solde', icon: Wallet, label: 'Solde' },
    { id: 'historique', icon: Clock, label: 'Historique' },
    { id: 'virement', icon: ArrowLeftRight, label: 'Virement' },
    { id: 'cartes', icon: CreditCard, label: 'Cartes' },
    { id: 'rib', icon: FileText, label: 'RIB' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header fixe */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded flex items-center justify-center overflow-hidden">
              <img src="/images/p7.jpeg" alt="Deutsche Bank" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold text-gray-800">DEUTSCHE BANK</span>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition font-medium"
          >
            <LogOut size={18} />
            Abmelden
          </button>
        </div>
      </header>

      {/* Contenu principal avec padding pour header et footer */}
      <main className="max-w-4xl mx-auto px-4 py-6 mt-20 mb-20">
        {/* Carte d'information utilisateur */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {user?.name}
          </h1>
          
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <MapPin size={18} />
            <span>{user?.location || 'Nicht angegeben'}</span>
          </div>

          <div className="mb-2">
            <span className="text-gray-600">Berater: </span>
            <span className="text-blue-900 font-medium">{user?.manager || 'Nicht zugewiesen'}</span>
          </div>

          <div className="text-gray-600 text-sm mb-4">
            Letzte Anmeldung: {lastConnection}
          </div>

          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 px-4 py-2 rounded-full mb-6">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <span className="font-medium">Aktiv</span>
          </div>

          <div className="border-t pt-4">
            <div className="text-4xl font-bold text-gray-800 mb-2">
              {balance.toLocaleString('de-DE', { 
                minimumFractionDigits: 2,
                maximumFractionDigits: 2 
              })} €
            </div>
            <div className="text-gray-600">Verfügbares Guthaben</div>
          </div>
        </div>

        {/* Avertissement si compte bloqué */}
        {user?.isBlocked && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div>
                <p className="text-sm font-medium text-yellow-800 mb-1">
                  Eingeschränkter Zugang
                </p>
                <p className="text-xs text-yellow-700">
                  Ihr Konto ist derzeit gesperrt. Einige Funktionen wie Überweisungen sind nicht verfügbar.
                </p>
                {user.blockReason && (
                  <p className="text-xs text-yellow-700 mt-2">
                    Grund: {user.blockReason}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Section Vos comptes */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Ihre Konten</h2>
            <button className="text-blue-900 font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Alle anzeigen <ChevronRight size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {user?.accounts?.map((account) => {
              const getIcon = (iconName) => {
                switch(iconName) {
                  case 'wallet': return Wallet;
                  case 'piggybank': return PiggyBank;
                  case 'trending': return TrendingUp;
                  default: return Wallet;
                }
              };
              const Icon = getIcon(account.icon);

              return (
                <div 
                  key={account.id}
                  className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-medium text-gray-700 mb-1">
                        {account.type}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        {account.number}
                      </p>
                      <p className="text-3xl font-bold text-gray-800">
                        {account.balance.toLocaleString('de-DE', { 
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2 
                        })} €
                      </p>
                    </div>
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <Icon size={32} className="text-blue-900" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section Dernières opérations */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Letzte Transaktionen</h2>

          {/* Transactions récentes */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Aktuelle Umsätze</h3>
              <button 
                onClick={() => navigate('/historique')}
                className="text-blue-900 font-medium hover:underline"
              >
                Verlauf anzeigen
              </button>
            </div>

            <div className="space-y-4">
              {user?.transactions && user.transactions.length > 0 ? (
                user.transactions.slice(0, 5).map((transaction) => (
                  <div 
                    key={transaction.id}
                    className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <ArrowLeftRight className="text-blue-900" size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{transaction.type}</h4>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                      <p className="text-sm text-gray-600 font-mono">{transaction.reference}</p>
                    </div>
                    <div className={`text-xl font-bold ${
                      transaction.isCredit ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.isCredit ? '+' : '-'}{transaction.amount.toLocaleString('de-DE', { 
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2 
                      })} €
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Keine Transaktionen vorhanden
                </div>
              )}
            </div>
          </div>

          {/* Dépenses par catégorie */}
          {user?.expenses?.categories && user.expenses.categories.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Ausgaben nach Kategorie</h3>
              <p className="text-gray-500 mb-6">{user?.expenses?.month}</p>

              <div className="flex flex-col items-center">
                <svg width="300" height="300" viewBox="0 0 300 300" className="mb-6">
                  <circle 
                    cx="150" 
                    cy="150" 
                    r="120" 
                    fill="none" 
                    stroke="#f3f4f6" 
                    strokeWidth="60"
                  />
                  {user.expenses.categories.map((category, index) => {
                    const total = user.expenses.categories.reduce((sum, cat) => sum + cat.value, 0);
                    
                    const previousValues = user.expenses.categories
                      .slice(0, index)
                      .reduce((sum, cat) => sum + cat.value, 0);
                    
                    const startAngle = -90 + (previousValues / total) * 360;
                    const endAngle = startAngle + (category.value / total) * 360;
                    
                    const startX = 150 + 120 * Math.cos((startAngle * Math.PI) / 180);
                    const startY = 150 + 120 * Math.sin((startAngle * Math.PI) / 180);
                    const endX = 150 + 120 * Math.cos((endAngle * Math.PI) / 180);
                    const endY = 150 + 120 * Math.sin((endAngle * Math.PI) / 180);
                    
                    const largeArcFlag = category.value / total > 0.5 ? 1 : 0;
                    
                    return (
                      <path
                        key={category.name}
                        d={`M 150 150 L ${startX} ${startY} A 120 120 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                        fill={category.color}
                      />
                    );
                  })}
                  <circle cx="150" cy="150" r="80" fill="white" />
                </svg>

                <div className="grid grid-cols-2 gap-4 w-full">
                  {user.expenses.categories.map((category) => (
                    <div key={category.name} className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="text-sm text-gray-700">{category.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Navigation inférieure fixe */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40">
        <div className="max-w-4xl mx-auto px-2">
          <div className="flex items-center justify-around">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex flex-col items-center gap-1 py-3 px-4 transition ${
                  activeTab === item.id
                    ? 'text-blue-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <item.icon size={24} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}