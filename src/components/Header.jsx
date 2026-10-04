import React from 'react';
import { useLang } from '../context/LanguageContext';

const slogans = {
  en: "Our childhood planet, recompiled.",
  ar: "كوكب طفولتنا.. بعد إعادة تجميعه.",
  fr: "Notre planète d'enfance, recompilée."
};

export default function Header() {
  const { lang, changeLanguage } = useLang();

  const languageOptions = [
    { code: 'en', label: 'EN' },
    { code: 'ar', label: 'AR' },
    { code: 'fr', label: 'FR' }
  ];

  const getHeadingFont = () => {
    return lang === 'ar' ? 'font-sans font-black' : 'font-nasalization tracking-wide';
  };

  return (
    <header className="fixed top-0 left-0 w-full py-1 px-4 sm:px-6 border-b border-white/10 bg-slate-950/60 backdrop-blur-md z-[100] flex justify-between items-center shadow-lg">
      
      {/* Left Logo */}
      <div className="flex-1 flex justify-start items-center">
        <div className="flex items-center gap-3 select-none">
          <img 
            src="/logo.png" 
            alt="Astrotech Logo" 
            className="h-8 sm:h-10 md:h-11 w-auto object-contain drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      </div>

      {/* Middle Slogan */}
      <div className="hidden sm:flex flex-1 justify-center text-center px-4">
        <p 
          className={`text-cyan-400 text-xs sm:text-sm md:text-base font-bold italic transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] ${getHeadingFont()}`}
          key={lang}
        >
          "{slogans[lang]}"
        </p>
      </div>

      {/* Right Compact Language Switcher */}
      <div className="flex-1 flex justify-end items-center">
        <div className="flex items-center bg-slate-950/70 p-0.5 sm:p-1 rounded-xl border border-white/10 gap-1 shadow-inner">
          {languageOptions.map((opt) => {
            const isActive = lang === opt.code;
            return (
              <button
                key={opt.code}
                onClick={() => changeLanguage(opt.code)}
                className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs font-black font-mono tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-400 text-slate-950 shadow-sm scale-100'
                    : 'bg-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

    </header>
  );
}