"use client"

import React from 'react';
import { VAHeader } from './va-header';
import { VAFooter } from './va-footer';
import { VAContentContainer } from './va-content-container';
import { VaButton } from '@department-of-veterans-affairs/component-library/dist/react-bindings';

export function LandingPageExample() {
  return (
    <div className="vads-u-width--full vads-u-display--flex vads-u-flex-direction--column">
      <VAHeader />
      
      <main className="vads-u-flex--1">
        <VAContentContainer>
          <h1 className="vads-u-font-size--h1 vads-u-margin-bottom--2">Welcome to the VA Landing Page</h1>
          
          <p className="vads-u-margin-bottom--4">
            This is a sample landing page following VA design guidelines.
          </p>
          
          <div className="vads-u-background-color--gray-lightest vads-u-padding--4 vads-u-margin-bottom--4">
            <h2 className="vads-u-font-size--h2 vads-u-margin-top--0 vads-u-margin-bottom--2">About Us</h2>
            <p className="vads-u-margin-bottom--3">
              We are committed to providing the best services to our veterans. Our mission is to ensure that veterans receive the care and support they deserve.
            </p>
          </div>
          
          <div className="vads-u-background-color--gray-lightest vads-u-padding--4 vads-u-margin-bottom--4">
            <h2 className="vads-u-font-size--h2 vads-u-margin-top--0 vads-u-margin-bottom--2">Services</h2>
            <p className="vads-u-margin-bottom--3">
              Our services include healthcare, benefits, and support for veterans and their families. We strive to offer comprehensive solutions tailored to individual needs.
            </p>
          </div>
          
          <VaButton 
            text="Learn More" 
            onClick={() => {
              alert('More information coming soon!');
            }}
            data-uswds="true"
          />
        </VAContentContainer>
      </main>
      
      <VAFooter />
    </div>
  );
} 