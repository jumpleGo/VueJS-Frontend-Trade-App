import io from 'socket.io-client';
const socket = io(process.env.VUE_APP_SERVER_URL, {
  query: { userID: JSON.parse(localStorage.getItem('currentUser'))?._id } || {}
}); 
import axios from 'axios'
import {MCandle} from './../../api/models/MCandle'

const state = () => ({
  drawChart: false,
  pair: {
    id: "BTCUSDT",
    base: "BTC", 
    quote: "USDT"
  },
  period: 30,
  allPairs: [],
  currentPrice: 0,
  currentTrend: null,
  chartType: 'line',

  chartData: {
    labels: [],
    datasets: [{
      fill: true,
      borderWidth: 0,
      backgroundColor: 'rgba(3,127,252,0.02)',
      borderColor: "#037ffc",
      data: [],
      pointRadius: 0
    }]
  },

  candleData: {
    labels: [],
    datasets: [{
      data: [],
    }]
  },

  currentCandle: {}
})

const getters = {
  chartData: (state) => (num) => ({
    ...state.chartData,
    datasets: [{
      fill: true,
      borderWidth: 0,
      backgroundColor: 'rgba(3,127,252,0.02)',
      borderColor: "#037ffc",
      data: state.chartData.datasets[0].data.slice(-(num*30))
    }] 
  }),
  candleData: state => state.candleData,
  lastCandle: state => state.currentCandle
}

const mutations = {
  RERENDER_LAST_CANDLE: (state, candle) => {
    let candles = state.candleData.datasets[0].data
    candles[candles.length - 1] = candle

    state.currentCandle = candle
    
  },
  SET_DRAW_CHART: (state, value) => state.drawChart = value,
  SET_CHART_TYPE: (state, type) => state.chartType = type,
  SET_PERIOD: (state, period) => state.period = period,
  SET_PAIR: (state, pairObject) => state.pair = pairObject,
  SET_ALL_PAIRS: (state, pairs) => state.allPairs = pairs,
  PUSH_CANDLE_DATA: (state, candle) => {
    state.candleData.datasets[0].data.push(candle)
  },
  SET_CHART_DATA: (state, data) => {
    let priceDataArr = state.chartData.datasets[0].data

    priceDataArr.push({
      x: new Date(data.unix),
      y: +data.price
    })
  },
  CLEAR_OLD_DATE: (state) => {
    state.chartData.labels = [],
    state.chartData.datasets[0].data = [],

    state.candleData.datasets[0].data = []
    state.currentPrice = 0
  },
  SET_PRICE_INFO: (state, data) => {
    state.currentPrice = +data.price
    state.currentTrend = data.side
  },
}

const actions = {
  GET_CHART_DATA: async (context) => {
    try {
      const chartData = await axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL_API}/getChartData`,
        headers: {'Content-Type': 'application/json'},
        data: {base: context.state.pair.base}
      })
    
      for (let i = 0; i < chartData.data.length - 1; i++) {
        context.commit('SET_CHART_DATA', chartData.data[i])
      }
    } catch (err) {
      console.log("err", err)
    }
  },
  GET_CANDLE_DATA: async (context) => {
    const candleData = await axios({
      method: 'post',
      url: `${process.env.VUE_APP_SERVER_URL_API}/getCandleData`,
      headers: {'Content-Type': 'application/json'},
      data: {base: context.state.pair.id}
    })

    context.dispatch('CANDLE_DATA_FACTORY', candleData)    
  },

  CANDLE_DATA_FACTORY: async (context, candleData) => {
    let candle = candleData.data[0]

    for (let i = 0; i < candleData.data.length - 1; i++) {
      if (candleData.data[i].timestampMs === candle.timestampMs) {
        candle = await context.dispatch('UPDATE_CURRENT_CANDLE', {
          candle, 
          newValue: candleData.data[i]
        })
      } else {
        context.commit('PUSH_CANDLE_DATA', new MCandle(candle))
        candle = candleData.data[i]
      }
    }
  },

  UPDATE_CURRENT_CANDLE: (_, {candle, newValue}) => {
    return {
      timestampMs: candle.timestampMs,
      open: +candle.open,
      high: +candle?.high > +newValue?.high ? +candle.high : +newValue.high,
      low: +candle.low < +newValue.low ? +candle.low : +newValue.low,
      close: +newValue.close
    }
  },

  WORK_WITH_CURRENT_CANDLE: async (context, newCandleData) => {
    let candles = context.state.candleData.datasets[0].data
    let currentCandleData = candles[candles.length - 1]

    if (currentCandleData?.t.getTime() === newCandleData.t.getTime()) {
      let updatedCandle = await context.dispatch('UPDATE_LIVE_CANDLE', {
        oldCandleData: currentCandleData, 
        newCandleData
      })

      context.commit('RERENDER_LAST_CANDLE', updatedCandle)
    } else {
      context.commit('PUSH_CANDLE_DATA', newCandleData)
    }
  },

  UPDATE_LIVE_CANDLE: (_, {oldCandleData, newCandleData}) => {
    return {
        t: oldCandleData.t,
        o: newCandleData.o,
        h: newCandleData.h,
        l: newCandleData.l,
        c: newCandleData.c
      }
  },
  
  CONNECT_SOCKET: async (context) => {
    socket.on('connection'); 
    await context.dispatch('SEND_SOCKET_MESSAGE_TRADE')

    socket.on('MESSAGE_TRADE', (data) => {
      context.commit('SET_CHART_DATA', data)
      context.commit('SET_PRICE_INFO', data)
    });
    socket.on('MESSAGE_CANDLE', (data) => {
      if (data) {
        context.dispatch('WORK_WITH_CURRENT_CANDLE', new MCandle(data))
      }
    });
    
    socket.on('unauthorized', () => { 
      console.log('Unauthorized:');  
      context.dispatch('DISCONNECT_SOCKET')
    }); 
    
    socket.on('disconnect', () => { 
      console.log(`Disconnected:`); 
    }); 
    
    socket.open(); 
  },

  SEND_SOCKET_MESSAGE_TRADE: (context) => {
    socket.emit('SEND_MESSAGE', context.state.pair);
  },
  
  DISCONNECT_SOCKET: () => {
    socket.disconnect(true)
  },

  GET_PAIRS: async (context) => {
    try {
      const pairs = await axios({
        method: 'get',
        url: `${process.env.VUE_APP_SERVER_URL_API}/pairs`,
        headers: {'Content-Type': 'application/json'},
      })
      context.commit('SET_ALL_PAIRS', pairs.data)
    } catch(err) {
      console.log(err)
    }
  },

  SET_CHART_TYPE: async (context, type) => {
    context.commit('SET_CHART_TYPE', type)
  }

}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}