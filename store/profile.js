import axios from 'axios'
import makeAuthHeaderBody from '../plugins/id-token'

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
  },
  clearCurrentUser: (argState) => {
    argState.currentUser = null
  }
}

export const actions = {
  fetchUserFromAPIServer: async ({ commit }) => {
    const authHeaderBody = await makeAuthHeaderBody();
    const res = await axios.get('http://localhost:3000/profiles', {
      headers: authHeaderBody
    }).catch((err) => {
      console.log(err.response.data)
      return err.response
    })
    if (res.status === 200) {
      const user = res.data
      commit('setCurrentUser', user)
    }
  }
}
