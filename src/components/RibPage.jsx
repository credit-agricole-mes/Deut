import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowLeft, Download, Share2, Copy, CheckCircle,
  Wallet, Clock, ArrowLeftRight, CreditCard, FileText
} from 'lucide-react';

export default function RIBPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('rib');
  const [copied, setCopied] = useState(false);

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

  const getBankInfo = (user) => {
    const bankCode = '30004';
    const swift = 'DEUTDEFFXXX';
    const bankName = 'DEUTSCHE BANK';
    
    if (user.rib && user.rib.iban) {
      return {
        bankName,
        accountHolder: user.name,
        iban: user.rib.iban,
        swift,
        accountNumber: user.accountNumber,
        bankCode: user.rib.bankCode || bankCode,
        branchCode: user.rib.branchCode,
        accountKey: user.rib.key,
        countryCode: user.rib.iban.substring(0, 2)
      };
    }
    
    return {
      bankName,
      accountHolder: user.name,
      iban: 'Nicht definiert',
      swift,
      accountNumber: user.accountNumber,
      bankCode,
      branchCode: 'N/A',
      accountKey: 'N/A',
      countryCode: 'XX'
    };
  };

  const bankInfo = getBankInfo(user);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 595;
    canvas.height = 842;
    const ctx = canvas.getContext('2d');

    // Fond blanc
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header bleu
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 120);
    gradient.addColorStop(0, '#1e3a8a');
    gradient.addColorStop(1, '#1e40af');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, 120);

    // Titre
    ctx.fillStyle = 'white';
    ctx.font = 'bold 28px Arial';
    ctx.fillText(bankInfo.bankName, 40, 60);
    
    ctx.font = '16px Arial';
    ctx.fillText('Bankverbindung', 40, 85);

    // Contenu
    let y = 160;

    // Titulaire
    ctx.fillStyle = '#6b7280';
    ctx.font = '10px Arial';
    ctx.fillText('KONTOINHABER', 40, y);
    
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 18px Arial';
    ctx.fillText(bankInfo.accountHolder, 40, y + 25);

    y += 60;

    // IBAN
    ctx.fillStyle = '#6b7280';
    ctx.font = '10px Arial';
    ctx.fillText('IBAN (INTERNATIONAL BANK ACCOUNT NUMBER)', 40, y);
    
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(40, y + 5, 515, 35);
    ctx.fillStyle = '#1f2937';
    ctx.font = '16px Courier New';
    ctx.fillText(bankInfo.iban, 50, y + 28);

    y += 60;

    // SWIFT
    ctx.fillStyle = '#6b7280';
    ctx.font = '10px Arial';
    ctx.fillText('SWIFT/BIC CODE', 40, y);
    
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(40, y + 5, 515, 35);
    ctx.fillStyle = '#1f2937';
    ctx.font = '16px Courier New';
    ctx.fillText(bankInfo.swift, 50, y + 28);

    y += 70;

    // Ligne de séparation
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, y);
    ctx.lineTo(555, y);
    ctx.stroke();

    y += 25;

    // Détails du compte
    ctx.fillStyle = '#6b7280';
    ctx.font = '10px Arial';
    ctx.fillText('KONTODETAILS', 40, y);

    y += 25;

    // Grid 2x2
    const gridData = [
      { label: 'Bankleitzahl', value: bankInfo.bankCode, x: 40 },
      { label: 'Filialnummer', value: bankInfo.branchCode, x: 310 },
      { label: 'Kontonummer', value: bankInfo.accountNumber, x: 40 },
      { label: 'Prüfziffer', value: bankInfo.accountKey, x: 310 }
    ];

    gridData.forEach((item, index) => {
      const yPos = y + Math.floor(index / 2) * 50;
      
      ctx.fillStyle = '#6b7280';
      ctx.font = '10px Arial';
      ctx.fillText(item.label, item.x, yPos);
      
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(item.x, yPos + 5, 235, 30);
      ctx.fillStyle = '#1f2937';
      ctx.font = '14px Courier New';
      ctx.fillText(item.value, item.x + 10, yPos + 25);
    });

    y += 130;

    // Footer
    ctx.strokeStyle = '#e5e7eb';
    ctx.beginPath();
    ctx.moveTo(40, y);
    ctx.lineTo(555, y);
    ctx.stroke();

    y += 25;

    ctx.fillStyle = '#6b7280';
    ctx.font = '11px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(
      `Dokument erstellt am ${new Date().toLocaleDateString('de-DE', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      })}`,
      canvas.width / 2,
      y
    );
    ctx.fillText(
      'Diese Bankverbindung kann für Überweisungen verwendet werden.',
      canvas.width / 2,
      y + 20
    );

    // Convertir en PNG et télécharger
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Bankverbindung_${user.name.replace(/\s/g, '_')}_${new Date().toISOString().split('T')[0]}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  const handleShare = async () => {
    const text = `Bankverbindung - ${bankInfo.accountHolder}\n\nIBAN: ${bankInfo.iban}\nSWIFT: ${bankInfo.swift}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Meine Bankverbindung',
          text: text,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          handleCopy(text);
        }
      }
    } else {
      handleCopy(text);
    }
  };

  const menuItems = [
    { id: 'solde', icon: Wallet, label: 'Guthaben' },
    { id: 'historique', icon: Clock, label: 'Verlauf' },
    { id: 'virement', icon: ArrowLeftRight, label: 'Überweisung' },
    { id: 'cartes', icon: CreditCard, label: 'Karten' },
    { id: 'rib', icon: FileText, label: 'Bankverbindung' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={20} />
              <span>Zurück</span>
            </button>
            <h1 className="text-xl font-bold text-gray-800">Meine Bankverbindung</h1>
            <div className="flex gap-2">
              <button 
                onClick={handleShare}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                title="Teilen"
              >
                <Share2 size={20} className="text-gray-600" />
              </button>
              <button 
                onClick={handleDownload}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                title="Herunterladen"
              >
                <Download size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu */}
      <main className="max-w-4xl mx-auto px-4 py-6 pb-24">
        {/* RIB Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          {/* En-tête avec logo */}
          <div className="bg-blue-900 p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div>
                  <h2 className="font-bold text-lg">{bankInfo.bankName}</h2>
                  <p className="text-xs opacity-90">Bankverbindung</p>
                </div>
              </div>
            </div>
          </div>

          {/* Informations du compte */}
          <div className="p-6 space-y-6">
            {/* Titulaire */}
            <div>
              <p className="text-xs text-gray-500 mb-1 uppercase">Kontoinhaber</p>
              <p className="text-lg font-bold text-gray-800">{bankInfo.accountHolder}</p>
            </div>

            {/* IBAN */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-500 uppercase">IBAN ({bankInfo.countryCode})</p>
                <button
                  onClick={() => handleCopy(bankInfo.iban)}
                  className="flex items-center gap-1 text-blue-900 hover:text-blue-950 text-xs font-medium transition"
                >
                  {copied ? (
                    <>
                      <CheckCircle size={14} />
                      Kopiert
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Kopieren
                    </>
                  )}
                </button>
              </div>
              <p className="font-mono text-base text-gray-800 bg-gray-50 p-3 rounded-lg">
                {bankInfo.iban}
              </p>
            </div>

            {/* SWIFT */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-500 uppercase">SWIFT/BIC Code</p>
                <button
                  onClick={() => handleCopy(bankInfo.swift)}
                  className="flex items-center gap-1 text-blue-900 hover:text-blue-950 text-xs font-medium transition"
                >
                  <Copy size={14} />
                  Kopieren
                </button>
              </div>
              <p className="font-mono text-base text-gray-800 bg-gray-50 p-3 rounded-lg">
                {bankInfo.swift}
              </p>
            </div>

            {/* Détails du compte */}
            <div className="border-t pt-4">
              <p className="text-xs text-gray-500 mb-3 uppercase">Kontodetails</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Bankleitzahl</p>
                  <p className="font-mono text-sm text-gray-800">{bankInfo.bankCode}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Filialnummer</p>
                  <p className="font-mono text-sm text-gray-800">{bankInfo.branchCode}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Kontonummer</p>
                  <p className="font-mono text-sm text-gray-800">{bankInfo.accountNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Prüfziffer</p>
                  <p className="font-mono text-sm text-gray-800">{bankInfo.accountKey}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={handleDownload}
            className="bg-blue-900 hover:bg-blue-950 text-white py-4 rounded-xl font-medium transition flex items-center justify-center gap-2 shadow-sm"
          >
            <Download size={20} />
            Herunterladen
          </button>
          <button 
            onClick={handleShare}
            className="bg-white hover:bg-gray-50 text-gray-800 py-4 rounded-xl font-medium transition flex items-center justify-center gap-2 shadow-sm border border-gray-200"
          >
            <Share2 size={20} />
            Teilen
          </button>
        </div>

        {/* Informations supplémentaires */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
          {/* Espace pour infos supplémentaires si besoin */}
        </div>
      </main>

      {/* Navigation inférieure */}
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