interface LoaderProps {
  label?: string;
}

export function Loader({ label = 'Initializing 3D Archival Viewport...' }: LoaderProps) {
  return (
    <div className="w-full h-full min-h-[260px] flex flex-col items-center justify-center bg-[#0E0E0E] text-[#F2EDE4] p-6 border-[3px] border-[#0E0E0E]">
      <div className="w-10 h-10 border-[3px] border-[#F2EDE4] border-t-[#FFD400] animate-spin mb-3" />
      <p className="text-xs font-mono-tabular tracking-wider text-[#F2EDE4]/80">
        {label}
      </p>
    </div>
  );
}
