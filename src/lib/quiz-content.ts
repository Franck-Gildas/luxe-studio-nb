export type QuizLang = "en" | "fr";

export const QUIZ_QUESTIONS: Record<
  QuizLang,
  { question: string; answers: string[] }[]
> = {
  en: [
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
  ],
  fr: [
    {
      question: "Qu'est-ce qui vous amène au Luxe Studio aujourd'hui?",
      answers: [
        "J'ai besoin d'une transformation capillaire",
        "Je veux prendre soin de ma peau",
        "J'ai besoin de me détendre et de repartir à zéro",
        "Je veux être soigné et impeccable",
      ],
    },
    {
      question: "Comment décririez-vous votre principale préoccupation?",
      answers: [
        "Dommages capillaires, couleur ou repousse",
        "Texture, teint ou vieillissement de la peau",
        "Stress, tension ou fatigue",
        "Sourcils, cils ou ongles",
      ],
    },
    {
      question: "Combien de temps pouvez-vous vous accorder?",
      answers: [
        "1 heure — un soin ciblé",
        "1 h 30 à 2 heures — un vrai rituel",
        "2 heures et plus — l'expérience complète",
        "Surprenez-moi — je vous fais confiance",
      ],
    },
    {
      question: "Qu'est-ce qui compte le plus pour votre expérience?",
      answers: [
        "Des résultats visibles immédiatement",
        "Une détente profonde et le calme",
        "Une transformation complète",
        "Me sentir soigné et confiant",
      ],
    },
    {
      question: "Est-ce votre première visite au Luxe Studio?",
      answers: [
        "Oui — je veux commencer en douceur",
        "Non — je sais ce que j'aime",
        "Non — mais je veux essayer quelque chose de nouveau",
        "Je ne suis pas encore certain",
      ],
    },
  ],
};

export const QUIZ_UI: Record<
  QuizLang,
  {
    close: string;
    advisor: string;
    questionLabel: (current: number, total: number) => string;
    loadingMain: string;
    loadingSub: string;
    errorDefault: string;
    tryAgain: string;
    back: string;
    next: string;
    reveal: string;
    addonsHeading: string;
    estimatedTotal: string;
    retake: string;
  }
> = {
  en: {
    close: "Close quiz",
    advisor: "Élise — Ritual Advisor",
    questionLabel: (current, total) => `Question ${current}/${total}`,
    loadingMain: "Élise is composing your ritual…",
    loadingSub: "One moment, please",
    errorDefault: "Élise could not prepare your ritual just now.",
    tryAgain: "Try again",
    back: "Back",
    next: "Next",
    reveal: "Reveal",
    addonsHeading: "Recommended add-ons",
    estimatedTotal: "Estimated total",
    retake: "Retake Quiz",
  },
  fr: {
    close: "Fermer le quiz",
    advisor: "Élise — Conseillère en rituels",
    questionLabel: (current, total) => `Question ${current}/${total}`,
    loadingMain: "Élise compose votre rituel…",
    loadingSub: "Un instant, s'il vous plaît",
    errorDefault: "Élise n'a pas pu préparer votre rituel pour le moment.",
    tryAgain: "Réessayer",
    back: "Retour",
    next: "Suivant",
    reveal: "Révéler",
    addonsHeading: "Suppléments recommandés",
    estimatedTotal: "Total estimé",
    retake: "Recommencer le quiz",
  },
};

export const TOTAL_QUIZ_QUESTIONS = QUIZ_QUESTIONS.en.length;
