export default function Spinner({ className }: { className: string }) {
  return (
    <div role="status" className={`flex justify-center ${className}`}>
      <div
        aria-hidden="true"
        className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-sky-400 motion-reduce:animate-none"
      />
    </div>
  );
}
