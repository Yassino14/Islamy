type TranslationKey =
  | "welcomeTitle"
  | "welcomeSubtitle"
  | "chatPlaceholder"
  | "sendButton"
  | "suggestedQuestions"
  | "loadingMessage"
  | "featureKnowledge"
  | "featureGuidance"
  | "featureAccessible"
  | "featureKnowledgeDesc"
  | "featureGuidanceDesc"
  | "featureAccessibleDesc"
  | "emptyMessage"

type Translations = {
  [key in TranslationKey]: {
    en: string
    ar: string
  }
}

export const translations: Translations = {
  welcomeTitle: {
    en: "Islamy",
    ar: "إسلامي",
  },
  welcomeSubtitle: {
    en: "Your companion for Islamic knowledge and guidance",
    ar: "رفيقك للمعرفة والإرشاد الإسلامي",
  },
  chatPlaceholder: {
    en: "Ask a question about Islam...",
    ar: "اسأل سؤالاً عن الإسلام...",
  },
  sendButton: {
    en: "Send",
    ar: "إرسال",
  },
  suggestedQuestions: {
    en: ["What are the five pillars of Islam?", "How do I perform Salah?", "What is the significance of Ramadan?"],
    ar: ["ما هي أركان الإسلام الخمسة؟", "كيف أؤدي الصلاة؟", "ما هي أهمية شهر رمضان؟"],
  },
  loadingMessage: {
    en: "Thinking...",
    ar: "جاري التفكير...",
  },
  featureKnowledge: {
    en: "Islamic Knowledge",
    ar: "المعرفة الإسلامية",
  },
  featureGuidance: {
    en: "Interactive Guidance",
    ar: "إرشاد تفاعلي",
  },
  featureAccessible: {
    en: "Accessible Anywhere",
    ar: "متاح في كل مكان",
  },
  featureKnowledgeDesc: {
    en: "Access accurate information about Islamic teachings, history, and practices.",
    ar: "الوصول إلى معلومات دقيقة حول التعاليم والتاريخ والممارسات الإسلامية.",
  },
  featureGuidanceDesc: {
    en: "Ask questions and receive thoughtful responses based on Islamic scholarship.",
    ar: "اطرح أسئلة واحصل على إجابات مدروسة بناءً على العلم الإسلامي.",
  },
  featureAccessibleDesc: {
    en: "Access Islamic knowledge from anywhere, anytime.",
    ar: "الوصول إلى المعرفة الإسلامية من أي مكان وفي أي وقت.",
  },
  emptyMessage: {
    en: "Ask about Islamic teachings, history, practices, or guidance.",
    ar: "اسأل عن التعاليم الإسلامية أو التاريخ أو الممارسات أو الإرشادات.",
  },
}

export type Language = "en" | "ar"

export function getTranslation(key: TranslationKey, language: Language): string | string[] {
  return translations[key][language]
}

