import {mount, createLocalVue} from '@vue/test-utils'
import profile from '../pages/profile'
import ElementUI from 'element-ui'

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('validation test', () => {

  let wrapper

  beforeEach(() => {
    wrapper = mount(profile, { 
      localVue
    })
  })

  /**
   * inputに入力して, el-form-itemにつけられるclass名から入力が正しく認識されてるか確認する
   * @param {int} inputIndex 何番目のinputか 
   * @param {string} inputStr     inputに入力する文字列
   * @param {string} expectedClassName el-form-itemにつくclass名(.is-success or .is-error)
   */
  let inputAndEvaluate = (inputIndex, inputStr, expectedClassName) => {
    let inputs = wrapper.findAll('input')
    inputs.at(inputIndex).setValue(inputStr)
    inputs.at(inputIndex).trigger('blur')
    expect(wrapper.find(expectedClassName).exists()).toBeTruthy()
  }

  test('valid user id', () => {
    inputAndEvaluate(0, 'hogefoo0711', '.is-success')
  })

  test('empty user id is invalid', () => {
    inputAndEvaluate(0, '' , '.is-error')
  })

  test('user id has to contain only alphabet or number', () => {
    inputAndEvaluate(0, '@@', '.is-error')
  })

  test('valid name', () => {
    inputAndEvaluate(1, 'hoge ふう 風雅 88 ホゲホゲ', '.is-success')
  })

  test('empty name is invalid', () => {
    inputAndEvaluate(1, '', '.is-error')
  })

  test('name must not begin with space', () => {
    inputAndEvaluate(1, ' foo', '.is-error')
  })

  test('name must not end with space', () => {
    inputAndEvaluate(1, 'foo ', '.is-error')
  })

  test('name must not contain symbol', () => {
    inputAndEvaluate(1, 'foo@', '.is-error')
  })
})

describe('submit test', () => {

  let wrapper

  beforeEach(() => {
    wrapper = mount(profile, { 
      localVue
    })
  })

  test('click button', () => {

    let mockFunc = jest.fn()

    wrapper.setMethods({submitForm: mockFunc})
    wrapper.find('button').trigger('click')
    expect(mockFunc).toBeCalled()
  })

})