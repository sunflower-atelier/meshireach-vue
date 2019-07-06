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

  test('valid user id', () => {
    let inputs = wrapper.findAll('input')
    inputs.at(0).setValue('hogefoo0711')
    inputs.at(0).trigger('blur')
    expect(wrapper.find('.is-success').exists()).toBeTruthy()
  })

  test('empty user id is invalid', () => {
    let inputs = wrapper.findAll('input')
    inputs.at(0).setValue('')
    inputs.at(0).trigger('blur')
    expect(wrapper.find('.is-error').exists()).toBeTruthy()
  })

  test('user id has to contain only alphabet or number', () => {
    let inputs = wrapper.findAll('input')
    inputs.at(0).setValue('@@')
    inputs.at(0).trigger('blur')
    expect(wrapper.find('.is-error').exists()).toBeTruthy()
  })

  test('valid name', () => {
    let inputs = wrapper.findAll('input')
    inputs.at(1).setValue('hoge ふう 風雅 88 ホゲホゲ')
    inputs.at(1).trigger('blur')
    expect(wrapper.find('.is-success').exists()).toBeTruthy()
  })

  test('empty name is invalid', () => {
    let inputs = wrapper.findAll('input')
    inputs.at(1).setValue('')
    inputs.at(1).trigger('blur')
    expect(wrapper.find('.is-error').exists()).toBeTruthy()
  })

  test('name must not begin with space', () => {
    let inputs = wrapper.findAll('input')
    inputs.at(1).setValue(' foo')
    inputs.at(1).trigger('blur')
    expect(wrapper.find('.is-error').exists()).toBeTruthy()
  })

  test('name must not end with space', () => {
    let inputs = wrapper.findAll('input')
    inputs.at(1).setValue('foo ')
    inputs.at(1).trigger('blur')
    expect(wrapper.find('.is-error').exists()).toBeTruthy()
  })

  test('name must not contain symbol', () => {
    let inputs = wrapper.findAll('input')
    inputs.at(1).setValue('foo@')
    inputs.at(1).trigger('blur')
    expect(wrapper.find('.is-error').exists()).toBeTruthy()
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