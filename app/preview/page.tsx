"use client"

import React, { useEffect, useState, Suspense } from 'react'
import { VAHeader } from '@/components/va-specific/va-header'
import { VAFooter } from '@/components/va-specific/va-footer'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import '@department-of-veterans-affairs/component-library/dist/main.css'
import '@department-of-veterans-affairs/formation/dist/formation.min.css'

// Loading component
const LoadingComponent = () => (
  <div className="vads-u-padding--5 vads-u-text-align--center">
    <div className="vads-loader-container">
      <div className="vads-loader vads-loader--active">
        <span className="vads-u-sr-only">Loading component preview...</span>
      </div>
    </div>
    <p className="vads-u-padding-top--3">Loading component preview...</p>
  </div>
);

function PreviewContent() {
  const searchParams = useSearchParams()
  const componentId = searchParams.get('id')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Load VA web components script
  useEffect(() => {
    // Load the web components script if it doesn't exist
    if (!document.querySelector('script[src*="component-library.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/@department-of-veterans-affairs/component-library/dist/component-library.js'
      script.async = true
      document.body.appendChild(script)
      
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script)
        }
      }
    }
    
    // Load VA CSS if not already loaded
    if (!document.querySelector('link[href*="formation"]')) {
      const formationCSS = document.createElement('link')
      formationCSS.rel = 'stylesheet'
      formationCSS.href = 'https://cdn.jsdelivr.net/npm/@department-of-veterans-affairs/formation/dist/formation.min.css'
      document.head.appendChild(formationCSS)
    }
    
    // Load VA utilities CSS if not already loaded
    if (!document.querySelector('link[href*="utilities.css"]')) {
      const utilitiesCSS = document.createElement('link')
      utilitiesCSS.rel = 'stylesheet'
      utilitiesCSS.href = 'https://cdn.jsdelivr.net/npm/@department-of-veterans-affairs/css-library/dist/stylesheets/utilities.css'
      document.head.appendChild(utilitiesCSS)
    }
  }, [])

  // Dynamically import the component based on the componentId
  const DynamicComponent = dynamic(
    () => {
      if (!componentId) {
        return Promise.resolve(() => (
          <div className="vads-u-padding--3">
            <h2 className="vads-u-font-size--h3">No component specified</h2>
            <p>Please provide a component ID in the URL.</p>
          </div>
        ))
      }
      
      return import(`@/temp-components/${componentId}`).catch(err => {
        console.error('Failed to load component:', err)
        setError('Failed to load component. Check console for details.')
        return Promise.resolve(() => (
          <div className="vads-u-padding--3">
            <div className="usa-alert usa-alert-error">
              <div className="usa-alert-body">
                <h3 className="usa-alert-heading">Component failed to load</h3>
                <p className="usa-alert-text">There was an error loading the component.</p>
              </div>
            </div>
          </div>
        ))
      })
    },
    {
      loading: () => <LoadingComponent />,
      ssr: false
    }
  )

  useEffect(() => {
    // Reset state when component ID changes
    setLoading(true)
    setError(null)
    
    // Set loading to false after a short delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [componentId])

  return (
    <div className="vads-l-grid-container vads-u-width--full vads-u-height--full vads-u-margin-x--auto vads-u-padding--0">
      <div className="vads-l-row vads-u-width--full vads-u-height--full">
        <div className="vads-l-col--12 vads-u-width--full vads-u-height--full">
          <DynamicComponent />
        </div>
      </div>
    </div>
  )
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <PreviewContent />
    </Suspense>
  )
}

