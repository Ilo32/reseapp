export default function Spinner({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div role="status" className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div
        aria-hidden="true"
        className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-sky-400 motion-reduce:animate-none"
      />
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  );
}
