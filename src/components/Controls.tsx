import type { FunnelInputs, FunnelKey } from '../types'

const controls: { key: FunnelKey; label: string; hint: string; min: number; max: number; step: number; suffix: string }[] = [
  { key: 'views', label: 'Просмотры', hint: 'Входящий охват', min: 0, max: 100000, step: 100, suffix: '' },
  { key: 'commentRate', label: 'В комментарий', hint: 'От просмотров', min: 0, max: 20, step: .1, suffix: '%' },
  { key: 'botRate', label: 'Переход в бот', hint: 'От комментариев', min: 0, max: 100, step: 1, suffix: '%' },
  { key: 'materialRate', label: 'Получили материал', hint: 'От переходов', min: 0, max: 100, step: 1, suffix: '%' },
  { key: 'purchaseRate', label: 'Покупка', hint: 'От получивших материал', min: 0, max: 30, step: .1, suffix: '%' },
  { key: 'averageCheck', label: 'Средний чек', hint: 'Стоимость продукта', min: 0, max: 50000, step: 100, suffix: '₽' },
]

export function Controls({ values, onChange }: { values: FunnelInputs; onChange: (key: FunnelKey, value: number) => void }) {
  return <section className="controls" aria-labelledby="controls-title">
    <div className="section-heading"><div><p className="eyebrow">Параметры</p><h2 id="controls-title">Настройте воронку</h2></div></div>
    <div className="control-list">{controls.map(c => {
      const progress = (values[c.key] - c.min) / (c.max - c.min) * 100
      return <div className="control" key={c.key}>
        <div className="control-top"><div><label htmlFor={c.key}>{c.label}</label><span>{c.hint}</span></div>
          <div className="number-wrap"><input id={c.key} className="number-input" type="number" value={values[c.key]} min={c.min} max={c.max} step={c.step}
            onChange={e => onChange(c.key, Math.max(c.min, Math.min(c.max, Number(e.target.value))))}/><b>{c.suffix}</b></div>
        </div>
        <input className="range" style={{ '--progress': `${progress}%` } as React.CSSProperties} aria-label={`${c.label}, ползунок`} type="range" value={values[c.key]} min={c.min} max={c.max} step={c.step} onChange={e => onChange(c.key, Number(e.target.value))}/>
      </div>
    })}</div>
  </section>
}
