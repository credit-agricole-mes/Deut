import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowLeft, Wallet, Clock, ArrowLeftRight, CreditCard, FileText,
  Search, Filter, Download, ChevronRight
} from 'lucide-react';

export default function HistoriquePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('historique');

  // ⚡ Synchroniser activeTab avec l'URL actuelle
  useEffect(() => {
    const path = location.pathname.replace('/', '');
    if (path && ['solde', 'historique', 'virement', 'cartes', 'rib'].includes(path)) {
      setActiveTab(path);
    } else if (path === 'dashboard' || path === '') {
      setActiveTab('solde');
    }
  }, [location.pathname]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    navigate(`/${tabId}`);
  };

  const transactions = user?.transactions || [];

  const filteredTransactions = transactions.filter(transaction => 
    transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const menuItems = [
    { id: 'solde', icon: Wallet, label: 'Solde' },
    { id: 'historique', icon: Clock, label: 'Historique' },
    { id: 'virement', icon: ArrowLeftRight, label: 'Virement' },
    { id: 'cartes', icon: CreditCard, label: 'Cartes' },
    { id: 'rib', icon: FileText, label: 'RIB' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={20} />
              <span>Zurück</span>
            </button>
            <h1 className="text-xl font-bold text-gray-800">Verlauf</h1>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Download size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Barre de recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Transaktion suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 mt-36 pb-24">
        {/* Filtres */}
        <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
          <button className="px-4 py-2 bg-blue-900 text-white rounded-full text-sm font-medium whitespace-nowrap">
            Alle
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50 whitespace-nowrap">
            Einnahmen
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50 whitespace-nowrap">
            Ausgaben
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50 flex items-center gap-2 whitespace-nowrap">
            <Filter size={16} />
            Filter
          </button>
        </div>

        {/* Liste des transactions */}
        {filteredTransactions.length > 0 ? (
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div 
                key={transaction.id}
                className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      transaction.isCredit ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <ArrowLeftRight 
                        className={transaction.isCredit ? 'text-green-600' : 'text-red-600'} 
                        size={24} 
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 mb-1">
                        {transaction.type}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {transaction.date}
                      </p>
                      <p className="text-xs text-gray-400 font-mono mt-1">
                        {transaction.reference}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`text-xl font-bold ${
                      transaction.isCredit ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.isCredit ? '+' : '-'}
                      {transaction.amount.toLocaleString('de-DE', { 
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2 
                      })} €
                    </div>
                    <ChevronRight className="text-gray-400" size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Clock className="mx-auto text-gray-300 mb-4" size={64} />
            <p className="text-gray-500 text-lg">Keine Transaktionen gefunden</p>
          </div>
        )}
      </main>

      {/* Footer Navigation */}
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