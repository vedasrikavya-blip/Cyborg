/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SoundType = 'hover' | 'click' | 'inject' | 'success';

let audioCtx: AudioContext | null = null;

export function playSound(type: SoundType) {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'hover') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1500, now);
      gainNode.gain.setValueAtTime(0.01, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.start(now);
      osc.stop(now + 0.03);
    } else if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.06);
      gainNode.gain.setValueAtTime(0.03, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === 'inject') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(2000, now + 0.45);
      gainNode.gain.setValueAtTime(0.04, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.45);
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.setValueAtTime(1200, now + 0.1);
      osc.frequency.setValueAtTime(1600, now + 0.2);
      gainNode.gain.setValueAtTime(0.03, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    }
  } catch (error) {
    // Audio context blocked/unsupported
  }
}
