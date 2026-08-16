/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ModuleData {
  name: string;
  cost: string;
  integrity: number;
  load: number;
  speed: number;
  details: string;
}

export interface LabNode {
  id: string;
  name: string;
  desc: string;
  modules: ModuleData[];
}

export type LabNodeKey = 'cranial' | 'ocular' | 'core' | 'limbs';

export const LAB_DATA: Record<LabNodeKey, LabNode> = {
  cranial: {
    id: 'NODE // CRANIAL_v9.2',
    name: 'Neural Cranial Implants',
    desc: 'Connect your biological consciousness directly to the neural grid. Install neuro-receptors to expand memory buffers, compute bandwidth, and establish seamless machine communication.',
    modules: [
      { name: 'Synaptic Shunt v4', cost: '15,000 CR', integrity: 98, load: 15, speed: 95.4, details: 'Bandwidth: +2 Gbps // Synapse Load: +10%' },
      { name: 'Hyper-Cortical Accelerator', cost: '42,000 CR', integrity: 94, load: 35, speed: 280.2, details: 'Bandwidth: +10 Gbps // Synapse Load: +35%' },
      { name: 'Quantum Coprocessor', cost: '120,000 CR', integrity: 88, load: 75, speed: 1024.0, details: 'Bandwidth: +100 Gbps // Synapse Load: +75%' }
    ]
  },
  ocular: {
    id: 'NODE // OCULAR_v3.6',
    name: 'Augmented Ocular Matrices',
    desc: 'Synthesize biological optical inputs with holographic metadata streams. Ocular enhancements offer real-time spectrum shifting (Infrared, UV, X-Ray) and targeting assistance interfaces.',
    modules: [
      { name: 'Targeting Reticle Acc_01', cost: '8,500 CR', integrity: 99, load: 5, speed: 12.0, details: 'Zoom: 5x // Targeting Rate: +15%' },
      { name: 'Multi-Spectrum Retinal Overlay', cost: '24,000 CR', integrity: 95, load: 18, speed: 85.0, details: 'Infrared & Thermals // Overlay Sync: +40%' },
      { name: 'Sub-Atomic Optical Shifter', cost: '78,000 CR', integrity: 91, load: 45, speed: 320.0, details: 'X-Ray & UV Shifting // Refresh Rate: 240Hz' }
    ]
  },
  core: {
    id: 'NODE // CORE_v5.0',
    name: 'Synapse Core Reactor',
    desc: 'The biomechanical core power grid. Reactor upgrades generate critical thermal venting capabilities, power distribution capacity, and autonomous fluid generation.',
    modules: [
      { name: 'Cold Fusion Cell', cost: '30,000 CR', integrity: 97, load: 20, speed: 120.0, details: 'Fluid Output: +5% // Integrity Safety: High' },
      { name: 'Dark Matter Pulse Drive', cost: '95,000 CR', integrity: 92, load: 50, speed: 580.0, details: 'Core Wavelength: 430NM // Output: +150%' },
      { name: 'Zero-Point Core Singular', cost: '260,000 CR', integrity: 85, load: 90, speed: 2400.0, details: 'Quantum State Compute // Reactor Level: MAX' }
    ]
  },
  limbs: {
    id: 'NODE // SERVO_LIMBS_v2.1',
    name: 'Motor Servo Limbs',
    desc: 'Recode somatic motor capabilities. Titanium frame reinforcement combined with magnetic muscle filaments provide enhanced hydraulic strength, agility, and heavy shock absorption.',
    modules: [
      { name: 'Carbon Fiber Flex Filament', cost: '18,000 CR', integrity: 99, load: 8, speed: 45.0, details: 'Strength: +20% // Response Latency: 0.08ms' },
      { name: 'Pneumatic Muscle Augment', cost: '50,000 CR', integrity: 96, load: 25, speed: 190.0, details: 'Strength: +80% // Lift Weight: +5 Tons' },
      { name: 'Hydraulic Titan Armatures', cost: '145,000 CR', integrity: 90, load: 60, speed: 850.0, details: 'Chassis: Titanium-9 // Damage Absorb: +250%' }
    ]
  }
};
