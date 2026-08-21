export default function ConfirmationView({ serviceTitle }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-14 h-14 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center mb-6">
        <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold mb-2 dark:text-white">You&apos;re all set!</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm">
        We&apos;ll review your{" "}
        <span className="font-semibold text-gray-800 dark:text-gray-200">{serviceTitle}</span>{" "}
        project and follow up within 24 hours.
      </p>
    </div>
  );
}
