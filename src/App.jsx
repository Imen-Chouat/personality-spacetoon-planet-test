import { useState } from 'react';
import { questions, uiStrings, planets } from './data/questions';
import { useLang } from './context/LanguageContext';
import Layout from './components/Layout';

export default function App() {
  const { lang } = useLang();
  
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({
    action: 0, sport: 0, adventure: 0, comedy: 0,
    science: 0, zumorroda: 0, bonbon: 0, abjad: 0, history: 0, movies: 0
  });
  const [showResult, setShowResult] = useState(false);

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
      setShowResult(true);
    }
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
      <main className="w-full flex-grow flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 z-10 select-none">
        
        {/* ==========================================================
            1. LANDING WELCOME GATEWAY VIEW
           ========================================================== */}
        {!quizStarted ? (
          <div className="w-full max-w-[420px] sm:max-w-[480px] md:max-w-[540px] lg:max-w-[580px] flex flex-col items-center justify-center transition-none">
            <img 
              src={currentTvAsset} 
              alt="Spacetoon TV Landing" 
              className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] mb-10"
            />

            {/* Start button now mirrors the clean capsule shape of your result button */}
            <button
              onClick={() => setQuizStarted(true)}
              className={`px-8 py-3.5 text-sm text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-full cursor-pointer uppercase tracking-wider shadow-[0_4px_12px_rgba(34,211,238,0.3)] active:scale-95 transition-transform duration-100 ${getHeadingFont()}`}
            >
              {uiStrings.startScreen.btn[lang]}
            </button>
          </div>
        ) : !showResult ? (
          
          /* ==========================================================
              2. FLOATING ACTIVE QUIZ INTERFACE
             ========================================================== */
          <div className="w-full max-w-2xl flex flex-col items-center transition-none">
            
            {/* Minimalist Cosmic Progress Bar */}
            <div className="w-full bg-indigo-950/60 border border-purple-500/20 h-2.5 rounded-full mb-8 overflow-hidden shadow-inner">
              <div 
                className="bg-cyan-400 h-full border-r border-cyan-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>

            {/* Scenario Counter Label */}
            <div className="mb-4">
              <span className={`text-xs text-cyan-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] ${getHeadingFont()}`}>
                {uiStrings.quizScreen.scenario[lang]} {currentQuestion + 1} {uiStrings.quizScreen.of[lang]} {questions.length}
              </span>
            </div>

            {/* Question Capsule */}
            <div className="w-full bg-indigo-950/40 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 sm:p-8 text-center shadow-[0_0_30px_rgba(147,51,234,0.15)] mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {questions[currentQuestion].text[lang]}
              </h2>
            </div>

            {/* Grid Answer Layout */}
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
          
          /* ==========================================================
              3. FLOATING DESTINY RESULT CARD
             ========================================================== */
          <div className="w-full max-w-xl flex flex-col items-center text-center transition-none">
            
            <h2 className={`text-xl sm:text-2xl font-light text-slate-300 mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] ${getHeadingFont()}`}>
              {uiStrings.resultScreen.destiny[lang]}
            </h2>
            
            {/* Spinning Planet Avatar */}
            <div className="w-40 h-40 sm:w-48 sm:h-48 my-6 relative flex items-center justify-center">
              <div 
                className="absolute inset-0 rounded-full blur-2xl opacity-20 animate-pulse"
                style={{ backgroundColor: planetConfig?.color }}
              ></div>
              <img 
                src={`/${winningPlanetKey}.png`} 
                alt={winningPlanetKey}
                className="w-full h-full object-contain relative z-10 animate-spin [animation-duration:45s] drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>

            {/* Planet Title With Customizable Text Glowing Light Shadow Layer */}
            <h1 
              className={`text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-6 tracking-wider ${getHeadingFont()}`}
              style={{ 
                color: planetConfig?.color,
                textShadow: `0 0 20px ${planetConfig?.color}cc, 0 2px 4px rgba(0,0,0,0.8)`
              }}
            >
              {uiStrings.resultScreen.planet[lang]} {planetConfig?.name[lang]}
            </h1>

            {/* Custom Description Text Container with dynamic borders, shadows, and Nasalization font updates */}
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
