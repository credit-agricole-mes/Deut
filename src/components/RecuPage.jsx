// components/RecuPage.jsx

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Download, ArrowLeft } from 'lucide-react';

export default function RecuPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const virementData = location.state?.virementData;

  // ✅ Vérification de sécurité
  if (!virementData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-3xl">⚠️</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Keine Überweisungsdaten
          </h2>
          <p className="text-gray-600 mb-6">
            Die Überweisungsinformationen sind nicht verfügbar.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-950 transition"
          >
            Zurück zum Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    // Créer un canvas pour le reçu
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1000;
    const ctx = canvas.getContext('2d');

    // Fond blanc
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header bleu
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 100);
    gradient.addColorStop(0, '#1e3a8a');
    gradient.addColorStop(1, '#1e40af');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, 120);

    // Titre
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('DEUTSCHE BANK', canvas.width / 2, 45);
    ctx.font = '18px Arial';
    ctx.fillText('ÜBERWEISUNGSBELEG', canvas.width / 2, 75);

    // Badge succès
    ctx.fillStyle = '#dbeafe';
    ctx.fillRect(250, 140, 300, 50);
    ctx.fillStyle = '#1e40af';
    ctx.font = 'bold 18px Arial';
    ctx.fillText('✓ ÜBERWEISUNG ERFOLGREICH', canvas.width / 2, 170);

    // Référence
    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(150, 210, 500, 60);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.strokeRect(150, 210, 500, 60);
    ctx.fillStyle = '#92400e';
    ctx.font = '11px Arial';
    ctx.fillText('REFERENZ', canvas.width / 2, 230);
    ctx.font = 'bold 16px Courier New';
    ctx.fillText(virementData.reference, canvas.width / 2, 255);

    // Montant
    ctx.fillStyle = '#1e40af';
    ctx.font = 'bold 42px Arial';
    ctx.fillText(`${virementData.amount} €`, canvas.width / 2, 320);

    // Détails
    ctx.textAlign = 'left';
    let y = 380;

    const details = [
      { label: 'ABSENDER', value: virementData.senderName },
      { label: 'EMPFÄNGER', value: virementData.beneficiary },
      { label: 'E-MAIL', value: virementData.email },
      { label: 'IBAN', value: virementData.iban },
      { label: 'BIC', value: virementData.bic },
      { label: 'DATUM', value: virementData.date },
    ];

    details.forEach(detail => {
      ctx.fillStyle = '#6b7280';
      ctx.font = '11px Arial';
      ctx.fillText(detail.label, 80, y);
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 14px Arial';
      ctx.fillText(detail.value, 80, y + 20);
      y += 50;
    });

    // Message
    if (virementData.message) {
      ctx.fillStyle = '#6b7280';
      ctx.font = '11px Arial';
      ctx.fillText('VERWENDUNGSZWECK', 80, y);
      ctx.fillStyle = '#1f2937';
      ctx.font = '12px Arial';
      ctx.fillText(virementData.message, 80, y + 20);
    }

    // Footer
    ctx.textAlign = 'center';
    ctx.fillStyle = '#6b7280';
    ctx.font = '11px Arial';
    ctx.fillText('Dokument erstellt am ' + new Date().toLocaleDateString('de-DE'), canvas.width / 2, 950);

    // Téléchargement
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Beleg_${virementData.reference}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  };

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
            <h1 className="text-xl font-bold text-gray-800">Beleg</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Contenu */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Carte de succès */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header bleu */}
          <div className="bg-blue-900 p-8 text-center text-white">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Überweisung erfolgreich!</h2>
            <p className="text-blue-100">Ihre Transaktion wurde erfolgreich durchgeführt</p>
          </div>

          {/* Référence */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mx-6 -mt-4 rounded-lg shadow-sm">
            <p className="text-xs text-yellow-800 mb-1">TRANSAKTIONSREFERENZ</p>
            <p className="text-lg font-bold text-yellow-900 font-mono">{virementData.reference}</p>
          </div>

          {/* Montant */}
          <div className="p-6 text-center border-b">
            <p className="text-sm text-gray-600 mb-1">Betrag</p>
            <p className="text-4xl font-bold text-blue-900">{virementData.amount} €</p>
          </div>

          {/* Détails */}
          <div className="p-6 space-y-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">ABSENDER</p>
              <p className="text-base font-semibold text-gray-800">{virementData.senderName}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">EMPFÄNGER</p>
              <p className="text-base font-semibold text-gray-800">{virementData.beneficiary}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">E-MAIL</p>
              <p className="text-base text-gray-700">{virementData.email}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">IBAN</p>
              <p className="text-sm font-mono text-gray-700">{virementData.iban}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">BIC/SWIFT-CODE</p>
              <p className="text-sm font-mono text-gray-700">{virementData.bic}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">DATUM UND UHRZEIT</p>
              <p className="text-base text-gray-700">{virementData.date}</p>
            </div>

            {virementData.message && (
              <div>
                <p className="text-xs text-gray-500 mb-1">VERWENDUNGSZWECK</p>
                <p className="text-base text-gray-700">{virementData.message}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="p-6 bg-gray-50 space-y-3">
            <button
              onClick={handleDownload}
              className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-950 transition flex items-center justify-center gap-2"
            >
              <Download size={20} />
              Beleg herunterladen
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition"
            >
              Zurück zum Dashboard
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}