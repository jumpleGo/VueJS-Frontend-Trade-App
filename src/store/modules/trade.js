import io from 'socket.io-client';

const state = () => ({
  pair: {
    id: "BTCUSDT",
    base: "BTC", 
    quote: "USDT"
  },
  chartData: {
    labels: [],
    datasets: [
      {
        backgroundColor: "#f87979",
        data: []
      }
    ]
  }
})

const getters = {

}

const mutations = {
  SET_PAIR: (state, pairObject) => state.pair = pairObject,
  SET_CHART_DATA: (state, data) => {
    state.chartData.datasets[0].data.push(+data.price)
    state.chartData.labels.push(data.unix)
  }
}

const actions = {
  GET_CHART_DATA: (context) => {
    const connect = () => { 
      const socket = io(process.env.VUE_APP_SERVER_URL, { 
        autoConnect: false, 
      }); 
      socket.on('connect', () => { 
        console.log('Connected');
        socket.emit('SEND_MESSAGE', context.state.pair);
        context.commit('SET_CHART_DATA', data)
      }); 
      
      socket.on('unauthorized', (reason) => { 
        console.log('Unauthorized:', reason);  
      }); 
      
      socket.on('disconnect', (reason) => { 
        console.log(`Disconnected:`); 
      }); 
      
      socket.open(); 
    };

    connect()    
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}