import { useState, useEffect } from 'react';
import { questions, uiStrings, planets } from './data/questions';
import { useLang } from './context/LanguageContext';
import Layout from './components/Layout';

// Sub-component for the 3 Stars Collision sequence
function StarCollisionReveal({ planetConfig }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 overflow-hidden pointer-events-none">
      {/* Central Expanding Bubble Flash */}
      <div 
        className="absolute w-20 h-20 sm:w-32 sm:h-32 rounded-full blur-xl opacity-90 animate-bubble-expand"
        style={{ backgroundColor: planetConfig?.color || '#38bdf8' }}
      />

      {/* Star 1 - Left */}
      <div className="absolute w-16 h-16 sm:w-28 sm:h-28 text-amber-300 drop-shadow-[0_0_20px_rgba(251,191,36,0.9)] animate-star-collide-left">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>

      {/* Star 2 - Right */}
      <div className="absolute w-16 h-16 sm:w-28 sm:h-28 text-cyan-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.9)] animate-star-collide-right">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>

      {/* Star 3 - Top */}
      <div className="absolute w-16 h-16 sm:w-28 sm:h-28 text-fuchsia-400 drop-shadow-[0_0_20px_rgba(232,121,249,0.9)] animate-star-collide-top">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>

      {/* Outer Shockwaves */}
      <div className="absolute w-10 h-10 border-4 border-amber-300 rounded-full animate-shockwave opacity-0" />
      <div className="absolute w-10 h-10 border-4 border-cyan-300 rounded-full animate-shockwave [animation-delay:0.1s] opacity-0" />
    </div>
  );
}

