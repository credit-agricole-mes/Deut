import React from 'react';

export default function FeatureCards({ onNavigateToLogin }) {
  return (
    <div className="mx-4 sm:mx-6 my-12 sm:my-16">
      <h2 className="text-3xl sm:text-4xl font-light text-gray-800 mb-8">News</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        
        {/* Carte 1 - Leadership in Korea */}
        <div 
          onClick={onNavigateToLogin}
          className="bg-white rounded-lg cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 shadow-lg overflow-hidden"
        >
          <div className="w-full h-48 sm:h-56 bg-orange-200 to-orange-100 flex items-center justify-center overflow-hidden">
            <img 
              src="/images/p2.jpeg" 
              alt="Leadership Korea" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-xs text-gray-500 mb-2">News | 4. Februar 2026</p>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 leading-tight">
              Deutsche Bank für Marktführerschaft und Innovation in Korea ausgezeichnet
            </h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition flex items-center gap-2">
              Mehr erfahren
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carte 2 - First Pacific Hong Kong */}
        <div 
          onClick={onNavigateToLogin}
          className="bg-white rounded-lg cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 shadow-lg overflow-hidden"
        >
          <div className="w-full h-48 sm:h-56 bg-gray-200 flex items-center justify-center overflow-hidden">
            <img 
              src="/images/p3.jpeg" 
              alt="Hong Kong" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-xs text-gray-500 mb-2">flow article | 28. Januar 2026</p>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 leading-tight">
              First Pacific: Maximierung des langfristigen Werts für Investoren
            </h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Mit Hauptsitz in Hongkong SAR ist First Pacific eine der führenden Investmentholding-Gesellschaften Asiens.
            </p>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition flex items-center gap-2">
              Weiterlesen
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carte 3 - Media Conference */}
        <div 
          onClick={onNavigateToLogin}
          className="bg-white rounded-lg cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 shadow-lg overflow-hidden"
        >
          <div className="w-full h-48 sm:h-56 bg-gray-200 flex items-center justify-center overflow-hidden relative">
            <img 
              src="/images/p4.jpeg" 
              alt="Media Conference" 
              className="w-full h-full object-cover"
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white bg-opacity-90 rounded flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-xs text-gray-500 mb-2">Event | 29. Januar 2026</p>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 leading-tight">
              Jährliche Medienkonferenz 2026
            </h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition flex items-center gap-2">
              Video ansehen
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Deuxième ligne d'articles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mt-8">
        
        {/* Carte 4 - Sustainable Building */}
        <div 
          onClick={onNavigateToLogin}
          className="bg-white rounded-lg cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 shadow-lg overflow-hidden"
        >
          <div className="w-full h-48 sm:h-56 bg-gray-200 flex items-center justify-center overflow-hidden">
            <img 
              src="/images/p5.jpeg" 
              alt="Sustainable Building" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-xs text-gray-500 mb-2">What next | 15. Januar 2026</p>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 leading-tight">
              Die Zukunft bauen: nachhaltig, smart, bezahlbar
            </h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Nachhaltiges Bauen muss nicht teuer sein. Hören Sie Alf Meyer zur Heyde zu und entdecken Sie intelligente, erschwingliche Upgrades.
            </p>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition flex items-center gap-2">
              Mehr erfahren
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carte 5 - Stablecoins */}
        <div 
          onClick={onNavigateToLogin}
          className="bg-white rounded-lg cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 shadow-lg overflow-hidden"
        >
          <div className="w-full h-48 sm:h-56 bg-gray-200 flex items-center justify-center overflow-hidden">
            <img 
              src="/images/p6.jpeg" 
              alt="Stablecoins" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-xs text-gray-500 mb-2">flow article | 7. Januar 2026</p>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 leading-tight">
              Stablecoins: zwischen Vision und Realität
            </h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Stablecoins versprechen eine Revolution im internationalen Zahlungsverkehr. Aber wie realistisch ist ihr Einsatz im Treasury?
            </p>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition flex items-center gap-2">
              Artikel lesen
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carte 6 - Social Media */}
        <div 
          onClick={onNavigateToLogin}
          className="bg-blue-900 rounded-lg cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 shadow-lg overflow-hidden"
        >
          <div className="p-6 sm:p-8 text-white">
            <h3 className="text-xl sm:text-2xl font-light mb-6">Folgen Sie uns</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold mb-2">Instagram</h4>
                <a href="#" className="text-sm underline hover:opacity-80">Instagram channel</a>
                <button className="mt-3 w-full bg-white text-blue-900 px-4 py-2 rounded text-sm font-medium hover:bg-gray-100 transition">
                  Alle Instagram posts
                </button>
              </div>

              <div className="pt-4">
                <h4 className="text-lg font-semibold mb-2">TikTok</h4>
                <a href="#" className="text-sm underline hover:opacity-80">TikTok channel</a>
                <button className="mt-3 w-full bg-white text-blue-900 px-4 py-2 rounded text-sm font-medium hover:bg-gray-100 transition">
                  Alle TikTok posts
                </button>
              </div>

              <div className="pt-4">
                <h4 className="text-lg font-semibold mb-2">Facebook</h4>
                <a href="#" className="text-sm underline hover:opacity-80">Facebook channel</a>
                <button className="mt-3 w-full bg-white text-blue-900 px-4 py-2 rounded text-sm font-medium hover:bg-gray-100 transition">
                  Alle Facebook posts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}