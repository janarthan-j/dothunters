const inputClass =
  "w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-gray-800 dark:focus:border-gray-400 transition";
const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2";

export default function ContactStep({ form, onChange }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 dark:text-white">Almost there — how do we reach you?</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
        We&apos;ll follow up within 24 hours.
      </p>

      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Full Name *</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder="Jane Smith"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Email Address *</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="jane@company.com"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Company / Organisation</label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={(e) => onChange("company", e.target.value)}
            placeholder="Acme Inc."
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Anything else we should know?</label>
          <textarea
            name="notes"
            rows={4}
            value={form.notes}
            onChange={(e) => onChange("notes", e.target.value)}
            placeholder="Optional — links, context, specific requirements..."
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>
    </div>
  );
}
