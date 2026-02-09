import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowLeft, CreditCard, Lock, Unlock, Eye, EyeOff, 
  Settings, Plus, AlertCircle, Check, Globe, Key,
  Wallet, Clock, ArrowLeftRight, FileText
} from 'lucide-react';

export default function CartesPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [currentPage, setCurrentPage] = useState('cartes');
  const [cardStatus, setCardStatus] = useState('active');
  const [plafondRetrait, setPlafondRetrait] = useState(user?.cards?.[0]?.dailyWithdrawalLimit || 0);
  const [plafondPaiement, setPlafondPaiement] = useState(user?.cards?.[0]?.weeklyPaymentLimit || 0);
  const [paiementEtranger, setPaiementEtranger] = useState(user?.cards?.[0]?.internationalPaymentEnabled || false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('cartes');

  // Vérifier que l'utilisateur existe
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="text-red-600 mx-auto mb-4" size={48} />
          <p className="text-gray-600 text-lg">Fehler: Benutzer nicht gefunden</p>
        </div>
      </div>
    );
  }

  const currentUser = user;

  // Fonction de navigation simplifiée
  const handleNavigate = (page) => {
    if (page === 'dashboard' || page === 'solde' || page === 'historique' || page === 'virement' || page === 'rib') {
      navigate(`/${page}`);
    } else {
      setCurrentPage(page);
    }
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'cartes') {
      setCurrentPage('cartes');
    } else {
      navigate(`/${tabId}`);
    }
  };

  const generateCardNumber = (userId) => {
    const baseNumber = '4532';
    const userPart = String(userId).padStart(4, '0');
    const randomPart = '7892';
    const lastFour = String(1234 + userId).padStart(4, '0');
    return `${baseNumber} ${userPart} ${randomPart} ${lastFour}`;
  };

  const fullCardNumber = currentUser.cards?.[0]?.cardNumber || generateCardNumber(currentUser.id);
  const card = {
    id: 1,
    type: currentUser.cards?.[0]?.type || 'Bankkarte',
    number: currentUser.cards?.[0]?.maskedNumber || `${fullCardNumber.split(' ')[0]} **** **** ${fullCardNumber.split(' ')[3]}`,
    fullNumber: fullCardNumber,
    expiry: currentUser.cards?.[0]?.expiryDate || '12/27',
    color: 'from-blue-900 to-blue-800'
  };

  const menuItems = [
    { id: 'solde', icon: Wallet, label: 'Guthaben' },
    { id: 'historique', icon: Clock, label: 'Verlauf' },
    { id: 'virement', icon: ArrowLeftRight, label: 'Überweisung' },
    { id: 'cartes', icon: CreditCard, label: 'Karten' },
    { id: 'rib', icon: FileText, label: 'Bankverbindung' },
  ];

  const renderBloquerPage = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-center mb-6">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
            cardStatus === 'active' ? 'bg-red-100' : 'bg-green-100'
          }`}>
            {cardStatus === 'active' ? (
              <Lock className="text-red-600" size={40} />
            ) : (
              <Unlock className="text-green-600" size={40} />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {cardStatus === 'active' ? 'Karte sperren' : 'Karte entsperren'}
          </h2>
          <p className="text-gray-600">
            {cardStatus === 'active' 
              ? 'Ihre Karte wird sofort gesperrt und kann nicht mehr verwendet werden'
              : 'Ihre Karte wird sofort wieder aktiviert'}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-amber-600" size={24} />
            <div className="text-sm text-gray-700">
              {cardStatus === 'active' ? (
                <>
                  <p className="font-medium mb-2">Beim Sperren Ihrer Karte:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Alle Zahlungen werden abgelehnt</li>
                    <li>Abhebungen sind nicht möglich</li>
                    <li>Sie können sie jederzeit entsperren</li>
                  </ul>
                </>
              ) : (
                <>
                  <p className="font-medium mb-2">Beim Entsperren Ihrer Karte:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Zahlungen sind wieder möglich</li>
                    <li>Abhebungen sind möglich</li>
                    <li>Ihre üblichen Limits gelten</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>

        <button 
          onClick={() => {
            setCardStatus(cardStatus === 'active' ? 'blocked' : 'active');
            setTimeout(() => handleNavigate('cartes'), 1500);
          }}
          className={`w-full py-4 rounded-xl font-medium transition flex items-center justify-center gap-2 ${
            cardStatus === 'active' 
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {cardStatus === 'active' ? <Lock size={20} /> : <Unlock size={20} />}
          {cardStatus === 'active' ? 'Karte sperren' : 'Karte entsperren'}
        </button>

        <button 
          onClick={() => handleNavigate('cartes')}
          className="w-full mt-3 py-3 text-gray-600 hover:text-gray-800 font-medium"
        >
          Abbrechen
        </button>
      </div>
    </div>
  );

  const renderPlafondsPage = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Limits verwalten</h2>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <label className="text-lg font-medium text-gray-700">Abhebungslimit</label>
            <span className="text-2xl font-bold text-blue-900">{plafondRetrait}€</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="1000" 
            step="50"
            value={plafondRetrait}
            onChange={(e) => setPlafondRetrait(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>0€</span>
            <span>1000€</span>
          </div>
          <p className="text-sm text-gray-600 mt-3">Limit pro Tag</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <label className="text-lg font-medium text-gray-700">Zahlungslimit</label>
            <span className="text-2xl font-bold text-blue-900">{plafondPaiement}€</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="5000" 
            step="100"
            value={plafondPaiement}
            onChange={(e) => setPlafondPaiement(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>0€</span>
            <span>5000€</span>
          </div>
          <p className="text-sm text-gray-600 mt-3">Limit pro Woche</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-blue-600" size={20} />
            <p className="text-sm text-blue-900">
              Änderungen werden sofort angewendet. Sie können Ihre Limits jederzeit anpassen.
            </p>
          </div>
        </div>

        <button 
          onClick={() => handleNavigate('cartes')}
          className="w-full bg-blue-900 hover:bg-blue-950 text-white py-4 rounded-xl font-medium transition flex items-center justify-center gap-2"
        >
          <Check size={20} />
          Änderungen speichern
        </button>
      </div>
    </div>
  );

  const renderPaiementEtrangerPage = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-blue-100 mx-auto rounded-full flex items-center justify-center mb-4">
            <Globe className="text-blue-900" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Auslandszahlungen</h2>
          <p className="text-gray-600">Verwalten Sie die Nutzung Ihrer Karte außerhalb der Eurozone</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Internationale Zahlungen</h3>
              <p className="text-sm text-gray-600">
                {paiementEtranger ? 'Aktiviert' : 'Deaktiviert'}
              </p>
            </div>
            <button 
              onClick={() => setPaiementEtranger(!paiementEtranger)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                paiementEtranger ? 'bg-blue-900' : 'bg-gray-300'
              }`}
            >
              <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                paiementEtranger ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-amber-50 rounded-lg p-4">
            <h4 className="font-medium text-amber-900 mb-2">Anfallende Gebühren</h4>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• Zahlungen: 2% des Betrags (mind. 2€)</li>
              <li>• Abhebungen: 3% des Betrags (mind. 3€)</li>
              <li>• Wechselkurs: nach Interbankenkurs</li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Abgedeckte Gebiete</h4>
            <p className="text-sm text-blue-800">
              Über 200 Länder akzeptieren Ihre Karte. Zahlungen werden automatisch in die Landeswährung umgerechnet.
            </p>
          </div>
        </div>

        <button 
          onClick={() => handleNavigate('cartes')}
          className="w-full bg-blue-900 hover:bg-blue-950 text-white py-4 rounded-xl font-medium transition"
        >
          Zurück zu meinen Karten
        </button>
      </div>
    </div>
  );

  const renderCodePinPage = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-purple-100 mx-auto rounded-full flex items-center justify-center mb-4">
            <Key className="text-purple-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">PIN-Code</h2>
          <p className="text-gray-600">Verwalten Sie den PIN Ihrer Karte</p>
        </div>

        <div className="space-y-4">
          <button className="w-full bg-gray-50 hover:bg-gray-100 p-6 rounded-xl transition text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Eye size={24} className="text-blue-900" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Meinen PIN anzeigen</h3>
                <p className="text-sm text-gray-600">Erhalten Sie Ihren Code per sicherer SMS</p>
              </div>
            </div>
          </button>

          <button className="w-full bg-gray-50 hover:bg-gray-100 p-6 rounded-xl transition text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Settings size={24} className="text-blue-900" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Meinen PIN ändern</h3>
                <p className="text-sm text-gray-600">Ändern Sie Ihren 4-stelligen Code</p>
              </div>
            </div>
          </button>

          <button className="w-full bg-gray-50 hover:bg-gray-100 p-6 rounded-xl transition text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <AlertCircle size={24} className="text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">PIN vergessen?</h3>
                <p className="text-sm text-gray-600">Fordern Sie einen neuen PIN an</p>
              </div>
            </div>
          </button>
        </div>

        <div className="bg-red-50 rounded-lg p-4 mt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-red-600" size={20} />
            <div className="text-sm text-red-900">
              <p className="font-medium mb-1">Sicherheit</p>
              <p>Geben Sie Ihren PIN niemals weiter. Ihre Bank wird Sie niemals telefonisch oder per E-Mail danach fragen.</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => handleNavigate('cartes')}
          className="w-full mt-6 bg-blue-900 hover:bg-blue-950 text-white py-4 rounded-xl font-medium transition"
        >
          Zurück zu meinen Karten
        </button>
      </div>
    </div>
  );

  const renderCommanderCartePage = () => (
    <div className="space-y-6">
      {!orderSuccess ? (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-blue-100 mx-auto rounded-full flex items-center justify-center mb-4">
              <CreditCard className="text-blue-900" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Neue Karte bestellen</h2>
            <p className="text-gray-600">Wählen Sie den gewünschten Kartentyp</p>
          </div>

          <div className="space-y-4 mb-6">
            <button className="w-full bg-gray-50 hover:bg-gray-100 p-6 rounded-xl transition text-left border-2 border-transparent hover:border-blue-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-900 rounded-lg flex items-center justify-center">
                    <CreditCard className="text-white" size={32} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Standard Karte</h3>
                    <p className="text-sm text-gray-600">Internationale Karte</p>
                    <p className="text-xs text-blue-900 mt-1 font-medium">Kostenlos</p>
                  </div>
                </div>
                <ArrowLeft className="text-gray-400 transform rotate-180" size={20} />
              </div>
            </button>

            <button className="w-full bg-gray-50 hover:bg-gray-100 p-6 rounded-xl transition text-left border-2 border-transparent hover:border-blue-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                    <CreditCard className="text-white" size={32} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Gold Karte</h3>
                    <p className="text-sm text-gray-600">Prestige-Karte mit exklusiven Services</p>
                    <p className="text-xs text-gray-600 mt-1 font-medium">15€/Jahr</p>
                  </div>
                </div>
                <ArrowLeft className="text-gray-400 transform rotate-180" size={20} />
              </div>
            </button>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-blue-600" size={20} />
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-2">Wichtige Informationen:</p>
                <ul className="space-y-1">
                  <li>• Lieferzeit: 5-7 Werktage</li>
                  <li>• Lieferung an Ihre Postadresse</li>
                  <li>• PIN wird separat per Post gesendet</li>
                  <li>• Sofortige Aktivierung bei Erhalt</li>
                </ul>
              </div>
            </div>
          </div>

          <button 
            onClick={() => {
              setOrderSuccess(true);
              setTimeout(() => {
                setOrderSuccess(false);
                handleNavigate('cartes');
              }, 3000);
            }}
            className="w-full bg-blue-900 hover:bg-blue-950 text-white py-4 rounded-xl font-medium transition flex items-center justify-center gap-2"
          >
            <Check size={20} />
            Bestellung bestätigen
          </button>

          <button 
            onClick={() => handleNavigate('cartes')}
            className="w-full mt-3 py-3 text-gray-600 hover:text-gray-800 font-medium"
          >
            Abbrechen
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 mx-auto rounded-full flex items-center justify-center mb-4">
              <Check className="text-green-600" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Bestellung bestätigt!</h2>
            <p className="text-gray-600 mb-6">
              Ihre neue Karte wird innerhalb von 5-7 Werktagen an folgende Adresse geliefert:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="font-medium text-gray-800">{currentUser.name}</p>
              <p className="text-sm text-gray-600 mt-1">Hinterlegte Postadresse</p>
            </div>
            <p className="text-sm text-gray-600">
              Sie erhalten eine Bestätigungs-E-Mail mit der Sendungsverfolgung.
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const renderCartesPage = () => (
    <>
      {/* Carte bancaire */}
      <div className="space-y-6 mb-6 max-w-md mx-auto">
        <div className="relative">
          <div className="bg-blue-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -ml-16 -mb-16"></div>
            
            {/* Badge Bloquée si compte bloqué */}
            {currentUser.isBlocked && (
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg z-20">
                <Lock size={12} />
                GESPERRT
              </div>
            )}
            
            <div className="relative z-10">
              {/* Logo Deutsche Bank en haut */}
              <div className="flex items-start justify-between mb-12">
                <img 
                  src="/images/p7.jpeg" 
                  alt="Deutsche Bank" 
                  className="h-12 object-contain"
                />
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex-1">
                  <p className="font-mono text-xl tracking-wider">
                    {showCardNumber ? card.fullNumber : card.number}
                  </p>
                </div>
                <button 
                  onClick={() => setShowCardNumber(!showCardNumber)}
                  className="p-2 hover:bg-white/20 rounded-lg transition ml-2"
                >
                  {showCardNumber ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-70 mb-1">Karteninhaber</p>
                  <p className="font-medium">{currentUser.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-70 mb-1">Gültig bis</p>
                  <p className="font-medium">{card.expiry}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 -mt-4 pt-8">
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => handleNavigate('bloquer-carte')}
                className="flex flex-col items-center gap-3 p-6 bg-gray-50 hover:bg-gray-100 rounded-xl transition"
              >
                {cardStatus === 'active' ? (
                  <Lock className="text-blue-900" size={40} />
                ) : (
                  <Unlock className="text-blue-900" size={40} />
                )}
                <span className="text-base font-medium text-gray-800">
                  {cardStatus === 'active' ? 'Sperren' : 'Entsperren'}
                </span>
              </button>
              
              <button 
                onClick={() => handleNavigate('plafonds')}
                className="flex flex-col items-center gap-3 p-6 bg-gray-50 hover:bg-gray-100 rounded-xl transition"
              >
                <Settings className="text-blue-900" size={40} />
                <span className="text-base font-medium text-gray-800">Limits</span>
              </button>
              
              <button 
                onClick={() => handleNavigate('paiement-etranger')}
                className="flex flex-col items-center gap-3 p-6 bg-gray-50 hover:bg-gray-100 rounded-xl transition"
              >
                <Globe className="text-blue-900" size={40} />
                <span className="text-base font-medium text-gray-800 text-center">Auslandszahlungen</span>
              </button>
              
              <button 
                onClick={() => handleNavigate('code-pin')}
                className="flex flex-col items-center gap-3 p-6 bg-gray-50 hover:bg-gray-100 rounded-xl transition"
              >
                <Key className="text-blue-900" size={40} />
                <span className="text-base font-medium text-gray-800">PIN-Code</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => handleNavigate('commander-carte')}
        className="w-full bg-blue-900 hover:bg-blue-950 text-white py-4 rounded-xl font-medium transition flex items-center justify-center gap-2 shadow-sm"
      >
        <Plus size={20} />
        Neue Karte bestellen
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => currentPage === 'cartes' ? navigate('/dashboard') : handleNavigate('cartes')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={20} />
              <span>Zurück</span>
            </button>
            <h1 className="text-xl font-bold text-gray-800">Meine Karten</h1>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Plus size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 mt-20 pb-24">
        {currentPage === 'cartes' && renderCartesPage()}
        {currentPage === 'bloquer-carte' && renderBloquerPage()}
        {currentPage === 'plafonds' && renderPlafondsPage()}
        {currentPage === 'paiement-etranger' && renderPaiementEtrangerPage()}
        {currentPage === 'code-pin' && renderCodePinPage()}
        {currentPage === 'commander-carte' && renderCommanderCartePage()}
      </main>

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