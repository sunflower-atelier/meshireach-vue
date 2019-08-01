import { state, getters, mutations } from '../../store/home'

test('getFriends() returns null without setting', () => {
  expect(getters.getFriends(state())).toBe(null)
})

test('setFriends() registers friends', () => {
  const mockState = state()
  mutations.setFriends(mockState, [{
    name: 'test',
    searchID: 1,
    message: 'test'
  }])
  expect(mockState.friends).toStrictEqual([{
    name: 'test',
    searchID: 1,
    message: 'test'
  }])
})

test('getFriends() returns friends after setting', () => {
  const mockState = state()
  mutations.setFriends(mockState, [{
    name: 'test',
    searchID: 1,
    message: 'test'
  }])
  expect(getters.getFriends(mockState)).toStrictEqual([{
    name: 'test',
    searchID: 1,
    message: 'test'
  }])
})

test('addFriends() adds friends', () => {
  const mockState = state()
  mutations.setFriends(mockState, [{
    name: 'test',
    searchID: 1,
    message: 'test'
  }])
  mutations.addFriends(mockState, {
    name: 'test',
    searchID: 1,
    message: 'test'
  })
  expect(getters.getFriends(mockState)).toStrictEqual([{
    name: 'test',
    searchID: 1,
    message: 'test'
  },{
    name: 'test',
    searchID: 1,
    message: 'test'
  }])
})

test('getEvents() returns null without setting', () => {
  expect(getters.getEvents(state())).toBe(null)
})

test('setEvents() registers events', () => {
  const mockState = state()
  mutations.setEvents(mockState, [{
    id: 1,
    title: 'meshi title',
    ownerID: 'ownerID',
    owner: 'ownerName',
    deadline: '2019-01-01T00:00:00Z'
  }])
  expect(mockState.events).toStrictEqual([{
    id: 1,
    title: 'meshi title',
    ownerID: 'ownerID',
    owner: 'ownerName',
    deadline: '2019-01-01T00:00:00Z'
  }])
})

test('getEvents() returns events after setting', () => {
  const mockState = state()
  mutations.setEvents(mockState, [{
    id: 1,
    title: 'meshi title',
    ownerID: 'ownerID',
    owner: 'ownerName',
    deadline: '2019-01-01T00:00:00Z'
  }])
  expect(getters.getEvents(mockState)).toStrictEqual([{
    id: 1,
    title: 'meshi title',
    ownerID: 'ownerID',
    owner: 'ownerName',
    deadline: '2019-01-01T00:00:00Z'
  }])
})

test('addEvents() adds events', () => {
  const mockState = state()
  mutations.setEvents(mockState, [{
    id: 1,
    title: 'meshi title',
    ownerID: 'ownerID',
    owner: 'ownerName',
    deadline: '2019-01-01T00:00:00Z'
  }])
  mutations.addEvents(mockState, {
    id: 1,
    title: 'meshi title 2',
    ownerID: 'ownerID 2',
    owner: 'ownerName 2',
    deadline: '2019-01-01T00:00:00Z'
  })
  expect(getters.getEvents(mockState)).toStrictEqual([{
    id: 1,
    title: 'meshi title',
    ownerID: 'ownerID',
    owner: 'ownerName',
    deadline: '2019-01-01T00:00:00Z'
  },{
    id: 1,
    title: 'meshi title 2',
    ownerID: 'ownerID 2',
    owner: 'ownerName 2',
    deadline: '2019-01-01T00:00:00Z'
  }])
})
