"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BookingLink } from "@/components/ui/BookingLink";
import {
  calculateTotal,
  getAddonPrice,
  type QuizRecommendation,
} from "@/lib/quiz-catalog";
import "@/styles/quiz.css";

const QUESTIONS = [
  {
    question: "What brings you to Luxe Studio today?",
    answers: [
      "I need a hair transformation",
      "I want to look after my skin",
      "I need to unwind and reset",
      "I want to look groomed and sharp",
    ],
  },
  {
    question: "How would you describe your main concern?",
    answers: [
      "Hair damage, colour, or growth",
      "Skin texture, tone, or aging",
      "Stress, tension, or fatigue",
      "Brows, lashes, or nails",
    ],
  },
  {
    question: "How much time can you dedicate to yourself?",
    answers: [
      "1 hour — a focused treatment",
      "1.5 to 2 hours — a proper ritual",
      "2+ hours — the full experience",
      "Surprise me — I trust your judgment",
    ],
  },
  {
    question: "What matters most to your experience?",
    answers: [
      "Results I can see immediately",
      "Deep relaxation and calm",
      "A complete transformation",
      "Feeling put-together and confident",
    ],
  },
  {
    question: "Is this your first visit to Luxe Studio?",
    answers: [
      "Yes — I want to start gently",
      "No — I know what I love",
      "No — but I want to try something new",
      "I'm not sure yet",
    ],
  },
] as const;

const TOTAL_QUESTIONS = QUESTIONS.length;

type RitualQuizProps = {
  open: boolean;
  onClose: () => void;
};

export function RitualQuiz({ open, onClose }: RitualQuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(
    Array(TOTAL_QUESTIONS).fill("")
  );
  const [direction, setDirection] = useState<1 | -1>(1);
  const [recommendation, setRecommendation] =
    useState<QuizRecommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const prevOverflow = useRef("");

  const isLoading = loading;
  const isResult = recommendation !== null && !loading && !error;
  const isError = error !== null && !loading;
  const isQuestion = !isLoading && !isResult && !isError;

  const fetchRecommendation = useCallback(async (finalAnswers: string[]) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: finalAnswers }),
      });

      const data = await res.json();

      if (!res.ok || !data.recommendation) {
        setError(
          typeof data.error === "string"
            ? data.error
            : "Élise could not prepare your ritual just now."
        );
        return;
      }

      setRecommendation(data.recommendation as QuizRecommendation);
    } catch {
      setError("Élise could not prepare your ritual just now.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    prevOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow.current;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  const resetQuiz = () => {
    setStep(0);
    setAnswers(Array(TOTAL_QUESTIONS).fill(""));
    setRecommendation(null);
    setError(null);
    setLoading(false);
    setDirection(1);
  };

  const handleClose = () => {
    resetQuiz();
    onClose();
  };

  const handleSelect = (answer: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = answer;
      return next;
    });
  };

  const handleNext = () => {
    if (!answers[step]) return;

    if (step < TOTAL_QUESTIONS - 1) {
      setDirection(1);
      setStep((s) => s + 1);
      return;
    }

    setDirection(1);
    setStep(TOTAL_QUESTIONS);
    void fetchRecommendation(answers);
  };

  const handleBack = () => {
    if (step <= 0) return;
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const handleRetry = () => {
    setError(null);
    setRecommendation(null);
    setStep(TOTAL_QUESTIONS);
    void fetchRecommendation(answers);
  };

  if (!open) return null;

  const progressPct = isQuestion
    ? ((step + 1) / TOTAL_QUESTIONS) * 100
    : 100;

  const total =
    recommendation &&
    calculateTotal(recommendation.serviceId, recommendation.addons);

  return createPortal(
    <div
      className="quiz-overlay"
      role="presentation"
      onClick={handleClose}
    >
      <div
        className="quiz-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="quiz-close"
          aria-label="Close quiz"
          onClick={handleClose}
        >
          ✕
        </button>

        {isQuestion && (
          <div className="quiz-head">
            <div className="quiz-advisor">
              <span className="dot" aria-hidden />
              Élise — Ritual Advisor
            </div>
            <div className="quiz-progress-label">
              Question {step + 1}/{TOTAL_QUESTIONS}
            </div>
            <div className="quiz-progress-track">
              <div
                className="quiz-progress-bar"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        <div className="quiz-body">
          {isQuestion && (
            <div
              key={step}
              className={`quiz-question-wrap ${direction === 1 ? "forward" : "backward"}`}
            >
              <h2 id="quiz-title" className="quiz-question">
                {QUESTIONS[step].question}
              </h2>
              <div className="quiz-answers">
                {QUESTIONS[step].answers.map((answer) => (
                  <button
                    key={answer}
                    type="button"
                    className={`quiz-answer${answers[step] === answer ? " selected" : ""}`}
                    onClick={() => handleSelect(answer)}
                  >
                    {answer}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isLoading && (
            <div className="quiz-loading" aria-live="polite">
              <span className="quiz-elise-dot" aria-hidden />
              <p className="quiz-loading-text">
                Élise is composing your ritual…
              </p>
              <p className="quiz-loading-sub">
                Un instant, s&apos;il vous plaît
              </p>
            </div>
          )}

          {isError && (
            <div className="quiz-error">
              <p>{error}</p>
              <button
                type="button"
                className="quiz-retry"
                onClick={handleRetry}
              >
                Try again
              </button>
            </div>
          )}

          {isResult && recommendation && (
            <div className="quiz-result">
              <h2 className="quiz-result-service">{recommendation.service}</h2>
              <p className="quiz-result-tagline">{recommendation.tagline}</p>
              <p className="quiz-result-description">
                {recommendation.description}
              </p>

              {recommendation.addons.length > 0 && (
                <div className="quiz-addons">
                  <h4>Recommended add-ons</h4>
                  <ul>
                    {recommendation.addons.map((addon) => {
                      const price = getAddonPrice(addon);
                      return (
                        <li key={addon}>
                          <span>{addon}</span>
                          <span>
                            {price > 0 ? `+$${price}` : ""}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="quiz-addon-reason">
                    {recommendation.addonReason}
                  </p>
                </div>
              )}

              <div className="quiz-total">
                <span className="quiz-total-label">Estimated total</span>
                <span className="quiz-total-amount">${total}</span>
              </div>

              <div className="quiz-actions">
                <BookingLink className="btn-gold" onClick={handleClose}>
                  <span className="en-only">Book This Ritual</span>
                  <span className="fr-block">Réserver ce rituel</span>
                  <span className="arrow">→</span>
                </BookingLink>
                <button
                  type="button"
                  className="quiz-retake"
                  onClick={resetQuiz}
                >
                  Retake Quiz / Recommencer
                </button>
              </div>
            </div>
          )}
        </div>

        {isQuestion && (
          <div className="quiz-nav">
            <button
              type="button"
              className={`quiz-nav-back${step === 0 ? " invisible" : ""}`}
              onClick={handleBack}
            >
              Back
            </button>
            <button
              type="button"
              className="quiz-nav-next"
              disabled={!answers[step]}
              onClick={handleNext}
            >
              {step === TOTAL_QUESTIONS - 1 ? "Reveal" : "Next"}
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
