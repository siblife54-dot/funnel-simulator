import { describe, expect, it } from 'vitest';
import { analyzeLevers, calculateFunnel, DEFAULTS } from './funnel';
describe('funnel math', () => {
  it('does not round intermediate values', () => expect(calculateFunnel(DEFAULTS)).toEqual({ views: 10000, comments: 300, botVisits: 195, materials: 78, sales: 3.12, revenue: 9328.8 }));
  it('finds the strongest +1 pp lever', () => expect(analyzeLevers(DEFAULTS)[0].key).toBe('commentRate'));
});
