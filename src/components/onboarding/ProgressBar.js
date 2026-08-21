const steps = ["Service", "Details", "Budget & Timeline", "Contact"];

export default function ProgressBar({ currentStep }) {
  return (
    <div className="mb-10">
      {/* Mobile */}
      <p className="sm:hidden text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
        Step {currentStep + 1} of {steps.length} — {steps[currentStep]}
      </p>

      {/* Desktop */}
      <ol className="hidden sm:flex items-center gap-4">
        {steps.map((label, i) => (
          <li key={label} className="flex items-center gap-4 flex-1 last:flex-none">
            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition ${
                  i < currentStep
                    ? "bg-black dark:bg-white text-white dark:text-black"
                    : i === currentStep
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
                }`}
              >
                {i < currentStep ? (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              <span
                className={`text-sm font-medium ${
                  i <= currentStep ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`h-px flex-1 ${
                  i < currentStep ? "bg-black dark:bg-white" : "bg-gray-200 dark:bg-gray-700"
                }`}
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
