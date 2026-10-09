const badgeStyles = {
  "Product":      "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700",
  "Open Source":  "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900/40",
  "Experimental": "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900/40",
};

export default function ProductBadges({ badges }) {
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => (
        <span
          key={badge}
          className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${badgeStyles[badge] || badgeStyles.Product}`}
        >
          {badge}
        </span>
      ))}
    </div>
  );
}
