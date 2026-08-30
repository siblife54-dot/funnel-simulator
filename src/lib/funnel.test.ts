import { describe, expect, it } from 'vitest';
import { analyzeLevers, calculateFunnel, DEFAULTS } from './funnel';
describe('funnel math', () => {
  it('does not round intermediate values', () => {
    const result = calculateFunnel(DEFAULTS);
    expect(result).toMatchObject({ views: 10000, comments: 300, botVisits: 195, materials: 78, sales: 3.12 });
    expect(result.revenue).toBeCloseTo(9328.8, 10);
  });
  it('finds the strongest +1 pp lever', () => expect(analyzeLevers(DEFAULTS)[0].key).toBe('commentRate'));
});
