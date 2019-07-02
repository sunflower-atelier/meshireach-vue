export const state = () => ({
  user: null
})

export const mutations = {
  setUser (state, user) {
    state.user = user
  },
  signout(state){
    state.user = null
  }
}

export const getters = {
  isAuthenticated(state) {
    return !!state.user
  },
  getUser(state){
    return state.user
  }
}