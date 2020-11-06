import io from 'socket.io-client';
const socket = io(process.env.VUE_APP_SERVER_URL); 
import moment from 'moment'

const state = () => ({
  pair: {
    id: "BTCUSDT",
    base: "BTC", 
    quote: "USDT"
  },
  currentPrice: 0,
  chartData: {
    labels: [],
    datasets: [{
      fill: false,
      borderWidth: 0,
      borderColor: "#037ffc",
      data: [],
      pointRadius: [5]
    }]
  }
})

const getters = {
  chartData: state => state.chartData
}

const mutations = {
  SET_PAIR: (state, pairObject) => state.pair = pairObject,
  SET_CHART_DATA: (state, data) => {
    let priceDataArr = state.chartData.datasets[0].data
    priceDataArr.push(+data.price)

    let labelsArr = state.chartData.labels
    labelsArr.push(moment(data.unix).format('LTS'))

    // state.chartData.datasets[0].label = `${state.pair.id} ${+data.price}`
    // state.chartData.datasets[0].pointRadius.unshift(0) 

    state.currentPrice = +data.price
  }
}

const actions = {
  CONNECT_SOCKET: (context) => {
    socket.on('connection'); 
    context.dispatch('SEND_SOCKET_MESSAGE')

    socket.on('MESSAGE', (data) => {
      context.commit('SET_CHART_DATA', data)
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

  SEND_SOCKET_MESSAGE: (context) => {
    socket.emit('SEND_MESSAGE', context.state.pair);
  },
  
  DISCONNECT_SOCKET: () => {
    socket.disconnect()
  }

}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}