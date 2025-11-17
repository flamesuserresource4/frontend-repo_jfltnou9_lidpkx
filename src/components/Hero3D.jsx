import Spline from '@splinetool/react-spline';

export default function Hero3D() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden rounded-3xl border border-sky-400/10 bg-slate-900/40">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/hGDm7Foxug7C6E8s/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      {/* Bioluminescent gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
      <div className="relative z-10 h-full flex items-end p-6 md:p-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-sky-100 drop-shadow-[0_0_20px_rgba(56,189,248,0.35)]">
            Oceanographic Fleet Command
          </h1>
          <p className="mt-3 text-sky-200/80 max-w-2xl">
            Real-time expeditions, weather intelligence, and sonar telemetry — unified on a living, interactive canvas.
          </p>
        </div>
      </div>
    </section>
  );
}
