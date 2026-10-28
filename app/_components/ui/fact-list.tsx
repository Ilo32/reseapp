export default function FactList({ facts }: { facts: [label: string, value: string][] }) {
  return (
    <dl className="divide-y divide-slate-800">
      {facts.map(([label, value]) => (
        <div key={label} className="flex justify-between gap-4 py-2">
          <dt className="font-medium text-slate-400">{label}</dt>
          <dd className="text-right">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
