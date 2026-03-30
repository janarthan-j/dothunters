const CTASection = () => {
  return (
    <section className="dot-bg py-10 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-900 px-6 md:px-10 py-10 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Left */}
          <div className="max-w-xl">
            <p className="uppercase tracking-widest text-gray-400 dark:text-gray-500 text-sm mb-4">Let&apos;s connect</p>
            <h2 className={`text-4xl md:text-5xl font-bold leading-tight dark:text-white`}>
              Have a project in mind?<br />
              <span className="text-red-500">Let&apos;s build it.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-4 text-sm leading-relaxed max-w-md">
              Whether you&apos;re launching something new or improving what you have — we&apos;d love to hear about it. Drop us a message and we&apos;ll get back to you within 24 hours.
            </p>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4 flex-wrap shrink-0">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-red-500 text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-red-600 transition"
            >
              Start a Project
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M8.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9H3a1 1 0 110-2h7.586L8.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="/projects"
              className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-semibold text-sm transition"
            >
              <span className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M8.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9H3a1 1 0 110-2h7.586L8.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
              View Our Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
