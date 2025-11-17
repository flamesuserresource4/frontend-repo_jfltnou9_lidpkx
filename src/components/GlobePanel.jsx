import { useEffect, useMemo, useState } from 'react';
import { Globe } from 'lucide-react';

const BACKEND = import.meta.env.VITE_BACKEND_URL;

export default function GlobePanel() {
  const [telemetry, setTelemetry] = useState([]);
  const [layers, setLayers] = useState({ depth: true, temperature: true, salinity: true });
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    if (!BACKEND) return;
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND}/api/telemetry`);
      const data = await res.json();
      setTelemetry(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const id = setInterval(loadData, 5000);
    return () => clearInterval(id);
  }, []);

  const vesselPoints = useMemo(() => {
    return telemetry.map((t, idx) => ({
      id: idx,
      lat: t.lat ?? 0,
      lng: t.lng ?? 0,
      depth: t.depth,
      temperature: t.temperature,
      salinity: t.salinity,
    }));
  }, [telemetry]);

  return (
    <div className="relative rounded-2xl border border-sky-400/10 bg-slate-900/60 p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sky-200">
          <Globe className="w-5 h-5" />
          <span className="font-medium">3D Globe — Live Positions</span>
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm">
          {['depth','temperature','salinity'].map((k) => (
            <button
              key={k}
              onClick={() => setLayers((s) => ({ ...s, [k]: !s[k] }))}
              className={`px-3 py-1 rounded-full border transition ${layers[k] ? 'bg-sky-500/20 text-sky-100 border-sky-400/30' : 'bg-slate-800 text-slate-300 border-slate-600'}`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2 h-72 md:h-80 rounded-xl bg-[radial-gradient(circle_at_70%_20%,rgba(56,189,248,0.15),transparent_60%)] border border-sky-400/10 flex items-center justify-center text-sky-200/80">
          {/* Placeholder globe visualization - could swap with react-globe.gl if requested */}
          <div className="text-center">
            <div className="text-lg">Interactive Globe</div>
            <div className="text-xs opacity-70">Showing {vesselPoints.length} telemetry points</div>
            {loading && <div className="mt-2 text-xs">Refreshing…</div>}
          </div>
        </div>
        <div className="h-72 md:h-80 overflow-y-auto rounded-xl bg-slate-950/60 border border-sky-400/10 p-3">
          <div className="text-xs text-sky-300/70 mb-2">Latest Telemetry</div>
          <ul className="space-y-2 text-sky-100/90 text-sm">
            {vesselPoints.slice(0, 12).map((p) => (
              <li key={p.id} className="rounded-lg bg-slate-900/70 border border-sky-400/10 p-2">
                <div className="flex items-center justify-between">
                  <span>Lat {p.lat?.toFixed?.(2)}, Lng {p.lng?.toFixed?.(2)}</span>
                  <span className="text-xs text-sky-300/70">{p.depth ? `${p.depth} m` : '—'}</span>
                </div>
                <div className="mt-1 text-xs text-sky-300/80">
                  {layers.temperature && <span className="mr-3">T {p.temperature ?? '—'}°C</span>}
                  {layers.salinity && <span>S {p.salinity ?? '—'} PSU</span>}
                </div>
              </li>
            ))}
            {vesselPoints.length === 0 && (
              <li className="text-slate-400">No telemetry yet. Post to /api/telemetry to see live points.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
