import { cn } from '../../lib/cn';

interface BadgeProps {
  type: 'fossil' | 'artifact';
  accessionNumber?: string;
  className?: string;
}

/**
 * Clean unboxed typographic kicker distinguishing Fossil Specimen vs Cultural Artifact
 * in accordance with Zero-Pill & Metadata Discipline.
 */
export function Badge({ type, accessionNumber, className }: BadgeProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 text-xs font-mono-tabular tracking-wider text-[#4A4742]',
        className
      )}
    >
      <span className="font-bold text-[#0E0E0E]">
        {type === 'fossil' ? 'Fossil Specimen' : 'Cultural Artifact'}
      </span>
      {accessionNumber && (
        <>
          <span aria-hidden="true">·</span>
          <span>{accessionNumber}</span>
        </>
      )}
    </div>
  );
}
