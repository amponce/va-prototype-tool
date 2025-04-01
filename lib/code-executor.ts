// This function sanitizes and prepares code for execution in the iframe
export function prepareCodeForExecution(code: string): string {
  // Remove any potentially harmful scripts or imports
  const sanitizedCode = code
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/import\s+.*?from\s+['"].*?['"]/g, "// Import statements removed for security")

  return sanitizedCode
}

// This function extracts React components from code
export function extractComponents(code: string): Record<string, string> {
  const components: Record<string, string> = {}

  // Simple regex to find React component definitions
  // This is a basic implementation and might need to be enhanced for complex cases
  const componentRegex =
    /(?:export\s+default\s+)?(?:function|const)\s+([A-Z][a-zA-Z0-9]*)\s*(?:=\s*(?:$$[^)]*$$|[a-zA-Z0-9]*)\s*=>|$$[^)]*$$\s*{)/g

  let match
  let lastIndex = 0

  while ((match = componentRegex.exec(code)) !== null) {
    const componentName = match[1]

    // Find the component body (this is a simplified approach)
    let braceCount = 0
    const startIndex = code.indexOf("{", match.index)

    if (startIndex === -1) continue

    for (let i = startIndex; i < code.length; i++) {
      if (code[i] === "{") braceCount++
      else if (code[i] === "}") {
        braceCount--
        if (braceCount === 0) {
          // Extract the component code
          components[componentName] = code.substring(match.index, i + 1)
          lastIndex = i + 1
          break
        }
      }
    }
  }

  // If no components were found, use the entire code as the App component
  if (Object.keys(components).length === 0) {
    components["App"] = code
  }

  return components
}

