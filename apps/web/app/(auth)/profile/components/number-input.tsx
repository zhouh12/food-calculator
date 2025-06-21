import { cn } from '@core/ui/lib/utils'
import { ChevronRight, ChevronLeft } from 'lucide-react'

type NumberInputProps = {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  unit?: string
  className?: string
}

export function NumberInput({
  value,
  onChange,
  min = 0,
  max = 1000,
  step = 1,
  unit,
  className,
}: NumberInputProps) {
  const increment = () => {
    if (value + step <= max) {
      onChange(value + step)
    }
  }

  const decrement = () => {
    if (value - step >= min) {
      onChange(value - step)
    }
  }

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="flex items-center justify-center w-full">
        <button
          type="button"
          onClick={decrement}
          disabled={value <= min}
          className="h-12 w-12 flex items-center justify-center rounded-l-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="h-12 px-4 flex items-center justify-center bg-white border-y border-gray-200 min-w-[100px] text-center">
          <span className="text-2xl font-medium">{value}</span>
          {unit && <span className="ml-1 text-gray-500">{unit}</span>}
        </div>
        <button
          type="button"
          onClick={increment}
          disabled={value >= max}
          className="h-12 w-12 flex items-center justify-center rounded-r-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}
