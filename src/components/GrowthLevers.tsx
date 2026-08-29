import type { FunnelParams } from '../types';
import { analyzeLevers } from '../lib/funnel';
import { money } from '../lib/format';

export function GrowthLevers({ params }: { params: FunnelParams }) {
  const levers = analyzeLevers(params), best = levers[0];
  return <section className="levers" aria-labelledby="levers-title"><div className="lever-heading"><span className="eyebrow">Анализ рычагов</span><h2 id="levers-title">Где сейчас больше всего денег?</h2><p>Прирост выручки при увеличении показателя на 1 процентный пункт.</p></div>
    <div className="best-lever"><span>Лучший рычаг роста</span><h3>{best.label}</h3><p>{best.from}% → {best.to}%</p><strong>+{money(best.gain)}</strong></div>
    <div className="lever-list">{levers.map((l, i) => <div className="lever-row" key={l.key}><span className="lever-rank">0{i+1}</span><span><b>{l.label}</b><small>{l.from}% → {l.to}%</small></span><strong>+{money(l.gain)}</strong></div>)}</div>
  </section>;
}
