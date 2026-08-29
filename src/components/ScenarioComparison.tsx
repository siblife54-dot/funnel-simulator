import { ArrowRight } from 'lucide-react'
import type { FunnelInputs, RateKey } from '../types'
import { calculateFunnel, compactNumber, money, RATE_KEYS, RATE_LABELS } from '../lib/funnel'

export function ScenarioComparison({ values, scenarioKey, scenarioValue, onKey, onValue }: { values: FunnelInputs; scenarioKey: RateKey; scenarioValue: number; onKey: (v: RateKey) => void; onValue: (v: number) => void }) {
  const now = calculateFunnel(values), scenario = calculateFunnel({ ...values, [scenarioKey]: scenarioValue })
  const gain = scenario.revenue - now.revenue, percent = now.revenue ? gain / now.revenue * 100 : 0
  const stageValue = (r: ReturnType<typeof calculateFunnel>) => scenarioKey === 'commentRate' ? r.comments : scenarioKey === 'botRate' ? r.botVisits : scenarioKey === 'materialRate' ? r.materials : r.sales
  return <section className="scenario" aria-labelledby="scenario-title">
    <div className="scenario-intro"><p className="eyebrow">Что если</p><h2 id="scenario-title">Проверьте гипотезу</h2><p>Меняйте один показатель — мы покажем эффект на всей экономике.</p></div>
    <div className="scenario-workspace">
      <div className="scenario-control"><label>Показатель</label><select value={scenarioKey} onChange={e => { const key = e.target.value as RateKey; onKey(key) }}>{RATE_KEYS.map(k => <option key={k} value={k}>{RATE_LABELS[k]}</option>)}</select>
        <div className="scenario-slider-head"><span>Сейчас <b>{values[scenarioKey]}%</b></span><span>Сценарий <strong>{scenarioValue}%</strong></span></div>
        <input className="range scenario-range" style={{ '--progress': `${scenarioValue}%` } as React.CSSProperties} type="range" min="0" max="100" step="0.1" value={scenarioValue} onChange={e => onValue(Number(e.target.value))}/>
      </div>
      <div className="comparison"><div><span>Сейчас</span><strong>{compactNumber(stageValue(now), 2)}</strong><small>на выбранном этапе</small><b>{money(now.revenue)}</b></div><ArrowRight className="comparison-arrow"/><div className="scenario-result"><span>Сценарий</span><strong>{compactNumber(stageValue(scenario), 2)}</strong><small>на выбранном этапе</small><b>{money(scenario.revenue)}</b></div><div className={`gain ${gain < 0 ? 'negative' : ''}`}><span>Результат</span><strong>{gain >= 0 ? '+' : ''}{money(gain)}</strong><small>{percent >= 0 ? '+' : ''}{compactNumber(percent, 1)}% к выручке</small></div></div>
    </div>
  </section>
}
