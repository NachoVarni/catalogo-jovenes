import { ReactNode } from "react"

export function PageHeader({ children }: { children: ReactNode }) {
  return <h1 className="text-blue text-4xl mb-4">{children}</h1>
}