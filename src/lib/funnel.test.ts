import { describe, expect, it } from 'vitest'
import { calculateFunnel, DEFAULT_INPUTS, growthLevers } from './funnel'

describe('funnel calculations', () => {
  it('keeps precision through every stage', () => {
    const result = calculateFunnel(DEFAULT_INPUTS)
    expect(result.comments).toBe(300)
    expect(result.botVisits).toBe(195)
    expect(result.materials).toBe(78)
    expect(result.sales).toBeCloseTo(3.12)
    expect(result.revenue).toBeCloseTo(9328.8)
  })
  it('finds comment conversion as the best +1 pp lever', () => {
    expect(growthLevers(DEFAULT_INPUTS)[0].key).toBe('commentRate')
  })
})
