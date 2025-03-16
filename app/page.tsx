"use client"

// Update the home page to support translations
import { useEffect, useRef, useState } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Chat } from "@/components/chat"
import { BookOpen, MessageCircle, Globe } from "lucide-react"
import { getTranslation, type Language } from "@/lib/translations"

export default function Home() {
  const [language, setLanguage] = useState<Language>("en")
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  useEffect(() => {
    // Get stored language preference
    const storedLanguage = localStorage.getItem("language") as Language
    if (storedLanguage && (storedLanguage === "en" || storedLanguage === "ar")) {
      setLanguage(storedLanguage)
    }

    // Listen for language changes
    const handleLanguageChange = () => {
      const newLanguage = localStorage.getItem("language") as Language
      if (newLanguage && (newLanguage === "en" || newLanguage === "ar")) {
        setLanguage(newLanguage)
      }
    }

    window.addEventListener("storage", handleLanguageChange)
    return () => window.removeEventListener("storage", handleLanguageChange)
  }, [])

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-emerald-600" />,
      title: getTranslation("featureKnowledge", language),
      description: getTranslation("featureKnowledgeDesc", language),
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-emerald-600" />,
      title: getTranslation("featureGuidance", language),
      description: getTranslation("featureGuidanceDesc", language),
    },
    {
      icon: <Globe className="h-8 w-8 text-emerald-600" />,
      title: getTranslation("featureAccessible", language),
      description: getTranslation("featureAccessibleDesc", language),
    },
  ]

  const isRtl = language === "ar"
  const textAlignClass = isRtl ? "text-right" : "text-left"
  const textCenterClass = "text-center"

  return (
    <main className={`flex min-h-screen flex-col items-center ${isRtl ? "rtl" : "ltr"}`}>
      <section className="w-full bg-gradient-to-b from-emerald-50 to-white dark:from-gray-900 dark:to-gray-950 py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">
              {getTranslation("welcomeTitle", language)}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              {getTranslation("welcomeSubtitle", language)}
            </p>
          </motion.div>

          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className={`text-lg font-semibold mb-2 text-emerald-700 dark:text-emerald-400 ${textCenterClass}`}>
                  {feature.title}
                </h3>
                <p className={`text-gray-600 dark:text-gray-300 ${textCenterClass}`}>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="w-full max-w-5xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
          <h2 className={`text-3xl font-bold text-center mb-8 text-emerald-700 dark:text-emerald-400`}>
            {language === "en" ? "Ask Islamy" : "اسأل إسلامي"}
          </h2>
          <Chat />
        </motion.div>
      </section>
    </main>
  )
}

