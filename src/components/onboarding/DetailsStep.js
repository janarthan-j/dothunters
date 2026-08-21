import onboardingQuestions from "@/data/onboardingQuestions";

export default function DetailsStep({ serviceSlug, serviceTitle, details, onChange }) {
  const questions = onboardingQuestions[serviceSlug] || [];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 dark:text-white">
        A bit more about your {serviceTitle} project
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
        This helps us route your brief to the right team.
      </p>
      <div className="space-y-8">
        {questions.map((q) => (
          <div key={q.id}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              {q.label}
            </label>
            <div className="flex flex-wrap gap-2">
              {q.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => onChange(q.id, option)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                    details[q.id] === option
                      ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                      : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
