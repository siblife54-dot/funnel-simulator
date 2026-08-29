import { useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { Controls } from './components/Controls';
import { Funnel } from './components/Funnel';
import { RevenueSummary } from './components/RevenueSummary';
import { ScenarioComparison } from './components/ScenarioComparison';
import { GrowthLevers } from './components/GrowthLevers';
import { calculateFunnel, DEFAULTS } from './lib/funnel';
import { fmt, fmtSales, money } from './lib/format';
import type { FunnelParams, RateKey } from './types';

const STORAGE_KEY = 'funnel-simulator:params';
function loadParams(): FunnelParams { try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }; } catch { return DEFAULTS; } }
export default function App() {
  const [params, setParams] = useState(loadParams); const [selected, setSelected] = useState<RateKey>('botRate'); const [scenario, setScenario] = useState(75); const [copied, setCopied] = useState(false);
  const result = calculateFunnel(params);
  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(params)), [params]);
  const chooseScenario = (key: RateKey) => { setSelected(key); setScenario(Math.min(100, params[key]+10)); };
  const copy = async () => { const text = `Воронка:\n${fmt(result.views)} просмотров\n${fmt(result.comments)} комментариев\n${fmt(result.botVisits)} переходов\n${fmt(result.materials)} получили материал\n${fmtSales(result.sales)} продажи\n\nПрогноз выручки: ${money(result.revenue)}`; await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800); };
  return <><header><a className="brand" href="#top" aria-label="Funnel Simulator"><span className="brand-mark">F</span><span>Funnel <b>Simulator</b></span></a><button className="reset" onClick={() => setParams(DEFAULTS)}><RotateCcw size={15}/>Сбросить</button></header>
    <main id="top"><div className="intro"><span className="eyebrow">Маркетинговая модель</span><h1>От просмотра до выручки.</h1><p>Меняйте один показатель — и сразу смотрите, как перестраивается вся воронка.</p></div>
      <div className="workspace"><Controls params={params} onChange={(key, value) => setParams(p => ({ ...p, [key]: value }))}/><Funnel result={result}/><RevenueSummary result={result} copied={copied} onCopy={copy}/></div>
      <ScenarioComparison params={params} current={result} selected={selected} value={scenario} onSelected={chooseScenario} onValue={setScenario}/><GrowthLevers params={params}/>
    </main><footer><span>Funnel Simulator</span><span>Все расчёты выполняются локально</span></footer></>;
}
