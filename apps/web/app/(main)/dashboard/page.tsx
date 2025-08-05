import Image from 'next/image'
import { Card } from '@core/ui/components/card'
import { Code } from '@core/ui/code'
import styles from '@/page.module.css'
import { Button } from '@core/ui/components/button'

function Gradient({
  conic,
  className,
  small,
}: {
  small?: boolean
  conic?: boolean
  className?: string
}) {
  return (
    <span
      className={[
        styles.gradient,
        conic ? styles.glowConic : undefined,
        small ? styles.gradientSmall : styles.gradientLarge,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  )
}

const LINKS = [
  {
    title: 'Docs',
    href: 'https://turbo.build/repo/docs',
    description: 'Find in-depth information about Turborepo features and API.',
  },
  {
    title: 'Learn',
    href: 'https://turbo.build/repo/docs/handbook',
    description: 'Learn more about monorepos with our handbook.',
  },
  {
    title: 'Templates',
    href: 'https://turbo.build/repo/docs/getting-started/from-example',
    description: 'Choose from over 15 examples and deploy with a single click.',
  },
  {
    title: 'Deploy',
    href: 'https://vercel.com/new',
    description: 'Instantly deploy your Turborepo to a shareable URL with Vercel.',
  },
]

export default function DashboardPage() {
  const stats = [
    { label: 'Total Blocks', value: '3,257,080' },
    { label: 'Average Block Time', value: '1.0s' },
    { label: 'Total Transactions', value: '4,030,331' },
    { label: 'Wallet Addresses', value: '151,746' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} title={stat.label} className="p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
              {stat.value}
            </p>
          </Card>
        ))}
      </div>
    </div>
  )
}
