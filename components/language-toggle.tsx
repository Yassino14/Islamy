"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { motion } from "framer-motion"

type Language = "en" | "ar"

interface LanguageToggleProps {
  onChange?: (language: Language) => void
}

export function LanguageToggle({ onChange }: LanguageToggleProps) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    // Get stored language preference or default to English
    const storedLanguage = localStorage.getItem("language") as Language
    if (storedLanguage && (storedLanguage === "en" || storedLanguage === "ar")) {
      setLanguage(storedLanguage)
    }
  }, [])

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)

    // Update document direction for RTL support
    document.documentElement.dir = newLanguage === "ar" ? "rtl" : "ltr"

    if (onChange) {
      onChange(newLanguage)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Globe className="h-5 w-5" />
          <motion.span
            key={language}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-1 -right-1 text-xs font-bold bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-full w-4 h-4 flex items-center justify-center"
          >
            {language === "en" ? "E" : "ع"}
          </motion.span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
          <span className={language === "en" ? "font-bold text-emerald-700 dark:text-emerald-400" : ""}>English</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("ar")}>
          <span className={language === "ar" ? "font-bold text-emerald-700 dark:text-emerald-400" : ""}>العربية</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

