export const state = () => ({
  orders: [],
})

export const mutations = {
  addOrder(state, payload) {
    state.orders.unshift(payload);
  },
  restoreOrder(state,payload){
    state.orders = payload;
  }
}

export const getters = {
  getLastOrderNumber: (state) => {
    return state.orders[0].orderNumber || 0;
  }
}
