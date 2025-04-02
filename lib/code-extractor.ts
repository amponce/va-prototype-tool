/**
 * Extracts code blocks from a message content, with support for streaming partial code blocks
 * @param content The message content to extract code from
 * @returns The extracted code or null if no code found
 */
export function extractCodeFromMessage(message: string): string | null {
  // Ensure we have a string to work with
  if (typeof message !== 'string') {
    return null;
  }

  try {
    // Pattern to match code blocks without using 's' flag
    // We'll use a multi-line approach instead
    const codeBlockRegex = /```(?:jsx?|tsx?|javascript|typescript)?([\s\S]+?)```/;
    const match = message.match(codeBlockRegex);
    
    if (match && match[1]) {
      return match[1].trim();
    }
    
    // For streaming responses, handle incomplete code blocks
    // Check if there's an opening code block tag but no closing one yet
    const incompleteCodeBlockMatch = message.match(/```(?:jsx?|tsx?|javascript|typescript)?([\s\S]+)$/);
    if (incompleteCodeBlockMatch && incompleteCodeBlockMatch[1]) {
      // Return the partial code - helps with streaming
      return incompleteCodeBlockMatch[1].trim();
    }
    
    return null;
  } catch (error) {
    console.error("Error extracting code from message:", error);
    return null;
  }
}

