import {mount, createLocalVue} from '@vue/test-utils'
import MakeFriendForm from '../components/MakeFriendForm'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import makeAuthHeaderBody from '../plugins/id-token'

const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.use(Vuex)
jest.mock('../plugins/id-token')
makeAuthHeaderBody.mockResolvedValue({})

describe('validation test', () => {

  let makeFriendFormWrapper

  beforeEach(() => {
    makeFriendFormWrapper = mount(MakeFriendForm, {
      localVue,
    })
  })

  /**
   * inputに値を入力してvalidation結果を照合する
   * @param {string} inputValue inputに入力する値 
   * @param {boolean} isValid 入力がvalidかどうか(trueならvalid)
   * @param {} done jestにテストの終了を通知するdoneコールバック
   */
  const checkInputValue = (inputValue, isValid, done) => {
    const input = makeFriendFormWrapper.find('input')
    input.setValue(inputValue)
    makeFriendFormWrapper.vm.$refs['makeFriendForm'].validate((valid) => {
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