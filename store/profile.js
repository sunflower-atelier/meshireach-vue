import axios from '@nuxtjs/axios'

export const state = () => ({
  currentUser: null
})

export const getters = {
  getCurrentUser: argState => argState.currentUser
}

export const mutations = {
  setCurrentUser: (argState, user) => {
    argState.currentUser = {}
    argState.currentUser.searchID = user.searchID
    argState.currentUser.name = user.name
    argState.currentUser.message = user.message
  }
}

export const actions = {
  fetchUserFromAPIServer: async ({ commit }) => {
    const res = await axios.get('localhost:3000/profiles')
    if (res.stasus === 200) {
      const user = res.data
      commit('setCurrentUser', user)
    }
  }
}
