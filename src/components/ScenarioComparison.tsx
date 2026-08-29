import type { FunnelParams, FunnelResult, RateKey } from '../types';
import { calculateFunnel, RATE_LABELS } from '../lib/funnel';
import { fmt, fmtSales, money } from '../lib/format';

const keys = Object.keys(RATE_LABELS) as RateKey[];
export function ScenarioComparison({ params, current, selected, value, onSelected, onValue }: { params: FunnelParams; current: FunnelResult; selected: RateKey; value: number; onSelected: (k: RateKey) => void; onValue: (n: number) => void }) {
  const scenario = calculateFunnel({ ...params, [selected]: value });
  const gain = scenario.revenue-current.revenue;
  const percent = current.revenue ? gain/current.revenue*100 : 0;
  return <section className="scenario" aria-labelledby="scenario-title">
    <div className="scenario-intro"><span className="eyebrow">Режим «Что если»</span><h2 id="scenario-title">Поиграйте с экономикой</h2><p>Выберите конверсию и проверьте гипотезу, не меняя текущую модель.</p>
      <select value={selected} onChange={e => onSelected(e.target.value as RateKey)} aria-label="Показатель сценария">{keys.map(k => <option value={k} key={k}>{RATE_LABELS[k]}</option>)}</select>
      <div className="scenario-slider-head"><span>Сейчас <b>{params[selected]}%</b></span><span>Сценарий <b>{value}%</b></span></div>
      <input className="range scenario-range" aria-label="Значение сценария" type="range" min="0" max="100" step="0.1" value={value} style={{'--progress': `${value}%`} as React.CSSProperties} onChange={e => onValue(Number(e.target.value))}/>
    </div>
    <div className="comparison"><div className="comparison-column muted"><h3>Сейчас</h3><b>{fmt(current.botVisits)} переходов</b><span>{fmtSales(current.sales)} продажи</span><strong>{money(current.revenue)}</strong></div><div className="comparison-arrow">→</div><div className="comparison-column"><h3>Сценарий</h3><b>{fmt(scenario.botVisits)} переходов</b><span>{fmtSales(scenario.sales)} продажи</span><strong>{money(scenario.revenue)}</strong></div><div className={`delta ${gain < 0 ? 'negative' : ''}`}><span>Изменение выручки</span><strong>{gain >= 0 ? '+' : '−'}{money(Math.abs(gain))}</strong><b>{percent >= 0 ? '+' : ''}{percent.toFixed(1)}%</b></div></div>
  </section>;
}
