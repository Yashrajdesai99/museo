import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { AnimatedContent, DecryptedText, SplitText } from '../reactbits';

interface SectionHeaderProps {
  index: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
  rightSlot?: ReactNode;
  className?: string;
}

export function SectionHeader({
  index,
  kicker,
  title,
  subtitle,
  dark = false,
  rightSlot,
  className
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'pb-6 mb-10 border-b-[4px]',
        dark ? 'border-[#F2EDE4] text-[#F2EDE4]' : 'border-[#0E0E0E] text-[#0E0E0E]',
        className
      )}
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-3 text-xs font-mono-tabular font-semibold tracking-widest">
            <DecryptedText text={`${index}.`} speed={25} maxIterations={8} />
            {kicker && (
              <>
                <span aria-hidden="true">·</span>
                <DecryptedText text={kicker} speed={22} maxIterations={10} />
              </>
            )}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display leading-[1.06] tracking-tight">
            <SplitText text={title} splitBy="words" delay={0.04} />
          </h2>
          {subtitle && (
            <AnimatedContent distance={20} delay={0.12}>
              <p
                className={cn(
                  'text-base sm:text-lg leading-relaxed max-w-2xl font-body',
                  dark ? 'text-[#F2EDE4]/80' : 'text-[#0E0E0E]/80'
                )}
              >
                {subtitle}
              </p>
            </AnimatedContent>
          )}
        </div>
        {rightSlot && (
          <AnimatedContent distance={18} direction="horizontal" delay={0.15} className="shrink-0">
            {rightSlot}
          </AnimatedContent>
        )}
      </div>
    </div>
  );
}
