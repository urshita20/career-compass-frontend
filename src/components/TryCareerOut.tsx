import React, { useState, useRef, useCallback } from 'react';
import type { CareerTask, TaskSubmission, UserContext, AnalysisResult } from '../types/analysis';
import { submitCareerAnalysis } from '../services/analysisService';

// ─── ICONS (inline SVGs so no extra deps needed) ───────────────────────────

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const UploadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
    <polyline points="16 16 12 12 8 16" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
  </svg>
);

const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

// ─── FIT SCORE RING ─────────────────────────────────────────────────────────

function FitScoreRing({ score, label }: { score: number; label: string }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;

  const color =
    score >= 80 ? '#22c55e' : score >= 60 ? '#f97316' : score >= 40 ? '#eab308' : '#ef4444';

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="130" height="130" className="rotate-[-90deg]">
        <circle cx="65" cy="65" r={r} fill="none" stroke="#f3f0e8" strokeWidth="10" />
        <circle
          cx="65"
          cy="65"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.2s ease' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center" style={{ marginTop: '-80px' }}>
        <span className="text-3xl font-bold" style={{ color }}>{score}</span>
        <span className="text-xs text-gray-500">/ 100</span>
      </div>
      <span className="text-sm font-semibold" style={{ color }}>{label}</span>
    </div>
  );
}

// ─── TASK CARD ───────────────────────────────────────────────────────────────

interface TaskCardProps {
  task: CareerTask;
  index: number;
  submission?: Partial<TaskSubmission>;
  onUpdate: (id: string, updates: Partial<TaskSubmission>) => void;
  image: File | null;
  onImageChange: (file: File | null) => void;
}

function TaskCard({ task, index, submission, onUpdate, image, onImageChange }: TaskCardProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        onImageChange(file);
        onUpdate(task.id, { completed: true });
      }
    },
    [task.id, onUpdate, onImageChange]
  );

  const isCompleted = submission?.completed;

  return (
    <div
      className={`rounded-2xl border-2 p-5 transition-all duration-300 ${
        isCompleted
          ? 'border-orange-300 bg-orange-50'
          : 'border-amber-100 bg-white hover:border-amber-200'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Completion toggle */}
        <button
          onClick={() => onUpdate(task.id, { completed: !isCompleted })}
          className={`mt-0.5 w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
            isCompleted
              ? 'bg-orange-500 border-orange-500 text-white'
              : 'border-amber-300 text-transparent hover:border-orange-400'
          }`}
        >
          <CheckIcon />
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{task.icon}</span>
            <h3 className="font-semibold text-gray-800">{task.title}</h3>
          </div>
          <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
            <ClockIcon />
            <span>{task.duration}</span>
          </div>

          {/* User response textarea */}
          <div className="mb-3">
            <label className="text-xs font-medium text-gray-500 mb-1 block">
              Your notes / reflection on this task:
            </label>
            <textarea
              rows={3}
              placeholder="What did you try? How did it feel? What surprised you?"
              value={submission?.userAnswer || ''}
              onChange={(e) => onUpdate(task.id, { userAnswer: e.target.value })}
              className="w-full text-sm rounded-xl border border-amber-200 bg-amber-50/50 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-orange-300 placeholder:text-gray-300"
            />
          </div>

          {/* Time spent */}
          <div className="mb-3">
            <label className="text-xs font-medium text-gray-500 mb-1 block">
              How long did you spend?
            </label>
            <select
              value={submission?.timeSpent || ''}
              onChange={(e) => onUpdate(task.id, { timeSpent: e.target.value })}
              className="text-sm rounded-xl border border-amber-200 bg-amber-50/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-600"
            >
              <option value="">Select time</option>
              <option value="< 5 min">Less than 5 min</option>
              <option value="5-15 min">5–15 min</option>
              <option value="15-30 min">15–30 min</option>
              <option value="30-60 min">30–60 min</option>
              <option value="> 1 hour">More than 1 hour</option>
            </select>
          </div>

          {/* Image upload — shown for ALL tasks (optional) or forced if requiresImage */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">
              {task.requiresImage
                ? `📸 Photo required: ${task.imagePrompt}`
                : '📷 Upload a photo of your work (optional — helps AI give better feedback)'}
            </label>

            {image ? (
              <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-xl">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded"
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-green-700 truncate">{image.name}</p>
                  <p className="text-xs text-green-500">
                    {(image.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  onClick={() => onImageChange(null)}
                  className="text-xs text-red-400 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
                  isDragging
                    ? 'border-orange-400 bg-orange-50'
                    : 'border-amber-200 bg-amber-50/30 hover:border-orange-300 hover:bg-amber-50'
                }`}
              >
                <UploadIcon />
                <p className="text-xs text-gray-400 text-center">
                  Drag & drop or <span className="text-orange-500 font-medium">click to upload</span>
                  <br />
                  JPG, PNG, WebP · max 10MB
                </p>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0] || null;
                    if (f) { onImageChange(f); onUpdate(task.id, { completed: true }); }
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ANALYSIS RESULT PANEL ──────────────────────────────────────────────────

