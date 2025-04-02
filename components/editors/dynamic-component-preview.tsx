"use client"

import React, { useRef, useEffect, useState } from 'react'
import './preview-styles.css'

interface DynamicComponentPreviewProps {
  code: string;
}

export function DynamicComponentPreview({ code }: DynamicComponentPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const contentLoadedRef = useRef(false);
  const previousCodeRef = useRef(code);
  
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    
    // Skip if code hasn't changed and we've already loaded content
    if (contentLoadedRef.current && previousCodeRef.current === code) {
      return;
    }
    
    // Update previous code reference
    previousCodeRef.current = code;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Create a simplified version of the code
      let processedCode = code;
      
      // Remove import statements
      processedCode = processedCode.replace(/^\s*import\s+.*?['"]\s*;?\s*$/gm, '');
      
      // Remove export statements but keep the content
      processedCode = processedCode.replace(/^\s*export\s+default\s+/gm, '');
      processedCode = processedCode.replace(/^\s*export\s+/gm, '');
      
      // Remove TypeScript annotations
      processedCode = processedCode
        .replace(/:\s*React\.FC(?:<[^>]*>)?\s*=/g, ' =')
        .replace(/:\s*[\w\[\].<>|&(),{}]+\s*(?==)/g, ' =')
        .replace(/\(([^)]*)\)\s*:\s*[\w\[\].<>|&(),{}]+/g, '($1)')
        .replace(/<([A-Z][A-Za-z0-9]*)<.*?>(?=[\s(])/g, '<$1');
      
      // Look for React component pattern
      const componentRegex = /(?:const|function|class|var|let)\s+([A-Z][A-Za-z0-9_]*)\s*(?:=\s*(?:\([^)]*\)\s*=>|\(\))|[({])/g;
      const matches = [...processedCode.matchAll(componentRegex)];
      let mainComponentName = 'App';
      
      if (matches.length > 0) {
        mainComponentName = matches[0][1];
      } else {
        // If no component is found, wrap the code in a component
        processedCode = `
function App() {
  return (
    <div className="va-app-container">
      ${processedCode}
    </div>
  );
}`;
      }
      
      // Create HTML content for the iframe
      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VA Preview</title>
    
    <!-- Base styles -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@department-of-veterans-affairs/formation/dist/formation.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@department-of-veterans-affairs/css-library/dist/stylesheets/utilities.css">
    
    <style>
      html, body { 
        margin: 0; 
        padding: 0; 
        font-family: 'Source Sans Pro', sans-serif;
        background-color: white;
      }
      
      .va-button {
        background-color: #0071bc;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
      }
      
      .va-button:hover {
        background-color: #205493;
      }
      
      .va-alert {
        border-left: 4px solid #02bfe7;
        background-color: #e1f3f8;
        padding: 16px;
        margin: 16px 0;
      }
      
      .va-alert-heading {
        font-weight: bold;
        margin-top: 0;
      }

      .vads-u-padding--2 { padding: 1rem !important; }
      .vads-u-background-color--primary-darkest { background-color: #112e51 !important; }
      .vads-u-color--white { color: white !important; }
      
      /* Common layout classes */
      .vads-l-grid-container {
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
        padding-left: 15px;
        padding-right: 15px;
      }
      
      /* Placeholder elements for Web Components */
      va-button {
        display: inline-block;
        background-color: #0071bc;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        font-weight: bold;
        text-align: center;
      }
      
      va-alert {
        display: block;
        border-left: 4px solid #02bfe7;
        background-color: #e1f3f8;
        padding: 16px;
        margin: 16px 0;
      }
    </style>
  </head>
  <body>
    <div id="preview-container" class="vads-l-grid-container vads-u-padding--2">
      <h1>VA Component Preview</h1>
      <p>This is a simplified static preview of your component.</p>
      <div id="component-placeholder">
        <!-- Component will be described here -->
        <div class="va-component-description">
          ${extractComponentDescription(processedCode)}
        </div>
      </div>
    </div>
  </body>
</html>`;
      
      // Set the iframe content
      const iframeDoc = iframe.contentDocument;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();
        
        // Mark content as loaded
        contentLoadedRef.current = true;
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error("Preview error:", err);
      setError(err instanceof Error ? err.message : "Failed to generate preview");
      setIsLoading(false);
    }
  }, [code]);
  
  // Helper function to extract a description of the component
  function extractComponentDescription(code: string): string {
    let description = "<h2>Component Structure</h2>";
    
    // Check for common VA components
    if (code.includes('va-button') || code.includes('VaButton')) {
      description += "<p>✓ Contains VA Button components</p>";
    }
    
    if (code.includes('va-alert') || code.includes('VaAlert')) {
      description += "<p>✓ Contains VA Alert components</p>";
    }
    
    if (code.includes('va-accordion') || code.includes('VaAccordion')) {
      description += "<p>✓ Contains VA Accordion components</p>";
    }
    
    if (code.includes('va-text-input') || code.includes('VaTextInput')) {
      description += "<p>✓ Contains VA Text Input components</p>";
    }
    
    if (code.includes('va-checkbox') || code.includes('VaCheckbox')) {
      description += "<p>✓ Contains VA Checkbox components</p>";
    }
    
    if (code.includes('va-select') || code.includes('VaSelect')) {
      description += "<p>✓ Contains VA Select components</p>";
    }
    
    // Show code sample
    description += "<h3>Code Sample:</h3>";
    description += `<pre style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; overflow: auto; max-height: 300px;">${escapeHtml(code.substring(0, 500))}${code.length > 500 ? '...' : ''}</pre>`;
    
    return description;
  }
  
  // Helper function to escape HTML
  function escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="loading-spinner">
          <span className="sr-only">Loading preview...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-800 rounded-md">
        <h3 className="font-bold">Preview Error</h3>
        <p>{error}</p>
      </div>
    );
  }
  
  return (
    <div className="va-preview-container">
      <iframe
        ref={iframeRef}
        title="Component Preview"
        className="w-full h-full border-0"
        sandbox="allow-same-origin"
      />
    </div>
  );
} 