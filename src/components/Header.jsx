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
    <header className="fixed top-0 left-0 w-full py-4 px-6 border-b border-white/10 bg-slate-950/60 backdrop-blur-md z-[100] flex justify-between items-center shadow-lg">
      
      <div className="flex-1 flex justify-start items-center">
        <div className="flex items-center gap-3 select-none">
          <img 
            src="/logo.png" 
            alt="Astrotech Logo" 
            className="h-10 md:h-12 w-auto object-contain drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      </div>
      <div className="hidden sm:flex flex-1 justify-center text-center px-4">
        <p 
          className={`text-cyan-400 text-sm md:text-base font-bold italic transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] ${getHeadingFont()}`}
          key={lang}
        >
          "{slogans[lang]}"
        </p>
      </div>
      <div className="flex-1 flex justify-end items-center">
        <div className="flex items-center bg-slate-950/60 p-1.5 rounded-2xl border border-white/5 gap-2 shadow-inner">
          {languageOptions.map((opt) => {
            const isActive = lang === opt.code;
            return (
              <button
                key={opt.code}
                onClick={() => changeLanguage(opt.code)}
                className={`px-4 py-2 rounded-xl text-sm font-black font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-400 text-slate-950 shadow-md scale-100'
                    : 'bg-slate-900/60 text-slate-500 hover:text-slate-300 hover:bg-slate-800/40'
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
