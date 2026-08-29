import type { FunnelResult } from '../types';
import { fmtSales, money } from '../lib/format';
import { Copy } from 'lucide-react';

export function RevenueSummary({ result, copied, onCopy }: { result: FunnelResult; copied: boolean; onCopy: () => void }) {
  const totalConversion = result.views ? result.sales / result.views * 100 : 0;
  return <aside className="revenue">
    <span className="eyebrow">Прогнозируемая выручка</span><div className="revenue-number" key={result.revenue}>{money(result.revenue)}</div>
    <p className="sales-line">≈ {fmtSales(result.sales)} продажи</p>
    <dl className="micro-metrics"><div><dt>Общая конверсия</dt><dd>{totalConversion.toFixed(3)}%</dd></div><div><dt>На 1 000 просмотров</dt><dd>{money(result.views ? result.revenue/result.views*1000 : 0)}</dd></div></dl>
    <button className="copy-button" onClick={onCopy}><Copy size={15}/>{copied ? 'Скопировано' : 'Скопировать результаты'}</button>
  </aside>;
}
