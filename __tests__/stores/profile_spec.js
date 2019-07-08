import { state, getters, mutations } from '../../store/profile'

test('getCurrentUser() returns null without setting', () => {
  expect(getters.getCurrentUser(state())).toBe(null)
})

test('setCurrentUser() registers user', () => {
  const mockState = state()
  mutations.setCurrentUser(mockState, {
    name: 'test',
    userID: 1
  })
  expect(mockState.currentUser).toStrictEqual({
    name: 'test',
    userID: 1
  })
})

test('getCurrentUser() returns user after setting', () => {
  const mockState = state()
  mutations.setCurrentUser(mockState, {
    name: 'test',
    userID: 1
  })
  expect(getters.getCurrentUser(mockState)).toStrictEqual({
    name: 'test',
    userID: 1
  })
})
