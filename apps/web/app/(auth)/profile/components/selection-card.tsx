import { cn } from '@core/ui/lib/utils'

type SelectionCardProps = {
  title: string
  isSelected?: boolean
  onClick: () => void
  icon?: string
  className?: string
}

export function SelectionCard({
  title,
  isSelected = false,
  onClick,
  icon,
  className,
}: SelectionCardProps) {
  return (
    <div
      className={cn(
        'p-4 rounded-lg border-2 cursor-pointer transition-all duration-200',
        'flex flex-col items-center justify-center gap-2',
        isSelected ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-white',
        className
      )}
      onClick={onClick}
    >
      {icon && <span className="text-3xl mb-2">{icon}</span>}
      <h3 className="text-lg font-medium">{title}</h3>
    </div>
  )
}
