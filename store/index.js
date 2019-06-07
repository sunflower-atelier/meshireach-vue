export const state = () => ({
  user: null
});

export const mutations = {
  setUser (state, user){
    state.user = user || null
  }
}

export const getters = {
  isAuthenticated(state) {
    return !!state.user
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }){
    // setuserの処理
  }
}