"use client"

import { useEffect } from "react"

export function AccordionScript() {
  useEffect(() => {
    // Function to toggle accordion
    const toggleAccordion = (button: HTMLButtonElement) => {
      const expanded = button.getAttribute("aria-expanded") === "true"
      button.setAttribute("aria-expanded", (!expanded).toString())

      // For VA web components, we need to use the va-accordion-item's toggle method
      // Find the parent accordion item
      const accordionItem = button.closest("va-accordion-item")
      if (accordionItem) {
        // VA web components handle their own state, so we just need to trigger a click
        // This is a fallback in case the component's built-in functionality doesn't work
        if (typeof (accordionItem as any).toggle === "function") {
          ;(accordionItem as any).toggle()
        }
      }
    }

    // Add click event listeners to all accordion buttons
    const accordionButtons = document.querySelectorAll("va-accordion-item [slot='headline']")
    accordionButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        // The VA component handles the toggle internally, this is just a fallback
        // We don't want to interfere with the built-in functionality
        if (!e.defaultPrevented) {
          toggleAccordion(button as HTMLButtonElement)
        }
      })
    })

    // Cleanup function
    return () => {
      accordionButtons.forEach((button) => {
        button.removeEventListener("click", (e) => {
          if (!e.defaultPrevented) {
            toggleAccordion(button as HTMLButtonElement)
          }
        })
      })
    }
  }, [])

  return null
}

