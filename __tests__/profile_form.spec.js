import {mount, createLocalVue} from '@vue/test-utils'
import ProfileForm from '../components/profileForm/ProfileForm'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import makeAuthHeaderBody from '../plugins/id-token'

const localVue = createLocalVue()
localVue.use(ElementUI)
localVue.use(Vuex)
jest.mock('../plugins/id-token')
makeAuthHeaderBody.mockResolvedValue({})

describe('form value is correctly validated when post', () => {

  let profileFormWrapper

  beforeEach(() => {
    profileFormWrapper = mount(ProfileForm, {
      localVue
    })
  })

  const validateForm = (input1, input2, isSuccess, done) => {
    const inputs = profileFormWrapper.findAll('input')
    inputs.at(0).setValue(input1)
    inputs.at(1).setValue(input2)
    profileFormWrapper.vm.$refs['form'].validate((valid) => {
      expect(valid).toBe(isSuccess)
      done()
    })
  }

  const validUserName = 'hogefoo0711'
  const validUserId = 'hogefoo0711'

  test('form validation test1', done => {
    validateForm('', '', false, done)
  })

  test('form validation test2', done => {
    validateForm(validUserId, validUserName, true, done)
  })

  test('empty user id is invalid', (done) => {
    validateForm('',  validUserName, false, done)
  })

  test('user id has to contain only alphabet or number', (done) => {
    validateForm('aa@@', validUserName, false, done)
  })

  test('valid name', (done) => {
    validateForm(validUserId, 'hoge ふう 風雅 88 ホゲホゲ', true, done)
  })

  test('empty name is invalid', (done) => {
    validateForm(validUserId, '', false, done)
  })

  test('name must not begin with space', (done) => {
    validateForm(validUserId, ' foo', false, done)
  })

  test('name must not end with space', (done) => {
    validateForm(validUserId, 'foo ', false, done)
  })

  test('name must not contain symbol', (done) => {
    validateForm(validUserId, 'foo@', false, done)
  })
})

describe('post profile test', () => {

  let profileFormWrapper
  let axiosMock
  let mutations

  const router = { push: jest.fn() }

  beforeEach(() => {
    mutations = {
      setCurrentUser: jest.fn(),
    }
    const store = new Vuex.Store({
      modules:{
        profile:{
          namespaced: true,
          mutations
        }
      }
    })
    profileFormWrapper = mount(ProfileForm, {
      localVue,
      mocks: { $router: router, $store: store, $axios: axios}
    })
    axiosMock = new MockAdapter(axios)
  })

  test('setCurrentUser will be invoked if response code is 200', async () => {
    axiosMock.onPost('/profiles').reply(201)
    await profileFormWrapper.vm.sendProfileToServer("searchID", "name", "message")
    expect(mutations.setCurrentUser).toHaveBeenCalled()
  })

  test('setCurrentUser will not be invoked if response code is 200', async () => {
    axiosMock.onPost('/profiles').reply(400)
    await profileFormWrapper.vm.sendProfileToServer("searchID", "name", "message")
    expect(mutations.setCurrentUser).not.toHaveBeenCalled()
  })

})
