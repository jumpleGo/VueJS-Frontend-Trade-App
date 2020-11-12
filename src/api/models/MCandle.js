import moment from 'moment'

export class MCandle  {
  constructor (data) {
    if (data) {
      return {
        x: moment(data.timestampMs).format('LTS'), 
        y: [+data.open, +data.high, +data.low, +data.close],
      }
    }
  }
}