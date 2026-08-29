import type { FunnelInputs } from '../types'
import { growthLevers, money } from '../lib/funnel'

export function GrowthLevers({ values }: { values: FunnelInputs }) {
  const levers = growthLevers(values), best = levers[0]
  return <section className="levers" aria-labelledby="levers-title">
    <div className="section-heading"><div><p className="eyebrow">Анализ потенциала</p><h2 id="levers-title">Где сейчас больше всего денег?</h2></div><p>Эффект от роста каждой конверсии на 1 п.п.</p></div>
    <div className="lever-layout"><div className="best-lever"><span>Лучший рычаг роста</span><h3>{best.label}</h3><p>{best.from}% <i>→</i> {best.to}%</p><div><small>Потенциальный прирост</small><strong>+{money(best.gain)}</strong><em>+{best.percent.toFixed(1)}% выручки</em></div></div>
      <div className="lever-list">{levers.map((lever, i) => <div className="lever-row" key={lever.key}><div className="rank">0{i + 1}</div><div><strong>{lever.label}</strong><span>{lever.from}% → {lever.to}%</span></div><div className="bar"><i style={{ width: `${best.gain ? lever.gain / best.gain * 100 : 0}%` }}/></div><b>+{money(lever.gain)}</b></div>)}</div>
    </div>
  </section>
}
