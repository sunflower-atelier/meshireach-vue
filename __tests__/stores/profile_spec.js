import { state, getters, mutations } from '../../store/profile'

test('getCurrentUser() returns null without setting', () => {
  expect(getters.getCurrentUser(state())).toBe(null)
})

test('setCurrentUser() registers user', () => {
  const mockState = state()
  mutations.setCurrentUser(mockState, {
    name: 'test',
    searchID: 1,
    message: 'test'
  })
  expect(mockState.currentUser).toStrictEqual({
    name: 'test',
    searchID: 1,
    message: 'test'
  })
})

test('getCurrentUser() returns user after setting', () => {
  const mockState = state()
  mutations.setCurrentUser(mockState, {
    name: 'test',
    searchID: 1,
    message: 'test'
  })
  expect(getters.getCurrentUser(mockState)).toStrictEqual({
    name: 'test',
    searchID: 1,
    message: 'test'
  })
})
