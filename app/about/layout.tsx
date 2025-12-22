import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Root System',
  description: "We're a team of founders and startup veterans who love supporting early-stage founders and their teams.",
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
