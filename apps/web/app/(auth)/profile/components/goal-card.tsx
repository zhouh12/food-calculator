import { cn } from '@ui/lib/utils'

type GoalCardProps = {
  title: string
  description: string
  icon: string
  isSelected: boolean
  onClick: () => void
}

export function GoalCard({ title, description, icon, isSelected, onClick }: GoalCardProps) {
  return (
    <div
      className={cn(
        'p-4 rounded-lg border-2 cursor-pointer transition-all duration-200',
        'flex items-center gap-4 mb-3',
        isSelected ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-white'
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          'w-12 h-12 flex items-center justify-center rounded-full',
          isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
        )}
      >
        <span className="text-xl">{icon}</span>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  )
}
