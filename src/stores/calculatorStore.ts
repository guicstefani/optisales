import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { VMConfig, CalculationResult } from '@/utils/calculator/formulas'

export interface SavedCalculation {
  id: string
  clientName: string
  config: VMConfig
  result: CalculationResult
  createdAt: string
}

interface CalculatorStore {
  history: SavedCalculation[]
  addToHistory: (calc: Omit<SavedCalculation, 'id' | 'createdAt'>) => void
  clearHistory: () => void
}

export const useCalculatorStore = create<CalculatorStore>()(
  persist(
    (set) => ({
      history: [],
      
      addToHistory: (calc) => set((state) => ({
        history: [
          {
            ...calc,
            id: Date.now().toString(),
            createdAt: new Date().toISOString()
          },
          ...state.history
        ].slice(0, 50)
      })),
      
      clearHistory: () => set({ history: [] })
    }),
    {
      name: 'calculator-storage'
    }
  )
)
