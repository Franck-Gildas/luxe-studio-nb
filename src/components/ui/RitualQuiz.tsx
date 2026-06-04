"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BookingLink } from "@/components/ui/BookingLink";
import {
  calculateTotal,
  getAddonPrice,
  type QuizRecommendation,
} from "@/lib/quiz-catalog";
import {
  QUIZ_QUESTIONS,
  QUIZ_UI,
  TOTAL_QUIZ_QUESTIONS,
  type QuizLang,
} from "@/lib/quiz-content";
import { useLang } from "@/lib/LanguageContext";
import "@/styles/quiz.css";

const EMPTY_ANSWERS = Array<number | null>(TOTAL_QUIZ_QUESTIONS).fill(null);

type RitualQuizProps = {
  open: boolean;
  onClose: () => void;
};

function answersToStrings(
  indices: (number | null)[],
  lang: QuizLang
): string[] {
  return indices.map((index, i) => {
    if (index === null) return "";
    return QUIZ_QUESTIONS[lang][i].answers[index] ?? "";
  });
}

export function RitualQuiz({ open, onClose }: RitualQuizProps) {
  const { lang } = useLang();
  const ui = QUIZ_UI[lang];
  const questions = QUIZ_QUESTIONS[lang];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([...EMPTY_ANSWERS]);
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

  const fetchRecommendation = useCallback(
    async (finalIndices: (number | null)[], quizLang: QuizLang) => {
      setLoading(true);
      setError(null);

      const finalAnswers = answersToStrings(finalIndices, quizLang);

      try {
        const res = await fetch("/api/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: finalAnswers, lang: quizLang }),
        });

        const data = await res.json();

        if (!res.ok || !data.recommendation) {
          setError(
            typeof data.error === "string"
              ? data.error
              : QUIZ_UI[quizLang].errorDefault
          );
          return;
        }

        setRecommendation(data.recommendation as QuizRecommendation);
      } catch {
        setError(QUIZ_UI[quizLang].errorDefault);
      } finally {
        setLoading(false);
      }
    },
    []
  );

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
    setAnswers([...EMPTY_ANSWERS]);
    setRecommendation(null);
    setError(null);
    setLoading(false);
    setDirection(1);
  };

  const handleClose = () => {
    resetQuiz();
    onClose();
  };

  const handleSelect = (index: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = index;
      return next;
    });
  };

  const handleNext = () => {
    if (answers[step] === null) return;

    if (step < TOTAL_QUIZ_QUESTIONS - 1) {
      setDirection(1);
      setStep((s) => s + 1);
      return;
    }

    setDirection(1);
    setStep(TOTAL_QUIZ_QUESTIONS);
    void fetchRecommendation(answers, lang);
  };

  const handleBack = () => {
    if (step <= 0) return;
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const handleRetry = () => {
    setError(null);
    setRecommendation(null);
    setStep(TOTAL_QUIZ_QUESTIONS);
    void fetchRecommendation(answers, lang);
  };

  if (!open) return null;

  const progressPct = isQuestion
    ? ((step + 1) / TOTAL_QUIZ_QUESTIONS) * 100
    : 100;

  const total =
    recommendation &&
    calculateTotal(recommendation.serviceId, recommendation.addons);

  const selectedIndex = answers[step];

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
          aria-label={ui.close}
          onClick={handleClose}
        >
          ✕
        </button>

        {isQuestion && (
          <div className="quiz-head">
            <div className="quiz-advisor">
              <span className="dot" aria-hidden />
              {ui.advisor}
            </div>
            <div className="quiz-progress-label">
              {ui.questionLabel(step + 1, TOTAL_QUIZ_QUESTIONS)}
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
                {questions[step].question}
              </h2>
              <div className="quiz-answers">
                {questions[step].answers.map((answer, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`quiz-answer${selectedIndex === index ? " selected" : ""}`}
                    onClick={() => handleSelect(index)}
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
              <p className="quiz-loading-text">{ui.loadingMain}</p>
              <p className="quiz-loading-sub">{ui.loadingSub}</p>
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
                {ui.tryAgain}
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
                  <h4>{ui.addonsHeading}</h4>
                  <ul>
                    {recommendation.addons.map((addon) => {
                      const price = getAddonPrice(addon);
                      return (
                        <li key={addon}>
                          <span>{addon}</span>
                          <span>{price > 0 ? `+$${price}` : ""}</span>
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
                <span className="quiz-total-label">{ui.estimatedTotal}</span>
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
                  {ui.retake}
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
              {ui.back}
            </button>
            <button
              type="button"
              className="quiz-nav-next"
              disabled={selectedIndex === null}
              onClick={handleNext}
            >
              {step === TOTAL_QUIZ_QUESTIONS - 1 ? ui.reveal : ui.next}
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
