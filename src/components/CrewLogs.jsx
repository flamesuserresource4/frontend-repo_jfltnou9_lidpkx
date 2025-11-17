import { useEffect, useState } from 'react';
import { NotebookPen } from 'lucide-react';

const BACKEND = import.meta.env.VITE_BACKEND_URL;

export default function CrewLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const load = async () => {
      if (!BACKEND) return;
      try {
        const res = await fetch(`${BACKEND}/api/logs`);
        const data = await res.json();
        setLogs(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  return (
    <section className="rounded-2xl border border-sky-400/10 bg-slate-900/60 p-6">
      <div className="flex items-center gap-2 text-sky-200 mb-4">
        <NotebookPen className="w-5 h-5" />
        <span className="font-medium">Crew Logs</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {logs.map((l) => (
          <article key={l._id} className="rounded-xl bg-slate-950/60 border border-sky-400/10 p-4">
            <div className="flex items-center justify-between">
              <div className="text-sky-100 font-medium">{l.author}</div>
              <div className="text-xs text-sky-300/60">{l.role || 'Crew'}</div>
            </div>
            <p className="mt-2 text-sky-200/90 text-sm">{l.message}</p>
          </article>
        ))}
        {logs.length === 0 && <div className="text-slate-400 text-sm">No logs yet. Add some via API.</div>}
      </div>
    </section>
  );
}
