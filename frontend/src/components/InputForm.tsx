interface InputFormProps {
  jobDescription: string;
  candidateCv: string;
  onJobDescriptionChange: (value: string) => void;
  onCandidateCvChange: (value: string) => void;
  onGenerate: () => void;
  onLoadExample: () => void;
  isGenerating: boolean;
}

export default function InputForm({
  jobDescription,
  candidateCv,
  onJobDescriptionChange,
  onCandidateCvChange,
  onGenerate,
  onLoadExample,
  isGenerating,
}: InputFormProps) {
  const isEmpty = !jobDescription.trim() || !candidateCv.trim();
  const isDisabled = isEmpty || isGenerating;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 tracking-widest uppercase">Inputs</span>
        <button
          type="button"
          onClick={onLoadExample}
          disabled={isGenerating}
          className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Try an example →
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="job-description"
          className="text-xs font-semibold text-slate-400 tracking-widest uppercase"
        >
          Job Description
        </label>
        <textarea
          id="job-description"
          value={jobDescription}
          onChange={(e) => onJobDescriptionChange(e.target.value)}
          placeholder="Paste the job description here — include the role title, responsibilities, and requirements."
          disabled={isGenerating}
          className="w-full min-h-52 resize-y rounded-lg border border-slate-600/60 bg-slate-900/80 px-4 py-3 text-sm text-slate-200 placeholder-slate-600 leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="candidate-cv"
          className="text-xs font-semibold text-slate-400 tracking-widest uppercase"
        >
          Candidate CV
        </label>
        <textarea
          id="candidate-cv"
          value={candidateCv}
          onChange={(e) => onCandidateCvChange(e.target.value)}
          placeholder="Paste the candidate's CV or resume here — the more detail, the more specific the questions."
          disabled={isGenerating}
          className="w-full min-h-52 resize-y rounded-lg border border-slate-600/60 bg-slate-900/80 px-4 py-3 text-sm text-slate-200 placeholder-slate-600 leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <button
        onClick={onGenerate}
        disabled={isDisabled}
        className="w-full rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-35 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:bg-indigo-600"
      >
        {isGenerating ? "Generating…" : "Generate Interview Brief"}
      </button>
    </div>
  );
}
