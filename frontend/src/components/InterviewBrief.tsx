import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface InterviewBriefProps {
  brief: string;
  isGenerating: boolean;
}

export default function InterviewBrief({ brief, isGenerating }: InterviewBriefProps) {
  if (!brief && !isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 min-h-64 text-center px-6 py-12">
        <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mb-4">
          <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-slate-400">Your interview brief will appear here</p>
        <p className="text-xs text-slate-600 mt-1">Paste a job description and CV, then click Generate</p>
      </div>
    );
  }

  if (!brief && isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 min-h-64 text-center px-6 py-12">
        <div className="flex items-center gap-1.5 mb-4">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
        </div>
        <p className="text-sm font-medium text-slate-400">Generating your interview brief…</p>
        <p className="text-xs text-slate-600 mt-1">Analysing the role and candidate — this takes about 15 seconds</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className="
          prose prose-invert prose-slate max-w-none
          prose-headings:font-semibold
          prose-h1:text-xl prose-h1:text-slate-100 prose-h1:mb-4
          prose-h2:text-base prose-h2:text-indigo-400 prose-h2:uppercase prose-h2:tracking-wide prose-h2:mt-8 prose-h2:mb-3 prose-h2:border-b prose-h2:border-slate-700 prose-h2:pb-2
          prose-h3:text-sm prose-h3:text-slate-200 prose-h3:mt-5 prose-h3:mb-2
          prose-p:text-slate-300 prose-p:leading-relaxed prose-p:text-sm
          prose-strong:text-slate-100 prose-strong:font-semibold
          prose-li:text-slate-300 prose-li:text-sm
          prose-ul:my-2 prose-li:my-0.5
          prose-blockquote:border-l-indigo-500 prose-blockquote:text-slate-300 prose-blockquote:bg-slate-800/40 prose-blockquote:rounded-r-md prose-blockquote:py-0.5
          prose-hr:border-slate-700 prose-hr:my-6
          prose-em:text-slate-400 prose-em:not-italic prose-em:text-xs
          prose-code:text-indigo-300 prose-code:bg-slate-800 prose-code:rounded prose-code:px-1 prose-code:text-xs
        "
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {brief}
        </ReactMarkdown>
        {isGenerating && (
          <span className="inline-block w-0.5 h-4 bg-indigo-400 ml-0.5 align-middle animate-pulse" />
        )}
      </div>
    </div>
  );
}