export default function App() {
  const { lang } = useLang();
  
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({
    action: 0, sport: 0, adventure: 0, comedy: 0,
    science: 0, zumorroda: 0, bonbon: 0, abjad: 0, history: 0, movies: 0
  });
  const [showResult, setShowResult] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);

  const handleAnswerClick = (selectedScores) => {
    const updatedScores = { ...scores };
    Object.keys(selectedScores).forEach((planet) => {
      updatedScores[planet] = (updatedScores[planet] || 0) + selectedScores[planet];
    });
    setScores(updatedScores);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setIsRevealing(true);
    }
  };

  useEffect(() => {
    if (isRevealing) {
      // Swaps to result screen right as stars meet at 900ms
      const timerShow = setTimeout(() => {
        setShowResult(true);
      }, 900);

      // Clears collision overlay after animation finishes
      const timerEnd = setTimeout(() => {
        setIsRevealing(false);
      }, 1200);

      return () => {
        clearTimeout(timerShow);
        clearTimeout(timerEnd);
      };
    }
  }, [isRevealing]);

  const getWinningPlanet = () => {
    return Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b));
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({
      action: 0, sport: 0, adventure: 0, comedy: 0,
      science: 0, zumorroda: 0, bonbon: 0, abjad: 0, history: 0, movies: 0
    });
    setShowResult(false);
    setIsRevealing(false);
    setQuizStarted(false);
  };

  const winningPlanetKey = (showResult || isRevealing) ? getWinningPlanet() : '';
  const planetConfig = (showResult || isRevealing) ? planets[winningPlanetKey] : null;

  const langPath = lang === 'en' ? 'EN' : lang === 'fr' ? 'FN' : 'AR';
  const currentTvAsset = `/spacetoon-tv-${langPath}.png`;

  const getHeadingFont = () => {
    return lang === 'ar' ? 'font-sans font-black' : 'font-nasalization tracking-wide';
  };

  return (
    <Layout>
      {/* Collision Overlay */}
      {isRevealing && (
        <StarCollisionReveal planetConfig={planetConfig} />
      )}

      <main className="w-full flex-grow flex flex-col items-center justify-start sm:justify-center px-3 sm:px-6 md:px-8 py-3 sm:py-8 z-10 select-none">
        
        {!quizStarted ? (
          /* Landing Screen */
          <div className="w-full max-w-[320px] xs:max-w-[380px] sm:max-w-[480px] md:max-w-[540px] flex flex-col items-center justify-center transition-none my-auto">
            <img 
              src={currentTvAsset} 
              alt="Spacetoon TV Landing" 
              className="w-full h-auto object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)] mb-6 sm:mb-10"
            />
            <button
              onClick={() => setQuizStarted(true)}
              className={`px-7 sm:px-8 py-3.5 sm:py-3.5 text-sm sm:text-base text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-full cursor-pointer uppercase tracking-wider shadow-[0_4px_12px_rgba(34,211,238,0.3)] active:scale-95 transition-transform duration-100 ${getHeadingFont()}`}
            >
              {uiStrings.startScreen.btn[lang]}
            </button>
          </div>
        ) : !showResult ? (
          
          /* Quiz Screen */
          <div className="w-full max-w-xl flex flex-col items-center transition-none px-1 sm:px-0 my-auto">
            
            {/* FIXED ANCHORED PROGRESS BAR CONTAINER */}
            <div className="w-full flex flex-col items-center mb-3 sm:mb-6">
              <div className="w-full bg-indigo-950/80 border border-purple-500/30 h-2.5 sm:h-3 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="bg-cyan-400 h-full border-r border-cyan-200 transition-all duration-300 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>

              <div className="mt-2 text-center">
                <span className={`text-xs sm:text-sm text-cyan-300 font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${getHeadingFont()}`}>
                  {uiStrings.quizScreen.scenario[lang]} {currentQuestion + 1} {uiStrings.quizScreen.of[lang]} {questions.length}
                </span>
              </div>
            </div>

            {/* Question Card - Fixed Minimum Height to avoid jumps */}
            <div className="w-full min-h-[110px] sm:min-h-[140px] flex items-center justify-center bg-indigo-950/60 backdrop-blur-md border border-purple-500/40 rounded-xl sm:rounded-2xl p-4 sm:p-8 text-center shadow-[0_0_25px_rgba(147,51,234,0.2)] mb-3 sm:mb-6">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white leading-snug sm:leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                {questions[currentQuestion].text[lang]}
              </h2>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option.scores)}
                  className="w-full text-center font-bold text-slate-100 p-4 sm:p-5 bg-indigo-950/70 hover:bg-purple-900/50 active:bg-cyan-400 active:text-slate-950 backdrop-blur-md border border-purple-500/30 hover:border-purple-400/50 rounded-xl text-sm sm:text-base md:text-lg cursor-pointer shadow-lg leading-snug sm:leading-normal drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] transition-all duration-100"
                >
                  {option.text[lang]}
                </button>
              ))}
            </div>

          </div>
        ) : (
          
          /* Result Screen */
          <div className="w-full max-w-lg flex flex-col items-center text-center px-2 sm:px-0 my-auto">
            
            <h2 className={`text-lg sm:text-2xl font-light text-slate-200 mb-2 sm:mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] animate-fade-in-down ${getHeadingFont()}`}>
              {uiStrings.resultScreen.destiny[lang]}
            </h2>

            {/* Planet Container */}
            <div className="w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 my-3 sm:my-6 relative flex items-center justify-center animate-planet-reveal">
              <div 
                className="absolute inset-0 rounded-full blur-xl sm:blur-2xl opacity-40 animate-pulse"
                style={{ backgroundColor: planetConfig?.color }}
              />
              <img 
                src={`/${winningPlanetKey}.png`} 
                alt={winningPlanetKey}
                className="w-full h-full object-contain relative z-10 animate-spin [animation-duration:45s] drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>

            {/* Planet Title */}
            <h1 
              className={`text-2xl sm:text-4xl md:text-5xl font-black uppercase mb-3 sm:mb-6 tracking-wider animate-title-slide-up ${getHeadingFont()}`}
              style={{ 
                color: planetConfig?.color,
                textShadow: `0 0 15px ${planetConfig?.color}cc, 0 2px 4px rgba(0,0,0,0.8)`
              }}
            >
              {uiStrings.resultScreen.planet[lang]} {planetConfig?.name[lang]}
            </h1>

            {/* Description Card */}
            <div 
              className="bg-indigo-950/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-5 sm:mb-8 w-full max-w-md shadow-xl border animate-description-slide-up"
              style={{ 
                borderColor: planetConfig?.color,
                boxShadow: `0 0 20px ${planetConfig?.color}25`
              }}
            >
              <p className={`text-sm sm:text-base md:text-lg text-slate-100 font-medium leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${getHeadingFont()}`}>
                {planetConfig?.desc[lang]}
              </p>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetQuiz}
              className={`px-7 sm:px-8 py-3.5 sm:py-3.5 text-sm sm:text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-full cursor-pointer uppercase shadow-[0_4px_12px_rgba(34,211,238,0.3)] active:scale-95 transition-transform duration-100 animate-fade-in-up ${getHeadingFont()}`}
            >
              {uiStrings.resultScreen.btn[lang]}
            </button>
          </div>
        )}
      </main>
    </Layout>
  );
}