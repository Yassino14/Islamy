import { Github, Linkedin, Mail, Globe } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export const socialLinks = [
  {
    name: "Website",
    url: "https://yassinolouati.me",
    icon: <Globe className="h-5 w-5" />,
    tooltip: "Visit my website",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/yassine-louati-9629a219a/",
    icon: <Linkedin className="h-5 w-5" />,
    tooltip: "Connect on LinkedIn",
  },
  {
    name: "GitHub",
    url: "https://github.com/yassinelouati", // Note: Using a placeholder as the provided URL was the same as LinkedIn
    icon: <Github className="h-5 w-5" />,
    tooltip: "Check my GitHub",
  },
  {
    name: "Email",
    url: "mailto:louati.yessine1@gmail.com",
    icon: <Mail className="h-5 w-5" />,
    tooltip: "Send me an email",
  },
]

export function SocialLinks({ className = "" }) {
  return (
    <div className={`flex space-x-3 ${className}`}>
      <TooltipProvider>
        {socialLinks.map((link) => (
          <Tooltip key={link.name}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
              >
                <Link href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                  {link.icon}
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{link.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  )
}

