"use client"

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { VAStylesProvider } from "@/app/va-styles";
import { VaButton, VaAlert } from "@department-of-veterans-affairs/component-library/dist/react-bindings";
import "@department-of-veterans-affairs/component-library/dist/main.css";

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const componentId = searchParams.get('id');
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load VA web components
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@department-of-veterans-affairs/component-library/dist/component-library.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.customElements && typeof window.customElements.define === 'function') {
        // The components will auto-register themselves
        console.log('VA components loaded');
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (!componentId) return;

    const loadComponent = async () => {
      try {
        const response = await fetch(`/api/preview?id=${componentId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to load component');
        }

        // Create a blob URL for the component code
        const blob = new Blob([data.code], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);

        // Dynamically import the component
        const module = await import(/* @vite-ignore */ url);
        const DynamicComponent = module.default;

        setComponent(() => DynamicComponent);
        
        // Clean up the blob URL
        return () => URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error loading component:', error);
        setError(error instanceof Error ? error.message : 'Failed to load component');
      }
    };

    const cleanup = loadComponent();
    return () => {
      cleanup?.then(cleanupFn => cleanupFn?.());
    };
  }, [componentId]);

  if (!componentId) {
    return (
      <div className="vads-u-padding--3">
        <p>No component ID specified</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="vads-u-padding--3 vads-u-background-color--error-lighter">
        <p className="vads-u-color--error-dark">{error}</p>
      </div>
    );
  }

  if (!Component) {
    return (
      <div className="vads-u-padding--3">
        <div className="vads-loader">
          <span className="vads-u-sr-only">Loading component...</span>
        </div>
      </div>
    );
  }

  return (
    <VAStylesProvider>
      <Component />
    </VAStylesProvider>
  );
}

