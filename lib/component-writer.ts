import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { mkdirSync } from 'fs'

// Directory for temporary components
const TEMP_DIR = path.join(process.cwd(), 'temp-components')

// Ensure temp directory exists
try {
  if (!fs.existsSync(TEMP_DIR)) {
    mkdirSync(TEMP_DIR, { recursive: true })
  }
} catch (error) {
  console.error('Error creating temp directory:', error)
}

/**
 * Write a React component to a temporary file
 * @param code The React component code to write
 * @returns The component ID (filename without extension)
 */
export async function writeComponentToFile(code: string): Promise<string> {
  // Generate a unique ID for the component
  const componentId = crypto.randomBytes(16).toString('hex')
  
  // Prepare enhanced component code with necessary imports
  const enhancedCode = prepareComponentCode(code, componentId)
  
  // Write the component to file
  const filePath = path.join(TEMP_DIR, `${componentId}.tsx`)
  
  try {
    await fs.promises.writeFile(filePath, enhancedCode)
    return componentId
  } catch (error) {
    console.error('Error writing component file:', error)
    throw error
  }
}

/**
 * Prepare the component code for rendering
 * @param code The original React component code
 * @param componentId The unique component ID
 * @returns Enhanced component code with necessary imports
 */
function prepareComponentCode(code: string, componentId: string): string {
  // Check if the code already has all the imports it needs
  const hasReactImport = code.includes("import React") 
  const hasComponentLibImport = code.includes("@department-of-veterans-affairs/component-library")
  
  // Add imports for VA components based on what's used in the code
  const vaComponents = {
    VaHeader: code.includes('VaHeader'),
    VaFooter: code.includes('VaFooter'),
    VaContentContainer: code.includes('VaContentContainer'),
    VaAlert: code.includes('VaAlert'),
    VaButton: code.includes('VaButton'),
    VaAccordion: code.includes('VaAccordion'),
    VaAccordionItem: code.includes('VaAccordionItem'),
    VaCheckbox: code.includes('VaCheckbox'),
    VaRadio: code.includes('VaRadio'),
    VaTextInput: code.includes('VaTextInput'),
    VaTextarea: code.includes('VaTextarea'),
    VaSelect: code.includes('VaSelect'),
  };
  
  // Add missing imports
  let enhancedCode = code;
  
  if (!hasReactImport) {
    enhancedCode = `import React from 'react';\n${enhancedCode}`
  }
  
  if (!hasComponentLibImport) {
    enhancedCode = `import '@department-of-veterans-affairs/component-library/dist/main.css';\n${enhancedCode}`
  }
  
  // Add imports for any VA components being used
  const componentsNeeded = Object.entries(vaComponents)
    .filter(([_, isUsed]) => isUsed)
    .map(([name]) => name);
    
  if (componentsNeeded.length > 0) {
    // Create a simple imports section at the top that handles all common VA components
    enhancedCode = `// Standard imports 
import React from 'react';
import '@department-of-veterans-affairs/component-library/dist/main.css';
import '@department-of-veterans-affairs/formation/dist/formation.min.css';

// VA Components - imported directly to avoid case sensitivity issues
import { VAHeader } from '@/components/va-specific/va-header';
import { VAFooter } from '@/components/va-specific/va-footer';
import { VAContentContainer } from '@/components/va-specific/va-content-container';
import { 
  VaAlert, 
  VaButton, 
  VaAccordion,
  VaAccordionItem,
  VaTextInput,
  VaTextarea,
  VaCheckbox,
  VaRadio,
  VaSelect
} from '@department-of-veterans-affairs/component-library/dist/react-bindings';

// VA component aliases to handle case inconsistencies
const VaHeader = VAHeader;
const VaFooter = VAFooter;
const VaContentContainer = VAContentContainer;

${enhancedCode.replace(/^import.*$/gm, '// Original imports removed')}`;
  }
  
  // Modify any component usage to match our imports
  enhancedCode = enhancedCode
    .replace(/<VaHeader/g, '<VAHeader')
    .replace(/<\/VaHeader>/g, '</VAHeader>')
    .replace(/<VaFooter/g, '<VAFooter')
    .replace(/<\/VaFooter>/g, '</VAFooter>')
    .replace(/<VaContentContainer/g, '<VAContentContainer')
    .replace(/<\/VaContentContainer>/g, '</VAContentContainer>');
  
  // Extract component name before modifying the code
  const componentName = getComponentName(enhancedCode);
  
  // Remove all forms of export default statements
  // This is a more thorough approach that handles multiple patterns
  enhancedCode = enhancedCode
    // Handle: export default function Name() {
    .replace(/export\s+default\s+function\s+([A-Za-z0-9_]+)/g, 'function $1')
    // Handle: export default class Name {
    .replace(/export\s+default\s+class\s+([A-Za-z0-9_]+)/g, 'class $1')
    // Handle: export default const Name =
    .replace(/export\s+default\s+const\s+([A-Za-z0-9_]+)/g, 'const $1')
    // Handle: export default Name
    .replace(/export\s+default\s+([A-Za-z0-9_]+)/g, '/* Original export removed */ const ExportedComponent = $1')
    // Handle any other form of export default
    .replace(/export\s+default\s+/g, '// ');
  
  // Wrap the component in VA design system wrapper
  enhancedCode = `
// Component ID: ${componentId}
${enhancedCode}

// Export the enhanced version
export default function EnhancedVAComponent(props) {
  // Use the component name extracted earlier
  const ComponentToRender = ${componentName};
  
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
    console.error(\`Component ${componentName} is not a function\`, ComponentToRender);
    return <div className="vads-u-padding--2 vads-u-background-color--error-lightest vads-u-color--error-dark">
      Component could not be loaded. See console for details.
    </div>;
  }
  
  try {
    // Render directly without any wrapper containers that might interfere with layout
    return <ComponentToRender {...props} />;
  } catch (error) {
    console.error('Error rendering component:', error);
    return <div className="vads-u-padding--2 vads-u-background-color--error-lightest vads-u-color--error-dark">
      Error rendering component: {error.message}
    </div>;
  }
}`;
  
  return enhancedCode;
}

