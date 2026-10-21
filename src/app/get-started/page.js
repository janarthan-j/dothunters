import OnboardingWizard from "@/components/OnboardingWizard";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Get Started",
  description: "Tell us about your project in a few quick steps and we'll follow up within 24 hours.",
};

export default function GetStartedPage({ searchParams }) {
  return (
    <main id="get-started">
      <PageHero
        eyebrow="Get started"
        crumbs={[{ label: "Home", href: "/" }, { label: "Get started" }]}
        title={["Let’s scope your", { text: "project.", className: "text-red-500" }]}
        intro="A few quick questions so we can route your brief to the right team and come back with something useful."
      />

      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="rounded-[2rem] border border-gray-200 dark:border-gray-800 p-6 md:p-12">
            <OnboardingWizard initialService={searchParams?.service} />
          </div>
        </div>
      </section>
    </main>
  );
}
