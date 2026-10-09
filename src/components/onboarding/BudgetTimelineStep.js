// Fallback when a service has no budgetOptions in services.json.
const defaultBudgets = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
  "Not sure yet",
];

const timelines = ["ASAP", "1–3 months", "3–6 months", "Flexible / not sure"];

export default function BudgetTimelineStep({ budgetOptions, budget, timeline, onChange }) {
  const budgets = budgetOptions?.length ? budgetOptions : defaultBudgets;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 dark:text-white">Budget & timeline</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
        Rough numbers are fine — this just helps us scope realistically.
      </p>

      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Budget range
          </label>
          <div className="flex flex-wrap gap-2">
            {budgets.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onChange("budget", option)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                  budget === option
                    ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                    : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Timeline
          </label>
          <div className="flex flex-wrap gap-2">
            {timelines.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onChange("timeline", option)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                  timeline === option
                    ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                    : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
