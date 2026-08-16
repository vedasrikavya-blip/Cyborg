/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

export default function GlitchText({ text, className = "", as: Component = "h1" }: GlitchTextProps) {
  return (
    <Component className={`relative inline-block ${className} group overflow-hidden`}>
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute top-0 left-0 -z-10 text-cyan-500 opacity-0 group-hover:opacity-70 select-none pointer-events-none"
        animate={{
          x: [-2, 2, -1, 3, -2],
          y: [1, -1, 2, -2, 1],
        }}
        transition={{ repeat: Infinity, duration: 0.2 }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 -z-10 text-magenta-500 opacity-0 group-hover:opacity-70 select-none pointer-events-none"
        animate={{
          x: [2, -2, 1, -3, 2],
          y: [-1, 1, -2, 2, -1],
        }}
        transition={{ repeat: Infinity, duration: 0.25 }}
      >
        {text}
      </motion.span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />
    </Component>
  );
}
