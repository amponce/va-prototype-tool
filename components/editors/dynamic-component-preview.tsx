"use client"

import React, { useState, useEffect } from 'react'
import { VAStylesProvider } from "@/app/va-styles"
import { VAContentContainer } from "@/components/va-specific/va-content-container"
import { VaButton, VaAlert } from "@department-of-veterans-affairs/component-library/dist/react-bindings"
import './preview-styles.css'

interface DynamicComponentPreviewProps {
  code: string;
}

export function DynamicComponentPreview({ code }: DynamicComponentPreviewProps) {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!code) {
      setComponent(null);
      setError("No code provided");
      setIsLoading(false);
      return;
    }
    
    try {
      // Clear previous state
      setIsLoading(true);
      setError(null);
      
      // Create a fallback component that shows a static preview
      const FallbackComponent = () => (
        <VAStylesProvider>
       
            <header className="vads-u-padding--2 vads-u-background-color--primary-darkest vads-u-color--black">
            <h1 className="vads-u-font-size--h2">Constitutional Rights Information Center</h1>
            <p>Your resource for understanding your constitutional rights and how they apply to you as a veteran.</p>
            </header>
            <main className="vads-u-padding--2">
              <VaAlert status="info" visible {...{ uswds: true } as any}>
                <h2 slot="headline">Welcome to Our Service</h2>
                <p>We are committed to providing the best service for our veterans.</p>
              </VaAlert>
              <div className="vads-u-margin-top--2">
                <VaButton text="Get Started" {...{ uswds: true } as any} />
              </div>
            </main>
  
        </VAStylesProvider>
      );
      
      // For now, just use the fallback component
      setComponent(() => FallbackComponent);
      setIsLoading(false);
    } catch (err) {
      console.error("Preview error:", err);
      setError(err instanceof Error ? err.message : "Failed to generate preview");
      setIsLoading(false);
    }
  }, [code]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="vads-loader">
          <span className="vads-u-sr-only">Loading preview...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="vads-u-padding--2 vads-u-background-color--error-lightest vads-u-color--error-dark">
        <h3>Preview Error</h3>
        <p>{error}</p>
      </div>
    );
  }
  
  if (!Component) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500">
        No preview available
      </div>
    );
  }
  
  return (
    <div className="va-preview-container">
      <Component />
    </div>
  );
} 