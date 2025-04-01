"use client"

import Link from "next/link"

interface BreadcrumbItem {
  href: string
  label: string
  current?: boolean
}

interface VABreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function VABreadcrumbs({ items }: VABreadcrumbsProps) {
  return (
    <nav className="va-breadcrumbs" aria-label="Breadcrumb">
      <ul className="row va-nav-breadcrumbs-list columns">
        {items.map((item, index) => (
          <li key={index} className={item.current ? "current-page" : ""}>
            {item.current ? <span>{item.label}</span> : <Link href={item.href}>{item.label}</Link>}
          </li>
        ))}
      </ul>
    </nav>
  )
}

