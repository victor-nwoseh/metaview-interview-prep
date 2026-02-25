import { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import InterviewBrief from './components/InterviewBrief';
import { useGenerateBrief } from './hooks/useGenerateBrief';
import { SAMPLE_JD, SAMPLE_CV } from './data/sampleData';

export default function App() {
  const [jobDescription, setJobDescription] = useState('');
  const [candidateCv, setCandidateCv] = useState('');
  const { brief, isGenerating, error, generate } = useGenerateBrief();

  function handleGenerate() {
    generate(jobDescription, candidateCv);
  }

  function handleLoadExample() {
    setJobDescription(SAMPLE_JD);
    setCandidateCv(SAMPLE_CV);
  }

  return (
    <div className="min-h-screen bg-[#0c1117] text-slate-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:items-start">

          {/* Input panel */}
          <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-6 shadow-xl shadow-black/20">
            <InputForm
              jobDescription={jobDescription}
              candidateCv={candidateCv}
              onJobDescriptionChange={setJobDescription}
              onCandidateCvChange={setCandidateCv}
              onGenerate={handleGenerate}
              onLoadExample={handleLoadExample}
              isGenerating={isGenerating}
            />
          </div>

          {/* Output panel */}
          <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-6 shadow-xl shadow-black/20 min-h-[520px] lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto flex flex-col">
            {error ? (
              <div className="rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-4 flex flex-col gap-1">
                <p className="text-sm font-semibold text-red-400">Something went wrong</p>
                <p className="text-xs text-red-400/70 leading-relaxed">{error}</p>
                <p className="text-xs text-slate-500 mt-1">Click "Generate Interview Brief" to try again.</p>
              </div>
            ) : (
              <InterviewBrief brief={brief} isGenerating={isGenerating} />
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
