import React, { useState } from 'react';
import { Menu, X, ChevronRight, Home, Share2, Mail, Users, Link as LinkIcon } from 'lucide-react';

export default function Header({ onNavigateToLogin, onNavigateToInscription }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="sticky top-0 z-30 shadow-sm bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          {/* Mobile Layout */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <button 
                  onClick={toggleMenu}
                  className="hover:bg-gray-100 p-2 rounded-full transition"
                >
                  <Menu className="w-6 h-6 text-gray-800" />
                </button>
                <span className="text-xl font-normal text-blue-900">Deutsche Bank</span>
              </div>
              <div className="flex items-center gap-2">
                {/* Logo Deutsche Bank */}
                <img 
                  src="/images/p7.jpeg" 
                  alt="Deutsche Bank Logo" 
                  className="w-12 h-12 object-contain"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={onNavigateToInscription}
                className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded text-sm font-medium text-white transition shadow-sm"
              >
                Kunde werden
              </button>
              <button 
                onClick={onNavigateToLogin}
                className="flex-1 bg-blue-900 hover:bg-blue-950 px-4 py-2.5 rounded text-sm font-medium text-white transition shadow-sm"
              >
                Meine Konten
              </button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex justify-between items-center">
            <div className="flex items-center gap-4">
              {/* Texte Deutsche Bank - pas de menu sur desktop */}
              <h1 className="text-3xl font-light text-blue-900 tracking-tight">Deutsche Bank</h1>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Boutons connexion/inscription */}
              <button 
                onClick={onNavigateToInscription}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded text-sm font-medium text-white transition shadow-sm"
              >
                Kunde werden
              </button>
              <button 
                onClick={onNavigateToLogin}
                className="bg-blue-900 hover:bg-blue-950 px-6 py-2.5 rounded text-sm font-medium text-white transition shadow-sm"
              >
                Zugang zu meinen Konten
              </button>
              
              {/* Logo Deutsche Bank */}
              <img 
                src="/images/p7.jpeg" 
                alt="Deutsche Bank Logo" 
                className="w-16 h-16 object-contain ml-2"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Menu Mobile Drawer */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity lg:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      >
        <div 
          className={`fixed left-0 top-0 bottom-0 w-80 bg-white shadow-2xl transform transition-transform ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header du menu */}
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-xl font-normal text-blue-900">Deutsche Bank</span>
            <button 
              onClick={toggleMenu}
              className="hover:bg-gray-100 p-2 rounded-full transition"
            >
              <X className="w-6 h-6 text-gray-800" />
            </button>
          </div>

          {/* Icônes du haut */}
          <div className="flex items-center justify-center gap-3 p-6 border-b">
            <button className="w-12 h-12 border-2 border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition">
              <span className="text-blue-900 font-semibold text-sm">DE</span>
            </button>
            <button className="w-12 h-12 border-2 border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition">
              <Users className="w-5 h-5 text-blue-900" />
            </button>
            <button className="w-12 h-12 border-2 border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition">
              <LinkIcon className="w-5 h-5 text-blue-900" />
            </button>
            <button className="w-12 h-12 border-2 border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition bg-blue-900">
              <Mail className="w-5 h-5 text-white" />
            </button>
            <button className="w-12 h-12 border-2 border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition">
              <Share2 className="w-5 h-5 text-blue-900" />
            </button>
          </div>

          {/* Navigation principale */}
          <nav className="p-4">
            {/* Titre avec icône maison */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-light text-blue-900 underline">Deutsche Bank</h2>
              <Home className="w-6 h-6 text-blue-900" />
            </div>

            {/* Menu items */}
            <div className="space-y-1">
              <button className="w-full text-left py-3 text-lg hover:bg-gray-50 transition rounded">
                Home
              </button>

              <button className="w-full flex items-center justify-between py-3 text-lg hover:bg-gray-50 transition rounded">
                <span>What we do</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between py-3 text-lg hover:bg-gray-50 transition rounded">
                <span>Who we are</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between py-3 text-lg hover:bg-gray-50 transition rounded">
                <span>Media</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between py-3 text-lg hover:bg-gray-50 transition rounded">
                <span>What Next</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Sections supplémentaires */}
            <div className="mt-8 space-y-4">
              <h3 className="text-xl font-normal text-blue-900 underline">
                Corporates/Institutions
              </h3>
              
              <h3 className="text-xl font-normal text-blue-900 underline">
                Private Clients
              </h3>
              
              <h3 className="text-xl font-normal text-blue-900 underline">
                Locations
              </h3>
              
              <h3 className="text-xl font-normal text-blue-900 underline">
                Client logins
              </h3>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}