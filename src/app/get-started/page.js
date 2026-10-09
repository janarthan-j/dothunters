import OnboardingWizard from "@/components/OnboardingWizard";

export const metadata = {
  title: "Get Started",
  description: "Tell us about your project in a few quick steps and we'll follow up within 24 hours.",
};

export default function GetStartedPage({ searchParams }) {
  return (
    <main id="get-started">
      <section className="dot-bg bg-gray-50 dark:bg-gray-800 py-24 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="uppercase tracking-widest text-gray-400 dark:text-gray-500 text-sm mb-4">
            Get started
          </p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-3xl mb-6 dark:text-white">
            Let&apos;s scope your <span className="text-red-500">project.</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl">
            A few quick questions so we can route your brief to the right team and come back with
            something useful.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <OnboardingWizard initialService={searchParams?.service} />
        </div>
      </section>
    </main>
  );
}
