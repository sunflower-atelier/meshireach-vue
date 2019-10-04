import axios from 'axios'
import moment from 'moment'
import makeAuthHeaderBody from '../plugins/id-token'

export const state = () => ({
  events: null,
  friends: null,
  myEvents: null
})

export const getters = {
  getEvents: argState => argState.events,
  getFriends: argState => argState.friends,
  getMyEvents: argState => argState.myEvents
}

export const mutations = {
  addEvents: (argState, event) => {
    argState.events.push(event)
  },
  setEvents: (argState, events) => {
    argState.events = events
  },
  addFriends: (argState, friend) => {
    argState.friends.push(friend)
  },
  setFriends: (argState, friends) => {
    argState.friends = friends
  },
  addMyEvents: (argState, events) => {
    argState.myEvents.push(events)
  },
  setMyEvents: (argState, events) => {
    argState.myEvents = events
  }
}

export const actions = {
  fetchEventsFromAPIServer: async ({ commit }) => {
    const headers = await makeAuthHeaderBody()
    const res = await axios.get('http://localhost:3000/events/subscriptions', {
      headers
    }).catch((err) => {
      return err.response
    })

    if (res.status === 200) {
      const events = res.data.events
      events.map(event => {
        const deadline = moment(event.deadline)
        event.deadline = deadline.format('YYYY MM/DD HH:mm')
        return event
      })
      commit('setEvents', events)
    }
  },
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
  fetchMyEventsFromAPIServer: async ({ commit }) => {
    const headers = await makeAuthHeaderBody()
    const res = await axios.get('http://localhost:3000/events/subscriptions', {
      headers
    }).catch((err) => {
      return err.response
    })

    if (res.status === 200) {
      const events = res.data.events
      events.map(event => {
        const deadline = moment(event.deadline)
        event.deadline = deadline.format('YYYY MM/DD HH:mm')
        return event
      })
      commit('setMyEvents', events)
    }
  }
}
