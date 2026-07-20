import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { X, Trophy, RotateCcw } from 'lucide-react';

const TARGET_WORD = "WADAI"; // Kue dalam bahasa Banjar
const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
];

export default function WordleGameModal() {
  const { isWordleGameOpen, setWordleGameOpen } = useAppStore();
  
  const handleClose = () => {
    setWordleGameOpen(false);
    if (!document.pointerLockElement && document.body.requestPointerLock) {
      document.body.requestPointerLock();
    }
  };
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [isWin, setIsWin] = useState(false);
  const [isLose, setIsLose] = useState(false);

  useEffect(() => {
    if (isWordleGameOpen) {
      setGuesses([]);
      setCurrentGuess('');
      setIsWin(false);
      setIsLose(false);
    }
  }, [isWordleGameOpen]);

  const onKeyPress = (key) => {
    if (isWin || isLose) return;

    if (key === 'ENTER') {
      if (currentGuess.length === WORD_LENGTH) {
        const newGuesses = [...guesses, currentGuess];
        setGuesses(newGuesses);
        setCurrentGuess('');

        if (currentGuess === TARGET_WORD) {
          setIsWin(true);
        } else if (newGuesses.length >= MAX_GUESSES) {
          setIsLose(true);
        }
      }
    } else if (key === 'DEL' || key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (/^[A-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(prev => prev + key);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isWordleGameOpen) return;
      
      const key = e.key.toUpperCase();
      if (key === 'ENTER' || key === 'BACKSPACE' || /^[A-Z]$/.test(key)) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        e.preventDefault();
        onKeyPress(key === 'BACKSPACE' ? 'DEL' : key);
      }
    };
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [currentGuess, guesses, isWin, isLose, isWordleGameOpen]);

  const restartGame = () => {
    setGuesses([]);
    setCurrentGuess('');
    setIsWin(false);
    setIsLose(false);
  };

  const getLetterStatus = (letter, index, guessWord) => {
    if (TARGET_WORD[index] === letter) return 'correct';
    if (TARGET_WORD.includes(letter)) return 'present';
    return 'absent';
  };

  const getKeyStatus = (key) => {
    let status = 'default';
    for (const guess of guesses) {
      for (let i = 0; i < WORD_LENGTH; i++) {
        if (guess[i] === key) {
          const s = getLetterStatus(key, i, guess);
          if (s === 'correct') return 'correct'; // correct overrides present
          if (s === 'present' && status !== 'correct') status = 'present';
          if (s === 'absent' && status === 'default') status = 'absent';
        }
      }
    }
    return status;
  };

  if (!isWordleGameOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
        onClick={handleClose}
      />
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-lg bg-gradient-to-br from-[#0a1929] to-[#0d2137] rounded-3xl border border-[var(--glass-border)] shadow-2xl p-4 sm:p-8 flex flex-col items-center animate-in fade-in zoom-in duration-300"
        style={{ maxHeight: '95vh', overflowY: 'auto' }}
      >
        <div className="w-full flex items-center justify-between pb-3 border-b border-white/10 font-game font-bold mb-4">
          <button
            onClick={handleClose}
            className="flex items-center gap-1 md:gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/20 text-slate-300 hover:text-white transition-all text-[10px] md:text-xs border border-white/10 group cursor-pointer tracking-wide"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Kembali ke Museum</span>
          </button>
          <span className="text-[9px] md:text-[10px] px-2 py-1 rounded-full bg-[#a855f7]/20 text-[#d946ef] tracking-wide font-medium">
            Arcade • Kata Banua
          </span>
        </div>

        <div className="text-center mb-6 mt-2">
          <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#d946ef] font-heading mb-1">
            Kata Banua
          </h2>
          <p className="text-[var(--text-muted)] font-body text-xs sm:text-sm">
            Tebak kata 5 huruf khas Banjar! (Contoh kata: WADAI)
          </p>
        </div>

        {/* Board */}
        <div className="grid grid-rows-6 gap-1.5 sm:gap-2 mb-6 w-full max-w-[300px]">
          {Array.from({ length: MAX_GUESSES }).map((_, rowIndex) => {
            const isCurrentRow = rowIndex === guesses.length;
            const guess = guesses[rowIndex] || (isCurrentRow ? currentGuess : '');
            
            return (
              <div key={rowIndex} className="grid grid-cols-5 gap-1.5 sm:gap-2">
                {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => {
                  const letter = guess[colIndex] || '';
                  const status = guesses[rowIndex] ? getLetterStatus(letter, colIndex, guess) : 'empty';
                  
                  let bgClass = 'bg-transparent border-white/20 text-white';
                  if (status === 'correct') bgClass = 'bg-[#10b981] border-[#10b981] text-white';
                  else if (status === 'present') bgClass = 'bg-[#f59e0b] border-[#f59e0b] text-white';
                  else if (status === 'absent') bgClass = 'bg-slate-700 border-slate-700 text-slate-300';
                  else if (letter) bgClass = 'border-white/50 text-white';

                  return (
                    <div 
                      key={colIndex}
                      className={`aspect-square flex items-center justify-center text-xl sm:text-2xl font-black rounded-lg border-2 ${bgClass} transition-colors uppercase`}
                    >
                      {letter}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Keyboard */}
        <div className="w-full flex flex-col gap-1.5 sm:gap-2 select-none">
          {KEYBOARD_ROWS.map((row, i) => (
            <div key={i} className="flex justify-center gap-1 sm:gap-1.5">
              {row.map(key => {
                const status = getKeyStatus(key);
                let btnBg = 'bg-slate-600 hover:bg-slate-500 text-white';
                if (status === 'correct') btnBg = 'bg-[#10b981] hover:bg-[#059669] text-white';
                if (status === 'present') btnBg = 'bg-[#f59e0b] hover:bg-[#d97706] text-white';
                if (status === 'absent') btnBg = 'bg-slate-800 hover:bg-slate-700 text-slate-500';

                const isBigBtn = key === 'ENTER' || key === 'DEL';
                
                return (
                  <button
                    key={key}
                    onClick={() => onKeyPress(key)}
                    className={`${isBigBtn ? 'px-2 sm:px-3 text-[10px] sm:text-xs' : 'flex-1 text-xs sm:text-sm'} h-10 sm:h-12 font-bold rounded ${btnBg} transition-colors`}
                  >
                    {key}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Game Over States */}
        {(isWin || isLose) && (
          <div className="absolute inset-0 bg-black/90 rounded-3xl flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
            {isWin ? (
              <>
                <Trophy className="w-20 h-20 text-[#a855f7] mb-4 drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]" />
                <h3 className="text-3xl font-black text-white mb-2">Hebat!</h3>
                <p className="text-slate-300 mb-6">Anda menebak "<strong>{TARGET_WORD}</strong>" dalam {guesses.length} tebakan!</p>
              </>
            ) : (
              <>
                <div className="text-6xl mb-4">😢</div>
                <h3 className="text-2xl font-black text-white mb-2">Kesempatan Habis</h3>
                <p className="text-slate-300 mb-6">Kata yang benar adalah "<strong>{TARGET_WORD}</strong>"</p>
              </>
            )}
            <div className="flex gap-4">
              <button 
                onClick={restartGame}
                className="px-6 py-2 bg-[#a855f7] hover:bg-[#9333ea] text-white font-bold rounded-xl transition-colors"
              >
                Main Lagi
              </button>
              <button 
                onClick={() => setWordleGameOpen(false)}
                className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
