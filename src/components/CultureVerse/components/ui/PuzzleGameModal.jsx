import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { X, Trophy, RotateCcw } from 'lucide-react';

const GRID_SIZE = 3;
const PUZZLE_IMAGE = '/wisata/960px-Pasar_Terapung_Siring_Banj.webp';

// Helper to shuffle the puzzle (ensure solvable by doing random valid moves from solved state)
const shuffleTiles = () => {
  let tiles = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i);
  // Simple random shuffle for jigsaw style (not sliding puzzle, just swap to match)
  // Jigsaw is easier for mobile: Click tile A, click tile B to swap them.
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  return tiles;
};

export default function PuzzleGameModal() {
  const { isPuzzleGameOpen, setPuzzleGameOpen } = useAppStore();
  const [tiles, setTiles] = useState([]);
  const [selectedTileIndex, setSelectedTileIndex] = useState(null);
  const [moves, setMoves] = useState(0);
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    if (isPuzzleGameOpen) {
      startNewGame();
    }
  }, [isPuzzleGameOpen]);

  const startNewGame = () => {
    setTiles(shuffleTiles());
    setMoves(0);
    setIsWin(false);
    setSelectedTileIndex(null);
  };

  const checkWin = (currentTiles) => {
    const won = currentTiles.every((val, index) => val === index);
    setIsWin(won);
  };

  const handleTileClick = (index) => {
    if (isWin) return;
    
    if (selectedTileIndex === null) {
      setSelectedTileIndex(index);
    } else {
      // Swap tiles
      if (selectedTileIndex !== index) {
        const newTiles = [...tiles];
        [newTiles[selectedTileIndex], newTiles[index]] = [newTiles[index], newTiles[selectedTileIndex]];
        setTiles(newTiles);
        setMoves(m => m + 1);
        checkWin(newTiles);
      }
      setSelectedTileIndex(null);
    }
  };

  if (!isPuzzleGameOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
        onClick={() => setPuzzleGameOpen(false)}
      />
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-2xl bg-gradient-to-br from-[#0a1929] to-[#0d2137] rounded-3xl border border-[var(--glass-border)] shadow-2xl p-6 md:p-8 flex flex-col items-center animate-in fade-in zoom-in duration-300"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        <button 
          onClick={() => setPuzzleGameOpen(false)}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/20 text-white transition-colors border border-white/10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] to-[#38bdf8] font-heading mb-2">
            Artefak Puzzle
          </h2>
          <p className="text-[var(--text-muted)] font-body text-sm">
            Klik dua kotak untuk menukar posisinya dan susun gambar Pasar Terapung dengan benar!
          </p>
          <div className="mt-4 flex items-center justify-center gap-6">
            <span className="px-4 py-1 rounded-full bg-black/40 border border-white/10 text-white font-bold font-mono">
              Langkah: {moves}
            </span>
            <button 
              onClick={startNewGame}
              className="flex items-center gap-2 text-sm text-[#06b6d4] hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Ulangi
            </button>
          </div>
        </div>

        {isWin ? (
          <div className="flex flex-col items-center justify-center py-8 animate-in slide-in-from-bottom-8 fade-in duration-700">
            <Trophy className="w-24 h-24 text-[#06b6d4] mb-4 drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]" />
            <h3 className="text-3xl font-black text-white font-heading mb-2">Luar Biasa!</h3>
            <p className="text-slate-300 mb-6 text-center">
              Anda berhasil menyusun puzzle dalam <strong>{moves}</strong> langkah!
            </p>
            <div className="w-64 h-64 rounded-xl overflow-hidden border-4 border-[#06b6d4] shadow-[0_0_20px_rgba(6,182,212,0.4)] mb-6">
               <img src={PUZZLE_IMAGE} className="w-full h-full object-cover" alt="Completed" />
            </div>
            <button 
              onClick={() => setPuzzleGameOpen(false)}
              className="px-8 py-3 bg-[#06b6d4] hover:bg-[#0891b2] text-white font-black uppercase tracking-wider rounded-xl transition-transform hover:scale-105"
            >
              Kembali
            </button>
          </div>
        ) : (
          <div className="w-full max-w-sm aspect-square bg-black/50 p-2 rounded-xl border border-white/10 shadow-inner">
            <div 
              className="w-full h-full grid gap-1" 
              style={{ gridTemplateColumns: \`repeat(\${GRID_SIZE}, minmax(0, 1fr))\` }}
            >
              {tiles.map((tileVal, index) => {
                const row = Math.floor(tileVal / GRID_SIZE);
                const col = tileVal % GRID_SIZE;
                const isSelected = selectedTileIndex === index;
                const isCorrect = tileVal === index;

                return (
                  <div
                    key={index}
                    onClick={() => handleTileClick(index)}
                    className={\`relative cursor-pointer rounded overflow-hidden transition-all duration-200 
                      \${isSelected ? 'ring-4 ring-[#06b6d4] scale-95 z-10' : 'hover:scale-[0.98]'}
                      \${isCorrect ? 'opacity-100' : 'opacity-90'}
                    \`}
                  >
                    {/* Background image slice */}
                    <div 
                      className="absolute inset-0 bg-cover bg-no-repeat"
                      style={{
                        backgroundImage: \`url(\${PUZZLE_IMAGE})\`,
                        backgroundSize: \`\${GRID_SIZE * 100}% \${GRID_SIZE * 100}%\`,
                        backgroundPosition: \`\${(col / (GRID_SIZE - 1)) * 100}% \${(row / (GRID_SIZE - 1)) * 100}%\`
                      }}
                    />
                    {/* Overlay for interaction feedback */}
                    <div className={\`absolute inset-0 bg-black/10 transition-colors \${isSelected ? 'bg-[#06b6d4]/20' : ''}\`} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
