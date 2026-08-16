/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Metric {
  label: string;
  value: string;
  percent: number;
}

export default function DiagnosticHUD() {
  const [cpu, setCpu] = useState(42);
  const [temp, setTemp] = useState(37.4);
  const [latency, setLatency] = useState(0.04);
  const [logs, setLogs] = useState<{ time: string; msg: string; type: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(prev => Math.max(20, Math.min(95, prev + (Math.random() * 10 - 5))));
      setTemp(prev => Math.max(35, Math.min(45, prev + (Math.random() * 0.4 - 0.2))));
      setLatency(prev => Math.max(0.01, Math.min(0.2, prev + (Math.random() * 0.02 - 0.01))));
    }, 3000);

    const logPhrases = [
      { msg: 'SECURE MATRIX SWEEP: COMPLETE [STATUS: NOMINAL]', type: 'success' },
      { msg: 'CORTICAL SYNC STABILIZED // CORE SYNC: 99.82%', type: 'info' },
      { msg: 'MEM_BUFFER POOL FLUSH: DEFRAGGING COMPLETED', type: 'info' },
      { msg: 'INTEGRITY SHIELD: BLOCKED OUTSIDE PING REQUESTS', type: 'success' },
      { msg: 'CORONAL FLOW DETECTED AT FREQUENCY 430HZ', type: 'info' },
      { msg: 'QUANTUM ENCRYPTION ROTATION COMPLETED SECURELY', type: 'success' },
    ];

    const logInterval = setInterval(() => {
      const phrase = logPhrases[Math.floor(Math.random() * logPhrases.length)];
      setLogs(prev => [
        { time: new Date().toLocaleTimeString(), msg: phrase.msg, type: phrase.type },
        ...prev.slice(0, 7)
      ]);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      <div className="flex flex-col gap-6">
        <div className="flex justify-around items-center bg-black/40 p-4 border border-white/5 rounded-lg">
          <CircularProgress label="CPU" value={Math.round(cpu)} unit="%" color="text-cyan-400" />
          <CircularProgress label="TEMP" value={temp.toFixed(1)} unit="°C" color="text-magenta-400" />
        </div>
        
        <div className="bg-black/40 p-4 border border-white/5 rounded-lg flex flex-col gap-3">
          <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40">
            <span>Cortical Latency</span>
            <span className="text-cyan-400 font-mono">{latency.toFixed(2)} ms</span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-cyan-500 shadow-[0_0_8px_rgba(0,240,255,0.8)]"
              animate={{ width: `${(latency / 0.2) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40">
            <span>Sync Rate</span>
            <span className="text-purple-400 font-mono">982 Mbps</span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-purple-500 shadow-[0_0_8px_rgba(189,0,255,0.8)]"
              animate={{ width: `92%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-black/60 border border-white/10 rounded-lg p-3 font-mono text-[10px] flex flex-col gap-2 h-full overflow-hidden">
        <div className="text-white/20 border-b border-white/5 pb-1 mb-1 uppercase tracking-[0.2em]">Diagnostic Feed</div>
        {logs.map((log, i) => (
          <motion.div 
            key={`${log.time}-${i}`} 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-2"
          >
            <span className="text-white/20 whitespace-nowrap">[{log.time}]</span>
            <span className={
              log.type === 'success' ? 'text-green-400/80' : 
              log.type === 'warning' ? 'text-amber-400/80' : 'text-cyan-400/80'
            }>
              {log.msg}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CircularProgress({ label, value, unit, color }: { label: string; value: string | number; unit: string; color: string }) {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Number(value) / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="2"
            className="text-white/5"
          />
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: offset }}
            className={color}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs font-bold font-mono">{value}</span>
          <span className="text-[8px] opacity-40">{unit}</span>
        </div>
      </div>
      <span className="text-[9px] uppercase tracking-widest text-white/40">{label}</span>
    </div>
  );
}
