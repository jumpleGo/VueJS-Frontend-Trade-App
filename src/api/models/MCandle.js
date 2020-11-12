// import moment from 'moment'

export class MCandle  {
  constructor (data) {
    if (data) {
      return {
        t: new Date(data.timestampMs),
        o: +data.open,
        h: +data.high,
        l: +data.low,
        c: +data.close
      }
    }
  }
}