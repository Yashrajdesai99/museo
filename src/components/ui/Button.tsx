import { motion } from 'motion/react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

/**
 * CTA.gallery / 21st.dev — Kinetic Spring Neo-Brutalist Button
 * Features spring-damped hover elevation, tactile mechanical press compression,
 * and a subtle diagonal light-sheen sweep on hover.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const reducedMotion = useReducedMotion();

  const variantStyles = {
    primary:
      'bg-[#FFD400] text-[#0E0E0E] border-[3px] border-[#0E0E0E] shadow-[6px_6px_0px_#0E0E0E] hover:bg-[#ffdf33]',
    secondary:
      'bg-[#F2EDE4] text-[#0E0E0E] border-[3px] border-[#0E0E0E] shadow-[6px_6px_0px_#0E0E0E] hover:bg-[#E8E1D5]',
    dark:
      'bg-[#0E0E0E] text-[#F2EDE4] border-[3px] border-[#F2EDE4] shadow-[6px_6px_0px_#FFD400] hover:bg-[#1C1C1C]',
    ghost:
      'bg-transparent text-current border-2 border-current hover:bg-[#0E0E0E]/10'
  }[variant];

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs font-semibold tracking-wider',
    md: 'px-5 py-2.5 text-sm font-bold tracking-wider',
    lg: 'px-7 py-3.5 text-base font-bold tracking-wider'
  }[size];

  return (
    <motion.button
      type="button"
      disabled={disabled}
      whileHover={
        reducedMotion || disabled
          ? undefined
          : { x: -1.5, y: -1.5, transition: { type: 'spring', stiffness: 420, damping: 22 } }
      }
      whileTap={
        reducedMotion || disabled
          ? undefined
          : { x: 3, y: 3, scale: 0.985, transition: { type: 'spring', stiffness: 520, damping: 26 } }
      }
      className={cn(
        'group/btn relative overflow-hidden inline-flex items-center justify-center gap-2 font-display whitespace-nowrap shrink-0 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles,
        sizeStyles,
        className
      )}
      {...(props as Record<string, unknown>)}
    >
      {/* Kinetic CTA.gallery sheen sweep */}
      {!reducedMotion && !disabled && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/30 transition-transform duration-500 ease-out group-hover/btn:translate-x-full"
        />
      )}
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
