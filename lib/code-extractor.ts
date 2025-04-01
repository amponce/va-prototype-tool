/**
 * Extracts code blocks from a message content
 * @param content The message content to extract code from
 * @returns The extracted code or empty string if no code found
 */
export function extractCodeFromMessage(content: string): string {
  // Extract code blocks with language specifier
  const codeBlockRegex = /```(?:jsx|tsx|javascript|typescript|js|ts|react)?([^```]*?)```/gs
  let match
  let extractedCode = ""

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match[1] && match[1].trim()) {
      extractedCode += match[1].trim() + "\n\n"
    }
  }

  // Clean up the extracted code
  extractedCode = extractedCode.trim()

  // If no code blocks found with the regex, try a more aggressive approach
  if (!extractedCode) {
    // Look for content between triple backticks
    const fullCodeBlockMatch = content.match(/```([\s\S]*?)```/)
    if (fullCodeBlockMatch && fullCodeBlockMatch[1]) {
      extractedCode = fullCodeBlockMatch[1].trim()
    }
  }

  return extractedCode
}

