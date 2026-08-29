export type FunnelParams = {
  views: number; commentRate: number; botRate: number; materialRate: number; purchaseRate: number; averageCheck: number;
};
export type RateKey = 'commentRate' | 'botRate' | 'materialRate' | 'purchaseRate';
export type FunnelResult = { views: number; comments: number; botVisits: number; materials: number; sales: number; revenue: number };
