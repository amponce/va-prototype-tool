import React from "react";
import { VAStylesProvider } from "@/app/va-styles";
import { VAContentContainer } from "@/components/va-specific/va-content-container";
import { VaButton, VaAlert } from "@department-of-veterans-affairs/component-library/dist/react-bindings";
import "@department-of-veterans-affairs/component-library/dist/main.css";

export default function LandingPage() {
  return (
    <VAStylesProvider>
      <VAContentContainer>
        <header className="vads-u-padding--2 vads-u-background-color--primary-darkest vads-u-color--white">
          <h1>Welcome to the VA Landing Page</h1>
        </header>
        <main className="vads-u-padding--2">
          <VaAlert status="info" visible uswds>
            <h2 slot="headline">Welcome to Our Service</h2>
            <p>We are committed to providing the best service for our veterans.</p>
          </VaAlert>
          <div className="vads-u-margin-top--2">
            <VaButton text="Get Started" uswds />
          </div>
        </main>
      </VAContentContainer>
    </VAStylesProvider>
  );
}