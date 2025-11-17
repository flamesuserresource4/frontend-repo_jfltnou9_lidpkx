import { useEffect, useState } from 'react';
import { Ship, Map, Wind, Thermometer } from 'lucide-react';

const BACKEND = import.meta.env.VITE_BACKEND_URL;

export default function Missions() {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    const load = async () => {
      if (!BACKEND) return;
      try {
        const res = await fetch(`${BACKEND}/api/missions`);
        const data = await res.json();
        setMissions(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  return (
    <section className="rounded-2xl border border-sky-400/10 bg-slate-900/60 p-6">
      <div className="flex items-center gap-2 text-sky-200 mb-4">
        <Ship className="w-5 h-5" />
        <span className="font-medium">Mission Summaries</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {missions.map((m) => (
          <div key={m._id} className="rounded-xl bg-slate-950/60 border border-sky-400/10 p-4">
            <div className="text-sky-100 font-medium">{m.title}</div>
            <div className="text-sky-300/70 text-sm">{m.summary || 'No summary'}</div>
            <div className="mt-2 text-xs text-sky-300/70">{m.region || '—'} • {m.status}</div>
          </div>
        ))}
        {missions.length === 0 && (
          <div className="col-span-full text-slate-400 text-sm">No missions yet. Create via API to populate.</div>
        )}
      </div>
    </section>
  );
}
