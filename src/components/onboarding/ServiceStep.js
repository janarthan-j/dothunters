import { services } from "@/data/services";

export default function ServiceStep({ value, onSelect }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 dark:text-white">Which service are you interested in?</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
        Pick the one that fits best — we can refine scope later.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {services.map((service) => (
          <button
            key={service.slug}
            type="button"
            onClick={() => onSelect(service.slug)}
            className={`text-left border rounded-xl p-5 transition ${
              value === service.slug
                ? "border-black dark:border-white bg-gray-50 dark:bg-gray-800"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
            }`}
          >
            <p className="font-semibold text-gray-900 dark:text-white mb-1">{service.title}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{service.tagline}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
