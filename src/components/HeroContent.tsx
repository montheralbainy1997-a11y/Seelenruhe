import React, { useState, useEffect } from 'react';

interface HeroContentProps {
  initialLang: string;
}

const HeroContent: React.FC<HeroContentProps> = ({ initialLang }) => {
  const [currentLang, setCurrentLang] = useState(initialLang);

  const translations = {
    de: {
      title: "Die Kunst und Wissenschaft",
      subtitle: "reiner Blüten- und Pflanzenessenzen",
      description: "Entdecken Sie wahre Entspannung in unserem luxuriösen Wellness-Zentrum. Lassen Sie Körper und Seele zur Ruhe kommen.",
      cta: "Termin buchen"
    },
    en: {
      title: "The art and science",
      subtitle: "of pure flower and plant essences",
      description: "Discover true relaxation in our luxurious wellness center. Let your body and soul find peace.",
      cta: "Book appointment"
    },
    ar: {
      title: "فن وعلم",
      subtitle: "خلاصات الزهور والنباتات الطبيعية",
      description: "اكتشف الاسترخاء الحقيقي في مركز العافية الفاخر لدينا. دع جسدك وروحك يجدان السلام.",
      cta: "احجز موعد"
    },
    fr: {
      title: "L'art et la science",
      subtitle: "des essences pures de fleurs et de plantes",
      description: "Découvrez la vraie relaxation dans notre centre de bien-être luxueux. Laissez votre corps et votre âme trouver la paix.",
      cta: "Prendre rendez-vous"
    }
  };

  // Listen for language changes in URL
  useEffect(() => {
    const handleLanguageChange = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const lang = urlParams.get('lang') || 'de';
      setCurrentLang(lang);
    };

    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', handleLanguageChange);
    
    // Listen for URL changes (for SPA-like behavior)
    const observer = new MutationObserver(() => {
      handleLanguageChange();
    });
    
    observer.observe(document, { subtree: true, childList: true });

    // Check for language changes periodically
    const interval = setInterval(handleLanguageChange, 500);

    return () => {
      window.removeEventListener('popstate', handleLanguageChange);
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  const t = translations[currentLang as keyof typeof translations] || translations.de;

  return (
    <div className={`relative z-20 text-center text-white max-w-4xl mx-auto px-6 hero-content ${currentLang === 'ar' ? 'rtl' : 'ltr'}`}>
      <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
        <span className="block opacity-0 animate-fade-in-up" style={{animationDelay: '0.5s'}}>{t.title}</span>
        <span className="block opacity-0 animate-fade-in-up text-emerald-400" style={{animationDelay: '1s'}}>{t.subtitle}</span>
      </h1>
      
      <p className="text-xl md:text-2xl mb-8 opacity-0 animate-fade-in-up font-light" style={{animationDelay: '1.5s'}}>
        {t.description}
      </p>
      
      <a 
        href={`/contact?lang=${currentLang}`} 
        className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 opacity-0 animate-fade-in-up" 
        style={{animationDelay: '2s'}}
      >
        {t.cta}
      </a>
    </div>
  );
};

export default HeroContent;

