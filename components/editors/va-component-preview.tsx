"use client"

import React, { useState, useEffect, useRef } from "react";

interface VAComponentPreviewProps {
  code: string;
}

export function VAComponentPreview({ code }: VAComponentPreviewProps) {
  const [componentName, setComponentName] = useState("Component");
  const [headings, setHeadings] = useState<string[]>([]);
  const [components, setComponents] = useState({
    hasButton: false,
    hasAlert: false,
    hasForm: false,
    hasAccordion: false,
    hasContent: false
  });
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    try {
      // Extract component name
      const nameMatch = code.match(/const\s+([A-Z][\w]*)\s*[:=]|function\s+([A-Z][\w]*)/);
      const name = nameMatch ? (nameMatch[1] || nameMatch[2]) : "Component";
      setComponentName(name);
      
      // Extract headings
      const headingMatches = code.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>/g) || [];
      const extractedHeadings = headingMatches.map(h => {
        const textMatch = h.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>/);
        return textMatch ? textMatch[1] : "";
      }).filter(Boolean);
      setHeadings(extractedHeadings);
      
      // Check for components
      setComponents({
        hasButton: code.includes('VaButton') || code.includes('va-button'),
        hasAlert: code.includes('VaAlert') || code.includes('va-alert'),
        hasForm: code.includes('VaTextInput') || code.includes('VaCheckbox') || 
                code.includes('VaRadio') || code.includes('va-text-input'),
        hasAccordion: code.includes('VaAccordion') || code.includes('va-accordion'),
        hasContent: code.includes('VaContentContainer') || code.includes('va-content-container')
      });
      
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze code");
    }
  }, [code]);

  // Generate the iframe HTML content
  const generateIframeContent = () => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>VA Component Preview</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@department-of-veterans-affairs/formation/dist/formation.min.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@department-of-veterans-affairs/css-library/dist/stylesheets/utilities.css">
        <style>
          body {
            font-family: 'Source Sans Pro', sans-serif;
            padding: 20px;
            margin: 0;
          }
          h2 {
            margin-bottom: 16px !important;
            font-size: 1.5rem !important;
            font-weight: 700 !important;
          }
          h3 {
            color: #005ea2 !important;
            font-size: 1.2rem !important;
          }
          h4 {
            font-weight: bold !important;
            margin-bottom: 12px !important;
          }
          .component-card {
            border: 1px solid #d6d7d9;
            padding: 16px;
            margin-top: 16px;
            margin-bottom: 16px;
            border-radius: 4px;
          }
          .component-heading {
            font-family: 'Source Sans Pro', sans-serif;
            font-size: 1.2rem;
            color: #005ea2;
          }
          .component-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            padding-left: 0;
            list-style: none;
          }
          .component-tag {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 16px;
            font-size: 0.875rem;
          }
          .button-tag {
            color: #005ea2;
            background-color: #e1f3f8;
          }
          .alert-tag {
            color: #8b6b00;
            background-color: #fff1d2;
          }
          .form-tag {
            color: #2e8540;
            background-color: #e7f4e4;
          }
          .accordion-tag {
            color: #4c2c92;
            background-color: #e9e1f6;
          }
          .content-tag {
            color: #323a45;
            background-color: #f1f1f1;
          }
          .preview-section {
            margin-top: 24px;
            padding-top: 16px;
            border-top: 1px solid #d6d7d9;
          }
          .preview-container {
            background-color: #f1f1f1;
            padding: 16px;
            border-radius: 4px;
          }
          .footer-note {
            margin-top: 24px;
            font-size: 0.875rem;
            color: #5b616b;
          }
        </style>
      </head>
      <body>
        <h2>VA Component Preview</h2>
        
        ${error ? `
          <div class="usa-alert usa-alert-error" role="alert">
            <div class="usa-alert-body">
              <h3 class="usa-alert-heading">Error</h3>
              <p class="usa-alert-text">${error}</p>
            </div>
          </div>
        ` : ''}
        
        <div class="component-card">
          <h3 class="component-heading">${componentName}</h3>
          
          ${headings.length > 0 ? `
            <div class="vads-u-margin-top--3">
              <h4>Page Content:</h4>
              <div class="vads-u-border-left--5px vads-u-border-color--primary vads-u-padding-left--2">
                ${headings.map(heading => `
                  <p class="vads-u-font-weight--medium vads-u-margin-y--0p5">${heading}</p>
                `).join('')}
              </div>
            </div>
          ` : ''}
          
          <div class="vads-u-margin-top--3">
            <h4>VA Components Used:</h4>
            <ul class="component-list">
              ${components.hasButton ? `
                <li class="component-tag button-tag">Button</li>
              ` : ''}
              ${components.hasAlert ? `
                <li class="component-tag alert-tag">Alert</li>
              ` : ''}
              ${components.hasForm ? `
                <li class="component-tag form-tag">Form Elements</li>
              ` : ''}
              ${components.hasAccordion ? `
                <li class="component-tag accordion-tag">Accordion</li>
              ` : ''}
              ${components.hasContent ? `
                <li class="component-tag content-tag">Content Container</li>
              ` : ''}
            </ul>
          </div>
          
          <div class="preview-section">
            <h4>Component Preview:</h4>
            
            <div class="preview-container">
              ${components.hasAlert ? `
                <div class="usa-alert usa-alert-info vads-u-margin-bottom--3">
                  <div class="usa-alert-body">
                    <h3 class="usa-alert-heading">Alert Component</h3>
                    <p class="usa-alert-text">Alert content would appear here</p>
                  </div>
                </div>
              ` : ''}
              
              ${components.hasForm ? `
                <div class="vads-u-margin-bottom--3">
                  <label class="vads-u-display--block vads-u-margin-bottom--1p5 vads-u-font-weight--bold">Form Input Placeholder</label>
                  <input class="usa-input" type="text" disabled />
                </div>
              ` : ''}
              
              ${components.hasButton ? `
                <button class="usa-button">Button Component</button>
              ` : ''}
            </div>
          </div>
          
          <div class="footer-note">
            This is a visual representation of your component structure.
            View the code tab for the full implementation.
          </div>
        </div>
      </body>
      </html>
    `;
  };

  return (
    <div style={{ 
      height: '100%', 
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      display: 'block'
    }}>
      <iframe
        ref={iframeRef}
        src="about:blank"
        srcDoc={generateIframeContent()}
        style={{
          border: 'none',
          width: '100%',
          height: '100%',
          display: 'block'
        }}
        title="VA Component Analysis"
        sandbox="allow-scripts"
      />
    </div>
  );
} 