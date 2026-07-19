import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';

export default function MobileJoystickOverlay() {
  const cameraMode = useAppStore((state) => state.cameraMode);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  if (!isTouchDevice || cameraMode !== 'rpg') return null;

  const handleKey = (key, isDown) => {
    window.dispatchEvent(
      new KeyboardEvent(isDown ? 'keydown' : 'keyup', {
        key,
        code: key === ' ' ? 'Space' : `Key${key.toUpperCase()}`,
        bubbles: true,
      })
    );
  };

  const NavButton = ({ label, keyName, className }) => (
    <button
      onPointerDown={(e) => { e.preventDefault(); handleKey(keyName, true); }}
      onPointerUp={(e) => { e.preventDefault(); handleKey(keyName, false); }}
      onPointerLeave={(e) => { e.preventDefault(); handleKey(keyName, false); }}
      className={`w-14 h-14 bg-slate-900/50 border-2 border-[#33C3B3] rounded-full text-white font-bold flex items-center justify-center active:bg-[#33C3B3] active:scale-95 transition-all select-none touch-none ${className}`}
    >
      {label}
    </button>
  );

  return (
    <div className="absolute inset-0 pointer-events-none z-[100] touch-none md:hidden">
      {/* D-Pad on the left */}
      <div className="absolute bottom-8 left-8 pointer-events-auto flex flex-col items-center gap-2">
        <NavButton label="W" keyName="w" />
        <div className="flex gap-2">
          <NavButton label="A" keyName="a" />
          <NavButton label="S" keyName="s" />
          <NavButton label="D" keyName="d" />
        </div>
      </div>

      {/* Jump button on the right */}
      <div className="absolute bottom-8 right-8 pointer-events-auto">
        <NavButton label="JUMP" keyName=" " className="w-20 h-20 rounded-full" />
      </div>
    </div>
  );
}
