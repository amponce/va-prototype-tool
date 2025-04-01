import type React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'va-alert': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        status?: string;
        visible?: boolean;
        uswds?: boolean;
        headline?: string;
        'disable-analytics'?: boolean; // Added based on potential usage
        'close-btn-aria-label'?: string; // Added based on potential usage
        'full-width'?: boolean; // Added based on potential usage
        'show-icon'?: boolean; // Added based on potential usage
        'slim'?: boolean; // Added based on potential usage
        'role'?: string; // Added based on potential usage
      }, HTMLElement>;
      'va-text-input': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        label?: string;
        name?: string;
        value?: string;
        onInput?: (event: any) => void; // Consider using a more specific type if the event structure is known
        uswds?: boolean;
        required?: boolean; // Added based on potential usage
        error?: string; // Added based on potential usage
        'message-aria-describedby'?: string; // Added based on potential usage
        type?: string; // Added based on potential usage (e.g., 'password', 'email')
        maxlength?: string | number; // Added based on potential usage
        charcount?: boolean; // Added based on potential usage
        pattern?: string; // Added based on potential usage
        inputmode?: string; // Added based on potential usage
        autocomplete?: string; // Added based on potential usage
        'enable-analytics'?: boolean; // Added based on potential usage
        width?: string; // Added based on potential usage
      }, HTMLElement>;
      'va-button': React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement> & { // Changed base attributes to ButtonHTMLAttributes
        text?: string;
        // onClick is part of ButtonHTMLAttributes
        // disabled is part of ButtonHTMLAttributes
        uswds?: boolean;
        secondary?: boolean; // Added based on potential usage
        big?: boolean; // Added based on potential usage
        back?: boolean; // Added based on potential usage
        'continue'?: boolean; // Added based on potential usage
        label?: string; // Added based on potential usage (alternative to text)
        'disable-analytics'?: boolean; // Added based on potential usage
        submit?: boolean; // Added based on potential usage
        type?: 'button' | 'submit' | 'reset'; // Added based on potential usage, aligned with standard button types
      }, HTMLButtonElement>; // Changed element type to HTMLButtonElement
    }
  }
}

// This export statement makes the file a module, which can sometimes be necessary.
export {}; 