function AnalysisPanel({ result, careerTitle }: { result: AnalysisResult; careerTitle: string }) {
  const { analysis, onetData } = result;
  const fitColor =
    analysis.fitScore >= 80
      ? '#22c55e'
      : analysis.fitScore >= 60
      ? '#f97316'
      : analysis.fitScore >= 40
      ? '#eab308'
      : '#ef4444';

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="text-center py-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-amber-100">
        <div className="flex justify-center mb-2">
          <div className="relative">
            <FitScoreRing score={analysis.fitScore} label={analysis.fitLabel} />
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mt-4 px-4">{analysis.headline}</h2>
        <p className="text-sm text-gray-500 mt-1">{careerTitle} Career Fit Analysis</p>
      </div>

      {/* Strengths & Growth */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
          <h3 className="text-sm font-bold text-green-700 mb-3 flex items-center gap-2">
            <span>✨</span> Your Strengths
          </h3>
          <ul className="space-y-2">
            {analysis.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-green-800">
                <span className="text-green-500 mt-0.5">●</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
          <h3 className="text-sm font-bold text-amber-700 mb-3 flex items-center gap-2">
            <span>🌱</span> Areas to Grow
          </h3>
          <ul className="space-y-2">
            {analysis.growthAreas.map((g, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-amber-800">
                <span className="text-amber-500 mt-0.5">●</span>
                {g}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Personality Insights */}
      <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4">
        <h3 className="text-sm font-bold text-purple-700 mb-2 flex items-center gap-2">
          <span>🧠</span> Personality & Work Style Insights
        </h3>
        <p className="text-sm text-purple-800 leading-relaxed">{analysis.personalityInsights}</p>
      </div>

      {/* Recommendation */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
        <h3 className="text-sm font-bold text-blue-700 mb-2 flex items-center gap-2">
          <span>🎯</span> Personalised Recommendation
        </h3>
        <p className="text-sm text-blue-800 leading-relaxed">{analysis.recommendation}</p>
      </div>

      {/* O*NET Data */}
      {onetData && (
        <div className="bg-white border-2 border-orange-100 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <span>📊</span> Real Career Data from O*NET
            </h3>
            <a
              href={onetData.onetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-orange-500 hover:text-orange-700 flex items-center gap-1 font-medium"
            >
              View Full Profile <ExternalLinkIcon />
            </a>
          </div>

          {onetData.brightOutlook && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2 mb-3">
              <span>⭐</span>
              <span className="text-xs font-semibold text-green-700">
                Bright Outlook Career — Growing faster than average!
              </span>
            </div>
          )}

          {onetData.outlook && (
            <div className="mb-3">
              <p className="text-xs font-medium text-gray-500 mb-1">Job Outlook</p>
              <p className="text-sm text-gray-700">{onetData.outlook.description}</p>
            </div>
          )}

          {onetData.topSkills?.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-medium text-gray-500 mb-2">Top Skills Needed</p>
              <div className="flex flex-wrap gap-2">
                {onetData.topSkills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {onetData.tasks?.length > 0 && (
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2">Common Work Tasks</p>
              <ul className="space-y-1">
                {onetData.tasks.slice(0, 4).map((task, i) => (
                  <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                    <span className="text-orange-400 mt-0.5">→</span>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Alternative Careers */}
      {analysis.alternativeCareers?.length > 0 && (
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
          <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span>🔀</span> You Might Also Enjoy
          </h3>
          <div className="flex flex-wrap gap-2">
            {analysis.alternativeCareers.map((career, i) => (
              <span
                key={i}
                className="text-sm px-4 py-2 bg-white border-2 border-amber-200 text-amber-700 rounded-full font-medium hover:border-orange-400 transition-colors cursor-default"
              >
                {career}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Motivational message */}
      <div
        className="rounded-2xl p-5 text-center"
        style={{ background: 'linear-gradient(135deg, #fff7ed, #fef3c7)' }}
      >
        <p className="text-2xl mb-2">💪</p>
        <p className="text-sm font-medium text-amber-800 leading-relaxed italic">
          "{analysis.motivationalMessage}"
        </p>
      </div>
    </div>
  );
}

// ─── USER CONTEXT FORM ───────────────────────────────────────────────────────

function UserContextForm({
  context,
  onChange,
}: {
  context: UserContext;
  onChange: (c: UserContext) => void;
}) {
  return (
    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-5">
      <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
        <span>👤</span> A little about you{' '}
        <span className="text-xs font-normal text-gray-400">(optional — helps personalise analysis)</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="text-xs font-medium text-gray-500 block mb-1">Age</label>
          <input
            type="number"
            placeholder="e.g. 17"
            value={context.age || ''}
            onChange={(e) => onChange({ ...context, age: e.target.value })}
            className="w-full text-sm rounded-xl border border-amber-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 block mb-1">Background</label>
          <input
            type="text"
            placeholder="e.g. high school student"
            value={context.background || ''}
            onChange={(e) => onChange({ ...context, background: e.target.value })}
            className="w-full text-sm rounded-xl border border-amber-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 block mb-1">Interests</label>
          <input
            type="text"
            placeholder="e.g. gaming, art, science"
            value={context.interests || ''}
            onChange={(e) => onChange({ ...context, interests: e.target.value })}
            className="w-full text-sm rounded-xl border border-amber-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

interface TryCareerOutProps {
  careerTitle: string;
  tasks: CareerTask[];
}

export default function TryCareerOut({ careerTitle, tasks }: TryCareerOutProps) {
  const [submissions, setSubmissions] = useState<Record<string, Partial<TaskSubmission>>>({});
  const [taskImages, setTaskImages] = useState<Record<string, File | null>>({});
  const [userContext, setUserContext] = useState<UserContext>({});
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const analysisRef = useRef<HTMLDivElement>(null);

  const completedCount = Object.values(submissions).filter((s) => s.completed).length;

  function updateSubmission(id: string, updates: Partial<TaskSubmission>) {
    setSubmissions((prev) => ({ ...prev, [id]: { ...prev[id], ...updates, id } }));
  }

  function setTaskImage(taskId: string, file: File | null) {
    setTaskImages((prev) => ({ ...prev, [taskId]: file }));
  }

  async function handleAnalyse() {
    setError(null);
    setIsAnalysing(true);
    setResult(null);

    // Build full task submissions
    const fullSubmissions: TaskSubmission[] = tasks.map((t) => ({
      id: t.id,
      title: t.title,
      description: t.description,
      userAnswer: submissions[t.id]?.userAnswer || '',
      timeSpent: submissions[t.id]?.timeSpent || '',
      completed: submissions[t.id]?.completed || false,
    }));

    // Pick first uploaded image (or the one for last completed task)
    const uploadedImage =
      Object.values(taskImages).find(Boolean) || null;

    try {
      const res = await submitCareerAnalysis(careerTitle, fullSubmissions, userContext, uploadedImage);
      setResult(res);
      // Scroll to results
      setTimeout(() => analysisRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } catch (e: any) {
      setError(e.message || 'Analysis failed. Please try again.');
    } finally {
      setIsAnalysing(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            ⚡ Try This Career Out! ⚡
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Get a real taste of what it's like to be a{' '}
            <strong>{careerTitle}</strong>. Complete these beginner-friendly tasks!
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <span className="text-2xl font-bold text-orange-500">
            {completedCount}/{tasks.length}
          </span>
          <p className="text-xs text-gray-400">Completed</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-amber-100 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-500"
          style={{ width: `${(completedCount / tasks.length) * 100}%` }}
        />
      </div>

      {/* User context */}
      <UserContextForm context={userContext} onChange={setUserContext} />

      {/* Task cards */}
      <div className="space-y-4 mb-6">
        {tasks.map((task, i) => (
          <TaskCard
            key={task.id}
            task={task}
            index={i}
            submission={submissions[task.id]}
            onUpdate={updateSubmission}
            image={taskImages[task.id] || null}
            onImageChange={(file) => setTaskImage(task.id, file)}
          />
        ))}
      </div>

      {/* Analyse button */}
      {!result && (
        <button
          onClick={handleAnalyse}
          disabled={isAnalysing}
          className="w-full py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            background: isAnalysing
              ? '#d1d5db'
              : 'linear-gradient(135deg, #f97316, #f59e0b)',
            boxShadow: isAnalysing ? 'none' : '0 4px 20px rgba(249,115,22,0.35)',
          }}
        >
          {isAnalysing ? (
            <>
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3" />
                <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Analysing your responses with AI…
            </>
          ) : (
            <>
              <SparkleIcon />
              Get My Personalised AI Analysis
            </>
          )}
        </button>
      )}

      {/* Error */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-700">
          ⚠️ {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div ref={analysisRef} className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <SparkleIcon />
              Your AI Career Analysis
            </h2>
            <button
              onClick={() => { setResult(null); setError(null); }}
              className="text-xs text-gray-400 hover:text-gray-600 underline"
            >
              Re-analyse
            </button>
          </div>
          <AnalysisPanel result={result} careerTitle={careerTitle} />
        </div>
      )}
    </div>
  );
}
