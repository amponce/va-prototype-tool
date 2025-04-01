"use client"

import { useRef, useEffect } from "react"

interface VACodeEditorProps {
  code: string
  onChange: (code: string) => void
}

export function VACodeEditor({ code, onChange }: VACodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize the textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [code])

  return (
    <div className="vads-l-grid-container">
      <div className="vads-l-row">
        <div className="vads-l-col--12">
          <div className="vads-u-margin-bottom--2 vads-u-font-size--sm vads-u-color--gray-medium">
            Edit the code below to modify the component:
          </div>
          <div className="vads-u-border--1px vads-u-border-color--gray-light vads-u-border-radius--md vads-u-position--relative vads-u-overflow--hidden">
            <div className="vads-u-position--absolute vads-u-top--0 vads-u-left--0 vads-u-width--10 vads-u-height--full vads-u-background-color--gray-lightest vads-u-border-right--1px vads-u-border-color--gray-light"></div>
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => onChange(e.target.value)}
              className="vads-u-width--full vads-u-min-height--30 vads-u-padding--2 vads-u-padding-left--5 vads-u-font-family--mono vads-u-font-size--sm vads-u-background-color--gray-dark vads-u-color--white"
              spellCheck="false"
              style={{
                lineHeight: 1.5,
                tabSize: 2,
                resize: "none",
                border: "none",
                outline: "none",
              }}
            />
            <div className="vads-u-position--absolute vads-u-top--0 vads-u-left--0 vads-u-width--10 vads-u-height--full vads-u-pointer-events--none">
              {code.split("\n").map((_, i) => (
                <div
                  key={i}
                  className="vads-u-text-align--right vads-u-padding-right--1 vads-u-color--gray-medium vads-u-font-size--xs"
                  style={{ lineHeight: 1.5, height: "1.5em" }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
          <div className="vads-u-margin-top--2 vads-u-font-size--sm vads-u-color--gray-medium">
            Note: This is a simplified code editor. In a production environment, you would use a more robust solution
            like Monaco Editor or CodeMirror.
          </div>
        </div>
      </div>
    </div>
  )
}

