import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { X, Trophy, RotateCcw } from 'lucide-react';

const ICONS = [
  '/wisata/960px-Menara_Pandang_Banjarmasin.webp',
  '/budaya/tari baksa kembang.webp',
  '/kuliner/soto banjar.webp',
  '/wisata/960px-Pasar_Terapung_Siring_Banj.webp',
  '/profil kota/Angkutan-BTS-Trans-Banjarmasin-t.webp',
  '/aset sasirangan/IMG_1162.webp'
];

// Helper to shuffle cards
const shuffleCards = () => {
  const shuffled = [...ICONS, ...ICONS]
    .sort(() => Math.random() - 0.5)
    .map((src, index) => ({ id: Math.random(), src, matched: false }));
  return shuffled;
};

export default function MemoryGameModal() {
  const { isMemoryGameOpen, setMemoryGameOpen } = useAppStore();
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [isWin, setIsWin] = useState(false);

  // Initialize game
  useEffect(() => {
    if (isMemoryGameOpen) {
      setCards(shuffleCards());
      setTurns(0);
      setIsWin(false);
      setChoiceOne(null);
      setChoiceTwo(null);
    }
  }, [isMemoryGameOpen]);

  // Handle a choice
  const handleChoice = (card) => {
    if (!disabled && card.id !== choiceOne?.id) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  // Compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Check for win
  useEffect(() => {
    if (cards.length > 0 && cards.every(c => c.matched)) {
      setIsWin(true);
    }
  }, [cards]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prev => prev + 1);
    setDisabled(false);
  };

  const restartGame = () => {
    setCards(shuffleCards());
    setTurns(0);
    setIsWin(false);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  if (!isMemoryGameOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
        onClick={() => setMemoryGameOpen(false)}
      />
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl bg-gradient-to-br from-[#0a1929] to-[#0d2137] rounded-3xl border border-[var(--glass-border)] shadow-2xl p-6 md:p-10 flex flex-col items-center animate-in fade-in zoom-in duration-300"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        <button 
          onClick={() => setMemoryGameOpen(false)}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/20 text-white transition-colors border border-white/10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F4C038] to-[#ffaa00] font-heading mb-2">
            Sasirangan Memory Flip
          </h2>
          <p className="text-[var(--text-muted)] font-body text-sm md:text-base">
            Cocokkan pasangan gambar warisan budaya Banjarmasin secepat mungkin!
          </p>
          <div className="mt-4 flex items-center justify-center gap-6">
            <span className="px-4 py-1 rounded-full bg-black/40 border border-white/10 text-white font-bold font-mono">
              Putaran: {turns}
            </span>
            <button 
              onClick={restartGame}
              className="flex items-center gap-2 text-sm text-[#33C3B3] hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Ulangi
            </button>
          </div>
        </div>

        {/* Win Screen */}
        {isWin ? (
          <div className="flex flex-col items-center justify-center py-12 animate-in slide-in-from-bottom-8 fade-in duration-700">
            <Trophy className="w-32 h-32 text-[#F4C038] mb-6 drop-shadow-[0_0_30px_rgba(244,192,56,0.5)]" />
            <h3 className="text-4xl font-black text-white font-heading mb-4">Luar Biasa!</h3>
            <p className="text-lg text-slate-300 mb-8 text-center max-w-md">
              Anda berhasil menyelesaikan tantangan memori budaya Banjar dalam <strong>{turns}</strong> putaran!
            </p>
            <button 
              onClick={() => setMemoryGameOpen(false)}
              className="px-8 py-4 bg-[#F4C038] hover:bg-[#e0b02e] text-black font-black uppercase tracking-wider rounded-xl transition-transform hover:scale-105"
            >
              Kembali ke Museum
            </button>
          </div>
        ) : (
          /* Game Grid */
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-2xl" style={{ perspective: '1000px' }}>
            {cards.map(card => {
              const isFlipped = card === choiceOne || card === choiceTwo || card.matched;
              return (
                <div 
                  key={card.id} 
                  className="relative aspect-square cursor-pointer group"
                  onClick={() => handleChoice(card)}
                >
                  <div 
                    className={`w-full h-full transition-transform duration-500`}
                    style={{ 
                      transformStyle: 'preserve-3d', 
                      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' 
                    }}
                  >
                    {/* Front of card (Icon) */}
                    <div 
                      className="absolute inset-0 rounded-xl overflow-hidden border-2 border-[#33C3B3] shadow-[0_0_15px_rgba(51,195,179,0.3)]"
                      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                      <img src={card.src} alt="card front" className="w-full h-full object-cover" />
                    </div>
                    {/* Back of card (Cover) */}
                    <div 
                      className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#091422] to-[#122b46] border-2 border-white/10 flex items-center justify-center shadow-lg group-hover:border-[#F4C038]/50 transition-colors"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <img src="/LOGO KOTA BANJARMASIN - 328 KB.webp" alt="cover" className="w-1/2 opacity-30 drop-shadow-md grayscale" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
