/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from 'react';

interface TerminalLine {
  prompt?: boolean;
  text: string;
  status?: 'ok' | 'warn' | 'error' | 'info';
}

const INITIAL_LINES: TerminalLine[] = [
  { prompt: true, text: 'run core_sync_protocol.sh' },
  { text: '[OK] CORONAL IMPLANT v9.2: ACTIVE', status: 'ok' },
  { text: '[OK] OCULAR MATRIX: SYNCHRONIZED [60FPS]', status: 'ok' },
  { text: '[WARN] REGENERATOR FLUID LEVEL: 74%', status: 'warn' },
  { prompt: true, text: 'monitor telemetry --verbose' }
];

export default function Terminal() {
  const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lineIdx = 0;
    
    const printNextLine = async () => {
      if (lineIdx >= INITIAL_LINES.length) return;

      const current = INITIAL_LINES[lineIdx];
      
      if (current.prompt) {
        setIsTyping(true);
        const newLine = { prompt: true, text: '' };
        setDisplayedLines(prev => [...prev, newLine]);
        
        for (let i = 0; i <= current.text.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 40));
          setDisplayedLines(prev => {
            const last = prev[prev.length - 1];
            return [...prev.slice(0, -1), { ...last, text: current.text.slice(0, i) }];
          });
        }
        setIsTyping(false);
      } else {
        setDisplayedLines(prev => [...prev, current]);
      }

      lineIdx++;
      setTimeout(printNextLine, current.prompt ? 600 : 250);
    };

    printNextLine();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedLines]);

  return (
    <div className="bg-black/80 border border-cyan-900/50 rounded-lg p-4 font-mono text-xs md:text-sm h-64 overflow-y-auto custom-scrollbar shadow-[0_0_20px_rgba(0,0,0,0.5)]" ref={containerRef}>
      <div className="flex gap-2 mb-4 border-b border-white/5 pb-2">
        <div className="w-3 h-3 rounded-full bg-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/50" />
        <span className="ml-auto text-[10px] text-white/30 uppercase tracking-widest">Cyborg_INIT.SYS</span>
      </div>
      
      {displayedLines.map((line, idx) => (
        <div key={idx} className="mb-1 leading-relaxed">
          {line.prompt && (
            <span className="text-cyan-400 mr-2">cyborg:~$</span>
          )}
          <span className={`
            ${line.status === 'ok' ? 'text-green-400' : ''}
            ${line.status === 'warn' ? 'text-amber-400' : ''}
            ${line.status === 'error' ? 'text-red-400' : ''}
            ${!line.status && !line.prompt ? 'text-white/70' : ''}
            ${line.prompt ? 'text-white' : ''}
          `}>
            {line.text}
          </span>
        </div>
      ))}
      
      {isTyping && (
        <span className="inline-block w-2 h-4 bg-white/50 animate-pulse ml-1" />
      )}
    </div>
  );
}
