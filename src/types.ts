export type FunnelKey = 'views' | 'commentRate' | 'botRate' | 'materialRate' | 'purchaseRate' | 'averageCheck'
export type RateKey = Exclude<FunnelKey, 'views' | 'averageCheck'>

export interface FunnelInputs {
  views: number
  commentRate: number
  botRate: number
  materialRate: number
  purchaseRate: number
  averageCheck: number
}

export interface FunnelResult extends FunnelInputs {
  comments: number
  botVisits: number
  materials: number
  sales: number
  revenue: number
  totalConversion: number
  revenuePerThousand: number
}
