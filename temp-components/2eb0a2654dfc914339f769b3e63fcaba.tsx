
// Component ID: 2eb0a2654dfc914339f769b3e63fcaba
import React from 'react';
import { VaButton, VaAlert, VaHeader, VaFooter, VaContentContainer } from '@department-of-veterans-affairs/component-library/dist/react-bindings';

const LandingPage: React.FC = () => {
  return (
    <div>
      <VaHeader />

      <VaContentContainer>
        <h1 className="vads-u-font-size--h1 vads-u-margin-bottom--2">Welcome to the VA Landing Page</h1>
        <p className="va-introtext vads-u-margin-bottom--4">
          This is a sample landing page using VA components and design system guidelines.
        </p>

        <VaAlert
          status="info"
          visible
          uswds
          headline="Important Update"
          className="vads-u-margin-bottom--4"
        >
          <p>Please be aware of the latest updates and changes to our services.</p>
        </VaAlert>

        <div className="vads-l-grid-container vads-u-margin-bottom--4">
          <div className="vads-l-row">
            <div className="vads-l-col--12">
              <VaButton
                text="Learn More"
                onClick={() => console.log('Learn More clicked')}
                uswds
                className="vads-u-margin-right--2"
              />
              <VaButton
                text="Get Started"
                onClick={() => console.log('Get Started clicked')}
                uswds
                primary
              />
            </div>
          </div>
        </div>
      </VaContentContainer>

      <VaFooter />
    </div>
  );
};

/* Original export removed */ const ExportedComponent = LandingPage;

// Export the enhanced version
export default function EnhancedVAComponent(props) {
  // Use the component name extracted earlier
  const ComponentToRender = LandingPage;
  
  // Add script to load VA component library
  React.useEffect(() => {
    // Load VA CSS if not already loaded
    if (!document.querySelector('link[href*="formation"]')) {
      const formationCSS = document.createElement('link');
      formationCSS.rel = 'stylesheet';
      formationCSS.href = 'https://cdn.jsdelivr.net/npm/@department-of-veterans-affairs/formation/dist/formation.min.css';
      document.head.appendChild(formationCSS);
    }
    
    // Load VA utilities CSS if not already loaded
    if (!document.querySelector('link[href*="utilities.css"]')) {
      const utilitiesCSS = document.createElement('link');
      utilitiesCSS.rel = 'stylesheet';
      utilitiesCSS.href = 'https://cdn.jsdelivr.net/npm/@department-of-veterans-affairs/css-library/dist/stylesheets/utilities.css';
      document.head.appendChild(utilitiesCSS);
    }
    
    // Load the web components script if it doesn't exist
    if (!document.querySelector('script[src*="component-library.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@department-of-veterans-affairs/component-library/dist/component-library.js';
      script.async = true;
      document.body.appendChild(script);
      
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, []);
  
  // Ensure the component exists before rendering
  if (typeof ComponentToRender !== 'function') {
    console.error(`Component LandingPage is not a function`, ComponentToRender);
    return <div className="vads-u-padding--2 vads-u-background-color--error-lightest vads-u-color--error-dark">
      Component could not be loaded. See console for details.
    </div>;
  }
  
  try {
    return (
      <div className="vads-l-grid-container vads-u-padding-x--2p5 vads-u-padding-bottom--4">
        <div className="vads-l-row">
          <div className="vads-l-col--12">
            <ComponentToRender {...props} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering component:', error);
    return <div className="vads-u-padding--2 vads-u-background-color--error-lightest vads-u-color--error-dark">
      Error rendering component: {error.message}
    </div>;
  }
}