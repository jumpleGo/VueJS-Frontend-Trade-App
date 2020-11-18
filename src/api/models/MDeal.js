export class MDeal  {
  constructor (data) {
    if (data) {
      return {
        amount: data.amount || 0,
        pair: data.pair || null,
        quote: data.quote || null,
        base: data.base || null,
        id: data._id || null,
        period: data.period || 30,
        trend: data.trend || null,
        userId: data.user || null,
        startDate: data.startDate || null,
        endDate: data.endDate || null,
        status: data.status || 'NEW',
        currentPrice: data.currentPrice || 0,
        statusWord: function (status) {
          let word
          switch (status) {
            case 'NEW':
              word = 'Новая'
              break
            case 'RETURN':
              word = 'Возврат'
              break
            case 'LOSE':
              word = 'Проигрыш'
              break
            case 'WIN':
              word = 'Выигрыш'
              break
          }
          return word
        },
        trendWord:function (trend) {
          let word
          switch (trend) {
            case 'high':
              word = 'Выше'
              break
            case 'low':
              word = 'Ниже'
              break
          }
          return word
        }
      }
    } else {
      return {
        amount: 0,
        pair: null,
        quote: null,
        base: null,
        id: null,
        period: 30,
        trend: null,
        userId: null,
        startDate: null,
        endDate: null,
        status: 'NEW',
        currentPrice: 0,
      }
    }
  }
}