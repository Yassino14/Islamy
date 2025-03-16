"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Heart, Users, Award, BookMarked } from "lucide-react"

export default function AboutPage() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

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

  const values = [
    {
      icon: <BookOpen className="h-8 w-8 text-emerald-600" />,
      title: "Knowledge",
      description: "We are committed to providing accurate and reliable Islamic knowledge based on authentic sources.",
    },
    {
      icon: <Heart className="h-8 w-8 text-emerald-600" />,
      title: "Compassion",
      description: "We approach all questions with understanding, empathy, and respect for diverse perspectives.",
    },
    {
      icon: <Users className="h-8 w-8 text-emerald-600" />,
      title: "Community",
      description: "We aim to foster a global community of learners seeking to understand Islamic teachings.",
    },
    {
      icon: <Award className="h-8 w-8 text-emerald-600" />,
      title: "Excellence",
      description: "We strive for excellence in our responses, continuously improving our knowledge base.",
    },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="w-full bg-gradient-to-b from-emerald-50 to-white dark:from-gray-900 dark:to-gray-950 py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">
              About Islamy
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Islamy is an AI-powered Islamic knowledge assistant designed to provide accurate information about Islamic
              teachings, history, practices, and guidance.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="w-full max-w-5xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-emerald-700 dark:text-emerald-400">Our Mission</h2>
          <Card className="overflow-hidden shadow-lg">
            <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3 flex justify-center">
                <BookMarked className="h-32 w-32 text-emerald-600" />
              </div>
              <div className="md:w-2/3">
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                  Our mission is to make authentic Islamic knowledge accessible to everyone, regardless of their
                  background or level of understanding. We believe that accurate information leads to better
                  understanding, which in turn fosters respect and harmony.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Islamy aims to be a reliable companion on your journey of learning about Islam, providing thoughtful
                  responses based on mainstream Islamic scholarship while acknowledging the diversity of interpretations
                  within the Islamic tradition.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div ref={ref} variants={staggerContainer} initial="hidden" animate={controls} className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-emerald-700 dark:text-emerald-400">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-emerald-700 dark:text-emerald-400 text-center">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-emerald-700 dark:text-emerald-400">
            How Islamy Works
          </h2>
          <Card className="overflow-hidden shadow-lg">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Islamy is powered by advanced AI technology that has been trained on a wide range of Islamic texts and
                scholarly works. When you ask a question, our system:
              </p>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                <li>Analyzes your question to understand what you're asking about</li>
                <li>Searches through its knowledge base of Islamic teachings and scholarship</li>
                <li>Formulates a response based on authentic sources and mainstream interpretations</li>
                <li>Presents the information in a clear, accessible way</li>
              </ol>
              <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
                While Islamy strives to provide accurate information, it should not be considered a substitute for
                consulting with qualified Islamic scholars for complex religious matters or personal religious guidance.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </main>
  )
}

