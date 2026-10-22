import { maToNormalizedProgress } from '../../lib/time';
import type { ExtinctionEvent } from '../../types/evolution';

interface EventMarkerProps {
  event: ExtinctionEvent;
  isActive: boolean;
  onSelect: (event: ExtinctionEvent) => void;
}

export function EventMarker({ event, isActive, onSelect }: EventMarkerProps) {
  const leftPercent = maToNormalizedProgress(event.ageMa) * 100;

  return (
    <button
      type="button"
      onClick={() => onSelect(event)}
      style={{ left: `${leftPercent}%` }}
      className="group absolute -top-3 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer focus:outline-none"
      title={`${event.shortName} (${event.ageMa} Ma) — ${event.speciesLostPercent}% species lost`}
      aria-label={`Jump to ${event.name} at ${event.ageMa} million years ago`}
    >
      <div
        className={`w-4 h-4 rotate-45 border-2 border-[#0E0E0E] transition-transform duration-150 ${
          event.hasCutscene
            ? 'bg-[#FFD400] scale-125 shadow-[2px_2px_0px_#0E0E0E]'
            : isActive
              ? 'bg-[#FFD400] scale-110'
              : 'bg-[#F2EDE4] group-hover:bg-[#FFD400] group-hover:scale-110'
        }`}
      />
      <span className="mt-5 px-1.5 py-0.5 text-[10px] font-mono-tabular font-bold bg-[#0E0E0E] text-[#F2EDE4] border border-[#F2EDE4]/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {event.ageMa} Ma · {event.shortName}
      </span>
    </button>
  );
}
