import {mount, createLocalVue} from '@vue/test-utils'
import FriendForm from '../components/FriendForm'
import Vuex from 'vuex'
import ElementUI from 'element-ui'

const localVue = createLocalVue()
localVue.use(ElementUI)
localVue.use(Vuex)
jest.mock('../plugins/id-token')

describe('validation test', () => {

  let friendFormWrapper

  beforeEach(() => {
    friendFormWrapper = mount(FriendForm, {
      localVue,
    })
  })

  /**
   * inputに値を入力してvalidation結果を照合する
   * @param {string} inputValue inputに入力する値 
   * @param {boolean} isValid 入力がvalidかどうか(trueならvalid)
   * @param {*} done jestにテストの終了を通知するdoneコールバック
   */
  const checkInputValue = (inputValue, isValid, done) => {
    const input = friendFormWrapper.find('input')
    input.setValue(inputValue)
    friendFormWrapper.vm.$refs['friendForm'].validate((valid) => {
      expect(valid).toBe(isValid)
      done()
    })
  }

  test('empty is invalid', (done) => {
    checkInputValue('', false, done)
  })

  test('input value is invalid if it contains other than work charactor or digit' , (done) => {
    checkInputValue('@bbb@', false, done)
  })

  test('valid input' , (done) => {
    checkInputValue('user', true, done)
  })
})
