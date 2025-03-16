"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Send, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { getTranslation, type Language } from "@/lib/translations"

export function Chat() {
  const [language, setLanguage] = useState<Language>("en")
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat",
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Show error toast if there's an API error
  useEffect(() => {
    if (error) {
      toast({
        title: language === "en" ? "Error" : "خطأ",
        description:
          language === "en"
            ? "There was an error processing your request. Please try again."
            : "حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      })
    }
  }, [error, language, toast])

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) {
      toast({
        title: language === "en" ? "Empty message" : "رسالة فارغة",
        description:
          language === "en" ? "Please enter a question to ask Islamy." : "الرجاء إدخال سؤال لطرحه على إسلامي.",
        variant: "destructive",
      })
      return
    }
    handleSubmit(e)
  }

  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  }

  const suggestedQuestions = getTranslation("suggestedQuestions", language) as string[]

  if (!mounted) return null

  const isRtl = language === "ar"
  const dirClass = isRtl ? "rtl:text-right" : ""

  return (
    <Card className={`w-full shadow-lg border-emerald-100 dark:border-emerald-900/30 ${isRtl ? "text-right" : ""}`}>
      <CardHeader className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-t-lg">
        <CardTitle className="text-center flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5" />
          {language === "en" ? "Ask about Islamic knowledge" : "اسأل عن المعرفة الإسلامية"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px] p-4">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className={`flex flex-col items-center justify-center h-full text-center text-gray-500 p-6 ${dirClass}`}
            >
              <Sparkles className="h-12 w-12 text-emerald-500 mb-4 opacity-70" />
              <p className="text-lg mb-2 font-medium">
                {language === "en" ? "Welcome to Islamy" : "مرحبًا بك في إسلامي"}
              </p>
              <p>{getTranslation("emptyMessage", language)}</p>
              <div className="mt-6 grid grid-cols-1 gap-2 w-full max-w-md">
                {suggestedQuestions.map((suggestion, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className={`text-left justify-start h-auto py-2 px-3 text-sm ${isRtl ? "text-right justify-end" : ""}`}
                    onClick={() => {
                      handleInputChange({ target: { value: suggestion } } as any)
                    }}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex items-start gap-3 max-w-[80%] ${
                        message.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <Avatar className={message.role === "user" ? "bg-emerald-100" : "bg-emerald-700"}>
                        <div className={message.role === "user" ? "text-emerald-700" : "text-white"}>
                          {message.role === "user" ? (language === "en" ? "U" : "م") : language === "en" ? "I" : "إ"}
                        </div>
                      </Avatar>
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          message.role === "user"
                            ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100"
                            : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                        } ${isRtl ? "text-right" : ""}`}
                        dir={isRtl ? "rtl" : "ltr"}
                      >
                        {message.content}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t dark:border-gray-800">
        <form onSubmit={handleFormSubmit} className="flex w-full gap-2">
          <Input
            placeholder={getTranslation("chatPlaceholder", language) as string}
            value={input}
            onChange={handleInputChange}
            className={`flex-1 focus-visible:ring-emerald-500 ${isRtl ? "text-right" : ""}`}
            disabled={isLoading}
            dir={isRtl ? "rtl" : "ltr"}
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

