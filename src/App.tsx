import { useEffect, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { Controls } from './components/Controls'
import { Funnel } from './components/Funnel'
import { GrowthLevers } from './components/GrowthLevers'
import { RevenueSummary } from './components/RevenueSummary'
import { ScenarioComparison } from './components/ScenarioComparison'
import { calculateFunnel, compactNumber, DEFAULT_INPUTS, money } from './lib/funnel'
import type { FunnelInputs, FunnelKey, RateKey } from './types'

const STORAGE_KEY = 'funnel-simulator-inputs-v1'
function loadInputs(): FunnelInputs {
  try { return { ...DEFAULT_INPUTS, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } }
  catch { return DEFAULT_INPUTS }
}

export default function App() {
  const [values, setValues] = useState(loadInputs)
  const [scenarioKey, setScenarioKey] = useState<RateKey>('botRate')
  const [scenarioValue, setScenarioValue] = useState(75)
  const [copied, setCopied] = useState(false)
  const result = calculateFunnel(values)
  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(values)), [values])
  const update = (key: FunnelKey, value: number) => setValues(prev => ({ ...prev, [key]: Number.isFinite(value) ? value : 0 }))
  const changeScenarioKey = (key: RateKey) => { setScenarioKey(key); setScenarioValue(Math.min(100, values[key] + 10)) }
  const copy = async () => {
    const text = `Воронка:\n${compactNumber(result.views)} просмотров\n${compactNumber(result.comments, 1)} комментариев\n${compactNumber(result.botVisits, 1)} переходов\n${compactNumber(result.materials, 1)} получили материал\n${compactNumber(result.sales, 2)} продажи\n\nПрогноз выручки: ${money(result.revenue)}`
    await navigator.clipboard.writeText(text); setCopied(true); window.setTimeout(() => setCopied(false), 1800)
  }
  return <>
    <header><a className="brand" href="#" aria-label="Funnel Simulator, на главную"><span>F</span><b>Funnel Simulator</b></a><div className="header-note">Маркетинговая модель</div><button className="reset" onClick={() => { setValues(DEFAULT_INPUTS); setScenarioKey('botRate'); setScenarioValue(75) }}><RotateCcw size={15}/> Сбросить</button></header>
    <main>
      <div className="page-intro"><p className="eyebrow">Симулятор автоворонки</p><h1>Увидьте, как одна цифра<br/>меняет весь результат.</h1><p>Настройте конверсии и мгновенно оцените продажи, выручку и лучший рычаг роста.</p></div>
      <div className="main-grid"><Controls values={values} onChange={update}/><Funnel result={result}/><RevenueSummary result={result} copied={copied} onCopy={copy}/></div>
      <ScenarioComparison values={values} scenarioKey={scenarioKey} scenarioValue={scenarioValue} onKey={changeScenarioKey} onValue={setScenarioValue}/>
      <GrowthLevers values={values}/>
    </main>
    <footer><span>Funnel Simulator</span><p>Все расчёты выполняются в вашем браузере.</p></footer>
  </>
}
