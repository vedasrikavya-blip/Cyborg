/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function CursorHUD() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      animate={{
        x: position.x,
        y: position.y,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.5 }}
      style={{ left: -20, top: -20 }}
    >
      <div className="relative w-10 h-10 border border-cyan-500/50 rounded-full flex items-center justify-center">
        <div className="absolute inset-0 border-t-2 border-cyan-400 rounded-full animate-spin duration-3000" />
        <div className="w-1 h-1 bg-cyan-400 rounded-full" />
        
        <div className="absolute top-12 left-6 whitespace-nowrap font-mono text-[10px] text-cyan-400 flex flex-col gap-1 bg-black/40 p-1 backdrop-blur-sm border border-cyan-900/30">
          <span>X: {Math.round(position.x).toString().padStart(4, '0')}</span>
          <span>Y: {Math.round(position.y).toString().padStart(4, '0')}</span>
          <span className="text-purple-400">STATE: ACTIVE</span>
        </div>
      </div>
    </motion.div>
  );
}
