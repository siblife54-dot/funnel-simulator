import type { FunnelResult } from '../types'
import { compactNumber } from '../lib/funnel'

export function Funnel({ result }: { result: FunnelResult }) {
  const stages = [
    ['Просмотры', result.views], ['Комментарии', result.comments], ['Переходы в бот', result.botVisits],
    ['Получили материал', result.materials], ['Продажи', result.sales],
  ] as const
  return <section className="funnel-area" aria-labelledby="funnel-title">
    <div className="section-heading funnel-heading"><div><p className="eyebrow">Живой прогноз</p><h2 id="funnel-title">Путь к покупке</h2></div><span className="live"><i/> Пересчёт онлайн</span></div>
    <div className="funnel" aria-label="Визуализация воронки">{stages.map(([label, value], index) => {
      const ratio = result.views ? Math.max(value / result.views, .018) : .018
      const width = index === 0 ? 100 : Math.max(30, 28 + Math.pow(ratio, .22) * 60)
      return <div className="funnel-row" key={label}>
        <div className="funnel-segment" style={{ width: `${width}%`, '--delay': `${index * 25}ms` } as React.CSSProperties}>
          <span>{label}</span><strong>{compactNumber(value, index === 4 ? 2 : 1)}</strong>
        </div>
        {index < stages.length - 1 && <div className="connector"><span>{compactNumber(([result.commentRate, result.botRate, result.materialRate, result.purchaseRate] as number[])[index], 1)}%</span></div>}
      </div>
    })}</div>
  </section>
}
