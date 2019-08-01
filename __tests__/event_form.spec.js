import {mount, createLocalVue} from '@vue/test-utils'
import EventForm from '../components/eventForm/EventForm'
import ElementUI from 'element-ui'
import moment from 'moment'

const localVue = createLocalVue()
localVue.use(ElementUI)

describe("validation test" , () => {

  let eventFormWrapper
  beforeEach(() => {
    eventFormWrapper = mount(EventForm, {
      localVue,
    })
  })

  test('empty title is invalid',  () => {
    const titleInput = eventFormWrapper.findAll('input').at(0)
    titleInput.setValue('')
    titleInput.trigger('blur')
    expect(eventFormWrapper.find('.is-error').exists())
  })

  test('past time is invalid', () => {
    const dateInput = eventFormWrapper.findAll('input').at(0)
    const timeInput = eventFormWrapper.findAll('input').at(1)
    const now = moment()
    dateInput.setValue(now.format('YYYY-MM-DD'))
    timeInput.setValue('00:00')
    timeInput.trigger('blur')
    expect(eventFormWrapper.find('.is-error').exists())
  })
})