/**
 * Extract the component name from the code
 */
function getComponentName(code: string): string {
  // Check for function component syntax: function ComponentName() or const ComponentName = () =>
  const functionMatch = code.match(/(?:function|const)\s+([A-Z][A-Za-z0-9_]*)/);
  if (functionMatch && functionMatch[1]) {
    return functionMatch[1];
  }
  
  // Check for default export syntax
  const defaultExportMatch = code.match(/export\s+default\s+(?:function\s+)?([A-Z][A-Za-z0-9_]*)/);
  if (defaultExportMatch && defaultExportMatch[1]) {
    return defaultExportMatch[1];
  }
  
  // Default to a generic component name
  return "Component";
}

/**
 * Clean up temporary component files
 * @param keepLast Number of recent files to keep (default 10)
 */
export async function cleanupComponentFiles(keepLast: number = 10): Promise<void> {
  try {
    const files = await fs.promises.readdir(TEMP_DIR)
    
    // Skip if there are fewer files than the keepLast value
    if (files.length <= keepLast) return
    
    // Sort files by creation time (oldest first)
    const filePaths = files
      .filter(file => file.endsWith('.tsx'))
      .map(file => {
        const filePath = path.join(TEMP_DIR, file)
        const stats = fs.statSync(filePath)
        return { path: filePath, ctime: stats.ctime }
      })
      .sort((a, b) => a.ctime.getTime() - b.ctime.getTime())
    
    // Delete older files
    const filesToDelete = filePaths.slice(0, filePaths.length - keepLast)
    for (const file of filesToDelete) {
      await fs.promises.unlink(file.path)
    }
  } catch (error) {
    console.error('Error cleaning up component files:', error)
  }
}