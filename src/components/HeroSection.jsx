import React from 'react';

export default function HeroSection() {
  return (
    <div className="relative mx-4 sm:mx-6 my-6 sm:my-8">
      {/* Hero principale avec image de l'espace */}
      <div className="relative h-96 sm:h-500px lg:h-600px rounded-lg overflow-hidden bg-blue-950 via-blue-900 to-blue-800">
        <img 
          src="/images/p1.jpeg" 
          alt="Galactic business models: will space become the next Silicon Valley?"
          className="w-full h-full object-cover"
        />
        
        {/* Overlay gradient pour le texte */}
        <div className="absolute inset-0 bg-black/40 to-transparent"></div>
        
        {/* Contenu du hero */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-16 max-w-3xl">
          <p className="text-white text-sm sm:text-base mb-2 sm:mb-3 font-light">What Next | Digital Disruption</p>
          <h1 className="text-white text-3xl sm:text-4xl lg:text-6xl font-light leading-tight mb-6 sm:mb-8">
            Galactic business<br/>
            models:<br/>
            will space become<br/>
            the next Silicon<br/>
            Valley?
          </h1>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button 
              className="bg-white hover:bg-gray-100 text-blue-900 px-6 sm:px-8 py-3 rounded text-sm sm:text-base font-medium transition shadow-lg"
            >
              Dive into the orbit of<br className="sm:hidden"/>
              opportunities!
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-sm flex items-center justify-center cursor-pointer hover:bg-blue-700 transition">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <span className="text-white text-base font-light">1 / 4</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section "Welcome to Deutsche Bank" */}
      <div className="mt-12 sm:mt-16 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-800 mb-4">
          Welcome to Deutsche Bank
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
          Your <span className="font-semibold underline">Global Hausbank</span> on the path to becoming the European Champion.
        </p>
      </div>
    </div>
  );
}