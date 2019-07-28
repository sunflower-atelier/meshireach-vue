import axios from 'axios'
import makeAuthHeaderBody from '../plugins/id-token'

export const state = () => ({
  friends: null,
  events: null
})

export const getters = {
  getFriends: argState => argState.friends,
  getEvents: argState => argState.events
}

export const mutations = {
  setFriends: (argState, friends) => {
    argState.friends = friends
  },
  addFriends: (argState, friend) => {
    argState.friends.push(friend)
  },
  setEvents: (argState, events) => {
    argState.events = events
  },
  addEvents: (argState, event) => {
    argState.events.push(event)
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
  },
  fetchEventsFromAPIServer: async ({ commit }) => {
    const headers = await makeAuthHeaderBody()
    const res = await axios.get('http://localhost:3000/events', {
      headers
    }).catch((err) => {
      return err.response
    })

    if (res.status === 200) {
      commit('seEvents', res.data.events)
    }
  }
}
