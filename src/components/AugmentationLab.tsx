/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LAB_DATA, LabNodeKey } from '../types';
import { playSound } from '../lib/audio';

export default function AugmentationLab() {
  const [activeNode, setActiveNode] = useState<LabNodeKey>('cranial');
  const [selectedModuleIdx, setSelectedModuleIdx] = useState(0);
  const [isInjecting, setIsInjecting] = useState(false);

  const nodeData = LAB_DATA[activeNode];
  const selectedModule = nodeData.modules[selectedModuleIdx];

  const handleNodeSelect = (node: LabNodeKey) => {
    if (activeNode === node) return;
    playSound('click');
    setActiveNode(node);
    setSelectedModuleIdx(0);
  };

  const handleInject = () => {
    setIsInjecting(true);
    playSound('inject');
    setTimeout(() => {
      setIsInjecting(false);
      playSound('success');
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Blueprint Visualizer */}
      <div className="lg:col-span-5 bg-black/40 border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
        <div className="absolute top-4 left-4 flex flex-col gap-1">
          <span className="text-[10px] text-cyan-400/50 uppercase tracking-widest font-mono">Blueprint_View // Chassis-V9</span>
          <div className="w-12 h-1 bg-cyan-500/30" />
        </div>

        <svg viewBox="0 0 400 500" className="w-full h-auto drop-shadow-[0_0_15px_rgba(0,240,255,0.2)]">
          {/* Head */}
          <path 
            d="M170 80 Q200 40 230 80 L230 140 Q200 160 170 140 Z" 
            className={`cursor-pointer transition-all duration-500 ${activeNode === 'cranial' ? 'fill-cyan-500/30 stroke-cyan-400 stroke-2' : 'fill-white/5 stroke-white/20'}`}
            onClick={() => handleNodeSelect('cranial')}
            onMouseEnter={() => playSound('hover')}
          />
          {/* Eyes */}
          <circle 
            cx="200" cy="100" r="15"
            className={`cursor-pointer transition-all duration-500 ${activeNode === 'ocular' ? 'fill-magenta-500/40 stroke-magenta-400 stroke-2' : 'fill-white/5 stroke-white/20'}`}
            onClick={() => handleNodeSelect('ocular')}
            onMouseEnter={() => playSound('hover')}
          />
          {/* Torso / Core */}
          <path 
            d="M150 160 L250 160 L240 320 L160 320 Z" 
            className={`cursor-pointer transition-all duration-500 ${activeNode === 'core' ? 'fill-purple-500/30 stroke-purple-400 stroke-2' : 'fill-white/5 stroke-white/20'}`}
            onClick={() => handleNodeSelect('core')}
            onMouseEnter={() => playSound('hover')}
          />
          {/* Core Glow */}
          <circle 
            cx="200" cy="240" r={activeNode === 'core' ? 25 : 15}
            className={`pointer-events-none transition-all duration-700 ${activeNode === 'core' ? 'fill-purple-400 blur-md animate-pulse' : 'fill-white/10'}`}
          />
          {/* Arms */}
          <path d="M140 170 L80 280 M260 170 L320 280" 
            className={`cursor-pointer transition-all duration-500 stroke-2 ${activeNode === 'limbs' ? 'stroke-cyan-400' : 'stroke-white/20'}`}
            onClick={() => handleNodeSelect('limbs')}
          />
          <path 
            d="M70 280 L110 280 L130 170 L150 170 L150 320 L70 320 Z M330 280 L290 280 L270 170 L250 170 L250 320 L330 320 Z" 
            className={`cursor-pointer transition-all duration-500 ${activeNode === 'limbs' ? 'fill-cyan-500/20 stroke-cyan-400 stroke-2' : 'fill-white/5 stroke-white/20'}`}
            onClick={() => handleNodeSelect('limbs')}
            onMouseEnter={() => playSound('hover')}
          />
          {/* Legs */}
          <path 
            d="M160 330 L200 480 L240 330 Z" 
            className={`cursor-pointer transition-all duration-500 ${activeNode === 'limbs' ? 'fill-cyan-500/20 stroke-cyan-400 stroke-2' : 'fill-white/5 stroke-white/20'}`}
            onClick={() => handleNodeSelect('limbs')}
            onMouseEnter={() => playSound('hover')}
          />
        </svg>

        <div className="absolute bottom-6 left-6 right-6 flex justify-between gap-4">
          {(['cranial', 'ocular', 'core', 'limbs'] as LabNodeKey[]).map(node => (
            <button
              key={node}
              onClick={() => handleNodeSelect(node)}
              className={`flex-1 py-1 px-2 text-[8px] border transition-all uppercase tracking-tighter ${activeNode === node ? 'border-cyan-400 text-cyan-400 bg-cyan-400/10' : 'border-white/10 text-white/40 hover:border-white/30'}`}
            >
              {node}
            </button>
          ))}
        </div>
      </div>

      {/* Controls Panel */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-[10px] text-white/40 font-mono tracking-widest uppercase">{nodeData.id}</div>
          <h2 className="text-2xl font-bold text-white tracking-tight">{nodeData.name}</h2>
          <p className="text-xs text-white/60 leading-relaxed max-w-lg">{nodeData.desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DiagnosticMeter label="Integrity" percent={selectedModule.integrity} color="bg-green-500" />
          <DiagnosticMeter label="Synaptic Load" percent={selectedModule.load} color="bg-amber-500" />
          <DiagnosticMeter label="Sync Speed" percent={Math.min(100, (selectedModule.speed / 1024) * 100)} unit={`${selectedModule.speed} Gbps`} color="bg-cyan-500" />
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">Integration Options</span>
          <div className="grid grid-cols-1 gap-3">
            {nodeData.modules.map((mod, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedModuleIdx(idx);
                  playSound('click');
                }}
                className={`relative flex items-center justify-between p-4 border transition-all overflow-hidden group ${selectedModuleIdx === idx ? 'border-cyan-500 bg-cyan-500/5' : 'border-white/5 hover:border-white/20 bg-black/20'}`}
              >
                {selectedModuleIdx === idx && (
                  <motion.div layoutId="active-module" className="absolute inset-0 border-2 border-cyan-500/50" />
                )}
                <div className="flex flex-col items-start gap-1">
                  <span className={`text-sm font-bold ${selectedModuleIdx === idx ? 'text-white' : 'text-white/60'}`}>{mod.name}</span>
                  <span className="text-[9px] text-white/40 uppercase tracking-widest">{mod.details}</span>
                </div>
                <div className={`text-xs font-mono ${selectedModuleIdx === idx ? 'text-cyan-400' : 'text-white/30'}`}>{mod.cost}</div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleInject}
          disabled={isInjecting}
          className="relative h-14 w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-900/50 text-black font-black uppercase tracking-[0.3em] text-sm clip-path-cyber transition-all active:scale-95 flex items-center justify-center gap-4 overflow-hidden"
        >
          {isInjecting ? (
            <>
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              <span>Stabilizing Synapse...</span>
            </>
          ) : (
            <span>Inject Augmentation Module</span>
          )}
          
          <AnimatePresence>
            {isInjecting && (
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
              />
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}

function DiagnosticMeter({ label, percent, unit, color }: { label: string; percent: number; unit?: string; color: string }) {
  return (
    <div className="flex flex-col gap-2 bg-black/20 p-3 border border-white/5 rounded-lg">
      <div className="flex justify-between items-end">
        <span className="text-[9px] text-white/40 uppercase tracking-widest">{label}</span>
        <span className="text-xs font-mono text-white/80">{unit || `${percent}%`}</span>
      </div>
      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${color} shadow-[0_0_10px_currentColor]`}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: 'circOut' }}
        />
      </div>
    </div>
  );
}
