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
