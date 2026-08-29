import type { FunnelResult } from '../types';
import { fmt, fmtSales } from '../lib/format';

export function Funnel({ result }: { result: FunnelResult }) {
  const stages = [
    ['Просмотры', result.views, fmt(result.views)], ['Комментарии', result.comments, fmt(result.comments)],
    ['Переходы в бот', result.botVisits, fmt(result.botVisits)], ['Получили материал', result.materials, fmt(result.materials)],
    ['Продажи', result.sales, fmtSales(result.sales)]
  ] as const;
  const widths = [100, 82, 65, 49, 32];
  return <section className="funnel-area" aria-labelledby="funnel-title">
    <div className="section-heading centered"><span className="eyebrow">Живая воронка</span><h2 id="funnel-title">Путь к покупке</h2></div>
    <div className="funnel-visual">{stages.map(([label, value, display], i) => <div className="funnel-stage-wrap" key={label}>
      <div className="funnel-stage" style={{ width: `${widths[i]}%`, opacity: 1-i*.1 }} data-value={value}>
        <span>{label}</span><strong key={String(value)}>{display}</strong>
      </div>{i < stages.length-1 && <span className="funnel-drop">{i === 0 ? `${(result.comments/result.views*100 || 0).toFixed(1)}%` : '↓'}</span>}
    </div>)}</div>
  </section>;
}
