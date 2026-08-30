import type { FunnelParams } from '../types';

type Key = keyof FunnelParams;
const fields: { key: Key; label: string; hint: string; min: number; max: number; step: number; suffix: string }[] = [
  { key: 'views', label: 'Просмотры', hint: 'Входящий поток', min: 100, max: 100000, step: 100, suffix: '' },
  { key: 'commentRate', label: 'Конверсия в комментарий', hint: 'от просмотров', min: 0, max: 30, step: .1, suffix: '%' },
  { key: 'botRate', label: 'Переход в бот', hint: 'от комментариев', min: 0, max: 100, step: 1, suffix: '%' },
  { key: 'materialRate', label: 'Получение материала', hint: 'от переходов', min: 0, max: 100, step: 1, suffix: '%' },
  { key: 'purchaseRate', label: 'Конверсия в покупку', hint: 'от получивших материал', min: 0, max: 30, step: .1, suffix: '%' },
  { key: 'averageCheck', label: 'Средний чек', hint: 'за одну покупку', min: 100, max: 50000, step: 100, suffix: '₽' },
];

export function Controls({ params, onChange }: { params: FunnelParams; onChange: (key: Key, value: number) => void }) {
  return <section className="controls" aria-labelledby="controls-title">
    <div className="section-heading"><span className="eyebrow">Параметры</span><h2 id="controls-title">Настройте поток</h2></div>
    <div className="control-list">{fields.map(f => <label className="control" key={f.key}>
      <span className="control-meta"><span><b>{f.label}</b><small>{f.hint}</small></span><span className="number-input"><input aria-label={f.label} type="number" inputMode={f.step < 1 ? 'decimal' : 'numeric'} min={f.min} max={f.max} step={f.step} value={params[f.key]} onChange={e => onChange(f.key, Math.max(f.min, Math.min(f.max, Number(e.target.value))))}/><i>{f.suffix}</i></span></span>
      <input className="range" type="range" aria-label={`${f.label}, ползунок`} min={f.min} max={f.max} step={f.step} value={params[f.key]} style={{'--progress': `${(params[f.key]-f.min)/(f.max-f.min)*100}%`} as React.CSSProperties} onChange={e => onChange(f.key, Number(e.target.value))}/>
    </label>)}</div>
  </section>;
}
