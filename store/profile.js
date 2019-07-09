import axios from '@nuxtjs/axios'

export const state = () => ({
  currentUser: null
})

export const getters = {
  getCurrentUser: argState => argState.currentUser
}

export const mutations = {
  setCurrentUser: (argState, user) => {
    argState.currentUser = user
  }
}

export const actions = {
  fetchUserFromAPIServer: async ({ commit }) => {
    const res = await axios.get('localhost:3000/checkProfile')
    if (res.stasus === 200) {
      const user = res.data
      commit('setCurrentUser', user)
    }
  }
}
