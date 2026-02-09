import React, { useState } from 'react';
import { ArrowLeft, User, CheckCircle, Star } from 'lucide-react';

export default function AjouterBeneficiaire({ navigate }) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [name, setName] = useState('');
  const [iban, setIban] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const handleSubmit = () => {
    if (name && iban) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate('virement-rapide');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Modal de succès */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-emerald-600" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Bénéficiaire ajouté !</h3>
            <p className="text-gray-600 mb-4">
              {name} a été ajouté à votre liste
            </p>
            <div className="w-12 h-1 bg-emerald-600 mx-auto rounded"></div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button 
            onClick={() => navigate('virement-rapide')}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Ajouter un bénéficiaire</h1>
            <p className="text-sm text-gray-500">Enregistrez un nouveau contact</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 pb-24">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
              <User className="text-emerald-600" size={40} />
            </div>
          </div>

          <div className="space-y-5">
            {/* Nom du bénéficiaire */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du bénéficiaire *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Sophie Martin"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            {/* IBAN */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IBAN *
              </label>
              <input
                type="text"
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                placeholder="FR76 3000 4000 0300 0345 6789 012"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-mono"
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: FR suivi de 25 chiffres
              </p>
            </div>

            {/* Ajouter aux favoris */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Star className={`${isFavorite ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} size={24} />
                  <div>
                    <p className="font-medium text-gray-800">Ajouter aux favoris</p>
                    <p className="text-sm text-gray-500">Accès rapide depuis la page d'accueil</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`relative w-14 h-8 rounded-full transition ${
                    isFavorite ? 'bg-emerald-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-all ${
                    isFavorite ? 'right-1' : 'left-1'
                  }`}></div>
                </button>
              </div>
            </div>


            {/* Boutons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => navigate('virement-rapide')}
                className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-300 transition"
              >
                Annuler
              </button>
              <button
                onClick={handleSubmit}
                disabled={!name || !iban}
                className="flex-1 bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
              >
                <CheckCircle size={20} />
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}