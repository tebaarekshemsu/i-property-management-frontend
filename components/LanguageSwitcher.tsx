"use client"

import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useMemo } from "react"

export function LanguageSwitcher({ iconOnly = false }: { iconOnly?: boolean }) {
  // Try to use the language context, but provide fallbacks if it's not available
  const context = useLanguage()

  const { lang, setLang, dictionary } = useMemo(() => {
    try {
      return {
        lang: context.lang,
        setLang: context.setLang,
        dictionary: context.dictionary,
      }
    } catch (error) {
      console.warn("LanguageSwitcher used outside of LanguageProvider")
      return {
        lang: "en",
        setLang: (_: string) => {},
        dictionary: { language: { current: "English", switch: "Switch language" } },
      }
    }
  }, [context])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={iconOnly ? "icon" : "default"} className="gap-2">
          <Globe className="h-4 w-4" />
          {!iconOnly && <span>{dictionary.language.current}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLang("en")} className={lang === "en" ? "bg-accent" : ""}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLang("am")} className={lang === "am" ? "bg-accent" : ""}>
          አማርኛ
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

