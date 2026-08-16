/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Cpu, Eye, Activity, Shield, Terminal as TerminalIcon, Cpu as LabIcon, UserCheck, Menu, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import CursorHUD from './components/CursorHUD';
import GlitchText from './components/GlitchText';
import BackgroundParticles from './components/BackgroundParticles';
import Terminal from './components/Terminal';
import DiagnosticHUD from './components/DiagnosticHUD';
import AugmentationLab from './components/AugmentationLab';
import { playSound } from './lib/audio';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative selection:bg-cyan-500/30">
      <BackgroundParticles />
      <CursorHUD />
      
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="flex gap-[2px]">
              <div className="w-1 h-4 bg-cyan-400 group-hover:h-6 transition-all" />
              <div className="w-1 h-4 bg-cyan-400 group-hover:h-6 transition-all delay-75" />
            </div>
            <span className="font-['Orbitron'] text-xl font-black tracking-[0.2em] uppercase">Cyborg</span>
            <span className="text-[10px] text-white/30 font-mono mt-1">OS_v4.89</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="#overview">Overview</NavLink>
            <NavLink href="#specifications">Specifications</NavLink>
            <NavLink href="#lab">Augmentation Lab</NavLink>
            <NavLink href="#hud">System HUD</NavLink>
            <NavLink href="#portal">Access Portal</NavLink>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-green-500 font-mono uppercase tracking-widest">Link // Secure</span>
            </div>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <motion.div 
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0 }}
      >
        <NavLink href="#overview" onClick={() => setIsMenuOpen(false)}>Overview</NavLink>
        <NavLink href="#specifications" onClick={() => setIsMenuOpen(false)}>Specifications</NavLink>
        <NavLink href="#lab" onClick={() => setIsMenuOpen(false)}>Augmentation Lab</NavLink>
        <NavLink href="#hud" onClick={() => setIsMenuOpen(false)}>System HUD</NavLink>
        <NavLink href="#portal" onClick={() => setIsMenuOpen(false)}>Access Portal</NavLink>
      </motion.div>

      <main className="relative z-10 pt-32">
        {/* Hero Section */}
        <section id="overview" className="max-w-7xl mx-auto px-6 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4"
            >
              <GlitchText text="RECODE YOUR" className="text-5xl md:text-7xl font-black font-['Orbitron'] tracking-tighter" />
              <GlitchText text="BIOLOGY" className="text-5xl md:text-7xl font-black font-['Orbitron'] tracking-tighter" />
              
              <p className="text-white/60 text-lg leading-relaxed max-w-xl mt-4">
                Step beyond natural limitations. Upgrade your sensory, neural, and physical components with the industry-standard Cyborg cybernetic enhancements. Achieve synthetic synergy today.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Terminal />
            </motion.div>

            <div className="flex flex-wrap gap-4 mt-4">
              <button className="h-12 px-8 bg-cyan-600 hover:bg-cyan-500 text-black font-black uppercase tracking-[0.2em] text-xs transition-all clip-path-cyber active:scale-95" onClick={() => playSound('click')}>
                Activate Protocol
              </button>
              <button className="h-12 px-8 border border-white/10 hover:border-white/30 text-white font-black uppercase tracking-[0.2em] text-xs transition-all clip-path-cyber active:scale-95 bg-white/5" onClick={() => playSound('click')}>
                Enter Core Lab
              </button>
            </div>
          </div>

          <motion.div 
            className="relative group"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl rounded-full group-hover:bg-cyan-500/20 transition-all" />
            <div className="relative border border-cyan-500/20 p-2 bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)] z-10 pointer-events-none" />
              <img 
                src="https://i.postimg.cc/QtBt2Znj/cyborg-hero.jpg" 
                alt="Cybernetic Human Enhancement" 
                className="w-full h-auto rounded grayscale group-hover:grayscale-0 transition-all duration-700 brightness-75 group-hover:brightness-100"
              />
              
              {/* HUD Overlays */}
              <div className="absolute top-4 left-4 z-20 flex flex-col gap-1">
                <div className="px-2 py-0.5 bg-cyan-500/20 border border-cyan-500/30 text-[8px] text-cyan-400 font-mono uppercase">Sys_Sync: 99.8%</div>
                <div className="px-2 py-0.5 bg-black/50 border border-white/10 text-[8px] text-white/50 font-mono uppercase">Chassis: Titanium-9</div>
              </div>
              <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-1 items-end">
                <div className="px-2 py-0.5 bg-magenta-500/20 border border-magenta-500/30 text-[8px] text-magenta-400 font-mono uppercase text-right">Ocular // ACC_01</div>
                <div className="px-2 py-0.5 bg-black/50 border border-white/10 text-[8px] text-white/50 font-mono uppercase text-right">Wavelength: 430NM</div>
              </div>

              {/* Animated Scan Lines */}
              <div className="absolute inset-0 z-[15] pointer-events-none overflow-hidden opacity-30">
                <motion.div 
                  className="w-full h-[2px] bg-cyan-400 shadow-[0_0_15px_rgba(0,240,255,1)]"
                  animate={{ top: ['0%', '100%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  style={{ position: 'absolute' }}
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section id="specifications" className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Cpu className="text-cyan-400" />}
              title="Neural Mesh"
              desc="Nano-filament interfaces for sub-millisecond response times."
            />
            <FeatureCard 
              icon={<Eye className="text-magenta-400" />}
              title="Spectral Vision"
              desc="Multi-band optical sensors with real-time UV and Infrared."
            />
            <FeatureCard 
              icon={<Activity className="text-purple-400" />}
              title="Bio-Kinetic"
              desc="Titanium-reinforced armatures with liquid-metal fiber."
            />
            <FeatureCard 
              icon={<Shield className="text-green-400" />}
              title="Hardened Shield"
              desc="Integrated Faraday cage protection for critical circuitry."
            />
          </div>
        </section>

        {/* Augmentation Lab Section */}
        <section id="lab" className="bg-black/20 border-y border-white/5 py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center gap-4 mb-20">
              <GlitchText text="AUGMENTATION LAB" className="text-3xl md:text-5xl font-black font-['Orbitron'] uppercase tracking-widest" as="h2" />
              <div className="w-24 h-1 bg-cyan-500" />
              <p className="text-white/40 max-w-2xl text-sm md:text-base">
                Configure your biological chassis with precision-engineered modules. 
                Select a node on the blueprint to view available integration options.
              </p>
            </div>
            
            <AugmentationLab />
          </div>
        </section>

        {/* System HUD Section */}
        <section id="hud" className="max-w-7xl mx-auto px-6 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4 flex flex-col gap-6">
              <h2 className="text-4xl font-black font-['Orbitron'] tracking-tight">SYSTEM HUD <br/><span className="text-cyan-500">DIAGNOSTICS</span></h2>
              <p className="text-white/60 leading-relaxed">
                Real-time monitoring of your cybernetic synchronization. Our proprietary interface provides granular telemetry data directly from your neural core.
              </p>
              <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-3 text-sm text-white/80">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                  <span>Real-time thermal monitoring</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/80">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                  <span>Cortex load optimization</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/80">
                  <div className="w-1.5 h-1.5 bg-magenta-400 rounded-full" />
                  <span>Secure satellite uplink</span>
                </li>
              </ul>
            </div>
            
            <div className="lg:col-span-8 bg-black/40 border border-cyan-900/20 p-8 rounded-3xl h-[400px]">
              <DiagnosticHUD />
            </div>
          </div>
        </section>

        {/* Access Portal Section */}
        <section id="portal" className="max-w-7xl mx-auto px-6 py-32">
          <div className="relative bg-gradient-to-br from-cyan-900/10 via-black to-purple-900/10 border border-white/5 rounded-[2rem] p-8 md:p-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="flex flex-col gap-6">
                <h2 className="text-4xl font-black font-['Orbitron'] tracking-tight uppercase">Access <span className="text-magenta-500">Portal</span></h2>
                <p className="text-white/60 leading-relaxed">
                  Join the elite ranks of the augmented. Enter your authorization credentials to register your chassis with the global neural grid and unlock premium enhancement tiers.
                </p>
                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                  <Shield className="text-cyan-400" />
                  <span className="text-xs text-white/40 font-mono">End-to-end quantum encryption enabled by default. No data leaks, strictly enforced.</span>
                </div>
              </div>

              <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <div className="group">
                  <label className="block text-[10px] text-white/40 uppercase tracking-[0.2em] mb-2 ml-1">Cyborg Name / ID</label>
                  <input 
                    type="text" 
                    placeholder="e.g. V-7749"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none transition-all placeholder:text-white/20"
                  />
                </div>
                <div className="group">
                  <label className="block text-[10px] text-white/40 uppercase tracking-[0.2em] mb-2 ml-1">Neural Address (Email)</label>
                  <input 
                    type="email" 
                    placeholder="address@neural.grid"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-magenta-500 focus:outline-none transition-all placeholder:text-white/20"
                  />
                </div>
                <button 
                  className="h-14 mt-4 bg-white text-black font-black uppercase tracking-[0.3em] text-sm clip-path-cyber hover:bg-cyan-400 transition-all active:scale-95"
                  onClick={() => playSound('success')}
                >
                  Register Authorization
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 pt-20 pb-10 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-cyan-400" />
              <span className="font-['Orbitron'] text-2xl font-black tracking-[0.2em] uppercase">Cyborg</span>
            </div>
            <p className="text-xs text-white/40 leading-relaxed">
              Pioneering the boundary between humanity and machine. Cyborg provides industrial-grade cybernetic solutions for the modern biological chassis.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Activity size={18} />} />
              <SocialIcon icon={<Shield size={18} />} />
              <SocialIcon icon={<TerminalIcon size={18} />} />
              <SocialIcon icon={<LabIcon size={18} />} />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] text-white uppercase tracking-[0.3em] font-bold">Quick Uplinks</h4>
            <ul className="flex flex-col gap-3 text-xs text-white/40">
              <li><a href="#overview" className="hover:text-cyan-400 transition-colors uppercase tracking-widest">Core Interface</a></li>
              <li><a href="#specifications" className="hover:text-cyan-400 transition-colors uppercase tracking-widest">Hardware Specs</a></li>
              <li><a href="#lab" className="hover:text-cyan-400 transition-colors uppercase tracking-widest">Augmentation Lab</a></li>
              <li><a href="#hud" className="hover:text-cyan-400 transition-colors uppercase tracking-widest">System Diagnostics</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] text-white uppercase tracking-[0.3em] font-bold">Legal Matrix</h4>
            <ul className="flex flex-col gap-3 text-xs text-white/40">
              <li><span className="hover:text-magenta-400 cursor-pointer uppercase tracking-widest">Privacy Protocol</span></li>
              <li><span className="hover:text-magenta-400 cursor-pointer uppercase tracking-widest">Usage Agreement</span></li>
              <li><span className="hover:text-magenta-400 cursor-pointer uppercase tracking-widest">Chassis Warranty</span></li>
              <li><span className="hover:text-magenta-400 cursor-pointer uppercase tracking-widest">Safety Standards</span></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] text-white uppercase tracking-[0.3em] font-bold">Network Status</h4>
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex flex-col gap-3">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-white/40 uppercase tracking-widest">Grid Stability</span>
                <span className="text-green-500">99.99%</span>
              </div>
              <div className="w-full h-0.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[99.99%]" />
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-white/40 uppercase tracking-widest">Secure Uplink</span>
                <span className="text-cyan-400">ENCRYPTED</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-white/5">
          <p className="text-[10px] text-white/20 font-mono uppercase tracking-[0.2em]">
            © 2026 CYBORG INDUSTRIES. ALL BIOLOGICAL DATA SECURED.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] text-cyan-400/50 font-mono tracking-tighter">
              BIOLOGICAL DATA ENCRYPTED. STATUS: SYNCHRONIZED.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <a 
      href={href} 
      onClick={(e) => {
        playSound('hover');
        if (onClick) onClick();
      }}
      className="text-[10px] text-white/60 hover:text-cyan-400 font-bold uppercase tracking-[0.2em] transition-all relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all group-hover:w-full" />
    </a>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group p-8 bg-black/40 border border-white/5 rounded-2xl hover:border-white/20 transition-all relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent -translate-y-full translate-x-full group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500" />
      <div className="mb-6 p-3 bg-white/5 w-fit rounded-xl group-hover:scale-110 transition-all">
        {icon}
      </div>
      <h3 className="text-lg font-black font-['Orbitron'] mb-2 uppercase tracking-widest">{title}</h3>
      <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <div 
      className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg text-white/40 hover:text-white hover:border-white/30 transition-all cursor-pointer"
      onMouseEnter={() => playSound('hover')}
    >
      {icon}
    </div>
  );
}

