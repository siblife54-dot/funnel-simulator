import { Check, Copy } from 'lucide-react'
import { compactNumber, money } from '../lib/funnel'
import type { FunnelResult } from '../types'

export function RevenueSummary({ result, copied, onCopy }: { result: FunnelResult; copied: boolean; onCopy: () => void }) {
  return <section className="revenue-summary" aria-label="Финансовый результат">
    <div><p>Прогнозируемая выручка</p><div className="revenue-number" key={Math.round(result.revenue)}>{money(result.revenue)}</div><span>≈ {compactNumber(result.sales, 2)} продажи</span></div>
    <div className="summary-metrics"><div><span>Общая конверсия</span><strong>{compactNumber(result.totalConversion, 3)}%</strong></div><div><span>Доход на 1 000 просмотров</span><strong>{money(result.revenuePerThousand)}</strong></div></div>
    <button className="text-button" onClick={onCopy}>{copied ? <Check size={16}/> : <Copy size={16}/>} {copied ? 'Скопировано' : 'Скопировать результат'}</button>
  </section>
}
