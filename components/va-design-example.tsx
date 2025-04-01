"use client"

import type React from "react"

interface VAAlertProps {
  status?: "info" | "success" | "warning" | "error"
  headline: string
  children: React.ReactNode
}

export function VAAlert({ status = "info", headline, children }: VAAlertProps) {
  const statusColors = {
    info: "bg-blue-50 border-blue-500",
    success: "bg-green-50 border-green-500",
    warning: "bg-yellow-50 border-yellow-500",
    error: "bg-red-50 border-red-500",
  }

  return (
    <div className={`border-l-4 p-4 mb-4 ${statusColors[status]}`}>
      <h2 className="font-bold text-lg mb-2">{headline}</h2>
      <div>{children}</div>
    </div>
  )
}

interface VACardProps {
  children: React.ReactNode
}

export function VACard({ children }: VACardProps) {
  return <div className="border rounded-md p-4 shadow-sm mb-4">{children}</div>
}

interface VAButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary"
  onClick?: () => void
}

export function VAButton({ children, variant = "primary", onClick }: VAButtonProps) {
  const variantClasses = {
    primary: "bg-[#0071bc] hover:bg-[#205493] text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300",
  }

  return (
    <button className={`px-4 py-2 rounded ${variantClasses[variant]}`} onClick={onClick}>
      {children}
    </button>
  )
}

interface VABreadcrumbsProps {
  items: Array<{
    label: string
    href?: string
  }>
}

export function VABreadcrumbs({ items }: VABreadcrumbsProps) {
  return (
    <nav className="text-sm mb-4" aria-label="Breadcrumb">
      <ol className="flex">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <a href={item.href} className="text-blue-600 hover:underline">
                {item.label}
              </a>
            ) : (
              <span className="text-gray-600">{item.label}</span>
            )}

            {index < items.length - 1 && (
              <svg className="h-4 w-4 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

