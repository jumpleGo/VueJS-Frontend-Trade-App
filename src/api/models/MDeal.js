export class MDeal  {
  constructor (data) {
    if (data) {
      return {
        amount: data.amount || 0,
        pair: data.pair || null,
        id: data._id || null,
        period: data.period || 30,
        trend: data.trend || null,
        userId: data.user || null,
        startDate: data.startDate || null,
        endDate: data.endDate || null,
        status: data.status || 'NEW',
        currentPrice: data.currentPrice || 0
      }
    } else {
      return {
        amount: 0,
        pair: null,
        id: null,
        period: 30,
        trend: null,
        userId: null,
        startDate: null,
        endDate: null,
        status: 'NEW',
        currentPrice: 0
      }
    }
  }
}