import type { FunnelInputs, FunnelResult, RateKey } from '../types'

export const DEFAULT_INPUTS: FunnelInputs = {
  views: 10000, commentRate: 3, botRate: 65, materialRate: 40, purchaseRate: 4, averageCheck: 2990,
}

export const calculateFunnel = (input: FunnelInputs): FunnelResult => {
  const comments = input.views * input.commentRate / 100
  const botVisits = comments * input.botRate / 100
  const materials = botVisits * input.materialRate / 100
  const sales = materials * input.purchaseRate / 100
  const revenue = sales * input.averageCheck
  return { ...input, comments, botVisits, materials, sales, revenue,
    totalConversion: input.views ? sales / input.views * 100 : 0,
    revenuePerThousand: input.views ? revenue / input.views * 1000 : 0,
  }
}

export const RATE_KEYS: RateKey[] = ['commentRate', 'botRate', 'materialRate', 'purchaseRate']
export const RATE_LABELS: Record<RateKey, string> = {
  commentRate: 'Конверсия в комментарий', botRate: 'Переход в бот',
  materialRate: 'Получение материала', purchaseRate: 'Покупка',
}

export const growthLevers = (input: FunnelInputs) => {
  const current = calculateFunnel(input).revenue
  return RATE_KEYS.map(key => {
    const next = Math.min(100, input[key] + 1)
    const result = calculateFunnel({ ...input, [key]: next })
    return { key, label: RATE_LABELS[key], from: input[key], to: next, gain: result.revenue - current,
      percent: current ? (result.revenue - current) / current * 100 : 0 }
  }).sort((a, b) => b.gain - a.gain)
}

export const compactNumber = (value: number, digits = 0) => new Intl.NumberFormat('ru-RU', {
  maximumFractionDigits: digits, minimumFractionDigits: value > 0 && value < 10 ? Math.min(2, digits) : 0,
}).format(value)
export const money = (value: number) => `${new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(value)} ₽`
