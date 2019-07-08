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
    const user = await axios.get('localhost:3002/profile')
    commit('setCurrentUser', user)
  }
}
