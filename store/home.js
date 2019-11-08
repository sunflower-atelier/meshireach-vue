import axios from 'axios'
import moment from 'moment'
import makeAuthHeaderBody from '../plugins/id-token'

const BASE_URL = process.env.BASE_URL

const fetchFrom = async (url) => {
  const headers = await makeAuthHeaderBody()
  const res = await axios.get(`${BASE_URL}${url}`, {
    headers
  }).catch((err) => {
    return err.response
  })
  return res
}

const formatEventsDeadLine = (events) => {
  return events.map(event => {
    const deadline = moment(event.deadline)
    event.deadline = deadline.format('YYYY MM/DD HH:mm')
    return event
  })
}

export const state = () => ({
  events: null,
  friends: null,
  myEvents: null,
  joiningEvent: null
})

export const getters = {
  getEvents: argState => argState.events,
  getFriends: argState => argState.friends,
  getMyEvents: argState => argState.myEvents,
  getJoiningEvents: argState => argState.joiningEvent
}

export const mutations = {
  addEvents: (argState, events) => {
    argState.events.push(events)
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
  },
  addJoiningEvent: (argState, event) => {
    argState.joiningEvent.push(event)
  },
  setJoiningEvents: (argState, events) => {
    argState.joiningEvent = events
  }
}

export const actions = {
  fetchEventsFromAPIServer: async ({ commit }) => {
    const res = await fetchFrom('/events-subscriptions')

    if (res.status === 200) {
      commit('setEvents', formatEventsDeadLine(res.data.events))
    }
  },
  fetchFriendsFromAPIServer: async ({ commit }) => {
    const res = await fetchFrom('/friends')

    if (res.status === 200) {
      commit('setFriends', res.data.friends)
    }
  },
  fetchMyEventsFromAPIServer: async ({ commit }) => {
    const res = await fetchFrom('/events')

    if (res.status === 200) {
      commit('setMyEvents', formatEventsDeadLine(res.data.events))
    }
  },
  fetchJoiningEventsFromAPIServer: async ({ commit }) => {
    const res = await fetchFrom('/events-joining-list')

    if (res.status === 200) {
      commit('setJoiningEvents', formatEventsDeadLine(res.data.events))
    }
  }
}
