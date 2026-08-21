"use client";
import { useState } from "react";
import { services } from "@/data/services";
import onboardingQuestions from "@/data/onboardingQuestions";
import ProgressBar from "./onboarding/ProgressBar";
import ServiceStep from "./onboarding/ServiceStep";
import DetailsStep from "./onboarding/DetailsStep";
import BudgetTimelineStep from "./onboarding/BudgetTimelineStep";
import ContactStep from "./onboarding/ContactStep";
import ConfirmationView from "./onboarding/ConfirmationView";

const initialForm = {
  serviceSlug: "",
  details: {},
  budget: "",
  timeline: "",
  name: "",
  email: "",
  company: "",
  notes: "",
};

export default function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const selectedService = services.find((s) => s.slug === form.serviceSlug) || null;

  const canAdvance = () => {
    if (step === 0) return Boolean(form.serviceSlug);
    if (step === 1) {
      const questions = onboardingQuestions[form.serviceSlug] || [];
      return questions.every((q) => Boolean(form.details[q.id]));
    }
    if (step === 2) return Boolean(form.budget) && Boolean(form.timeline);
    return true;
  };

  const handleSelectService = (slug) => {
    setForm((prev) => ({ ...prev, serviceSlug: slug, details: {} }));
    setStep(1);
  };

  const handleDetailChange = (id, value) => {
    setForm((prev) => ({ ...prev, details: { ...prev.details, [id]: value } }));
  };

  const handleFieldChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleBack = () => setStep((s) => Math.max(0, s - 1));
  const handleNext = () => setStep((s) => Math.min(3, s + 1));

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong — please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return <ConfirmationView serviceTitle={selectedService?.title || "project"} />;
  }

  return (
    <div>
      <ProgressBar currentStep={step} />

      {step === 0 && <ServiceStep value={form.serviceSlug} onSelect={handleSelectService} />}
      {step === 1 && (
        <DetailsStep
          serviceSlug={form.serviceSlug}
          serviceTitle={selectedService?.title || ""}
          details={form.details}
          onChange={handleDetailChange}
        />
      )}
      {step === 2 && (
        <BudgetTimelineStep budget={form.budget} timeline={form.timeline} onChange={handleFieldChange} />
      )}
      {step === 3 && <ContactStep form={form} onChange={handleFieldChange} />}

      {error && (
        <p className="mt-6 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/40 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      {step > 0 && (
        <div className="flex items-center justify-between mt-10">
          <button
            type="button"
            onClick={handleBack}
            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition"
          >
            Back
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canAdvance()}
              className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed text-white px-8 py-4 rounded-full font-semibold text-sm transition"
            >
              Continue
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M8.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9H3a1 1 0 110-2h7.586L8.293 4.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canAdvance() || submitting}
              className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed text-white px-8 py-4 rounded-full font-semibold text-sm transition"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
