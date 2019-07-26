import axios from 'axios'
import makeAuthHeaderBody from '../plugins/id-token'

export const state = () => ({
  friends: null
})

export const getters = {
  getFriends: argState => argState.friends
}

export const mutations = {
  setFriends: (argState, friends) => {
    argState.friends = friends
  },
  addFriends: (argState, friend) => {
    argState.friends.push(friend)
  }
}

export const actions = {
  fetchFriendsFromAPIServer: async ({ commit }) => {
    const headers = await makeAuthHeaderBody()
    const res = await axios.get('http://localhost:3000/friends', {
      headers
    }).catch((err) => {
      return err.response
    })

    if (res.status === 200) {
      commit('setFriends', res.data.friends)
    }
  }
}
