import type { FunnelParams, FunnelResult, RateKey } from '../types';

export const DEFAULTS: FunnelParams = { views: 10000, commentRate: 3, botRate: 65, materialRate: 40, purchaseRate: 4, averageCheck: 2990 };
export const RATE_LABELS: Record<RateKey, string> = { commentRate: 'Комментарий', botRate: 'Переход в бот', materialRate: 'Получение материала', purchaseRate: 'Покупка' };

export function calculateFunnel(p: FunnelParams): FunnelResult {
  const comments = p.views * p.commentRate / 100;
  const botVisits = comments * p.botRate / 100;
  const materials = botVisits * p.materialRate / 100;
  const sales = materials * p.purchaseRate / 100;
  return { views: p.views, comments, botVisits, materials, sales, revenue: sales * p.averageCheck };
}

export function analyzeLevers(p: FunnelParams) {
  const base = calculateFunnel(p).revenue;
  return (Object.keys(RATE_LABELS) as RateKey[]).map(key => {
    const next = Math.min(100, p[key] + 1);
    return { key, label: RATE_LABELS[key], from: p[key], to: next, gain: calculateFunnel({ ...p, [key]: next }).revenue - base };
  }).sort((a, b) => b.gain - a.gain);
}
