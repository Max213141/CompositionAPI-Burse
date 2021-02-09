import { createStore, createLogger } from 'vuex'

export default createStore({
  plugins: [createLogger()],
  modules: {},
  state () {
    return {
      orderList: JSON.parse(localStorage.getItem('my-tasks')) ?? [],
      activeTasks: 0
    }
  },
  mutations: {
    addToOrderList (state, payload) {
      state.orderList.push(payload)
      localStorage.setItem('my-tasks', JSON.stringify(state.orderList))
    },
    changeOrder (state, payload) {
      const i = state.orderList.findIndex(task => task.id === payload.id)
      state.orderList[i] = payload
      localStorage.setItem('my-tasks', JSON.stringify(state.orderList))
    }
  },
  actions: {
    createTask({commit}, task) {
      commit('addToOrderList', task)
    },
    changeOrder ({ commit }, task) {
       commit('changeOrder', task)
      }
    },
  getters: {
    activeTasks (state) {
      return state.orderList.filter(task => task.status === 'active').length
    },
    tasks (state) {
      return state.orderList
    },
    taskById (_, getters) {
      return id => getters.tasks.find(task => task.id === id)
    }
  }
})
