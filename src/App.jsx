import Hero3D from './components/Hero3D';
import GlobePanel from './components/GlobePanel';
import Missions from './components/Missions';
import CrewLogs from './components/CrewLogs';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-sky-100 selection:bg-sky-500/30 selection:text-sky-100">
      {/* Navigation */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-slate-950/70 border-b border-sky-400/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-sky-500/20 ring-1 ring-sky-400/30" />
            <span className="font-semibold tracking-wide">AquaNav Command</span>
          </div>
          <div className="text-sm text-sky-300/70">Naval • Steel • Bioluminescence</div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        <Hero3D />
        <GlobePanel />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Missions />
          </div>
          <div className="space-y-6">
            <CrewLogs />
          </div>
        </div>

        {/* Footer */}
        <footer className="py-8 text-center text-sky-300/60 text-sm">
          Built for oceanographic research vessels — real-time, data-rich, elegant.
        </footer>
      </main>
    </div>
  );
}

export default App;
