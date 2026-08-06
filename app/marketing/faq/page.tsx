import type { Metadata } from "next"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { getFaqPageContent } from "@/sanity/lib/faq-content"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Common questions about the Sprint tools.",
}

export default async function FaqPage() {
  const content = await getFaqPageContent()

  return (
    <article className="w-full max-w-3xl pb-20">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight">
          {content.title}
        </h1>
        <p className="mt-2 text-balance text-muted-foreground">
          {content.subtitle}
        </p>
      </header>

      <Accordion className="mt-8 border-0!" multiple>
        {content.items.map((item) => (
          <AccordionItem
            key={item._key}
            value={item._key}
            className="border-b-0! data-open:bg-transparent"
          >
            <AccordionTrigger className="cursor-pointer hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-xs text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </article>
  )
}
