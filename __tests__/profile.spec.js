import {mount, createLocalVue} from '@vue/test-utils'
import profile from '../pages/profile'
import ElementUI from 'element-ui'

const localVue = createLocalVue();
localVue.use(ElementUI);

describe("ui test", () => {
  test('test of emit', () => {
    let wrapper = mount(profile, { 
      localVue
    })

    let mockFunc = jest.fn()

    wrapper.setMethods({submitForm: mockFunc})
    wrapper.find('button').trigger('click')
    expect(mockFunc).toBeCalled()
  })
})