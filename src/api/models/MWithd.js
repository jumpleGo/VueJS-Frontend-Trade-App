export class MWithd  {
  constructor (data) {
    if (data) {
      return {
        amount: data.amount || 0,
        id: data._id || null,
        userId: data.user || null,
        date: data.date || null,
        status: data.status || 'NEW',
        card: data.card || null,
        type: data.type || 'Card',
        statusWord: function (status) {
          let word
          switch (status) {
            case 'NEW':
              word = 'Новая'
              break
            case 'CANCELED':
              word = 'Отменена'
              break
            case 'COMPLETED':
              word = 'Завершена'
              break
          }
          return word
        },
      }
    } else {
      return {
        amount: 0,
        id: null,
        userId: null,
        date: null,
        status: 'NEW',
        card: null,
        type: 'Card'
      }
    }
  }
}