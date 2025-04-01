"use client"

import React, { useState, useEffect } from 'react'
import { VAComponentPreview } from './va-component-preview'
import './preview-styles.css'

interface DynamicComponentPreviewProps {
  code: string
}

export function DynamicComponentPreview({ code }: DynamicComponentPreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [previewError, setPreviewError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const iframeRef = React.useRef<HTMLIFrameElement>(null)

  // Generate preview
  const generatePreview = async () => {
    if (!code) {
      setPreviewUrl(null)
      return
    }

    setIsLoading(true)
    setPreviewError(null)

    try {
      const response = await fetch('/api/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate preview')
      }

      setPreviewUrl(data.previewUrl)
    } catch (error) {
      console.error('Preview generation error:', error)
      setPreviewError(error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  // Generate preview when code changes
  useEffect(() => { 
    generatePreview()
  }, [code])

  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <div className="text-center">
            <div className="loading-spinner" style={{
              width: '40px',
              height: '40px',
              border: '3px solid #f3f3f3',
              borderTop: '3px solid #0071bc',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px'
            }}>
              <span className="sr-only">Loading preview...</span>
            </div>
            <p style={{ margin: '10px 0', color: '#444' }}>Generating preview...</p>
          </div>
        </div>
      ) : previewError ? (
        <div style={{ padding: '12px', margin: '12px', border: '1px solid #f44336', borderRadius: '4px', backgroundColor: '#ffebee' }}>
          <h3 style={{ margin: '0 0 8px', color: '#d32f2f' }}>Preview Error</h3>
          <p style={{ margin: '0', color: '#444' }}>{previewError}</p>
        </div>
      ) : previewUrl ? (
        <iframe
          ref={iframeRef}
          src={previewUrl}
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="Component Preview"
          sandbox="allow-scripts allow-same-origin"
          loading="lazy"
          frameBorder="0"
        />
      ) : (
        <div style={{ 
          height: '100%', 
          overflow: 'auto', 
          position: 'relative',
          border: '1px solid #e5e7eb',
          borderRadius: '4px',
          backgroundColor: '#fff',
          padding: '16px'
        }}>
          <iframe
            src="about:blank"
            ref={iframeRef}
            style={{ 
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            title="Preview Frame"
            sandbox="allow-scripts allow-same-origin"
            srcDoc={`
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <style>
                    /* Reset all styles to prevent leakage */
                    html, body {
                      all: initial;
                      display: block;
                      font-family: system-ui, sans-serif;
                      margin: 0;
                      padding: 16px;
                      width: 100%;
                      height: 100%;
                      box-sizing: border-box;
                    }
                    
                    /* Scoped styles that won't leak */
                    .va-preview-content {
                      padding: 20px;
                      font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                    }
                    
                    /* Ensure all VA styles are scoped */
                    #va-preview-root * {
                      box-sizing: border-box;
                    }
                  </style>
                  <!-- These styles will be contained within the iframe -->
                  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@department-of-veterans-affairs/formation/dist/formation.min.css">
                  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@department-of-veterans-affairs/css-library/dist/stylesheets/utilities.css">
                </head>
                <body>
                  <div id="va-preview-root">
                    <div class="va-preview-content">
                      <div id="va-preview-container"></div>
                    </div>
                  </div>
                  
                  <script>
                    // This ensures CSS scope isolation
                    (function() {
                      // Ensure all external stylesheets are marked with proper scoping
                      document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
                        // Add a special attribute that aids in scoping
                        link.setAttribute('data-iframe-styles', 'true');
                      });
                      
                      // Create a style element to help scope all styles
                      const scopeStyle = document.createElement('style');
                      scopeStyle.textContent = 
                        // This effectively creates a CSS containment boundary
                        ':root { contain: content; }' +
                        'body { contain: content; }' +
                        '#va-preview-root { contain: content; }';
                      document.head.appendChild(scopeStyle);
                    })();
                  </script>
                </body>
              </html>
            `}
          />
        </div>
      )}
    </div>
  )
} 