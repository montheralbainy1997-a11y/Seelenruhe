import React, { useState, useEffect } from 'react';

const LanguageSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("de"); // Default to 'de'

  useEffect(() => {
    // Get current locale from window.location.pathname
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    let lang = "de"; // Default locale
    if (pathParts.length > 0 && ['en', 'ar', 'fr'].includes(pathParts[0])) {
      lang = pathParts[0];
    }
    setCurrentLang(lang);
  }, []);

  const languages = [
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(Boolean);
    let newPath = '';

    if (['en', 'ar', 'fr'].includes(currentLang)) {
      // Remove current locale prefix if it exists
      pathParts.shift();
    }

    if (langCode === 'de') {
      newPath = '/' + pathParts.join('/');
    } else {
      newPath = `/${langCode}/` + pathParts.join('/');
    }
    
    // Ensure leading slash and remove trailing slash if it's just the root
    if (newPath === '') newPath = '/';
    if (newPath.length > 1 && newPath.endsWith('/')) newPath = newPath.slice(0, -1);

    window.location.href = newPath;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white hover:text-emerald-400 transition-colors duration-300 text-sm"
      >
        <span>{currentLanguage.flag}</span>
        <span>{currentLanguage.code.toUpperCase()}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg py-2 min-w-[150px] z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                handleLanguageChange(language.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-emerald-50 transition-colors duration-200 flex items-center space-x-3 ${
                language.code === currentLang ? 'bg-emerald-50 text-emerald-600' : 'text-gray-800'
              }`}
            >
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;


