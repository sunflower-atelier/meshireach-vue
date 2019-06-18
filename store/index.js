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
  nuxtServerInit({ commit }, { req }){ /* eslint no-unused-vars: off */
    // setuserの処理, ちゃんと実装次第上のeslint no-unused-varsは消してね
  }
}
