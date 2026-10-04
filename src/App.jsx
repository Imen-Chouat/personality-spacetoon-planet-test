import { useState } from 'react';
import { questions, uiStrings, planets } from './data/questions';
import { useLang } from './context/LanguageContext';
import Layout from './components/Layout';

// Sub-component for the 3 Stars Collision Reveal Effect
function StarCollisionReveal({ onComplete }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 overflow-hidden pointer-events-none">
      {/* Central Flash Effect */}
      <div className="absolute w-32 h-32 bg-amber-200 rounded-full blur-2xl animate-burst-flash" />

      {/* Star 1 - Left */}
      <div 
        className="absolute w-24 h-24 sm:w-36 sm:h-36 text-amber-300 drop-shadow-[0_0_25px_rgba(251,191,36,0.9)] animate-star-collide-left"
        onAnimationEnd={onComplete}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>

      {/* Star 2 - Right */}
      <div className="absolute w-24 h-24 sm:w-36 sm:h-36 text-cyan-300 drop-shadow-[0_0_25px_rgba(34,211,238,0.9)] animate-star-collide-right">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>

      {/* Star 3 - Top */}
      <div className="absolute w-24 h-24 sm:w-36 sm:h-36 text-fuchsia-400 drop-shadow-[0_0_25px_rgba(232,121,249,0.9)] animate-star-collide-top">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>

      {/* Shockwave Rings on Collision */}
      <div className="absolute w-12 h-12 border-4 border-amber-300 rounded-full animate-shockwave opacity-0" />
      <div className="absolute w-12 h-12 border-4 border-cyan-300 rounded-full animate-shockwave [animation-delay:0.1s] opacity-0" />
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
      // Trigger the 3-star collision animation before showing final planet result
      setIsRevealing(true);
    }
  };

  const handleAnimationComplete = () => {
    setIsRevealing(false);
    setShowResult(true);
  };

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

  const winningPlanetKey = showResult ? getWinningPlanet() : '';
  const planetConfig = showResult ? planets[winningPlanetKey] : null;

  const langPath = lang === 'en' ? 'EN' : lang === 'fr' ? 'FN' : 'AR';
  const currentTvAsset = `/spacetoon-tv-${langPath}.png`;

  const getHeadingFont = () => {
    return lang === 'ar' ? 'font-sans font-black' : 'font-nasalization tracking-wide';
  };

  return (
    <Layout>
      {/* Stars Animation Overlay */}
      {isRevealing && <StarCollisionReveal onComplete={handleAnimationComplete} />}

      <main className="w-full flex-grow flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 z-10 select-none">
        
        {!quizStarted ? (
          <div className="w-full max-w-[420px] sm:max-w-[480px] md:max-w-[540px] lg:max-w-[580px] flex flex-col items-center justify-center transition-none">
            <img 
              src={currentTvAsset} 
              alt="Spacetoon TV Landing" 
              className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] mb-10"
            />
            <button
              onClick={() => setQuizStarted(true)}
              className={`px-8 py-3.5 text-sm text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-full cursor-pointer uppercase tracking-wider shadow-[0_4px_12px_rgba(34,211,238,0.3)] active:scale-95 transition-transform duration-100 ${getHeadingFont()}`}
            >
              {uiStrings.startScreen.btn[lang]}
            </button>
          </div>
        ) : !showResult ? (
          
          <div className="w-full max-w-2xl flex flex-col items-center transition-none">
            <div className="w-full bg-indigo-950/60 border border-purple-500/20 h-2.5 rounded-full mb-8 overflow-hidden shadow-inner">
              <div 
                className="bg-cyan-400 h-full border-r border-cyan-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>

            <div className="mb-4">
              <span className={`text-xs text-cyan-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] ${getHeadingFont()}`}>
                {uiStrings.quizScreen.scenario[lang]} {currentQuestion + 1} {uiStrings.quizScreen.of[lang]} {questions.length}
              </span>
            </div>

            <div className="w-full bg-indigo-950/40 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 sm:p-8 text-center shadow-[0_0_30px_rgba(147,51,234,0.15)] mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {questions[currentQuestion].text[lang]}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option.scores)}
                  className="w-full text-center font-semibold text-slate-100 p-5 bg-indigo-900/40 hover:bg-purple-900/40 active:bg-cyan-400 active:text-slate-950 backdrop-blur-md border border-purple-500/20 hover:border-purple-400/40 rounded-xl text-sm sm:text-base md:text-lg cursor-pointer shadow-lg leading-normal drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] transition-all duration-100"
                >
                  {option.text[lang]}
                </button>
              ))}
            </div>
          </div>
        ) : (
          
          <div className="w-full max-w-xl flex flex-col items-center text-center animate-fade-in">
            <h2 className={`text-xl sm:text-2xl font-light text-slate-300 mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] ${getHeadingFont()}`}>
              {uiStrings.resultScreen.destiny[lang]}
            </h2>

            <div className="w-40 h-40 sm:w-48 sm:h-48 my-6 relative flex items-center justify-center">
              <div 
                className="absolute inset-0 rounded-full blur-2xl opacity-40 animate-pulse"
                style={{ backgroundColor: planetConfig?.color }}
              ></div>
              <img 
                src={`/${winningPlanetKey}.png`} 
                alt={winningPlanetKey}
                className="w-full h-full object-contain relative z-10 animate-spin [animation-duration:45s] drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] scale-110 transition-transform duration-700"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>

            <h1 
              className={`text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-6 tracking-wider ${getHeadingFont()}`}
              style={{ 
                color: planetConfig?.color,
                textShadow: `0 0 20px ${planetConfig?.color}cc, 0 2px 4px rgba(0,0,0,0.8)`
              }}
            >
              {uiStrings.resultScreen.planet[lang]} {planetConfig?.name[lang]}
            </h1>

            <div 
              className="bg-indigo-950/40 backdrop-blur-md rounded-2xl p-6 mb-8 max-w-md shadow-xl border"
              style={{ 
                borderColor: planetConfig?.color,
                boxShadow: `0 0 25px ${planetConfig?.color}25`
              }}
            >
              <p className={`text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] ${getHeadingFont()}`}>
                {planetConfig?.desc[lang]}
              </p>
            </div>

            <button
              onClick={resetQuiz}
              className={`px-8 py-3.5 text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-full cursor-pointer uppercase shadow-[0_4px_12px_rgba(34,211,238,0.3)] active:scale-95 transition-transform duration-100 ${getHeadingFont()}`}
            >
              {uiStrings.resultScreen.btn[lang]}
            </button>
          </div>
        )}
      </main>
    </Layout>
  );
}